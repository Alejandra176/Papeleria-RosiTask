package SoftwareElemental.RosiTaskProject.service.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.UsuarioServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Usuario;
import SoftwareElemental.RosiTaskProject.repository.UsuarioRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class UsuarioServiceImpl extends GenericServiceImpl<Usuario, Long> implements UsuarioServiceAPI {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public CrudRepository<Usuario, Long> getDao() {
		return usuarioRepository;
	}

	@Override
	public Optional<Usuario> findByCorreo(String correo) {
		return usuarioRepository.findByCorreo(correo);
	}
}
