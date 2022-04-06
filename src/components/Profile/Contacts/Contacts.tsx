import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faVk,
  faTwitter,
  faInstagram,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { IUserProfile } from '../Profile';
import styles from './Contacts.module.css';

const Contacts: FC<{ contacts: IUserProfile['contacts'] }> = ({ contacts }) => {
  const {
    facebook,
    website,
    vk,
    twitter,
    instagram,
    youtube,
    github,
    mainLink,
  } = contacts;
  return (
    <div className={styles.contacts__inner}>
      <ul className={styles.contacts__list}>
        {facebook ? (
          <li className={styles.contacts__item}>
            <a
              href={facebook}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                size="2x"
                className={`${styles.fa} ${styles['fa-fb']}`}
              />
            </a>
          </li>
        ) : null}
        {website ? (
          <li className={styles.contacts__item}>
            <a
              href={website}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faGlobe}
                size="2x"
                className={`${styles.fa} ${styles['fa-website']}`}
              />
            </a>
          </li>
        ) : null}
        {vk ? (
          <li className={styles.contacts__item}>
            <a
              href={vk}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faVk}
                size="2x"
                className={`${styles.fa} ${styles['fa-vk']}`}
              />
            </a>
          </li>
        ) : null}
        {twitter ? (
          <li className={styles.contacts__item}>
            {' '}
            <a
              href={twitter}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className={`${styles.fa} ${styles['fa-twitter']}`}
              />
            </a>
          </li>
        ) : null}
        {instagram ? (
          <li className={styles.contacts__item}>
            <a
              href={instagram}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className={`${styles.fa} ${styles['fa-ig']}`}
              />
            </a>
          </li>
        ) : null}
        {youtube ? (
          <li className={styles.contacts__item}>
            <a
              href={youtube}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faYoutube}
                size="2x"
                className={`${styles.fa} ${styles['fa-youtube']}`}
              />
            </a>
          </li>
        ) : null}
        {github ? (
          <li className={styles.contacts__item}>
            <a
              href={github}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faGithub}
                size="2x"
                className={`${styles.fa} ${styles['fa-github']}`}
              />
            </a>
          </li>
        ) : null}
        {mainLink ? (
          <li className={styles.contacts__item}>
            <a
              href={mainLink}
              className={`${styles.contacts__link} ${styles['fb-link']}`}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                size="2x"
                className={`${styles.fa} ${styles['fa-main']}`}
              />
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Contacts;
