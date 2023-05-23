'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropDown = () => setShowDropDown(!showDropDown);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.left}>
          <Link href="/">Blog App</Link>
        </h2>
        <ul className={styles.right}>
          {loggedIn ? (
            <div>
              <Image
                onClick={handleShowDropDown}
                src="/user.png"
                width={30}
                height={30}
                alt="user"
              />
            </div>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
