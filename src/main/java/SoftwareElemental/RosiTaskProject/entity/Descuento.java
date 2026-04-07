package SoftwareElemental.RosiTaskProject.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "descuento")
public class Descuento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "descuento_id")
	private Integer idDescuento;

	@Column(name = "nombre_descu")
	private String nombreDescu;

	@Column(name = "descripcion")
	private String descripcionDescu;

	@Column(name = "tipo_descu")
	private String tipoDescu;

	@Column(name = "fecha_inicio")
	private LocalDate fechaInicio;

	@Column(name = "fecha_fin")
	private LocalDate fechaFin;

	@Column(name = "estado")
	private String estadoDescu;

	@Column(name = "producto_id")
	private Integer idProducto;

	public Descuento() {
		// TODO Auto-generated constructor stub
	}

	public Descuento(Integer idDescuento, String nombreDescu, String descripcionDescu, String tipoDescu,
			LocalDate fechaInicio, LocalDate fechaFin, String estadoDescu, Integer idProducto) {
		super();
		this.idDescuento = idDescuento;
		this.nombreDescu = nombreDescu;
		this.descripcionDescu = descripcionDescu;
		this.tipoDescu = tipoDescu;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.estadoDescu = estadoDescu;
		this.idProducto = idProducto;
	}

	public Integer getIdDescuento() {
		return idDescuento;
	}

	public void setIdDescuento(Integer idDescuento) {
		this.idDescuento = idDescuento;
	}

	public String getNombreDescu() {
		return nombreDescu;
	}

	public void setNombreDescu(String nombreDescu) {
		this.nombreDescu = nombreDescu;
	}

	public String getDescripcionDescu() {
		return descripcionDescu;
	}

	public void setDescripcionDescu(String descripcionDescu) {
		this.descripcionDescu = descripcionDescu;
	}

	public String getTipoDescu() {
		return tipoDescu;
	}

	public void setTipoDescu(String tipoDescu) {
		this.tipoDescu = tipoDescu;
	}

	public LocalDate getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(LocalDate fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public LocalDate getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(LocalDate fechaFin) {
		this.fechaFin = fechaFin;
	}

	public String getEstadoDescu() {
		return estadoDescu;
	}

	public void setEstadoDescu(String estadoDescu) {
		this.estadoDescu = estadoDescu;
	}

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}
}

