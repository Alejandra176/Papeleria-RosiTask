package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.ProductoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareElemental.RosiTaskProject.repository.ProductoRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class ProductoServiceImpl extends GenericServiceImpl<Producto, Long> implements ProductoServiceAPI {

	@Autowired
	private ProductoRepository productoRepository;

	@Override
	public CrudRepository<Producto, Long> getDao() {
		return productoRepository;
	}

}
