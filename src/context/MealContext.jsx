import {createContext,useContext,useState,useEffect } from "react";

{/*Creates shared meal context*/}
const Context= createContext();

const API_URL="http://localhost:3002/mealPlans"

export function MealsProvider({childer  }){
    const [meals,setMeals]=useState([]);
}

