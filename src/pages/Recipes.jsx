import { useState,useEffect } from "react";
import { getRecipes,mealCategories,getRecipeByCategory } from "../services/mealApi";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { Link } from "react-router-dom";
function Recipes(){

    const [recipes,setRecipes]=useState([])
   const[categories,setCategories]=useState([])
   
   const[search,setSearch]=useState("")

   const[selectedCategory,setSelectedCategory]=useState("")

   const[loading,setLoading]=useState(true)

   const[error,setError]=useState("")
    
   const { favorites, addFavorite, removeFavorite } = useFavorites();
   useEffect(()=>{
    async function firstData(){
        try{
            const[recipeData,categoryData]=await Promise.all([
                getRecipes(),
                mealCategories(),
            ])
            setRecipes(recipeData)
            setCategories(categoryData)
        }catch(err){
           setError("Unable to load. Kindly try again shortly")
        }finally{ 
            setLoading(false)
        }
    }
    firstData()
   },[]);


async function handleSearch(event){
   event.preventDefault()

   try{
    setLoading(true)
    setError("")
    setSelectedCategory("")

        const data=await getRecipes(search)
        setRecipes(data)
    
   }catch(error){
    setError("Search failed. try again later")

   }finally{
    setLoading(false)
   }
}


async function handleCategory(event) {
    const category=event.target.value;
    setSelectedCategory(category)

    try{
        setLoading(true)
        setError("")

        const data=category
        ?await getRecipeByCategory(category)
        :await getRecipes()
        setRecipes(data)
    }catch(err){
         setError("Unable to load category")
    }finally{
      setLoading(false)
    }
}


return(
    
        <main className="dashboard">
            <h1>Explore Recipes</h1>
            <p>Discover delicious recipes here</p>

            <form onSubmit={handleSearch}>
                <input
                 type="text"
                 value={search}
                 onChange={(event)=>setSearch(event.target.value)}
                 placeholder="Search recipes.."

                ></input>
             <button type="submit">Search</button>
            </form>
          <select 
           className="category-select"
          value={selectedCategory}
          onChange={handleCategory}
          >
            <option value="">All categories</option>
          
          {categories.map((category)=>(
            <option 
            key={category.idCategory} 
            value={category.strCategory}
            >
                {category.strCategory}
            </option>
          ))}
          </select>
           {loading && <p>Loading recipes</p>}
           {error&&<p>{error}</p>}

           {!loading && !error&&(
            <div className="recipes-grid">
                {recipes.length===0?(
                    <p>No recipes</p>
                ):(
                recipes.map((recipe)=>{
                    const isFavourite=favorites.some(
                        (item)=>item.idMeal ===recipe.idMeal
                    )
                return(
                    
                    <div className="recipe-card" key={recipe.idMeal}>
                        <div className="recipe-image-wrapper">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal}></img>
                        <button 
                        type="button" 
                        className="favorite-btn"
                         onClick={()=>isFavourite
                            ?removeFavorite(recipe.idMeal)
                            :addFavorite(recipe)
                        }
                         aria-label={
                            isFavourite?"Remove from favourites":"Add favourites"
                         }
                         >
                         <Heart
                         size={20}
                         fill={isFavourite? "currentColor":"none"}
                         />
                            </button>

                    </div>
                    <h3>{recipe.strMeal}</h3>
                    <Link to={`/recipe/${recipe.idMeal}`}
                     className="view-recipe-link"
                     >
                        View Recipe
                     </Link>
                
                    </div>
                    
                )
                })
            )}
            </div>
           )}
           </main>
        
           
)
}
export default Recipes