package SoftwareElemental.RosiTaskProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import SoftwareElemental.RosiTask.service.api.UsuarioServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Usuario;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

@RestController
@RequestMapping("/usuario")
public class UsuarioRestController {

	@Autowired
	private UsuarioServiceAPI usuarioServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Usuario> getAll() {
		return usuarioServiceAPI.getAll();
	}

	@PostMapping(value = "/saveUsuario")
	public ResponseEntity<Usuario> save(@RequestBody Usuario usuario) {
		Usuario obj = usuarioServiceAPI.save(usuario);
		return new ResponseEntity<Usuario>(obj, HttpStatus.OK); // 200
	}

	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) throws ResourceNotFoundException {
		Usuario usuario = usuarioServiceAPI.get(id);
		if (usuario == null) {
			throw new ResourceNotFoundException("Record not found for <Usuario>" + id);
		}
		return ResponseEntity.ok().body(usuario);
	}

	@DeleteMapping(value = "/deleteUsuario/{id}")
	public ResponseEntity<Usuario> delete(@PathVariable Long id) {
		Usuario usuario = usuarioServiceAPI.get(id);
		if (usuario != null) {
			usuarioServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Usuario loginData) {
		return usuarioServiceAPI.findByCorreo(loginData.getCorreo()).map(usuario -> {
			if (usuario.getContrasena().equals(loginData.getContrasena())) {
				switch (usuario.getRol().toLowerCase()) {
				case "administrador":
					return new ResponseEntity<>("Bienvenido administrador", HttpStatus.OK);
				case "asistente":
					return new ResponseEntity<>("Bienvenido asistente", HttpStatus.OK);
				default:
					return new ResponseEntity<>("Rol no reconocido", HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>("Contraseña incorrecta", HttpStatus.UNAUTHORIZED);
			}
		}).orElseGet(() -> new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND));
	}

}
