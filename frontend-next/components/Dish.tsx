import React from 'react';
import styles from './Dish.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

export type DishProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  createdAt: string;
};

export interface SelectedDishProps extends DishProps {
  userDishId?: string;
}

const selectDish = async (session: Session, dishId: string, allowDelete: boolean) => {
  if (allowDelete) return;
  try {
    const body = { dishId, userEmail: session.user.email };
    await fetch('/api/userDish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await Router.push('/menu');
  } catch (error) {
    console.error(error);
  }
};

const unselectDish = async (userDishId: string) => {
  try {
    await fetch(`/api/userDish/delete/${userDishId}`, {
      method: 'DELETE',
    });
    await Router.push('/menu');
  } catch (error) {
    console.error(error);
  }
};

const Dish: React.FC<{ dish: SelectedDishProps; allowDelete?: boolean }> = ({ dish, allowDelete = false }) => {
  const { data: session } = useSession();
  return (
    <div className={styles.dishContainer_}>
      <div
        className={`${styles.dishContainer} ${allowDelete ? styles.selectedDish : ''}`}
        onClick={() => selectDish(session, dish.id, allowDelete)}
      >
        <div className={styles.dishInfo}>
          <h2>{dish.title}</h2>
          <p>{dish.price}</p>
        </div>
        {dish.imageUrl && (
          <div className={styles.dishImage}>
            <img style={{ backgroundImage: `url(${dish.imageUrl})` }} />
          </div>
        )}
      </div>
      {allowDelete && (
        <AiFillCloseCircle className={styles.removeIcon} size={20} onClick={() => unselectDish(dish.userDishId)} />
      )}
    </div>
  );
};

export default Dish;
