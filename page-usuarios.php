<?php
    get_header( );

$args = array(
    'role__in '=> array('oferente','aplicante'),
    'role__not_in' => array('administrator')
);

// The Query
$user_query = new WP_User_Query( $args );
$roles = get_user_roles(get_current_user_id());

?>

<?php


    if(is_user_logged_in(  ) && in_array('bolsa',$roles)){
                    // User Loop
            if ( ! empty( $user_query->get_results() ) ) {
                
                foreach ( $user_query->get_results() as $user ) {
                    $form_delete = <<<EOT
                    <section class='user-summary'>
                        <h1>$user->display_name</h1>
                        <p>Rol: $user->roles[0]</p>
                        <p>Usuario: $user->user_login</p>
                        <form method="POST" action="/delete-user">
                            <input type="hidden" value="$user->id" name="user-id"/>
                            <button type="submit" style='height: auto; display: block; text-align: center; border-radius: 5px; background-color: #001b36; color: white; padding: 15px; width: 200px; box-shadow: 5px 5px 5px gray;'>Borrar Usuario</button>
                        </form>
                    </section>
                    EOT;
 

                    echo $form_delete;

                    
                }
            } else {
                echo 'No users found.';
            }
?>


<?php } else {
     wp_redirect(home_url());
}?>

<?php
    get_footer( );
?>