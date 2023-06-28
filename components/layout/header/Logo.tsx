import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';
export function Logo({}) {
  return (
    <h2 className={styles.logo}>
      <Link href="/">Blog App</Link>
    </h2>
  );
}
