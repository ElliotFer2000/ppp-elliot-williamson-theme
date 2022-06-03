<?php

$roles = get_user_roles(get_current_user_id());

if(is_user_logged_in(  ) && in_array('bolsa',$roles)){
    get_header();
    function new_user($first_name,$last_name,$username, $password, $email = "",  $degree, $role) {
      
      $user_id = wp_insert_user( array(
          'user_login' => $username,
          'user_pass' => $password,
          'user_email' => $email,
          'first_name' => $first_name,
          'last_name' => $last_name,
          'display_name' => "$first_name $last_name",
          'role' => strtolower($role)
      ));
            
      //check if there are no errors
      if ( ! is_wp_error( $user_id ) ) {
        update_user_meta( $user_id, 'degree', $degree );
      }
        
      return $user_id;
    }

  $degree =  $_POST["carrera"];
  $username =  $_POST["user"];
  $type =  $_POST["tipo"];
  $pwd =  $_POST["password"];
  $first_name = $_POST["nombre"];
  $last_name = $_POST["apellido"];
  $email = $_POST["email"];

  if($degree && $username && $type && $pwd){
      $user_id = new_user($first_name,$last_name,$username,$pwd,$email,$degree,$type);
  }

 
  if ( ! is_wp_error( $user_id ) ) {
    echo "<h1 style='text-align: center;'>El usuario ha sido creado</h1>";
  }else{
    
     if(isset($user_id->errors['existing_user_login'])){
        echo "<h1 style='text-align: center;'>Ha habido un error, el usuario no fue creado</h1>";
        echo "<h1 style='text-align: center;'>Error: El nombre de usuario $username ya existe</h1>";
     }else if(isset($user_id->errors['existing_user_email'])){
        echo "<h1 style='text-align: center;'>Ha habido un error, el usuario no fue creado</h1>";
        echo "<h1 style='text-align: center;'>Error: El correo electronico $email ya esta siendo usado</h1>";
     }else{
       var_dump($user_id);
     }
  }
  get_footer();
}else{
  wp_redirect(home_url());
}
?>