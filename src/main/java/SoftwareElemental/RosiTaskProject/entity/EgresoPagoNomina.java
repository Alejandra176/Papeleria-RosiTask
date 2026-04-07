package SoftwareElemental.RosiTaskProject.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "egreso_pago_nomina")
public class EgresoPagoNomina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "egreso_nomina_id")
    private Long id;

    @Column(name = "fecha_egreso")
    private LocalDate fechaEgreso;

    @Column(name = "valor")
    private BigDecimal valor;
    
    @Column(name = "categoria")
    private String categoria;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @Column(name = "empleado")
    private String empleado;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "correo")
    private String correo;

    @Column(name = "periodo_trabajado")
    private String periodoTrabajado;

    @Column(name = "sueldo_base")
    private BigDecimal sueldoBase;

    @Column(name = "deducciones")
    private BigDecimal deducciones;

    @Column(name = "subsidios")
    private BigDecimal subsidios;

    @Column(name = "horas_extra")
    private Integer horasExtra;

    @Column(name = "neto_pagado")
    private BigDecimal netoPagado;

    public EgresoPagoNomina() {
    }

    public EgresoPagoNomina(Long id, LocalDate fechaEgreso, BigDecimal valor, String categoria, String metodoPago, String empleado,
                            String cargo, String correo, String periodoTrabajado, BigDecimal sueldoBase,
                            BigDecimal deducciones, BigDecimal subsidios, Integer horasExtra, BigDecimal netoPagado) {
        this.id = id;
        this.fechaEgreso = fechaEgreso;
        this.valor = valor;
        this.categoria = categoria;
        this.metodoPago = metodoPago;
        this.empleado = empleado;
        this.cargo = cargo;
        this.correo = correo;
        this.periodoTrabajado = periodoTrabajado;
        this.sueldoBase = sueldoBase;
        this.deducciones = deducciones;
        this.subsidios = subsidios;
        this.horasExtra = horasExtra;
        this.netoPagado = netoPagado;
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

	public String getEmpleado() {
		return empleado;
	}

	public void setEmpleado(String empleado) {
		this.empleado = empleado;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getPeriodoTrabajado() {
		return periodoTrabajado;
	}

	public void setPeriodoTrabajado(String periodoTrabajado) {
		this.periodoTrabajado = periodoTrabajado;
	}

	public BigDecimal getSueldoBase() {
		return sueldoBase;
	}

	public void setSueldoBase(BigDecimal sueldoBase) {
		this.sueldoBase = sueldoBase;
	}

	public BigDecimal getDeducciones() {
		return deducciones;
	}

	public void setDeducciones(BigDecimal deducciones) {
		this.deducciones = deducciones;
	}

	public BigDecimal getSubsidios() {
		return subsidios;
	}

	public void setSubsidios(BigDecimal subsidios) {
		this.subsidios = subsidios;
	}

	public Integer getHorasExtra() {
		return horasExtra;
	}

	public void setHorasExtra(Integer horasExtra) {
		this.horasExtra = horasExtra;
	}

	public BigDecimal getNetoPagado() {
		return netoPagado;
	}

	public void setNetoPagado(BigDecimal netoPagado) {
		this.netoPagado = netoPagado;
	}

}

