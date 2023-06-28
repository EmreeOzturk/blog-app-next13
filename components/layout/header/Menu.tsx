import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Button from '@/components/common/Button';
const Menu = () => {
  const handleLogin = () => {
    console.log('login');
  };

  return (
    <div className={styles.menu}>
      <Button onClick={handleLogin} className={styles.loginButton}>
        Login
      </Button>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Menu;
