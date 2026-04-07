package SoftwareElemental.RosiTaskProject.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "producto_id")
	private Integer idProducto;

	@Column(name = "nombre_producto")
	private String nombreProducto;

	@Column(name = "marca")
	private String marca;

	@Column(name = "descripcion")
	private String descripcion;

	@Column(name = "estado")
	private String estado;

	@Column(name = "precio_compra")
	private BigDecimal precioCompra;

	@Column(name = "precio_venta")
	private BigDecimal precioVenta;

	@Column(name = "fecha_ingreso")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaIngreso;

	@Column(name = "cantidad_producto")
	private Integer cantidadProducto;

	@Column(name = "producto_proveedor")
	private String productoProveedor;

	public Producto() {
		// TODO Auto-generated constructor stub
	}

	public Producto(Integer idProducto, String nombreProducto, String marca, String descripcion, String estado,
			BigDecimal precioCompra, BigDecimal precioVenta, LocalDate fechaIngreso, Integer cantidadProducto,
			String productoProveedor) {
		super();
		this.idProducto = idProducto;
		this.nombreProducto = nombreProducto;
		this.marca = marca;
		this.descripcion = descripcion;
		this.estado = estado;
		this.precioCompra = precioCompra;
		this.precioVenta = precioVenta;
		this.fechaIngreso = fechaIngreso;
		this.cantidadProducto = cantidadProducto;
		this.productoProveedor = productoProveedor;
	}

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public BigDecimal getPrecioCompra() {
		return precioCompra;
	}

	public void setPrecioCompra(BigDecimal precioCompra) {
		this.precioCompra = precioCompra;
	}

	public BigDecimal getPrecioVenta() {
		return precioVenta;
	}

	public void setPrecioVenta(BigDecimal precioVenta) {
		this.precioVenta = precioVenta;
	}

	public LocalDate getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(LocalDate fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	public Integer getCantidadProducto() {
		return cantidadProducto;
	}

	public void setCantidadProducto(Integer cantidadProducto) {
		this.cantidadProducto = cantidadProducto;
	}

	public String getProductoProveedor() {
		return productoProveedor;
	}

	public void setProductoProveedor(String productoProveedor) {
		this.productoProveedor = productoProveedor;
	}

}
