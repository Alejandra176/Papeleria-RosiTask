package SoftwareElemental.RosiTaskProject.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "usuario_id")
	private Integer idUsuario;

	@Column(name = "nombre_usuario")
	private String nombreEmpleado;

	@Column(name = "correo")
	private String correo;

	@Column(name = "contrasena")
	private String contrasena;

	@Column(name = "rol")
	private String rol;

	@Column(name = "estado")
	private String estado;

	@Column(name = "fecha_registro")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaRegistro;

	public Usuario() {
		// TODO Auto-generated constructor stub
	}

	public Usuario(Integer idUsuario, String nombreEmpleado, String correo, String contrasena, String rol,
			String estado, LocalDate fechaRegistro) {
		super();
		this.idUsuario = idUsuario;
		this.nombreEmpleado = nombreEmpleado;
		this.correo = correo;
		this.contrasena = contrasena;
		this.rol = rol;
		this.estado = estado;
		this.fechaRegistro = fechaRegistro;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombreEmpleado() {
		return nombreEmpleado;
	}

	public void setNombreEmpleado(String nombreEmpleado) {
		this.nombreEmpleado = nombreEmpleado;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public LocalDate getFechaRegistro() {
		return fechaRegistro;
	}

	public void setFechaRegistro(LocalDate fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

}
