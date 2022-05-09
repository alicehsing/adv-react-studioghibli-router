import React from 'react';
import headerImage from '../assets/studio-ghibli.png';
import styles from '../App.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Welcome to The Studio Ghibli Collection </h1>
      <div className={styles.header_img}>
        <img src={headerImage} alt="header-image" />
      </div>
    </header>
  );
}
