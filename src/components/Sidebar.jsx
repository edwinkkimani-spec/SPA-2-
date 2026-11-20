{/*Imports NavLink, which creates navigation links and detects the active page*/}
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useUser } from "../context/UserContext.jsx";
/*{Imports icons from the lucide-react library}*/
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ShoppingBasket,
  Heart,
  ChefHat,
} from "lucide-react";

/*{Creates the Sidebar component}*/
function Sidebar() {
 {/*Gets the shared user information from UserContext*/}
  const { user } = useUser();
  /*{Creates an array containing the information for each navigation link}*/
  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Recipes", path: "/recipes", icon: BookOpen },
    { name: "Meal Planner", path: "/planner", icon: CalendarDays },
    { name: "Shopping List", path: "/shopping-list", icon: ShoppingBasket },
    { name: "Favourites", path: "/favorites", icon: Heart },
  ];

  
  return (

    /*{The aside element represents content separate from the main page content}*/
    <aside className="sidebar">

      {/*Container for the MealPlan logo and name*/}
      <div className="plan">

        {/*Displays the chef hat icon at size 28*/}
        <ChefHat size={28} />

        {/*Displays the brand name*/}
        <span>MealPlan</span>
      </div>

      {/*Displays the MENU label*/}
      <p className="sidebar-l">MENU</p>

      {/*Navigation container for the links*/}
      <nav className="sidebar-2">

        {/*Loops through the links array and creates a link for each item*/}
        {links.map((link) => {

          {/*Gets the icon component belonging to the current link*/}
          const Icon = link.icon;
         
          {/*Returns the navigation link*/}
          return (
            <NavLink

              /*{Gives React a unique key for each link}*/
              key={link.path}

              /*{Specifies the destination URL}*/
              to={link.path}

              /*{Makes the Dashboard link active only on the exact "/" URL}*/
              end={link.path === "/"}

              /*{Applies a different class depending on whether the link is active}*/
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-item"
              }
            >

              { /*Displays the icon for the current link*/}
              <Icon size={19} />

              {/*Displays the name of the current link*/}
              <span>{link.name}</span>
              
            
            </NavLink>
              
          );
        })}
       
         <NavLink
        to="/profile"
       className={({ isActive }) =>
        isActive ? "nav-active" : "nav-item"
       }
     > 
       <UserRound size={19} />
       <span>Edit Profile</span>
    </NavLink>
       </nav>

       

      {/*Container for the bottom section of the sidebar*/}
      <div className="sidebar-dn">

        {/*A small promotional information card*/}
        <div className="sidebar-t">

          { /*Displays an avocado emoji*/}
          <span> </span>

          {/*Displays the card heading*/}
          <h6>Healthy eating starts here!</h6>

          {/*Displays the card description*/}
          <p>Plan your meals and make every day count.</p>

        </div>
      </div>
    </aside>
  );
}

{/*Makes Sidebar available to other files*/}
export default Sidebar;