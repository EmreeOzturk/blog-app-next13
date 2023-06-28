import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
const Menu = () => {
  return (
    <div>
      <button>Log in</button>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Menu;
