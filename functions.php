<?php
/**
 * True Property Cost Calculator Theme Functions
 *
 * @package TruePropertyCalculator
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function true_property_calculator_setup() {
    // Add theme support for post thumbnails
    add_theme_support('post-thumbnails');
    
    // Add theme support for automatic feed links
    add_theme_support('automatic-feed-links');
    
    // Add theme support for title tag
    add_theme_support('title-tag');
    
    // Add theme support for HTML5 markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Add theme support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Add theme support for custom background
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'true-property-calculator'),
        'footer'  => __('Footer Menu', 'true-property-calculator'),
    ));
    
    // Add theme support for wide and full alignment
    add_theme_support('align-wide');
    
    // Add theme support for responsive embeds
    add_theme_support('responsive-embeds');
    
    // Set content width
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'true_property_calculator_setup');

/**
 * Enqueue Scripts and Styles
 */
function true_property_calculator_scripts() {
    // Get theme version
    $theme_version = wp_get_theme()->get('Version');
    
    // Enqueue main stylesheet
    wp_enqueue_style(
        'true-property-calculator-style',
        get_stylesheet_uri(),
        array(),
        $theme_version
    );
    
    // Enqueue Google Fonts
    wp_enqueue_style(
        'true-property-calculator-fonts',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap',
        array(),
        null
    );
    
    // Enqueue main JavaScript file
    wp_enqueue_script(
        'true-property-calculator-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array('jquery'),
        $theme_version,
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('true-property-calculator-script', 'tpc_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('tpc_nonce'),
    ));
    
    // Enqueue comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'true_property_calculator_scripts');

/**
 * Enqueue Admin Scripts and Styles
 */
function true_property_calculator_admin_scripts($hook) {
    if ('appearance_page_true-property-calculator-options' !== $hook) {
        return;
    }
    
    wp_enqueue_style(
        'true-property-calculator-admin',
        get_template_directory_uri() . '/assets/css/admin.css',
        array(),
        wp_get_theme()->get('Version')
    );
    
    wp_enqueue_script(
        'true-property-calculator-admin',
        get_template_directory_uri() . '/assets/js/admin.js',
        array('jquery'),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('admin_enqueue_scripts', 'true_property_calculator_admin_scripts');

/**
 * Register Widget Areas
 */
function true_property_calculator_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'true-property-calculator'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'true-property-calculator'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Area 1', 'true-property-calculator'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in the first footer area.', 'true-property-calculator'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Area 2', 'true-property-calculator'),
        'id'            => 'footer-2',
        'description'   => __('Add widgets here to appear in the second footer area.', 'true-property-calculator'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Area 3', 'true-property-calculator'),
        'id'            => 'footer-3',
        'description'   => __('Add widgets here to appear in the third footer area.', 'true-property-calculator'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'true_property_calculator_widgets_init');

/**
 * Custom Excerpt Length
 */
function true_property_calculator_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'true_property_calculator_excerpt_length', 999);

/**
 * Custom Excerpt More
 */
function true_property_calculator_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'true_property_calculator_excerpt_more');

/**
 * Add Custom Image Sizes
 */
function true_property_calculator_image_sizes() {
    add_image_size('hero-image', 1920, 1080, true);
    add_image_size('card-image', 400, 300, true);
    add_image_size('thumbnail-large', 300, 300, true);
}
add_action('after_setup_theme', 'true_property_calculator_image_sizes');

/**
 * Customizer Settings
 */
function true_property_calculator_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('hero_section', array(
        'title'    => __('Hero Section', 'true-property-calculator'),
        'priority' => 30,
    ));
    
    // Hero Title
    $wp_customize->add_setting('hero_title', array(
        'default'           => 'Uncover Hidden Property Costs in UAE Before You Buy',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_title', array(
        'label'   => __('Hero Title', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));
    
    // Hero Subtitle
    $wp_customize->add_setting('hero_subtitle', array(
        'default'           => 'Stop Losing Money to Surprise Fees. Calculate Total Property Costs Across All 7 Emirates with Precision.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('hero_subtitle', array(
        'label'   => __('Hero Subtitle', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'textarea',
    ));
    
    // Hero Description
    $wp_customize->add_setting('hero_description', array(
        'default'           => 'Our advanced calculator reveals every hidden cost, fee, and expense involved in UAE property purchases. Make informed decisions with complete financial transparency.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('hero_description', array(
        'label'   => __('Hero Description', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'textarea',
    ));
    
    // Hero Background Image
    $wp_customize->add_setting('hero_background_image', array(
        'default'           => get_template_directory_uri() . '/assets/dubai-skyline.jpg',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_background_image', array(
        'label'   => __('Hero Background Image', 'true-property-calculator'),
        'section' => 'hero_section',
    )));
    
    // Hero CTA Text
    $wp_customize->add_setting('hero_cta_text', array(
        'default'           => 'Start Free Calculation',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('hero_cta_text', array(
        'label'   => __('Hero CTA Text', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'text',
    ));
    
    // Hero CTA Link
    $wp_customize->add_setting('hero_cta_link', array(
        'default'           => '#calculator',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('hero_cta_link', array(
        'label'   => __('Hero CTA Link', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'url',
    ));
    
    // Calculator Link
    $wp_customize->add_setting('calculator_link', array(
        'default'           => '#calculator',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('calculator_link', array(
        'label'   => __('Calculator Link', 'true-property-calculator'),
        'section' => 'hero_section',
        'type'    => 'url',
    ));
    
    // Contact Information Section
    $wp_customize->add_section('contact_info', array(
        'title'    => __('Contact Information', 'true-property-calculator'),
        'priority' => 40,
    ));
    
    // Phone Number
    $wp_customize->add_setting('contact_phone', array(
        'default'           => '+971-XX-XXX-XXXX',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('contact_phone', array(
        'label'   => __('Phone Number', 'true-property-calculator'),
        'section' => 'contact_info',
        'type'    => 'text',
    ));
    
    // Email Address
    $wp_customize->add_setting('contact_email', array(
        'default'           => 'info@truepropertycalculator.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    
    $wp_customize->add_control('contact_email', array(
        'label'   => __('Email Address', 'true-property-calculator'),
        'section' => 'contact_info',
        'type'    => 'email',
    ));
    
    // Office Address
    $wp_customize->add_setting('contact_address', array(
        'default'           => 'Dubai, United Arab Emirates',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('contact_address', array(
        'label'   => __('Office Address', 'true-property-calculator'),
        'section' => 'contact_info',
        'type'    => 'textarea',
    ));
}
add_action('customize_register', 'true_property_calculator_customize_register');

/**
 * Add Body Classes
 */
function true_property_calculator_body_classes($classes) {
    // Add class of hfeed to non-singular pages
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }
    
    // Add class for custom header
    if (has_custom_logo()) {
        $classes[] = 'has-custom-logo';
    }
    
    return $classes;
}
add_filter('body_class', 'true_property_calculator_body_classes');

/**
 * Add Pingback Header
 */
function true_property_calculator_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'true_property_calculator_pingback_header');

/**
 * Calculator Shortcode
 */
function true_property_calculator_shortcode($atts) {
    $atts = shortcode_atts(array(
        'title' => 'Property Cost Calculator',
        'style' => 'default',
    ), $atts, 'calculator');
    
    ob_start();
    ?>
    <div class="calculator-widget" data-style="<?php echo esc_attr($atts['style']); ?>">
        <div class="card">
            <div class="card-content text-center">
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 1rem;">
                    <?php echo esc_html($atts['title']); ?>
                </h3>
                <p style="margin-bottom: 2rem; color: var(--color-gray-600);">
                    Calculate comprehensive property costs across all UAE emirates
                </p>
                <a href="<?php echo esc_url(get_theme_mod('calculator_link', '#calculator')); ?>" class="btn btn-primary">
                    Launch Calculator
                </a>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('calculator', 'true_property_calculator_shortcode');

/**
 * Pricing Table Shortcode
 */
function true_property_calculator_pricing_shortcode($atts) {
    $atts = shortcode_atts(array(
        'columns' => '3',
    ), $atts, 'pricing');
    
    ob_start();
    ?>
    <div class="pricing-table">
        <div class="card-grid" style="max-width: 1000px; margin: 0 auto;">
            <div class="card">
                <div class="card-content text-center">
                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem;">Basic</h3>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">Free</div>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 2rem;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Basic cost calculations</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Single emirate support</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Standard reports</li>
                    </ul>
                    <a href="#" class="btn btn-secondary">Get Started</a>
                </div>
            </div>
            
            <div class="card" style="transform: scale(1.05); border: 2px solid var(--color-primary);">
                <div class="card-content text-center">
                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem;">Professional</h3>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">$49/mo</div>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 2rem;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Advanced calculations</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ All 7 emirates</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Premium reports</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ API access</li>
                    </ul>
                    <a href="#" class="btn btn-primary">Choose Professional</a>
                </div>
            </div>
            
            <div class="card">
                <div class="card-content text-center">
                    <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem;">Enterprise</h3>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">Custom</div>
                    <ul style="text-align: left; list-style: none; padding: 0; margin-bottom: 2rem;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ White-label solution</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Custom integrations</li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-gray-200);">✓ Dedicated support</li>
                        <li style="padding: 0.5rem 0;">✓ Training & onboarding</li>
                    </ul>
                    <a href="#" class="btn btn-secondary">Contact Sales</a>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('pricing', 'true_property_calculator_pricing_shortcode');

/**
 * Security Enhancements
 */
// Remove WordPress version number
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC
add_filter('xmlrpc_enabled', '__return_false');

// Remove unnecessary header links
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

// Disable file editing in WordPress admin
if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

/**
 * Performance Optimizations
 */
// Remove query strings from static resources
function true_property_calculator_remove_query_strings($src) {
    if (strpos($src, '?ver=')) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('style_loader_src', 'true_property_calculator_remove_query_strings', 10, 1);
add_filter('script_loader_src', 'true_property_calculator_remove_query_strings', 10, 1);

// Add async/defer to scripts
function true_property_calculator_async_scripts($tag, $handle) {
    $async_scripts = array('google-analytics', 'gtag');
    $defer_scripts = array('true-property-calculator-script');
    
    if (in_array($handle, $async_scripts)) {
        return str_replace('<script ', '<script async ', $tag);
    }
    
    if (in_array($handle, $defer_scripts)) {
        return str_replace('<script ', '<script defer ', $tag);
    }
    
    return $tag;
}
add_filter('script_loader_tag', 'true_property_calculator_async_scripts', 10, 2);

/**
 * Theme Activation Hook
 */
function true_property_calculator_activation() {
    // Flush rewrite rules
    flush_rewrite_rules();
    
    // Set default theme options
    if (!get_theme_mod('hero_title')) {
        set_theme_mod('hero_title', 'Uncover Hidden Property Costs in UAE Before You Buy');
    }
}
add_action('after_switch_theme', 'true_property_calculator_activation');

/**
 * Load Theme Text Domain
 */
function true_property_calculator_load_textdomain() {
    load_theme_textdomain('true-property-calculator', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'true_property_calculator_load_textdomain');

/**
 * Admin Notice for Theme Setup
 */
function true_property_calculator_admin_notice() {
    if (get_option('true_property_calculator_setup_complete')) {
        return;
    }
    
    ?>
    <div class="notice notice-info is-dismissible">
        <p>
            <strong><?php _e('Welcome to True Property Calculator Theme!', 'true-property-calculator'); ?></strong>
            <?php _e('To get started, please visit the', 'true-property-calculator'); ?>
            <a href="<?php echo admin_url('customize.php'); ?>"><?php _e('Customizer', 'true-property-calculator'); ?></a>
            <?php _e('to configure your site.', 'true-property-calculator'); ?>
        </p>
    </div>
    <?php
}
add_action('admin_notices', 'true_property_calculator_admin_notice');

// Dismiss admin notice
function true_property_calculator_dismiss_notice() {
    if (isset($_GET['true_property_calculator_dismiss'])) {
        update_option('true_property_calculator_setup_complete', true);
        wp_redirect(remove_query_arg('true_property_calculator_dismiss'));
        exit;
    }
}
add_action('admin_init', 'true_property_calculator_dismiss_notice');