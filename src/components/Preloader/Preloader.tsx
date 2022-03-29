import React, { FC } from 'react';
import preloader from '../../images/loader.gif';
import style from './Preloader.module.css';

const Preloader: FC<{}> = () => (
  <div className={style.preloader__wrapper}>
    <img src={preloader} className={style.img} alt="" />
  </div>
);

export default Preloader;
