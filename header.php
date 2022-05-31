<?php include "globals.php"?>
<!DOCTYPE html>
<html lang="en" style="margin-top: 0 !important;">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
        <?php 
            if(!is_user_logged_in(  ) && is_page("auth-user")){
                $wp_auth_result = wp_signon();
                if(get_class($wp_auth_result) == "WP_Error"){
                    $MESSAGE_ERROR = "<p style='text-align: center'>Autenticacion fallida, asegurate de usar el usuario y contraseña correctos</p> <p style='text-align: center'><a href='/'>Volver a inicio</a></p>";
                }else{
                    wp_redirect( home_url() ); 
                    exit;
                }
            }else{
                $MESSAGE_ERROR = "<p style='text-align: center'>Ya tienes una sesión iniciada</p> <p style='text-align: center'><a href='/'>Volver a inicio</a></p>";
            }
        ?>

        <?php wp_head(); ?>
    </head>
  

    <body>

        <header>
            <h1>Bolsa de trabajo UCA</h1>
            <p>Bienvenido</p>
        </header>
        <nav>
            <?php 
                $roles = [];
                if(is_user_logged_in(  )){
                    $roles = get_user_roles(get_current_user_id());
                }
                
                if(is_user_logged_in() && in_array('aplicante',$roles)){
                    echo "<a href='/jobs'>Ver ofertas</a>";
                }
                if(is_user_logged_in() && in_array('oferente',$roles)){
                    echo "<a href='/wp-admin/edit.php?post_type=ofertas'>Ir al dashboard</a>";
                    echo "<a href='/aplicaciones'>Ver aplicaciones</a>";
                }
                if(is_user_logged_in() && in_array('bolsa',$roles)){
                    echo "<a href='/registrar'>Registrar usuarios</a>";
                    echo "<a href='/usuarios' style='margin-bottom: 15px;'>Ver Usuarios</a>";
                }

                if(is_user_logged_in(  )){
                    echo '<a href="/logout">Cerrar Sesión</a>';
                }
            ?>
        </nav>