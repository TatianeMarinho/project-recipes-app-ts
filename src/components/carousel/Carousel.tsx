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
  console.log(drinksRecomendaded);
  console.log(mealsRecomendaded);

  return (
    <div>
      <h4>Recommended recipes</h4>
      <Carousel data-bs-theme="dark">
        {(mealsRecomendaded) && (
          mealsRecomendaded.map((meal, index) => (
            <Carousel.Item
              interval={ 1500 }
              key={ meal.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <Carousel.Caption>
                <h3 data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
        {(drinksRecomendaded) && (
          drinksRecomendaded.map((drink, index) => (
            <Carousel.Item
              interval={ 1500 }
              key={ drink.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <Carousel.Caption>
                <h3 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h3>
                <p>{drink.strAlcoholic}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    </div>
  );
}
