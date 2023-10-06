import './HomePage.css';
import React, { useEffect, useState } from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { checkHealth } from '../../../api/health.api';
import { getDishes } from '../../../api/dishes.api';
import { Dish } from '../../../types/Dish';

const DashboardPage: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    checkHealth().then(({ content }) => console.log(`Server health: ${content}`));
    getDishes().then((dishes_) => {
      setDishes(dishes_);
      console.log(dishes_);
    });
  }, []);

  return (
    <PageContainer title={'Home Sweet Home'}>
      <div className="dashboard-page-container">
        {dishes.length > 0 && (
          <div className="dishes-container">
            <h4>Dishes</h4>
            {dishes.map((dish) => (
              <div key={dish.id}>
                <p>
                  {dish.title} - {dish.price / 1000}k
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};
export default DashboardPage;
