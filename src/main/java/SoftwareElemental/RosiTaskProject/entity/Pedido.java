package SoftwareElemental.RosiTaskProject.entity;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "Pedido")
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pedido_id")
	private Integer idPedido;

	@Column(name = "fecha_pedido")
	@Temporal(TemporalType.DATE)
	private Date fechaPedido;

	@Column(name = "estado")
	private String estado;

	@Column(name = "forma_pago")
	private String formaPago;

	@Column(name = "total")
	private BigDecimal total;

	@Column(name = "fecha_entrega")
	private LocalDate fechaEntrega;

	@Column(name = "proveedor")
	private String proveedor;

	@Column(name = "observaciones")
	private String observaciones;

	public Pedido() {
		// TODO Auto-generated constructor stub
	}

	public Pedido(Integer idPedido, Date fechaPedido, String estado, String formaPago, BigDecimal total,
			LocalDate fechaEntrega, String proveedor, String observaciones) {
		super();
		this.idPedido = idPedido;
		this.fechaPedido = fechaPedido;
		this.estado = estado;
		this.formaPago = formaPago;
		this.total = total;
		this.fechaEntrega = fechaEntrega;
		this.proveedor = proveedor;
		this.observaciones = observaciones;
	}

	public Integer getIdPedido() {
		return idPedido;
	}

	public void setIdPedido(Integer idPedido) {
		this.idPedido = idPedido;
	}

	public Date getFechaPedido() {
		return fechaPedido;
	}

	public void setFechaPedido(Date fechaPedido) {
		this.fechaPedido = fechaPedido;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getFormaPago() {
		return formaPago;
	}

	public void setFormaPago(String formaPago) {
		this.formaPago = formaPago;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public LocalDate getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(LocalDate fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	public String getProveedor() {
		return proveedor;
	}

	public void setProveedor(String proveedor) {
		this.proveedor = proveedor;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

}
