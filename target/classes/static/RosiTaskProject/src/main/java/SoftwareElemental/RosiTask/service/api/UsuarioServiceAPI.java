package SoftwareElemental.RosiTask.service.api;

import SoftwareElemental.RosiTaskProject.entity.Usuario;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;
import java.util.Optional;

public interface UsuarioServiceAPI extends GenericServiceAPI<Usuario, Long> {

	Optional<Usuario> findByCorreo(String correo);

}
