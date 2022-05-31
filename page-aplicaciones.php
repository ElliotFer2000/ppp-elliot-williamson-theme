<?php
    get_header();
?>


<?php
$roles = get_user_roles(get_current_user_id());

if(is_user_logged_in(  ) && in_array('oferente',$roles)){
    
?>
    <h1 style="text-align: center;">Aplicaciones a tus ofertas de trabajo</h1>

    <div id="aplicaciones">

    </div>

<?php } else {
      wp_redirect(home_url( ) );
}?>



<?php
    get_footer();
?>