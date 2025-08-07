
<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="mb-4">
                        <h1 class="section-title"><?php the_title(); ?></h1>
                    </header>
                    
                    <div class="post-content">
                        <?php the_content(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
