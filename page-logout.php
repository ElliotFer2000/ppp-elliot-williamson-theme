<?php
    if(!is_user_logged_in(  )){
        wp_redirect(home_url( ) );
    }else{
        wp_logout();
        wp_redirect(home_url( ) );
    }
?>