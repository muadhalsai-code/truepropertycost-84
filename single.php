<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="mb-4">
                            <?php the_post_thumbnail('large', ['style' => 'width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg);']); ?>
                        </div>
                    <?php endif; ?>
                    
                    <header class="mb-4">
                        <h1 class="section-title"><?php the_title(); ?></h1>
                        <div style="color: var(--color-gray-600); margin-bottom: 1rem;">
                            <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                            <?php if (get_the_author()) : ?>
                                by <?php the_author(); ?>
                            <?php endif; ?>
                        </div>
                    </header>
                    
                    <div class="post-content">
                        <?php the_content(); ?>
                    </div>
                    
                    <?php if (has_tag()) : ?>
                        <footer class="mt-6 pt-4" style="border-top: 1px solid var(--color-gray-200);">
                            <div style="font-size: 0.875rem; color: var(--color-gray-600);">
                                Tags: <?php the_tags('', ', ', ''); ?>
                            </div>
                        </footer>
                    <?php endif; ?>
                </article>
            <?php endwhile; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>