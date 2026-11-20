{/*imports three icons from Lucide-react*/}
import { Search,Bell,ChevronDown, ReceiptRussianRuble } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
function NavBar(){
     {/*Gets the user's name and role from UserContext*/}
const { user } = useUser();
return(
    <>
       <header className="top-bar">

        {/*container for the search area*/}
        <div className="search-area">

       

            

           <input type="text" placeholder="Search meals, recipes"></input>
        </div>

        {/*container for the notification and profile*/}
        <div className="nav-actions">

            {/*notification for button*/}
            <button className="notification-btn" aria-label="Notifications">

                {/*Notification Bell*/}
                <Bell size={20}/>
            </button>

            {/*Container for users profile info*/}
            <div className="profile">

                {/*Display the user initial*/}
                <div className="profile-avatar">
                    <span>
                        {/*displays first letter*/}
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                    </span>
                    </div>

                {/*Groups user name and role*/}
                <div className="profile-info">
                    <strong>{user.name || "Guest"}</strong>
                    {/*display user name in bold*/} 
                  

                    {/*Displays users role in small text*/}
                    <small>{user.role}</small>
                </div>

                {/*Display downward arrow*/}
            <ChevronDown size={16}/>

            </div>
        </div>
       </header>

    </>
)
}

export default NavBar