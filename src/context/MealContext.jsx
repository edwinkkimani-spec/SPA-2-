import {createContext,useContext,useState,useEffect } from "react";

{/*Creates shared meal context*/}
const Context= createContext();

const API_URL="http://localhost:3002/mealPlans"

export function MealProvider({children  }){
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
       
    async function mealsAdded(meal){
        try{
          const response=await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
         
	     body: JSON.stringify(meal),
          })
          if(!response.ok){
            throw new Error("fail to save meal")
          }
          const MealsSaved=await response.json();
             setMeals((previousMeals)=>[...previousMeals,MealsSaved])

        }catch(error){
           console.error("An error occured",error)
        }
    }
      async function removedMeals(id){
        try{
           const response=await fetch(`${API_URL}/${id}`,{
            method:"DELETE",
           })
           if(!response.ok){
            throw new Error("Failed to delete meal")
           }
           setMeals((previousMeals)=>
              previousMeals.filter((meal)=>meal.id !==id)

         )

        }catch(error){
      console.error("Failed to delete meal",error)
        }
      }
      async function updatedMeal(id,updatedData){
        try{
              const response=await fetch(`${API_URL}/${id}`,{
                  method:"PATCH",
                  headers:{
                    "Content-Type":"application/json",
                  },
                  body:JSON.stringify(updatedData),
              }
        )
    if(!response.ok){
        throw new Error("Failed to update meal")
    }
    const updateMeal=await response.json();
               
        }catch(error){
        console.error("Kindly try again later",error)
        }
      }
      return(
        <Context.Provider value={{meals,mealsAdded,removedMeals}}>
            {children}
        </Context.Provider>
      )
}

export function useMeals(){
    return useContext(Context)
}