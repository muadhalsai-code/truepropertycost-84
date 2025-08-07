<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XDV1KPY7ZY"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-XDV1KPY7ZY');
    </script>
    
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1096476545164397');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1096476545164397&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <nav class="site-navigation">
            <div class="container">
                <div class="site-logo">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                            <span class="site-title"><?php bloginfo('name'); ?></span>
                        </a>
                    <?php endif; ?>
                </div>

                <button class="mobile-menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="sr-only"><?php _e('Primary Menu', 'true-property-calculator'); ?></span>
                    ☰
                </button>

                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'container'      => false,
                    'menu_class'     => 'main-menu',
                    'fallback_cb'    => false,
                ));
                ?>

                <div class="header-actions">
                    <a href="<?php echo get_theme_mod('calculator_link', '#calculator'); ?>" class="btn btn-sm btn-secondary">
                        <?php _e('Sign In', 'true-property-calculator'); ?>
                    </a>
                    <a href="<?php echo get_theme_mod('calculator_link', '#calculator'); ?>" class="btn btn-sm btn-primary">
                        <?php _e('Get Started', 'true-property-calculator'); ?>
                    </a>
                </div>
            </div>
        </nav>
    </header>

    <div id="content" class="site-content">
        <div style="padding-top: 80px;"><!-- Header offset -->