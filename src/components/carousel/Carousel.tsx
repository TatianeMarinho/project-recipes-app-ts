import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import { DrinksType, MealsType } from '../../types/types';

type CarouselType = {
  drinksRecomendaded: DrinksType[],
  mealsRecomendaded: MealsType[],
};

export default function CarouselCard(props: CarouselType) {
  const { drinksRecomendaded, mealsRecomendaded } = props;

  if (drinksRecomendaded) {
    return (
      <div>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel>
          <Carousel.Item interval={ 1500 }>
            <div>
              {drinksRecomendaded.map((meal) => (
                <img
                  key={ meal.idDrink }
                  src={ meal.strDrinkThumb }
                  alt={ meal.strDrink }
                />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
  if (mealsRecomendaded) {
    return (
      <div>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel>
          <Carousel.Item interval={ 1500 }>
            <div>
              {mealsRecomendaded.map((meal) => (
                <img
                  key={ meal.idMeal }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
