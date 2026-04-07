package SoftwareElemental.RosiTaskProject.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "promocion")
public class Promocion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "promocion_id")
	private Integer idPromocion;

	@Column(name = "nombre_promo")
	private String nombrePromo;

	@Column(name = "descripcion_promo")
	private String descripcionPromo;

	@Column(name = "tipo_promo")
	private String tipoPromo;

	@Column(name = "fecha_inicio")
	private LocalDate fechaInicio;

	@Column(name = "fecha_fin")
	private LocalDate fechaFin;

	@Column(name = "estado_promo")
	private String estadoPromo;

	@Column(name = "productofull_id")
	private Integer idProductoFull;

	@Column(name = "productobeneficio_id")
	private Integer idProductoBeneficio;

	public Promocion() {
		// TODO Auto-generated constructor stub
	}

	public Promocion(Integer idPromocion, String nombrePromo, String descripcionPromo, String tipoPromo,
			LocalDate fechaInicio, LocalDate fechaFin, String estadoPromo, Integer idProductoFull,
			Integer idProductoBeneficio) {
		super();
		this.idPromocion = idPromocion;
		this.nombrePromo = nombrePromo;
		this.descripcionPromo = descripcionPromo;
		this.tipoPromo = tipoPromo;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.estadoPromo = estadoPromo;
		this.idProductoFull = idProductoFull;
		this.idProductoBeneficio = idProductoBeneficio;
	}

	public Integer getIdPromocion() {
		return idPromocion;
	}

	public void setIdPromocion(Integer idPromocion) {
		this.idPromocion = idPromocion;
	}

	public String getNombrePromo() {
		return nombrePromo;
	}

	public void setNombrePromo(String nombrePromo) {
		this.nombrePromo = nombrePromo;
	}

	public String getDescripcionPromo() {
		return descripcionPromo;
	}

	public void setDescripcionPromo(String descripcionPromo) {
		this.descripcionPromo = descripcionPromo;
	}

	public String getTipoPromo() {
		return tipoPromo;
	}

	public void setTipoPromo(String tipoPromo) {
		this.tipoPromo = tipoPromo;
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

	public String getEstadoPromo() {
		return estadoPromo;
	}

	public void setEstadoPromo(String estadoPromo) {
		this.estadoPromo = estadoPromo;
	}

	public Integer getIdProductoFull() {
		return idProductoFull;
	}

	public void setIdProductoFull(Integer idProductoFull) {
		this.idProductoFull = idProductoFull;
	}

	public Integer getIdProductoBeneficio() {
		return idProductoBeneficio;
	}

	public void setIdProductoBeneficio(Integer idProductoBeneficio) {
		this.idProductoBeneficio = idProductoBeneficio;
	}

}
