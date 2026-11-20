import {createContext,useContext,useState,useEffect } from "react";

{/*Creates shared meal context*/}
const Context= createContext();

const API_URL="http://localhost:3002/mealPlans"

export function MealsProvider({childer  }){
    const [meals,setMeals]=useState([]);

    useEffect(()=>{
         async function fetchMeal(){
            try{
              const response=await fetch(API_URL)

              if(!response.ok){
                throw new Error("Failed to load meals")

              }
              const data=await response.json()
              setMeals(data)
            }catch(error){
              console.error("Error occured meals",error)
            }
         }
         fetchMeal();
    },[])
       
    async function mealAdd(meal){
        try{
          const response=await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringyfy(meal),
          })
          if(!response.ok){
            throw new Error("fail to save meal")
          }
          const MealsSaved=await response.json();

        }catch(error){

        }
    }
}

