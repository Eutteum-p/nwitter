import { useEffect, useState } from "react";
import AppRouter from "component/Router";
import {authService} from "fbase";

function App() {
  //console.log(firebase);
  const [init, setInit] = useState(false);
  //const [isLogin, setLogin] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj(user)
      }
      setInit(true);
    });
  },[]);

  return (
    <>
      {init 
      ? 
        (<AppRouter isLogin={userObj} userObj={userObj}/>) 
      : 
        ('Initializing...')
      }
      <footer> &copy; Pwiter {new Date().getFullYear() }</footer>
    </>
  );
}

export default App;
 