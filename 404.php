
<?php get_header(); ?>

<main id="main" class="site-main">
    <section class="section">
        <div class="container text-center">
            <h1 class="section-title"><?php _e('Page Not Found', 'true-property-calculator'); ?></h1>
            <p class="mb-4"><?php _e('Sorry, the page you are looking for could not be found.', 'true-property-calculator'); ?></p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">
                <?php _e('Back to Home', 'true-property-calculator'); ?>
            </a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
