import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import useHttp from "../../hooks/use-http";

const mealsUrl =
  "https://react-foodorderapp-70dd2-default-rtdb.firebaseio.com/meals.json";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest: getAvailableMeals } = useHttp();
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    const requestConfig = {
      url: mealsUrl,
    };
    let loadedMeals = [];
    const transformMeals = (meals) => {
      console.log(meals);
      console.log(error);
      for (const mealKey in meals) {
        loadedMeals.push({
          id: mealKey,
          name: meals[mealKey].name,
          description: meals[mealKey].description,
          price: meals[mealKey].price,
        });
      }
      setAvailableMeals(loadedMeals);
    };

    if (!error && !isLoading && !isRequestSent) {
      setIsRequestSent(true);
      getAvailableMeals(requestConfig, transformMeals);
    }
  }, [getAvailableMeals, error, isLoading, isRequestSent]);

  return (
    <section className={classes.meals}>
      <Card>
        {error && <p style={{"textAlign" : "center", "color": "red"}}>{error}</p>}
        {isLoading && <p style={{"textAlign" : "center"}}>Loading...</p>}
        {!error && !isLoading && availableMeals.length === 0 && <p style={{"textAlign" : "center"}}>No Available Meals Found!</p>}
        {!error && !isLoading && availableMeals.length !== 0 && (
          <ul>
            {availableMeals.map((meal) => (
              <MealItem
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                id={meal.id}
              ></MealItem>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
