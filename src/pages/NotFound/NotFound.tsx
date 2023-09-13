import React from 'react';
import classes from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export const NotFound:React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <h1>Страница не найдена</h1>
      <p className={classes.smile}>😅</p>
      <p className={classes.notFound}>К сожалению данная страница отсутствует</p>
      <p className={classes.link}><Link to={"/"} className={classes.toHome}>Пeрейти на главную </Link></p>
    </div>
  );
};

