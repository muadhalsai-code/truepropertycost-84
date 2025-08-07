# WordPress Headless CMS Setup Guide

## Backend Setup (WordPress)

### 1. WordPress Installation
Install WordPress on your hosting provider or use a managed solution like WP Engine, Kinsta, or WordPress.com.

### 2. Required Plugins Installation
Use WP-CLI or WordPress admin panel to install these plugins:

```bash
# Via WP-CLI
wp plugin install wp-graphql --activate
wp plugin install wp-graphql-acf --activate
wp plugin install jwt-authentication-for-wp-rest-api --activate

# Optional but recommended
wp plugin install wp-graphql-cors --activate
wp plugin install wp-graphql-meta --activate
```

### 3. WordPress Configuration

Add to your `wp-config.php`:

```php
// JWT Authentication
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-super-secret-jwt-key-here');

// CORS Headers (if needed)
define('GRAPHQL_CORS_ENABLE', true);

// Enable GraphQL Debug Mode (development only)
define('GRAPHQL_DEBUG', true);
```

### 4. GraphQL Endpoint
Your GraphQL endpoint will be:
```
https://yourdomain.com/graphql
```

### 5. Content Setup
1. Create blog posts in WordPress admin
2. Set featured images for better frontend display
3. Create categories and tags
4. Consider using Advanced Custom Fields (ACF) for custom fields

## Frontend Integration (Already Done)

### Files Created:
- `src/lib/wordpress.ts` - Apollo Client configuration
- `src/hooks/useWordPress.ts` - Custom hooks for data fetching
- `src/pages/Blog.tsx` - Blog listing page
- `src/pages/BlogPost.tsx` - Individual blog post page

### Routes Added:
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog posts

## Configuration Steps

### 1. Update WordPress URL
Edit `src/lib/wordpress.ts` and replace:
```typescript
uri: 'https://your-wordpress-site.com/graphql'
```

### 2. Authentication (Optional)
For protected content, users can get JWT tokens from:
```
POST https://yourdomain.com/wp-json/jwt-auth/v1/token
{
  "username": "your-username",
  "password": "your-password"
}
```

## Security Best Practices

### WordPress Security:
1. **Use HTTPS** - Essential for API calls
2. **Limit GraphQL** - Use plugins like WPGraphQL Query Complexity Analyzer
3. **CORS Configuration** - Restrict to your domain only
4. **JWT Secret** - Use a strong, unique secret key
5. **User Permissions** - Limit GraphQL access to necessary roles

### Frontend Security:
1. **API Endpoint** - Use environment variables for WordPress URL
2. **Error Handling** - Don't expose sensitive error messages
3. **Content Sanitization** - WordPress handles this, but validate on frontend too

## Deployment Checklist

### WordPress (Backend):
- [ ] WordPress installed and configured
- [ ] Required plugins activated
- [ ] JWT secret key set
- [ ] GraphQL endpoint accessible
- [ ] CORS configured for your domain
- [ ] SSL certificate installed
- [ ] Content created and published

### React Frontend (Already Deployed):
- [ ] WordPress URL configured in `src/lib/wordpress.ts`
- [ ] Apollo Client integrated
- [ ] Blog routes accessible
- [ ] Error handling working
- [ ] Responsive design tested

## Testing Your Setup

1. **Test GraphQL Endpoint:**
   Visit `https://yourdomain.com/graphql` in browser - should show GraphQL IDE

2. **Test Query:**
   ```graphql
   query {
     posts {
       nodes {
         title
         content
       }
     }
   }
   ```

3. **Test Frontend:**
   - Visit `/blog` to see post listing
   - Click on a post to view individual post
   - Verify images and styling work correctly

## Content Management

### For Content Creators:
1. **Log into WordPress admin** at `https://yourdomain.com/wp-admin`
2. **Create posts** with featured images for better display
3. **Use categories** to organize content
4. **Preview on frontend** at your React app's `/blog` page
5. **SEO optimization** using plugins like Yoast SEO

### Content Types Supported:
- Blog Posts (with categories, tags, featured images)
- Pages (for static content)
- Custom Post Types (with additional GraphQL configuration)
- Media (images, files via WordPress media library)

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Install `wp-graphql-cors` plugin
   - Configure allowed origins in WordPress admin

2. **GraphQL Not Loading:**
   - Check if WP GraphQL plugin is activated
   - Verify permalinks are set to "Post name" in WordPress

3. **Images Not Showing:**
   - Check WordPress media URLs
   - Verify HTTPS configuration
   - Test image URLs directly in browser

4. **Authentication Issues:**
   - Verify JWT secret key in wp-config.php
   - Check user permissions for GraphQL access

## Next Steps

1. **Update WordPress URL** in `src/lib/wordpress.ts`
2. **Create some blog posts** in WordPress admin
3. **Test the integration** by visiting `/blog` in your React app
4. **Customize the blog styling** to match your brand
5. **Add SEO meta tags** for better search engine optimization

Your React app now supports WordPress as a headless CMS while maintaining all existing Supabase functionality for authentication and other features.