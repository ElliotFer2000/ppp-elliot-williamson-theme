<?php
get_header();
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$roles = get_user_roles(get_current_user_id());

if(is_user_logged_in(  ) && in_array('aplicante',$roles)){
$user_id = get_current_user_id();
$user_degree = get_user_meta(get_current_user_id(),'degree');

$args = array(
    'post_type' => array(
        'ofertas'
    ),
    'post_status' => array( 
        'publish'
    ),
    'posts_per_page' => 2,
    'paged' => $paged,
	'meta_query'=>  array(
        array(
            'key'     => 'carrera',
            'value'   => sprintf('"%s"', $user_degree[0]),
            'compare' => 'LIKE',
        )
    ),
	
);

// Custom query.
$query = new WP_Query( $args );

// Check that we have query results.
if ( $query->have_posts() ) {
 
    while ( $query->have_posts() ) {
        echo get_post_meta('carrera');
        $query->the_post();
        $title = get_the_title();
        $description = get_the_excerpt();
        $permalink = get_the_permalink();
        $degrees = implode(",", get_field('carrera'));
        
        $post_str = <<<POST
        <section class="user-summary">
            <h1>$title</h1>
            <p>$description</p>
            <a href="$permalink"  style='margin-top: 15px; height: auto; display: block; text-align: center; border-radius: 5px; background-color: #001b36; color: white; padding: 15px; width: 200px; box-shadow: 5px 5px 5px gray;'>Ver detalles</a>
            <p>Es preferible que el aspirante sea de las siguientes carerras: </p>
            <p>$degrees</p>
        </section>
        POST;

        echo $post_str;
    }
}else{
    echo "<h1 style='text-align: center;'>No hay trabajos relacionados con tu perfil en este momento</h1>";
}

$big = 999999999;
echo "<div style='display: flex; justify-content: center; margin-bottom: 15px' class='pagination'>";
echo paginate_links( array(
    'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
    'format' => '?paged=%#%',
    'current' => max( 1, get_query_var('paged') ),
    'total' => $query->max_num_pages
) );
echo "</div>";
 
wp_reset_postdata();

}else{
    wp_redirect(home_url( ) );
}

get_footer();