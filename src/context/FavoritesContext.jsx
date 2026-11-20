import { createContext,useContext,useState,useEffect } from "react";

const FavoritesContext=createContext()
const API_URL= "http://localhost:3002/favorites"
export function FavoritesProvider({children}){
    const[favorites,setFavorites]=useState([])

    useEffect(()=>{
        async function fetchFavorites(){
            try{
                 const response= await fetch(API_URL);
                 if(!response.ok){
                    throw new Error("Failed to load favourites")
                 }
                    const data=await response.json()
                    setFavorites(data)

                 
            }catch(error){
               console.error("Error fetching favourites",error)
            }

        }
        fetchFavorites()
    },[])

    async function addFavorite(recipe){
        const Saved=favorites.some(
            (item)=>item.idMeal === recipe.idMeal

        )
        if(Saved)return

        try{
            const recipeSave={
                ...recipe,
             
            }
            const response=await fetch(API_URL,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
               body: JSON.stringify(recipeSave)

            })
            if(!response.ok) throw new Error("Failed to add favourite")

                const savedRecipe=await response.json()
                setFavorites((prev)=>[...prev,savedRecipe])
        }catch(error){
            console.error("An erro occured",error)
        }
          
    }

    async function removeFavorite(idMeal){
        try{
          const savedRecipe = favorites.find(
        (recipe) => recipe.idMeal === idMeal
          )
         if (!savedRecipe) return;
         const response = await fetch(`${API_URL}/${savedRecipe.id}`, {
      method: "DELETE",
    });
     if (!response.ok) {
      throw new Error("Failed to delete favourite");
    }
    setFavorites((prev) =>
      prev.filter((recipe) => recipe.idMeal !== idMeal)
    );
  } catch (error) {
    console.error("Error deleting favourite:", error);
  }
}
        
    return(
        <>
        <FavoritesContext.Provider value={{favorites,addFavorite,removeFavorite}}>
       {children}
        </FavoritesContext.Provider>
        </>
    )
}

export function useFavorites() {
  return useContext(FavoritesContext);
}