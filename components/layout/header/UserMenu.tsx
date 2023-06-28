'use client';
import Image from 'next/image';
import {useState} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import person from '@/public/person.jpg';
import styles from './Header.module.css';
import Link from 'next/link';

const UserMenu = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
  
    const handleShowDropDown = () => setShowDropDown((prev) => true);
    const handleHideDropDown = () => setShowDropDown((prev) => false);
  return (
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
          <button onClick={handleHideDropDown} className={styles.logout}>
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
  );
};

export default UserMenu;
