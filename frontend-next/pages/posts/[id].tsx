import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import styles from './[id].module.css';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify(post)),
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/post/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function unpublishPost(id: string): Promise<void> {
  await fetch(`/api/post/unpublish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/delete/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button className={styles.postButton} onClick={() => publishPost(props.id)}>
            Publish
          </button>
        )}
        {props.published && userHasValidSession && postBelongsToUser && (
          <button className={styles.postButton} onClick={() => unpublishPost(props.id)}>
            Unpublish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button className={styles.postButton} onClick={() => deletePost(props.id)}>
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
