'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import person from '@/public/person.jpg';
import styles from './Header.module.css';
import Link from 'next/link';
import Button from '@/components/common/Button';

const UserMenu = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleToggleDropDown = () => setShowDropDown((prev) => !prev);
  const handleHideDropDown = () => setShowDropDown(false);

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  return (
    <div className={styles.userMenu} ref={dropdownRef}>
      <Image
        onClick={handleToggleDropDown}
        src={person}
        alt="person"
        className={styles.person}
      />
      {showDropDown && (
        <div className={styles.dropdownMenu}>
          <Link
            onClick={handleHideDropDown}
            href="/create-post"
            className={styles.create}
          >
            Create
          </Link>
          <Button onClick={handleHideDropDown} className={styles.logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
