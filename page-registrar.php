<?php
    get_header();
    $roles = get_user_roles(get_current_user_id());
?>

<?php if(!is_user_logged_in(  )){ ?>
    <section>
        <h1>Se requieren credenciales</h1>
        <form action="" method="">
            <p>Debes ingresar tu usuario y contraseña para aplicar a las ofertas laborales</p>
            <p>
                <label for="user">Usuario: </label>
                <input type="text" name="user" id="user"/>
            </p>
            <p>
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password"/>
            </p>
            <button type="submit">Entrar</button>
        </form>
    </section>
<?php } ?>


<?php if((is_user_logged_in(  )) && in_array('bolsa',$roles)){ ?>
    <h1 style="text-align: center">Crear Usuario</h1>

    <section class="create-user-form" style="margin-bottom: 60px">
        <form action="/create-user" method="POST" enctype="multipart/form-data">
            <p>
                <label for="user">Usuario:* </label>
                <input type="text" name="user" id="user" required/>
            </p>
            <p>
                <label for="nombre">Nombre:* </label>
                <input type="text" name="nombre" id="nombre" required/>
            </p>
            <p>
                <label for="apellido">Apellido:* </label>
                <input type="text" name="apellido" id="apellido" required/>
            </p>
            <p>
                <label for="email">Email:* </label>
                <input type="email" name="email" id="email" required/>
            </p>
            <p>
                <label for="carrera">Carrera de interés:* </label>
                <select name="carrera" id="carrera" required>
                    <option value="Ingeniería en Sistemas">Ingenieria en Sistemas de Informacion</option>
                    <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                    <option value="Ingeniería Ambiental">Ingeniería Industrial</option>
                    <option value="Ingeniería Civil">Ingeniería Civil</option>
                    <option value="Ingeniería en Redes y Telecomunicaciones">Ingeniería en Redes y Telecomunicaciones</option>
                    <option value="Psicología">Psicología</option>
                    <option value="Turismo">Turismo</option>
                    <option value="Derecho">Derecho</option>
                    <option value="Derecho">Contabilidad</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Economía">Economía</option>
                    <option value="Administración de Empresas">Administración de Empresas</option>
                    <option value="Diseño Gráfico">Diseño Gráfico</option>
                    <option value="Diseño Gráfico">Otro</option>
                </select>
            </p>
            <p>
                <label for="carrera">Tipo de Usuario:* </label>
                <select name="tipo" id="tipo" required>
                    <option value="oferente">Oferente</option>
                    <option value="aplicante">Aplicante</option>
                </select>
            </p>
            <p>
                <label for="password">Contraseña:*</label>
                <input type="password" name="password" id="password" required/>
            </p>
            <button type="submit">Guardar</button>
        </form>
    </section>
<?php }else{ 
     wp_redirect(home_url());   
}?>



<?php
    get_footer();
?>