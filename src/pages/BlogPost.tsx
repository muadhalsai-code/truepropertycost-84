import { ApolloProvider } from '@apollo/client';
import { wpClient } from '@/lib/wordpress';
import { useWordPressPost } from '@/hooks/useWordPress';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { sanitizeHtml } from '@/utils/sanitization';

const BlogPostContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, data } = useWordPressPost(slug || '');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-muted rounded mb-8"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.postBy) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or couldn't be loaded.
        </p>
        <Link to="/blog">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const post = data.postBy;

  return (
    <div className="min-h-screen bg-gradient-section">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog" className="inline-block mb-8">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article className="bg-card rounded-lg shadow-card p-8">
          <header className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.nodes.map((category: any) => (
                <Badge key={category.slug} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                {post.author.node.avatar?.url && (
                  <img
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author.node.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
                     prose-headings:text-foreground 
                     prose-p:text-foreground 
                     prose-a:text-primary hover:prose-a:text-primary/80
                     prose-strong:text-foreground
                     prose-ul:text-foreground
                     prose-ol:text-foreground
                     prose-li:text-foreground
                     prose-blockquote:text-muted-foreground
                     prose-blockquote:border-l-primary"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />
        </article>

        {/* Back to Blog CTA */}
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              More Property Insights
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogPost = () => {
  return (
    <ApolloProvider client={wpClient}>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <BlogPostContent />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default BlogPost;