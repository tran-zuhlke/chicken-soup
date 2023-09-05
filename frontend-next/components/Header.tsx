import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className={styles.left}>
      <Link href="/">
        <a className={styles.menuItem} data-active={isActive('/')}>
          Public Feed
        </a>
      </Link>
      <Link href="/menu">
        <a className={styles.menuItem} data-active={isActive('/menu')}>
          Menu
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.menuItem} data-active={isActive('/')}>
            Public Feed
          </a>
        </Link>
        <Link href="/menu">
          <a className={styles.menuItem} data-active={isActive('/menu')}>
            Menu
          </a>
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className={styles.right}>
        <Link href="/api/auth/signin">
          <a className={styles.menuItem} data-active={isActive('/signup')}>
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.menuItem} data-active={isActive('/')}>
            Public Feed
          </a>
        </Link>
        <Link href="/posts/drafts">
          <a className={styles.menuItem} data-active={isActive('/posts/drafts')}>
            My Drafts
          </a>
        </Link>
        <Link href="/menu">
          <a className={styles.menuItem} data-active={isActive('/menu')}>
            Menu
          </a>
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p className={styles.userInfo}>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/posts/create">
          <button className={styles.menuButton}>
            <a className={styles.menuItem}>New post</a>
          </button>
        </Link>
        <button className={styles.menuButton} onClick={() => signOut()}>
          <a className={styles.menuItem}>Log out</a>
        </button>
      </div>
    );
  }

  return (
    <nav className={styles.menuContainer}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
