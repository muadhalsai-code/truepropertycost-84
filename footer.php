        </div><!-- Header offset end -->
    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-content">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h3><?php _e('About', 'true-property-calculator'); ?></h3>
                        <p><?php _e('True Property Cost Calculator provides comprehensive property cost analysis across all UAE emirates.', 'true-property-calculator'); ?></p>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-2')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h3><?php _e('Quick Links', 'true-property-calculator'); ?></h3>
                        <nav>
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'footer',
                                'container'      => false,
                                'fallback_cb'    => 'wp_page_menu',
                            ));
                            ?>
                        </nav>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-3')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-3'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h3><?php _e('Contact', 'true-property-calculator'); ?></h3>
                        <p><?php echo get_theme_mod('contact_phone', '+971-XX-XXX-XXXX'); ?></p>
                        <p><?php echo get_theme_mod('contact_email', 'info@truepropertycalculator.com'); ?></p>
                        <p><?php echo get_theme_mod('contact_address', 'Dubai, United Arab Emirates'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'true-property-calculator'); ?></p>
            </div>
        </div>
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>