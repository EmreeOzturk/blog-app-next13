'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import person from '@/public/person.jpg';
import { AiOutlineClose } from 'react-icons/ai';
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropDown = () => setShowDropDown((prev) => true);
  const handleHideDropDown = () => setShowDropDown((prev) => false);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.left}>
          <Link href="/">Blog App</Link>
        </h2>
        <ul className={styles.right}>
          {!loggedIn ? (
            <div>
              <Image
                onClick={handleShowDropDown}
                src={person}
                width={60}
                height={60}
                alt="person"
              />
              {showDropDown && (
                <div className={styles.dropdown}>
                  <AiOutlineClose
                    onClick={handleHideDropDown}
                    className={styles.closeIcon}
                  />
                  <button
                    onClick={handleHideDropDown}
                    className={styles.logout}
                  >
                    Logout
                  </button>
                  <Link
                    onClick={handleHideDropDown}
                    href="/create-post"
                    className={styles.create}
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className={styles.login}>Log in</button>
              <Link href="/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
