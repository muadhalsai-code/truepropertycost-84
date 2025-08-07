
<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container">
            <?php if (have_posts()) : ?>
                <?php if (is_home() && !is_front_page()) : ?>
                    <header class="mb-6">
                        <h1 class="section-title"><?php single_post_title(); ?></h1>
                    </header>
                <?php endif; ?>

                <div class="card-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('card'); ?>>
                            <?php if (has_post_thumbnail()) : ?>
                                <div style="height: 200px; overflow: hidden; margin-bottom: 1rem;">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium', [
                                            'style' => 'width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);'
                                        ]); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="card-content">
                                <header class="entry-header">
                                    <?php if (is_singular()) : ?>
                                        <?php the_title('<h1 class="entry-title" style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1rem;">', '</h1>'); ?>
                                    <?php else : ?>
                                        <?php the_title('<h2 class="entry-title" style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem;"><a href="' . esc_url(get_permalink()) . '" style="color: var(--color-gray-900); text-decoration: none;">', '</a></h2>'); ?>
                                    <?php endif; ?>

                                    <?php if ('post' === get_post_type()) : ?>
                                        <div style="color: var(--color-gray-600); font-size: 0.875rem; margin-bottom: 1rem;">
                                            <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                                <?php echo esc_html(get_the_date()); ?>
                                            </time>
                                            <?php if (get_the_author()) : ?>
                                                <?php echo ' by ' . esc_html(get_the_author()); ?>
                                            <?php endif; ?>
                                            <?php if (has_category()) : ?>
                                                <?php echo ' in '; the_category(', '); ?>
                                            <?php endif; ?>
                                        </div>
                                    <?php endif; ?>
                                </header>

                                <div class="entry-summary">
                                    <?php if (is_singular()) : ?>
                                        <?php the_content(); ?>
                                        <?php
                                        wp_link_pages(array(
                                            'before' => '<div class="page-links">' . esc_html__('Pages:', 'true-property-calculator'),
                                            'after'  => '</div>',
                                        ));
                                        ?>
                                    <?php else : ?>
                                        <p style="color: var(--color-gray-600); margin-bottom: 1rem;">
                                            <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?>
                                        </p>
                                        <a href="<?php the_permalink(); ?>" class="btn btn-sm btn-secondary">
                                            <?php esc_html_e('Read More', 'true-property-calculator'); ?>
                                        </a>
                                    <?php endif; ?>
                                </div>

                                <?php if (is_singular() && has_tag()) : ?>
                                    <footer class="entry-footer" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-gray-200);">
                                        <div style="font-size: 0.875rem; color: var(--color-gray-600);">
                                            <?php esc_html_e('Tags:', 'true-property-calculator'); ?> <?php the_tags('', ', ', ''); ?>
                                        </div>
                                    </footer>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <?php if (!is_singular()) : ?>
                    <?php
                    the_posts_pagination(array(
                        'mid_size'  => 2,
                        'prev_text' => esc_html__('&laquo; Previous', 'true-property-calculator'),
                        'next_text' => esc_html__('Next &raquo;', 'true-property-calculator'),
                    ));
                    ?>
                <?php endif; ?>

            <?php else : ?>
                <div class="text-center">
                    <h1 class="section-title"><?php esc_html_e('Nothing Found', 'true-property-calculator'); ?></h1>
                    <?php if (is_home() && current_user_can('publish_posts')) : ?>
                        <p>
                            <?php printf(
                                wp_kses(
                                    __('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'true-property-calculator'),
                                    array('a' => array('href' => array()))
                                ),
                                esc_url(admin_url('post-new.php'))
                            ); ?>
                        </p>
                    <?php elseif (is_search()) : ?>
                        <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'true-property-calculator'); ?></p>
                        <?php get_search_form(); ?>
                    <?php else : ?>
                        <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'true-property-calculator'); ?></p>
                        <?php get_search_form(); ?>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
