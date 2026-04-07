package SoftwareElemental.RosiTask.service.api;

import SoftwareElemental.RosiTaskProject.entity.Descuento;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface DescuentoServiceAPI extends GenericServiceAPI<Descuento, Long> {

	boolean existsByNombreDescu(String nombre);
	
	// 👇 Cambia Long por Integer
    boolean existsByNombreDescuAndIdDescuentoNot(String nombre, Integer idDescuento);
}

