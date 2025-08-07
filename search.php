
<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container">
            <header class="mb-6">
                <h1 class="section-title">
                    <?php printf(__('Search Results for: %s', 'true-property-calculator'), '<span>' . get_search_query() . '</span>'); ?>
                </h1>
            </header>
            
            <?php if (have_posts()) : ?>
                <div class="card-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="card">
                            <div class="card-content">
                                <h2 style="font-family: var(--font-heading); font-size: 1.125rem; margin-bottom: 0.5rem;">
                                    <a href="<?php the_permalink(); ?>" style="color: var(--color-gray-900); text-decoration: none;">
                                        <?php the_title(); ?>
                                    </a>
                                </h2>
                                
                                <p style="color: var(--color-gray-600); margin-bottom: 1rem;">
                                    <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                                </p>
                                
                                <a href="<?php the_permalink(); ?>" class="btn btn-sm btn-secondary">
                                    <?php _e('Read More', 'true-property-calculator'); ?>
                                </a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>
                
                <?php
                the_posts_pagination(array(
                    'prev_text' => __('Previous', 'true-property-calculator'),
                    'next_text' => __('Next', 'true-property-calculator'),
                ));
                ?>
            <?php else : ?>
                <div class="text-center">
                    <p><?php _e('Sorry, no results were found.', 'true-property-calculator'); ?></p>
                    <p><?php _e('Please try a different search term.', 'true-property-calculator'); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
