import { useState,useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext.jsx";



import {
  CalendarDays,
  Utensils,
  Flame,
  ShoppingBasket,
  ArrowRight,
  Plus,
} from "lucide-react";


import { Link } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";


import MealCard from "../components/MealCard";


import { useUser } from "../context/UserContext.jsx";

function Dashboard() {

    const { user } = useUser();
    const now=new Date()

    const today=now.toLocaleDateString("en-ke",{
        weekday:"long",
        day:"numeric",
        month:"long"
    })
    
    const hour=now.getHours()

    const greeting=
    hour<12
    ?"Good morning"
    :hour<17
    ?"Good afternoon"
    :"Good evening"
    const {favorites}=useFavorites()

    const [recipes] = useState([
    {
     
    },
    {
      id: 2,
      name: "Chicken Salad",
      category: "Lunch",
      time: "25 min",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    },
    {
      id: 3,
      name: "Pasta Primavera",
      category: "Dinner",
      time: "30 min",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    },
  ]);


  const [meals] = useState([
    {
      id: 1,
      name: "Avocado Toast",
      type: "Breakfast",
      time: "8:00 AM",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200",
    },
    {
      id: 2,
      name: "Grilled Chicken Salad",
      type: "Lunch",
      time: "1:00 PM",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200",
    },
    {
      id: 3,
      name: "Vegetable Pasta",
      type: "Dinner",
      time: "7:00 PM",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200",
    },
  ]);


  return (
    <main className="dashboard">

      {/* Welcome section */}
      <section className="welcome">
        <div>
          <p className="welcome-date">
            {today.toUpperCase()},YOUR HEALTHY JOURNEY
          </p>

    

          <h1>{greeting}, {user?.name || "Guest"}!👋</h1>
              
           
          <p>
            Let's make today delicious and nutritious.
          </p>
        </div>

      
        <Link to="/planner" className="primary-btn">
          <Plus size={18} />
          Plan a Meal
        </Link>
      </section>

   
      <section className="stats">

      
        <div className="stat-2">
          <div className="stat-icon green">
            <CalendarDays />
          </div>

          <div>
            <p>Planned Meals</p>
            <h2>18</h2>
            <small>This week</small>
          </div>
        </div>

        <div className="stat-2">
          <div className="stat-icon orange">
            <Utensils />
          </div>

          <div>
            <p>Recipes Saved</p>
            <h2>{favorites.length}</h2>
            <small>Your favourites</small>
          </div>
        </div>


        <div className="stat-2">
          <div className="stat-icon red">
            <Flame />
          </div>

          <div>
            <p>Cooking Streak</p>
            <h2>5 days</h2>
            <small>Keep it going!</small>
          </div>
        </div>

   
        <div className="stat-2">
          <div className="stat-icon blue">
            <ShoppingBasket />
          </div>

          <div>
            <p>Shopping Items</p>
            <h2>8</h2>
            <small>On your list</small>
          </div>
        </div>
      </section>
          
          <section className="sect-b">
            <div className="header">
                <div>
                    <h2>Your Favourites Recipes</h2>
                      <p>Recipes you have saved</p>              
                  </div>
                  <Link to="/favorites" className="text-btn">View All
                  <ArrowRight size={16}/>
                  </Link>

            </div>
            {favorites.length===0?(
                <p>You havent saved any recipes at the moment{favorites.length}</p>
            ):(
                <div className="recipes-grid">

                    {favorites.slice(0,3).map((recipe)=>{
                        return(
                      <div class="recipe-card" key={recipe.idMeal}>
                        <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        />
                        <h3>{recipe.strMeal}</h3>
                        <Link to={`/recipe/${recipe.idMeal}`}>
                        View Recipe
                        
                        </Link>

                      </div>
                        )
                     
              })}
                </div>
            )}
          </section>
      <section className="sect-b">

        <div className="header">
          <div>
            <h2>Today's Meal Plan</h2>
            <p>Here's what you're having today.</p>
          </div>

          <Link to="/planner" className="text-btn">
            View Planner
            <ArrowRight size={16} />
          </Link>
        </div>

     
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
            />
          ))}
        </div>
      </section>

      <section className="sect-b">

        <div className="header">
          <div>
            <h2>Popular Recipes</h2>
            <p>Discover something delicious to cook.</p>
          </div>

          <Link to="/recipes" className="text-btn">
            Explore Recipes
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      </section>

    </main>
  );
}


export default Dashboard;
