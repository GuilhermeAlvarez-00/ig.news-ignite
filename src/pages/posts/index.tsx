import { predicate } from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

import styles from './styles.module.scss';
import Link from 'next/link';

interface PostsProps {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
  }[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts?.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getAllByType('post', {
    predicates: [predicate.at('document.type', 'post')],
  });

  const posts = response.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find(
        (content: { type: string }) => content.type === 'paragraph'
      )?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        dateStyle: 'long',
      }
    ),
  }));

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60, // 1 hour
  };
};
