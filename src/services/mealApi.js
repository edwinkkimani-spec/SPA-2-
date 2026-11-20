const BASE_URL="https://www.themealdb.com/api/json/v1/1"

export async function getRecipes(search=""){
    
        const response=await fetch(`${BASE_URL}/Search.php?s=${encodeURIComponent(search)}`)

        if(!response.ok){
            throw new Error("Failed to fetch recipes")
        }
        const data=await response.json()
        return data.meals ||[]
        

    }
export async function  mealCategories() {
    const response = await fetch(`${BASE_URL}/categories.php`)

if(!response.ok){
    throw new Error("Failed to fetch meal Categories kindly wait")
}
 const data=await response.json()

 return data.categories ||[]
    
}

export async function getRecipeByCategory(category){
    const response= await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)

    if(!response.ok){
        throw new Error("Failed to fetch category recipe.")
    }
   const data=await response.json()

   return data.meals||[]
} 

export async function getRecipeById(id){

    const response=await fetch(`${BASE_URL}/LOOKUP.php?i=${encodeURIComponent(id)}`)
    if(!response.ok){
        throw new Error("Failed to fetch recipe details");

    }

    const data =await response.json();

    return data.meals?data.meals[0]:null

}