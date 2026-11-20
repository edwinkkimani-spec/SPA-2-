 {/*imports the clock icon*/}
import { Clock3 } from "lucide-react";

{/*Creates MealCard and receives meal information through props*/}
function MealCard({ meal }) {

  
  return (

    /*{Main container for one meal}*/
    <article className="meal-card">

      {/*Displays the meal image*/}
      <img src={meal.image} alt={meal.name} />

      {/*Container for meal information*/}
      <div className="meal-details">

        {/*Displays whether the meal is breakfast, lunch or dinner*/}
        <span className="meal-type">{meal.type}</span>

         {/*Displays the meal name*/}
        <h4>{meal.name}</h4>

         {/*Displays the scheduled time*/}
        <span className="meal-time">

           {/*Displays the clock icon*/}
          <Clock3 size={14} />

          {/*Displays the meal time*/}
          {meal.time}

        </span>
      </div>
    </article>
  );
}

export default MealCard;