'use client';
import { useState } from 'react';
import { Logo } from './Logo';
import styles from './Header.module.css';
import Menu from './Menu';
import UserMenu from './UserMenu';
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.right}>
          {!loggedIn ? <UserMenu /> : <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Header;
