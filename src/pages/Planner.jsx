import {useEffect,useState} from "react"
import {CalendarDays, ChevronLeft, ChevronRight, Plus, X, Trash2, Clock, Utensils}from "lucide-react"

import { getRecipes } from "../services/mealApi.js";
import { useMeals } from "../context/MealContext.jsx";
const API_URL = "http://localhost:3002/mealPlans";

function Planner(){
  
      const [selectedDate, setSelectedDate] = useState(new Date());

      const [showForm,setShowForm]=useState(false)

      const[mealType,setMealType]=useState("Breakfast")
       const[time,setTime]=useState("08:00")
    const[search,setSearch]=useState("")
          const[recipes,setRecipes]=useState([])
             const[selectedRecipe,setSelectedRecipe]=useState(null)
             const { meals, mealsAdded, removedMeals,updateMeal} = useMeals();
              const [loading,setLoading]=useState(false)
              const[saving,setSaving]=useState(false)
              const [editingMeal, setEditingMeal] = useState(null);
              const[error,setError]=useState("")

            function DateKey(date){
              const year = date.getFullYear()
             const month = String(date.getMonth() + 1).padStart(2, "0")
              const day = String(date.getDate()).padStart(2, "0")

               return `${year}-${month}-${day}`
            }
            
            function getWeekDays(date){
                const  monday=new Date(date)
                const day=monday.getDay()
                                                     //Calcultes the day that have passed since monday
                 monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));

                 return Array.from({length:7},(_,index)=>{
                    const currentDay=new Date(monday)
                    currentDay.setDate(monday.getDate()+index)
                    return currentDay
                 })

                 

            }
            const weekDays =getWeekDays(selectedDate)

            async function fetchMeals(){
                try{
                  setLoading(true)
                  setError("")

                  const response= await fetch(API_URL)
                  if(!response.ok) throw new Error("Failed loading plans for meals")

                    const data=await response.json()
                    setMeals(data);
                }catch(error){
                  console.error("Error occured:",error)
                  setError("Sorry could not load meals")
                }finally{
                   setLoading(false)
                }
            }
                

                function changeTheWeek(amount){
                 const newDate=new Date(selectedDate)
                 newDate.setDate(newDate.getDate()+amount*7) 
                 setSelectedDate(newDate) 
                }

                async function Search(event){
                    event.preventDefault()

                    if(!search.trim()){
                        setError("Search using recipe name");
                        return
                    }

                    try{
                        setLoading(true)
                        setError("")

                        const finished=await getRecipes(search)
                        setRecipes(finished ||[])

                        if(!finished||finished.length===0){
                            setError("Sorry no recipe at the moment.")
                        }

                    }catch(error){
                    console.error("Search error occured",error)
                    setError("Please try again search was not made")

                    }finally{
                      setLoading(false)
                    }
                }

                function DisplayForm(type){
                    setMealType(type)
                    setTime(
                        type==="Breakfast"
                        ?"08:00"
                        :type==="Lunch"
                        ?"13:00"
                        :"19:00"
                    )
                    setSearch("")
                    setRecipes([])
                    setSelectedRecipe(null)
                    setError("")
                    setShowForm(true)
                }
                function handleEditMeal(meal){
                   setEditingMeal(meal)
                  setSelectedRecipe(meal);
                  
                }

                async function handleSavedMeal(event){
                    event.preventDefault()
                  await removedMeals(id);
                    if(!selectedRecipe){
                        setError("Kinldy select recipe first")
                        return
                    }

                    const dataForMeal={
                        date:DateKey(selectedDate),
                        mealType,
                        idMeal:selectedRecipe.idMeal,
                        strMeal:selectedRecipe.strMeal,
                        strMealThumb:selectedRecipe.strMealThumb,
                        time,
                    }

                    try{
                        setSaving(true)
                        setError("")
                     
                        const response =await fetch(API_URL,{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                            },
                            body:JSON.stringify(dataForMeal)

                        })
                        if(!response.ok)throw new Error("Failed to save meal")

                            await fetchMeals()
                            setShowForm(false)
                            setSelectedRecipe(null)
                            setRecipes([])
                            setSearch("")
                    } catch(error){
                   console.error("Sorry error occured:",error)
                   setError("Meal could not be saved,try again")
                    }finally{
                       setSaving(false)
                    }

                }

                async function handleDeleteMeal(id){
                   await removedMeals(id);
                
                }
           const selectedDays=meals
           .filter((meal)=>meal.date ===DateKey(selectedDate))
           .sort((a,b)=>a.time.localeCompare(b.time))

               const mealTypes=["Breakfast","Lunch","Dinner"]

               const formattedDate =selectedDate.toLocaleDateString("en-KE",{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric",
               })

               return(
                <>
                 <main className="dashboard planner-page">
                     <section className="planner-header">
                        <div>
                            <h1>Meal Planner</h1>
                            <p>Organise your meals and plan ahead.</p>
                        </div>
                        <button className="primary-btn"
                            onClick={()=>DisplayForm("Breakfast")}
                            >
                                <Plus size={18}/>
                                Add Meal
                            </button>                     
                            </section>

                            <section className="planner-calendar">
                                <div className="planner-calendar-header">
                            <div>
                            <h2>
                                <CalendarDays size={20}/>
                                Your Weekly Plan
                            </h2>
                            <p>Select a day to view its meals.</p>
                                       </div>
                               
                                 <div className="week-navigation">
                                      <button
                                      type="button"
                                      aria-label="Previous week"
                                      onClick={()=>changeTheWeek(-1)}
                                      >
                                        <ChevronLeft/>
                                      </button>

                                      <button
                                      type="button"
                                      aria-label="Next week"
                                      onClick={()=>changeTheWeek(1)}
                                      >
                                        <ChevronRight/>
                                      </button>
                                      </div>
                                 </div>


         <div className="week-days">{/*displays each day in the calendar*/}
        {weekDays.map((day) => {
       const dateKey = DateKey(day);
            const isSelected = dateKey ===DateKey(selectedDate);
 
            {/*finds meals sceduled for a specific day*/}
            const mealsOnDay = meals.filter(
              (meal) => meal.date === dateKey
            ).length;
              return(
               <button
                type="button"
                key={dateKey}
                className={`week-day ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                {/*converts date object into readable date string*/}
                <span>
                  {day.toLocaleDateString("en-KE", {
                    weekday: "short",
                  })}
                </span>

                <strong>{day.getDate()}</strong>

                <small>
                  {mealsOnDay} {mealsOnDay === 1 ? "meal" : "meals"}
                </small>
              </button>
            );
          })}
        </div>
      </section>
       <section className="planner-meals">
        <div className="planner-section-heading">
          <div>
            <h2>{formattedDate}</h2>
            <p>Your planned meals for this day.</p>
          </div>
        </div>

        {loading && <p>Loading your meals</p>}

        {error && !showForm && (
          <p className="planner-error">{error}</p>
        )}

        <div className="meal-slots">
          {mealTypes.map((type) => {
            const typeMeals = selectedDays.filter(
              (meal) => meal.mealType === type
            );

            return (
              <div className="meal-slot" key={type}>
                <div className="meal-slot-heading">
                  <h3>{type}</h3>
                  <span>{typeMeals.length}</span>
                </div>

                {typeMeals.length > 0 ? (
                  typeMeals.map((meal) => (
                    <div className="planned-meal" key={meal.id}>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                      />

                      <div className="planned-meal-info">
                        <h4>{meal.strMeal}</h4>
                        <p>
                          <Clock size={14} />
                          {meal.time}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="delete-meal-btn"
                        aria-label={`Delete ${meal.strMeal}`}
                        onClick={() => handleDeleteMeal(meal.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-meal">
                    <Utensils size={24} />
                    <p>No {type.toLowerCase()} planned.</p>
                  </div>
                )}

                <button
                  type="button"
                  className="add-meal-btn"
                  onClick={() => DisplayForm(type)}
                >
                  <Plus size={16} />
                  Add {type}
                </button>
              </div>
            );
          })}
        </div>
      </section>
      {showForm && (
        <div className="planner-form-overlay">
          <div className="planner-form">
            <div className="planner-form-header">
              <div>
                <h2>Add Meal</h2>
                <p>Find recipe for your meal plan.</p>
              </div>

              <button
                type="button"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X />
              </button>
            </div>

            <form onSubmit={Search}>
              <label htmlFor="recipe-search">
                Search for a recipe
              </label>

              <div className="planner-search">
                <input
                  id="recipe-search"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="e.g. Chicken, Pasta..."
                />

                <button type="submit" disabled={loading}>
                  Search
                </button>
              </div>
            </form>

            {loading && <p>Searching recipes</p>}

            {error && (
              <p className="planner-error">{error}</p>
            )}

            <div className="planner-recipe-results">
              {recipes.map((recipe) => (
                <button
                  type="button"
                  key={recipe.idMeal}
                  className={`planner-recipe-option ${
                    selectedRecipe?.idMeal === recipe.idMeal
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setError("");
                  }}
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  <span>{recipe.strMeal}</span>
                </button>
              ))}
            </div>

            {selectedRecipe && (
              <form onSubmit={handleSavedMeal}>
                <p className="selected-recipe">
                  Selected: <strong>{selectedRecipe.strMeal}</strong>
                </p>

                <label htmlFor="meal-type">Meal type</label>
                <select
                  id="meal-type"
                  value={mealType}
                  onChange={(event) => setMealType(event.target.value)}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>

                <label htmlFor="meal-time">Meal time</label>
                <input
                  id="meal-time"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Meal"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
              
                        
                 </main>
                </>
               )
        }
export default Planner