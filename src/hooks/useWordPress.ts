import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { wpClient, GET_POSTS, GET_POST_BY_SLUG, GET_PAGES } from '@/lib/wordpress';

// Custom hooks for WordPress data fetching
export const useWordPressPosts = (first: number = 10, after?: string) => {
  return useQuery(gql(GET_POSTS), {
    client: wpClient,
    variables: { first, after },
    errorPolicy: 'all',
  });
};

export const useWordPressPost = (slug: string) => {
  return useQuery(gql(GET_POST_BY_SLUG), {
    client: wpClient,
    variables: { slug },
    errorPolicy: 'all',
    skip: !slug,
  });
};

export const useWordPressPages = () => {
  return useQuery(gql(GET_PAGES), {
    client: wpClient,
    errorPolicy: 'all',
  });
};

// WordPress post types
export interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
}