<?php
    get_header();
    // assumes $to, $subject, $message have already been defined earlier...
    $to = 'elliotferminwilliamsonsandoval@gmail.com';
    $subject = 'The subject';
    $body = '<h1> body content </h1>';

    if(wp_mail($to,$subject,$body)) {
        echo json_encode(array("result"=>"complete"));
      } else {
        echo json_encode(array("result"=>"mail_error"));
      }
      wp_die();
?>

<?php
    get_footer();
?>