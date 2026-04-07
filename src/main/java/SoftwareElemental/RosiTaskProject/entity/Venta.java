package SoftwareElemental.RosiTaskProject.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "venta")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venta_id")
    private Long idVenta;

    @Column(name = "producto")
    private String producto;

    @Column(name = "fecha_venta")
    private LocalDate fechaVenta;

    @Column(name = "nombre_empleado")
    private String nombreEmpleado;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @Column(name = "descuento")
    private BigDecimal descuento;

    @Column(name = "total_venta")
    private BigDecimal totalVenta;

    @Column(name = "forma_pago")
    private String formaPago;

    @Column(name = "promocion")
    private String promocion;

    // Constructor vacío
    public Venta() {
    }

    // Constructor con todos los campos
    public Venta(Long idVenta, String producto, LocalDate fechaVenta, String nombreEmpleado, Integer cantidad,
                 BigDecimal precioUnitario, BigDecimal descuento, BigDecimal totalVenta,
                 String formaPago, String promocion) {
        this.idVenta = idVenta;
        this.producto = producto;
        this.fechaVenta = fechaVenta;
        this.nombreEmpleado = nombreEmpleado;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
        this.totalVenta = totalVenta;
        this.formaPago = formaPago;
        this.promocion = promocion;
    }

    // Getters y Setters

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public LocalDate getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDate fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public String getNombreEmpleado() {
        return nombreEmpleado;
    }

    public void setNombreEmpleado(String nombreEmpleado) {
        this.nombreEmpleado = nombreEmpleado;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getDescuento() {
        return descuento;
    }

    public void setDescuento(BigDecimal descuento) {
        this.descuento = descuento;
    }

    public BigDecimal getTotalVenta() {
        return totalVenta;
    }

    public void setTotalVenta(BigDecimal totalVenta) {
        this.totalVenta = totalVenta;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

    public String getPromocion() {
        return promocion;
    }

    public void setPromocion(String promocion) {
        this.promocion = promocion;
    }
}
