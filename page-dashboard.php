<?php
/**
 * Template Name: Dashboard Page
 * Description: Dashboard page template with calculator and analytics
 */

// Check if user is logged in
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header(); ?>

<div class="min-h-screen bg-background">
    <div class="pt-16">
        <div class="flex min-h-[calc(100vh-4rem)] w-full">
            <!-- Dashboard Sidebar -->
            <aside class="w-64 border-r bg-card p-4 hidden lg:block">
                <div class="mb-6">
                    <h2 class="text-lg font-semibold text-foreground mb-4"><?php _e('Dashboard', 'uae-property'); ?></h2>
                </div>
                
                <nav class="space-y-2">
                    <a href="#calculator" 
                       class="dashboard-nav-item active flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors bg-primary text-primary-foreground">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <?php _e('Cost Calculator', 'uae-property'); ?>
                    </a>
                    
                    <a href="#analytics" 
                       class="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 00-2-2"/>
                        </svg>
                        <?php _e('Property Analytics', 'uae-property'); ?>
                        <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-auto">PRO</span>
                    </a>
                    
                    <a href="#portfolio" 
                       class="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground opacity-50 cursor-not-allowed">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <?php _e('Portfolio Manager', 'uae-property'); ?>
                        <span class="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-auto">PRO</span>
                    </a>
                </nav>
            </aside>

            <!-- Mobile Sidebar Toggle -->
            <button id="mobile-sidebar-toggle" class="lg:hidden fixed top-20 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-md">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>

            <!-- Main Content -->
            <main class="flex-1 overflow-auto p-6">
                <!-- Usage Indicator for Free Users -->
                <?php if (!current_user_can('premium_member')): ?>
                <div class="mb-6 p-4 border rounded-lg bg-card">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium"><?php _e('Daily Usage', 'uae-property'); ?></span>
                            <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"><?php _e('Free Plan', 'uae-property'); ?></span>
                        </div>
                        <span class="text-sm text-muted-foreground" id="usage-counter">
                            <?php echo get_user_meta(get_current_user_id(), 'daily_calculations', true) ?: 0; ?>/2 <?php _e('calculations', 'uae-property'); ?>
                        </span>
                    </div>
                    <div class="w-full bg-secondary rounded-full h-2">
                        <div class="bg-primary h-2 rounded-full" style="width: <?php echo min(100, (get_user_meta(get_current_user_id(), 'daily_calculations', true) ?: 0) * 50); ?>%"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs text-muted-foreground mt-2">
                        <span id="usage-status">
                            <?php 
                            $usage = get_user_meta(get_current_user_id(), 'daily_calculations', true) ?: 0;
                            echo $usage >= 2 ? __('Daily limit reached', 'uae-property') : sprintf(__('%d calculations remaining', 'uae-property'), 2 - $usage);
                            ?>
                        </span>
                        <span><?php _e('Resets daily at midnight', 'uae-property'); ?></span>
                    </div>
                </div>
                <?php endif; ?>

                <!-- Calculator Section -->
                <section id="calculator" class="dashboard-section active">
                    <div class="text-center mb-8">
                        <h1 class="text-4xl font-bold text-foreground mb-2"><?php _e('Property Cost Calculator', 'uae-property'); ?></h1>
                        <p class="text-xl text-muted-foreground mb-2"><?php _e('Calculate your total property investment costs in the UAE', 'uae-property'); ?></p>
                        <p class="text-muted-foreground"><?php _e('Get accurate estimates for all fees, taxes, and associated costs', 'uae-property'); ?></p>
                    </div>
                    
                    <?php echo do_shortcode('[property_calculator]'); ?>
                </section>

                <!-- Analytics Section -->
                <section id="analytics" class="dashboard-section hidden">
                    <?php if (current_user_can('premium_member')): ?>
                        <div class="text-center mb-8">
                            <h1 class="text-4xl font-bold text-foreground mb-2"><?php _e('Property Analytics', 'uae-property'); ?></h1>
                            <p class="text-xl text-muted-foreground mb-2"><?php _e('Advanced market analysis and insights', 'uae-property'); ?></p>
                            <p class="text-muted-foreground"><?php _e('Real-time data, trends, and investment opportunities', 'uae-property'); ?></p>
                        </div>

                        <!-- Analytics Dashboard -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <!-- Market Overview -->
                            <div class="p-6 border rounded-lg bg-card">
                                <h3 class="text-lg font-semibold mb-4"><?php _e('Market Overview', 'uae-property'); ?></h3>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Avg. Price/sqft (Dubai)', 'uae-property'); ?></span>
                                        <span class="font-semibold">AED 1,245</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Market Growth (YoY)', 'uae-property'); ?></span>
                                        <span class="font-semibold text-green-600">+12.3%</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Rental Yield', 'uae-property'); ?></span>
                                        <span class="font-semibold">6.8%</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Risk Assessment -->
                            <div class="p-6 border rounded-lg bg-card">
                                <h3 class="text-lg font-semibold mb-4"><?php _e('Risk Assessment', 'uae-property'); ?></h3>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Market Risk', 'uae-property'); ?></span>
                                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm"><?php _e('Medium', 'uae-property'); ?></span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Liquidity Risk', 'uae-property'); ?></span>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"><?php _e('Low', 'uae-property'); ?></span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-muted-foreground"><?php _e('Regulatory Risk', 'uae-property'); ?></span>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"><?php _e('Low', 'uae-property'); ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Interactive Map Placeholder -->
                        <div class="p-8 border rounded-lg bg-card text-center">
                            <h3 class="text-lg font-semibold mb-4"><?php _e('UAE Property Heat Map', 'uae-property'); ?></h3>
                            <div class="bg-secondary rounded-lg p-8">
                                <svg class="mx-auto h-32 w-32 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                                <p class="text-muted-foreground mt-4"><?php _e('Interactive map coming soon', 'uae-property'); ?></p>
                            </div>
                        </div>
                    <?php else: ?>
                        <div class="text-center p-8 border rounded-lg bg-card">
                            <svg class="mx-auto h-16 w-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            <h3 class="text-xl font-semibold mb-2"><?php _e('Premium Feature', 'uae-property'); ?></h3>
                            <p class="text-muted-foreground mb-4"><?php _e('Unlock advanced analytics and market insights with our premium plan.', 'uae-property'); ?></p>
                            <a href="<?php echo esc_url(get_permalink(get_page_by_path('pricing'))); ?>" 
                               class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                <?php _e('Upgrade to Premium', 'uae-property'); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                </section>

                <!-- Portfolio Section -->
                <section id="portfolio" class="dashboard-section hidden">
                    <div class="text-center p-8 border rounded-lg bg-card">
                        <svg class="mx-auto h-16 w-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <h3 class="text-xl font-semibold mb-2"><?php _e('Portfolio Manager', 'uae-property'); ?></h3>
                        <p class="text-muted-foreground mb-4"><?php _e('Track and manage your property investments portfolio.', 'uae-property'); ?></p>
                        <p class="text-sm text-muted-foreground"><?php _e('Coming soon in our next update!', 'uae-property'); ?></p>
                    </div>
                </section>
            </main>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Dashboard navigation
    const navItems = document.querySelectorAll('.dashboard-nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active', 'bg-primary', 'text-primary-foreground'));
            sections.forEach(section => section.classList.add('hidden'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active', 'bg-primary', 'text-primary-foreground');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }
        });
    });

    // Mobile sidebar toggle
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('aside');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('lg:block');
        });
    }
});
</script>

<?php get_footer(); ?>