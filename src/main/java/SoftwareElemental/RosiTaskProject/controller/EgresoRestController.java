package SoftwareElemental.RosiTaskProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import SoftwareElemental.RosiTask.service.api.EgresoPagoLocalServiceAPI;
import SoftwareElemental.RosiTask.service.api.EgresoPagoNominaServiceAPI;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

import SoftwareElemental.RosiTaskProject.entity.EgresoPagoLocal;
import SoftwareElemental.RosiTaskProject.entity.EgresoPagoNomina;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/egreso")
public class EgresoRestController {
	
	@Autowired
    private EgresoPagoLocalServiceAPI egresoPagoLocalServiceAPI;

    @Autowired
    private EgresoPagoNominaServiceAPI egresoPagoNominaServiceAPI;
    
    @GetMapping("/reportePDF")
    public ResponseEntity<byte[]> generarReporteEgresosPDF(
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            LocalDate inicio = LocalDate.parse(fechaInicio);
            LocalDate fin = LocalDate.parse(fechaFin);

            List<EgresoPagoLocal> egresosLocal = egresoPagoLocalServiceAPI.findByFechaEgresoLocalBetween(inicio, fin);
            List<EgresoPagoNomina> egresosNomina = egresoPagoNominaServiceAPI.findByFechaEgresoNominaBetween(inicio, fin);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();
            document.add(new Paragraph("Reporte de Egresos"));
            document.add(new Paragraph("Periodo: " + fechaInicio + " a " + fechaFin));
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.addCell("ID");
            table.addCell("Fecha");
            table.addCell("Tipo");
            table.addCell("Valor");
            table.addCell("Método de Pago");

            for (EgresoPagoLocal egreso : egresosLocal) {
                table.addCell(String.valueOf(egreso.getId()));
                table.addCell(String.valueOf(egreso.getFechaEgreso()));
                table.addCell("Pago Local");
                table.addCell(egreso.getValor().toString());
                table.addCell(egreso.getMetodoPago());
            }

            for (EgresoPagoNomina egreso : egresosNomina) {
                table.addCell(String.valueOf(egreso.getId()));
                table.addCell(String.valueOf(egreso.getFechaEgreso()));
                table.addCell("Pago Nómina");
                table.addCell(egreso.getValor().toString());
                table.addCell(egreso.getMetodoPago());
            }

            document.add(table);
            document.close();

            byte[] pdfBytes = out.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "reporte_egresos.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
