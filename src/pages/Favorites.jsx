import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext.jsx";


function Favorite() {
  const { favorites, removeFavorite } = useFavorites();

  return(
    <main className="dashboard">
      <h1>My Favourites Recipes</h1>
      <p>All the recipes you have saved</p>

      {favorites.length === 0 ? (
        <p>There are no saved recipes yet</p>
      ) : (
        <div className="rec-grid">
          {favorites.map((recipe) => (
            <div className="recipe-card" key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <Link to={`/recipe/${recipe.idMeal}`}>View Recipe</Link>

              <button
                type="button"
                onClick={() => removeFavorite(recipe.idMeal)}
              >
                <Heart size={18} fill="currentColor">
                  Remove
                </Heart>
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorite;

