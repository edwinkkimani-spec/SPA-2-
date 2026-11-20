import { createContext, useContext, useState} from "react";

{/*Context that shares user info across components*/}
const UserContext = createContext();

{/*a provider component that will hold and share user date */}
export function UserProvider({children}){

       const [user, setUser] = useState(() => {
                
       
        {/*retrives saved names from broser local storage*/}
        const savedName=localStorage.getItem("username")

        {/*returns  the user object*/}
        return{
            name: savedName||"",
            role:"Meal Planner"
        }
       })
    


    {/*updates user name*/}
    function updateUser(name){

        {/*saves user name in local storage*/}
        localStorage.setItem("username",name)

        {/*update reacts state with new name*/}
        setUser({
            name:name,
            role:"Meal Planner",
        })
    }
  
    {/*Provide user information and the update function to child components*/}
    return(
        <>
        <UserContext.Provider value={{user,updateUser}}>
              {children}
        </UserContext.Provider>
        </>
    )
}

    {/*hook to acces user content*/}
    export function useUser(){
      return useContext(UserContext)
    }
    