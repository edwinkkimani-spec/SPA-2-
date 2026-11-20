import { ReceiptRussianRuble } from "lucide-react";
import { useUser } from "../context/UserContext";
import {useState}from "react";

function Profile(){
    const[name,setName]=useState("")
    {/*Function that updates shared user info*/}
    const{updateUser} = useUser()

    function handleSubmit(event){
        event.preventDefault();

        {/*prevents an empty name from being saved*/}
        if(!name.trim()) return

        {/*update user name*/}
        updateUser(name.trim())

        {/*clear input after naem saved*/}
        setName("")
    }

    return (
      <>
      <div className="profile-page">
        <h2>Set Up Your Profile</h2>
         <p>Enter your name to personalize your MealPlan experience.</p>

         <form onSubmit={handleSubmit}>
            <label htmlFor="user-name">Your name</label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e)=>setName(event.target.value)}
              placeholder="Enter your name"

            />
            <button type="submit">Save profile</button>
         </form>
      </div>
      </>
    )

}

export default Profile