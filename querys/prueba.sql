CREATE OR REPLACE FUNCTION register_new_support (IN empleado int, IN registrado_por int, IN tipoapoyo int, IN costo float, IN observaciones VARCHAR(100), IN fecha_solicitud DATE)
RETURNS FLOAT AS $$
	-- Declaracion de variables
	DECLARE empleado_existente BOOLEAN; -- en uso
	DECLARE nombre_apoyo VARCHAR; -- en uso
	DECLARE saldo_disponible BOOLEAN; -- en uso
	DECLARE saldo_empleado FLOAT; 
	DECLARE respuesta VARCHAR(30);
	
	BEGIN
         -- Verificar que el empleado existe y esta activo
         SELECT COUNT(*) INTO empleado_existente FROM Empleados WHERE id_empleado = empleado AND activo = true;
         IF empleado_existente = TRUE THEN -- Sí existe el empleado
         
	    -- Obtener el tipo de apoyo que se desea registrar
	    SELECT nombre INTO nombre_apoyo FROM Tipo_apoyo WHERE id_tipoapoyo = tipoapoyo;

	    -- componer la variable para llamar a la funcion: validate_balance_support
	    IF nombre_apoyo = 'Inglés' THEN
		nombre_apoyo := 'idioma';
	    ELSE 
	        nombre_apoyo := 'formacion';
	    END IF;

	   -- verificar que el empleado tenga saldo suficiente, llamando a:
	    SELECT validate_balance_support(empleado, nombre_apoyo, costo) INTO saldo_disponible;
	    IF saldo_disponible = TRUE THEN
		-- El empleado cumple todo, registrar apoyo
		
		SELECT substract_balance_employee(1, 2500, 'formacion') INTO saldo_empleado; -- obtien el nuevo saldo del empleado
		
	    END IF;
	    
	 ELSE 
	    respuesta:= 'Empleado no existe!';
	 END IF;
	 RETURN saldo_empleado; --Salir
	END;
$$ LANGUAGE PLpgSQL;