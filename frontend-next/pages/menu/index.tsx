import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import moment from 'moment';
import Dish, { DishProps, SelectedDishProps } from '../../components/Dish';
import styles from './index.module.css';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]';

function extractSeletedDishes(dishes, userDishes, userEmail) {
  return dishes.filter((dish) => {
    const selectedUserDish = userDishes.find((userDish) => userDish.dishId === dish.id);
    if (selectedUserDish) {
      dish.userDishId = selectedUserDish.id;
      return true;
    }
    return false;
  });
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, options);
  const userDishes = await prisma.userDish.findMany({
    where: {
      createdAt: {
        gte: moment(new Date()).startOf('day').toDate(),
      },
      user: {
        email: session.user.email,
      },
    },
    include: {
      user: true,
    },
  });
  const dishes = await prisma.dish.findMany({
    where: {
      active: true,
    },
  });
  const selectedDishes = extractSeletedDishes(dishes, userDishes, session.user.email);

  return {
    props: { dishes: JSON.parse(JSON.stringify(dishes)), selectedDishes: JSON.parse(JSON.stringify(selectedDishes)) },
  };
};

type Props = {
  dishes: DishProps[];
  selectedDishes: SelectedDishProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Menu</h1>
        <main className={styles.dishesContainer}>
          {props.dishes
            .sort((left, right) => (left.createdAt < right.createdAt ? -1 : 1))
            .map((dish) => (
              <Dish key={dish.id} dish={dish} />
            ))}
        </main>
      </div>

      <div>
        <h1>Selected Dishes</h1>
        <main className={styles.dishesContainer}>
          {props.selectedDishes
            .sort((left, right) => (left.createdAt < right.createdAt ? -1 : 1))
            .map((dish) => (
              <Dish key={dish.id} dish={dish} allowDelete={true} />
            ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
