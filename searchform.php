
<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label for="search-field" class="sr-only">
        <?php echo esc_html_x('Search for:', 'label', 'true-property-calculator'); ?>
    </label>
    <div style="display: flex; gap: 0.5rem;">
        <input type="search" 
               id="search-field"
               class="search-field" 
               placeholder="<?php echo esc_attr_x('Search &hellip;', 'placeholder', 'true-property-calculator'); ?>" 
               value="<?php echo get_search_query(); ?>" 
               name="s" 
               style="flex: 1;" />
        <button type="submit" class="btn btn-primary">
            <?php echo esc_html_x('Search', 'submit button', 'true-property-calculator'); ?>
        </button>
    </div>
</form>
