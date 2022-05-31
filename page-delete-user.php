<?php
get_header();
$roles = get_user_roles(get_current_user_id());

if(is_user_logged_in(  ) && in_array('bolsa',$roles)) {
    $user_id = $_POST["user-id"];
  
    require_once(ABSPATH.'wp-admin/includes/user.php');
  
    $result = wp_delete_user($user_id);
    
    if($result === true){
        echo "<h1 style='text-align: center'>El usuario ha sido eliminado exitosamente</h1>";
    }else{
        echo "<h1 style='text-align: center'>Error: Intentalo de nuevo</h1>";
    }
}else{
    wp_redirect(home_url());
}
get_footer();