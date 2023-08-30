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
          {drinksRecomendaded.map((drink, index) => (
            <Carousel.Item interval={ 1500 } key={ drink.idDrink }>
              <div data-testid={ `${index}-recommendation-card` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-recommendation-title` }
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
  if (mealsRecomendaded) {
    return (
      <div>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel>
          {mealsRecomendaded.map((meal, index) => (
            <Carousel.Item interval={ 1500 } key={ meal.idMeal }>
              <div data-testid={ `${index}-recommendation-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-recommendation-title` }
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}
