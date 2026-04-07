package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import SoftwareElemental.RosiTaskProject.entity.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

	Optional<Usuario> findByCorreo(String correo);
	
	boolean existsByCorreoIgnoreCase(String correo); // ✅ CORRECTO

}
