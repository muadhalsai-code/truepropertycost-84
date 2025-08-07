import { ApolloProvider } from '@apollo/client';
import { wpClient } from '@/lib/wordpress';
import { useWordPressPosts, WordPressPost } from '@/hooks/useWordPress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { sanitizeHtml } from '@/utils/sanitization';

const BlogContent = () => {
  const { loading, error, data, fetchMore } = useWordPressPosts(6);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-destructive">Error loading blog posts: {error.message}</p>
        <p className="text-muted-foreground mt-2">
          Make sure your WordPress site is configured with WP GraphQL plugin
        </p>
      </div>
    );
  }

  const posts = data?.posts?.nodes || [];
  const hasNextPage = data?.posts?.pageInfo?.hasNextPage;
  const endCursor = data?.posts?.pageInfo?.endCursor;

  return (
    <div className="min-h-screen bg-gradient-section">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Property Insights Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights, market analysis, and tips for UAE property investment
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post: WordPressPost) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              {post.featuredImage?.node?.sourceUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.nodes.map((category) => (
                    <Badge key={category.slug} variant="secondary" className="text-xs">
                      {category.name}
                    </Badge>
                  ))}
                </div>
                
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author.node.name}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div 
                  className="text-muted-foreground mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt) }}
                />
                
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => fetchMore({
                variables: { after: endCursor }
              })}
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  return (
    <ApolloProvider client={wpClient}>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <BlogContent />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Blog;