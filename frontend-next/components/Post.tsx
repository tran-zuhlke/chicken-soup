import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.css';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  createdAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';
  return (
    <div className={styles.postContainer} onClick={() => Router.push('/posts/[id]', `/posts/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
