<?php
    get_header();
    $roles = [];
    if(is_user_logged_in(  )){
        $roles = get_user_roles(get_current_user_id());
    }

?>

<?php if(!is_user_logged_in(  )){ ?>
    <section class="auth-form">
        <h1>Se requieren credenciales</h1>
        <form action="/auth-user" method="post" enctype="multipart/form-data">
            <p>Debes ingresar tu usuario y contraseña para aplicar a empleos y para publicar ofertas</p>
            <p>
                <label for="user">Usuario: </label>
                <input type="text" name="log" id="user"/>
            </p>
            <p>
                <label for="password">Contraseña</label>
                <input type="password" name="pwd" id="password"/>
            </p>
            <button type="submit">Entrar</button>
        </form>
    </section>
<?php } ?>

<?php
    get_footer();
?>