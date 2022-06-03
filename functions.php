<?php

if(!is_admin()){
    wp_enqueue_style("style",get_stylesheet_uri());
}
wp_enqueue_script('index', get_template_directory_uri() . '/assets/scripts/dist/index.js', '1.0.0');
add_action('admin_head', 'admin_styles');  
function admin_styles() {
    $roles = [];
    if(is_user_logged_in(  )){
        $roles = get_user_roles(get_current_user_id());
    }
    if(is_user_logged_in() && in_array('oferente',$roles)){
        echo '<style>#adminmenuwrap{display: none;}#wpadminbar{display: none;} #adminmenuback{ display: none;}header{padding: 15px 0px;background-color: #59b5c6;color: white;text-align: center;margin-bottom: 15px;}html{padding-top: 0 !important;}#wpfooter{display: none;}</style>';
    }
}