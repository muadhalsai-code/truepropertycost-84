
<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container">
            <header class="mb-6">
                <h1 class="section-title">
                    <?php
                    if (is_category()) {
                        single_cat_title();
                    } elseif (is_tag()) {
                        single_tag_title();
                    } elseif (is_author()) {
                        printf(__('Author: %s', 'true-property-calculator'), get_the_author());
                    } elseif (is_day()) {
                        printf(__('Day: %s', 'true-property-calculator'), get_the_date());
                    } elseif (is_month()) {
                        printf(__('Month: %s', 'true-property-calculator'), get_the_date('F Y'));
                    } elseif (is_year()) {
                        printf(__('Year: %s', 'true-property-calculator'), get_the_date('Y'));
                    } else {
                        _e('Archives', 'true-property-calculator');
                    }
                    ?>
                </h1>
            </header>
            
            <?php if (have_posts()) : ?>
                <div class="card-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div style="height: 200px; overflow: hidden;">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium', ['style' => 'width: 100%; height: 100%; object-fit: cover;']); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="card-content">
                                <h2 style="font-family: var(--font-heading); font-size: 1.125rem; margin-bottom: 0.5rem;">
                                    <a href="<?php the_permalink(); ?>" style="color: var(--color-gray-900); text-decoration: none;">
                                        <?php the_title(); ?>
                                    </a>
                                </h2>
                                
                                <div style="color: var(--color-gray-600); font-size: 0.875rem; margin-bottom: 1rem;">
                                    <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                                </div>
                                
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
                <p><?php _e('No posts found.', 'true-property-calculator'); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
