import {Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Favorites from "./pages/Favorites"
import Planner from "./pages/Planner"
import Recipes from "./pages/Recipes"
import ShoppingList from "./pages/ShoppingList"
import  Sidebar  from "./components/Sidebar"
import NavBar from "./components/Navbar"
import Profile from "./pages/Profile"
import Details from "./pages/RecipeDetails"
function App(){


    return(
        <>
        {/*main container*/}
        <div className="app-layout">
    
        <Sidebar/>
        
        <div className="main">
         <NavBar/>

        
         <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/recipes" element={<Recipes/>}/>
           <Route path="/planner" element={<Planner/>}/>
             <Route path="/shopping-list" element={<ShoppingList/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
              <Route path="/recipe/:id" element={<Details/>}/>
           <Route path="/profile" element={<Profile/>}/>
         </Routes>
        </div>
        </div>
        </>
    )
}

export default App;