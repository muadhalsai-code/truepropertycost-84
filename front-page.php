<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Hero Section -->
    <section class="hero-section">
        <?php 
        $hero_image = get_theme_mod('hero_background_image', get_template_directory_uri() . '/assets/dubai-skyline.jpg');
        if ($hero_image) : ?>
            <img src="<?php echo esc_url($hero_image); ?>" alt="<?php bloginfo('name'); ?>" class="hero-background">
        <?php endif; ?>
        
        <div class="hero-overlay"></div>
        
        <div class="hero-content">
            <div class="container">
                <h1 class="hero-title">
                    <?php echo get_theme_mod('hero_title', 'Uncover Hidden Property Costs in UAE Before You Buy'); ?>
                </h1>
                
                <p class="hero-subtitle">
                    <?php echo get_theme_mod('hero_subtitle', 'Stop Losing Money to Surprise Fees. Calculate Total Property Costs Across All 7 Emirates with Precision.'); ?>
                </p>
                
                <p class="hero-description">
                    <?php echo get_theme_mod('hero_description', 'Our advanced calculator reveals every hidden cost, fee, and expense involved in UAE property purchases. Make informed decisions with complete financial transparency.'); ?>
                </p>
                
                <!-- Feature Cards -->
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        </div>
                        <h3 class="feature-title"><?php _e('Uncover Hidden Fees', 'true-property-calculator'); ?></h3>
                        <p class="feature-description"><?php _e('Discover every hidden cost before you commit to any property purchase', 'true-property-calculator'); ?></p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                            </svg>
                        </div>
                        <h3 class="feature-title"><?php _e('Avoid Budget Gaps', 'true-property-calculator'); ?></h3>
                        <p class="feature-description"><?php _e('Prevent financial surprises with comprehensive cost breakdowns', 'true-property-calculator'); ?></p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12,22s8-4 8-10V5l-8-3-8 3v7c0,6 8,10 8,10z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title"><?php _e('Inheritance Protection', 'true-property-calculator'); ?></h3>
                        <p class="feature-description"><?php _e('Ensure proper planning for generational wealth transfer', 'true-property-calculator'); ?></p>
                    </div>
                </div>
                
                <a href="<?php echo get_theme_mod('hero_cta_link', '#calculator'); ?>" class="btn btn-primary btn-lg animate-pulse-glow">
                    <?php echo get_theme_mod('hero_cta_text', 'Start Free Calculation'); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Calculator Section -->
    <section class="section" id="calculator">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title"><?php _e('Try Our Calculator', 'true-property-calculator'); ?></h2>
                <p class="section-subtitle"><?php _e('Experience the power of complete cost transparency', 'true-property-calculator'); ?></p>
            </div>
            
            <?php echo do_shortcode('[calculator]'); ?>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="section" id="pricing" style="background: var(--gradient-section);">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title"><?php _e('Transparent Pricing', 'true-property-calculator'); ?></h2>
                <p class="section-subtitle"><?php _e('Choose the plan that fits your business needs', 'true-property-calculator'); ?></p>
            </div>
            
            <?php echo do_shortcode('[pricing]'); ?>
        </div>
    </section>

    <!-- Blog Section -->
    <?php
    $recent_posts = new WP_Query(array(
        'posts_per_page' => 3,
        'post_status' => 'publish'
    ));
    
    if ($recent_posts->have_posts()) : ?>
        <section class="section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title"><?php _e('Latest Insights', 'true-property-calculator'); ?></h2>
                    <p class="section-subtitle"><?php _e('Stay updated with the latest property market trends and tips', 'true-property-calculator'); ?></p>
                </div>
                
                <div class="card-grid">
                    <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                        <article class="card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div style="height: 200px; overflow: hidden;">
                                    <?php the_post_thumbnail('medium', ['style' => 'width: 100%; height: 100%; object-fit: cover;']); ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="card-content">
                                <h3 style="font-family: var(--font-heading); font-size: 1.125rem; margin-bottom: 0.5rem;">
                                    <a href="<?php the_permalink(); ?>" style="color: var(--color-gray-900); text-decoration: none;">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>
                                
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
                
                <div class="text-center mt-5">
                    <a href="<?php echo get_permalink(get_option('page_for_posts')); ?>" class="btn btn-primary">
                        <?php _e('View All Posts', 'true-property-calculator'); ?>
                    </a>
                </div>
            </div>
        </section>
    <?php endif; ?>
    <?php wp_reset_postdata(); ?>

</main>

<?php get_footer(); ?>