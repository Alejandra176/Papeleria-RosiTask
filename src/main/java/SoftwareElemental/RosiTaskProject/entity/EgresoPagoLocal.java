package SoftwareElemental.RosiTaskProject.entity;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Table(name = "egreso_pago_local")
public class EgresoPagoLocal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "egreso_local_id")
    private Long id;

    
    @Column(name = "fecha_egreso")
    private LocalDate fechaEgreso;

    @Column(name = "valor")
    private BigDecimal valor;
    
    @Column(name = "categoria")
    private String categoria;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @Column(name = "concepto")
    private String concepto;

    @Column(name = "estado_pago")
    private String estadoPago;

    @Column(name = "numero_factura")
    private String numeroFactura;

    @Column(name = "periodo")
    private String periodo;

    public EgresoPagoLocal() {
    }

    public EgresoPagoLocal(Long id, LocalDate fechaEgreso, BigDecimal valor, String categoria, String metodoPago, String concepto,
                           String estadoPago, String numeroFactura, String periodo) {
        this.id = id;
        this.fechaEgreso = fechaEgreso;
        this.valor = valor;
        this.categoria = categoria;
        this.metodoPago = metodoPago;
        this.concepto = concepto;
        this.estadoPago = estadoPago;
        this.numeroFactura = numeroFactura;
        this.periodo = periodo;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getFechaEgreso() {
		return fechaEgreso;
	}

	public void setFechaEgreso(LocalDate fechaEgreso) {
		this.fechaEgreso = fechaEgreso;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getMetodoPago() {
		return metodoPago;
	}

	public void setMetodoPago(String metodoPago) {
		this.metodoPago = metodoPago;
	}

	public String getConcepto() {
		return concepto;
	}

	public void setConcepto(String concepto) {
		this.concepto = concepto;
	}

	public String getEstadoPago() {
		return estadoPago;
	}

	public void setEstadoPago(String estadoPago) {
		this.estadoPago = estadoPago;
	}

	public String getNumeroFactura() {
		return numeroFactura;
	}

	public void setNumeroFactura(String numeroFactura) {
		this.numeroFactura = numeroFactura;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	
	@Override
	public String toString() {
	    return "EgresoPagoLocal{" +
	            "id=" + id +
	            ", fechaEgreso=" + fechaEgreso +
	            ", valor=" + valor +
	            ", categoria='" + categoria + '\'' +
	            ", metodoPago='" + metodoPago + '\'' +
	            ", concepto='" + concepto + '\'' +
	            ", estadoPago='" + estadoPago + '\'' +
	            ", numeroFactura='" + numeroFactura + '\'' +
	            ", periodo='" + periodo + '\'' +
	            '}';
	}
    
}

