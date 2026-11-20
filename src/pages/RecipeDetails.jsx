import { useEffect,useState } from "react";
import {useParams}from "react-router-dom"
import { getRecipeById } from "../services/mealApi.js";

function Details(){

    const{id}=useParams()

    const[recipe,setRecipe]=useState(null)
    const[loading,setLoading]=useState(true)
   
    const [error,setError]=useState("")

    useEffect(()=>{
        async function loadRecipes(){
            try{
             setLoading(true)
             setError("")

             const data= await getRecipeById(id)

             if(!data){
                setError("Recipe not found");
                return
             }
             setRecipe(data)
            }catch(err){
              setError("Unable o load recipe details")
            }finally{
               setLoading(false)
            }


        }
        loadRecipes()
    },[id])
    if(loading) return<p>Loading Recipes</p>
    if(error)return <p>{error}</p>

    return(
        <main className="dashboard">
            <h1>{recipe.strMealThumb}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300"></img>
     <p>Category:{recipe.strCategory}</p>
     <p>Area:{recipe.strArea}</p>

     <h2>Recipe instructions</h2>
     <p>{recipe.strInstructions}</p>

        </main>
    )

}

export default Details