<?php
    get_header();
    $user_id = get_current_user_id();
    $user = get_user_by( 'id', $user_id);
    $user_email = $user->user_email;
    $user_full = $user->display_name;
    $user_degree = get_user_meta($user_id,'degree');
    
    $author_id=$post->post_author;
    $recruiter_name = get_the_author_meta( 'display_name' , $author_id );
    $roles = get_user_roles(get_current_user_id());
    $author_meta = get_the_author_meta('display_name');
?>
<div style="max-width: 1200px; margin-left: auto; margin-right: auto;">
    <h1>
        Oferta de trabajo: <?php the_title() ?>
    </h1>

    <p>Publicado por: <?php echo $recruiter_name; ?></p>

    <?php $degrees = implode(",", get_field('carrera')); ?>

    <?php the_content();  ?>

    <?php echo "<p>Puedes aplicar si eres de la siguientes carreras:</p>"?>
    <?php echo "<p><strong>$degrees</strong></p>"; ?>

    <?php if(is_user_logged_in(  ) && in_array('aplicante',$roles)){ ?>
        <p>
            <label for="cv_url">Introduce una url que permita descargar tu CV</label>
            <input type="text" id="cv_url">
        </p>
        <button type="button" id="apply" data-job-id="<?php echo $post->ID?>" data-recruiter-name="<?php echo $recruiter_name; ?>" data-recruiter-id="<?php echo $author_id; ?>" data-degree="<?php echo $user_degree[0]; ?>" data-name="<?php echo $user_full; ?>" data-email="<?php echo $user_email; ?>">Aplicar</button>
    <?php } ?>
</div>
<?php
    get_footer();
?>