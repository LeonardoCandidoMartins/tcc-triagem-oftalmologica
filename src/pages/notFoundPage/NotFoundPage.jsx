import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import BackButton from '../../components/BackButton';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Ops! A página que você procura não foi encontrada.</p>
      <button className={styles.button} onClick={handleNavigate}>
        Voltar para o início
      </button>
    </div>
  );
};

export default NotFoundPage;
