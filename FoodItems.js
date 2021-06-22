import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { getFoods } from "./redux/actions/foods";
import { useDispatch, useSelector } from "react-redux";

export default function FoodItems() {
  const dispatch = useDispatch();

  const foods = useSelector((state) => state.foods.foods);
  const loading = useSelector((state) => state.foods.loading);
  const error = useSelector((state) => state.foods.error);

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  const [filter, setFilter] = useState("Vegan");

  //   console.log("from API", foods);
  return (
    <View>
      <Button
        title="Vegan"
        onPress={() => setFilter("Vegan")}
        color="#841584"
      ></Button>
      <Button title="FatFree" onPress={() => setFilter("fatfree")}></Button>

      {foods.loading && <Text>Loading...</Text>}
      {foods.length === 0 && !loading && (
        <Text>No food recipies available!</Text>
      )}
      {error && !loading && <Text>{error}</Text>}
      {foods.length > 0 &&
        foods.map((food) =>
          food.type === filter ? <Text>{food.name}</Text> : <Text></Text>
        )}
    </View>
  );
}
