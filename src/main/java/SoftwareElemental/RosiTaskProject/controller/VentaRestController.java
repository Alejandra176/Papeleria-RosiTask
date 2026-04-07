package SoftwareElemental.RosiTaskProject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;

import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareElemental.RosiTaskProject.entity.Venta;
import SoftwareElemental.RosiTask.service.api.ProductoServiceAPI;
import SoftwareElemental.RosiTask.service.api.VentaServiceAPI;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

@RestController
@RequestMapping("/venta")
public class VentaRestController {

    @Autowired
    private VentaServiceAPI ventaServiceAPI;
    @Autowired
    private ProductoServiceAPI productoServiceAPI;

    // Obtener todas las ventas
    @GetMapping(value = "/getAll")
    public List<Venta> getAll() {
        return ventaServiceAPI.getAll();
    }

    // Guardar una nueva venta
    @PostMapping(value = "/saveVenta")
    public ResponseEntity<Venta> save(@RequestBody Venta venta) {
        Venta obj = ventaServiceAPI.save(venta);
        return new ResponseEntity<Venta>(obj, HttpStatus.OK);
    }

    // Obtener una venta por ID
    @GetMapping(value = "/findRecord/{id}")
    public ResponseEntity<Venta> getVentaById(@PathVariable Long id) throws ResourceNotFoundException {
        Venta venta = ventaServiceAPI.get(id);
        if (venta == null) {
            throw new ResourceNotFoundException("Record not found for <Venta> " + id);
        }
        return ResponseEntity.ok().body(venta);
    }


    @DeleteMapping(value = "/deleteVenta/{id}")
    public ResponseEntity<Venta> delete(@PathVariable Long id) {
        Venta venta = ventaServiceAPI.get(id);
        if (venta != null) {
            try {
                // Obtener ID del producto y cantidad vendida
                Long idProducto = Long.parseLong(venta.getProducto());
                int cantidadVendida = venta.getCantidad();

                // Llamar a ProductoRestController o al servicio directamente para aumentar stock
                // Si tienes acceso al ProductoServiceAPI aquí, puedes hacer esto directamente:
                Producto producto = productoServiceAPI.get(idProducto);
                if (producto != null) {
                    producto.setCantidadProducto(producto.getCantidadProducto() + cantidadVendida);
                    productoServiceAPI.save(producto);
                }

                // Eliminar la venta
                ventaServiceAPI.delete(id);
                return new ResponseEntity<Venta>(venta, HttpStatus.OK);

            } catch (Exception e) {
                return new ResponseEntity<Venta>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<Venta>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/nextId")
    public ResponseEntity<Long> getNextVentaId() {
        List<Venta> ventas = ventaServiceAPI.getAll();
        Long maxId = ventas.stream()
            .mapToLong(v -> v.getIdVenta())
            .max()
            .orElse(0L); // Si no hay ventas aún
        return ResponseEntity.ok(maxId + 1);
    }
    
    @GetMapping("/reportePDF")
    public ResponseEntity<byte[]> generarReportePDF(
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            LocalDate inicio = LocalDate.parse(fechaInicio);
            LocalDate fin = LocalDate.parse(fechaFin);

            List<Venta> ventas = ventaServiceAPI.findByFechaVentaBetween(inicio, fin);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();
            document.add(new Paragraph("Reporte de Ventas"));
            document.add(new Paragraph("Periodo: " + fechaInicio + " a " + fechaFin));
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.addCell("ID");
            table.addCell("Fecha");
            table.addCell("Producto");
            table.addCell("Total Venta");
            table.addCell("Forma de Pago");

            for (Venta venta : ventas) {
                table.addCell(String.valueOf(venta.getIdVenta()));
                table.addCell(String.valueOf(venta.getFechaVenta()));
                table.addCell(venta.getProducto());
                table.addCell(venta.getTotalVenta().toString());
                table.addCell(venta.getFormaPago());
            }

            document.add(table);
            document.close();

            byte[] pdfBytes = out.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "reporte_ventas.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/productosMasVendidos")
    public List<Map<String, Object>> obtenerProductosMasVendidos() {
        List<Venta> ventas = ventaServiceAPI.obtenerTodasLasVentas();
        List<Producto> productos = productoServiceAPI.getAll(); // Ya lo puedes usar

        // Mapa de ID de producto → Nombre de producto
        Map<Long, String> idNombreProducto = productos.stream()
        	    .collect(Collectors.toMap(
        	        p -> p.getIdProducto().longValue(),
        	        Producto::getNombreProducto,
        	        (nombre1, nombre2) -> nombre1
        	    ));

        Map<Long, Map<String, Object>> resumen = new HashMap<>();

        for (Venta venta : ventas) {
            Long idProducto = Long.parseLong(venta.getProducto()); // Suponiendo que producto es un String con el ID
            String nombreProducto = idNombreProducto.getOrDefault(idProducto, "Producto desconocido");

            int cantidad = venta.getCantidad();
            double total = venta.getTotalVenta().doubleValue();

            Map<String, Object> datos = resumen.getOrDefault(idProducto, new HashMap<>());
            int unidades = (int) datos.getOrDefault("unidades", 0);
            double totalVenta = (double) datos.getOrDefault("total", 0.0);

            datos.put("nombre", nombreProducto); // Ahora es el nombre
            datos.put("unidades", unidades + cantidad);
            datos.put("total", totalVenta + total);

            resumen.put(idProducto, datos);
        }

        return new ArrayList<>(resumen.values());
    }

    
}
