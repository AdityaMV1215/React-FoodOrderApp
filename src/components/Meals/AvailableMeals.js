import React from "react";
import classes from "./AvailableMeals.module.css";
import DUMMY_MEALS from "./dummy-meals";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
