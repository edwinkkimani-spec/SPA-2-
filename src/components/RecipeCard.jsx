{/*Imports the clock and heart icons*/}
import {Clock3,Heart} from "lucide-react"

{/*Function that has recipe as a prop*/}
function RecipeCard({recipe}){

    return(
        <>
        <article className="recipe-card">

            {/*container for the recipe image*/}
            <div className="recipe-image-wrapper">

                {/*Displays the recipes images, uses the recipe as alternative text*/}
                <img src={recipe.image} alt={recipe.name}/>

              {/*Button for adding the recipe to favorites*/}
              <button className="favorite-btn"aria-label="Add to favourites">

              {/*Displays heart icon*/}
              <Heart size={18}/>
              
              </button>
            </div>

            {/*Recipe info*/}
            <div className="recipe-info">

                {/*Display recipe category*/}
                <span className="recipe-category">{recipe.category}</span>

                {/*Recipe name*/}
                <h3>{recipe.name}</h3>

                  {/*container for preparation time and rating*/}
                  <div className="recipe-meta">

               <span>
               {/*Display clock  icon and preparation time*/}
               <Clock3 size={15}/>
                  {recipe.time}
                     </span>

                   {/*Displays the recipe rating*/}
                   <span>{recipe.rating}</span>
                
                  </div>
            </div>
        </article>
        </>
    )

}

export default RecipeCard