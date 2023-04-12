import { useEffect, useState } from "react";
import AppRouter from "component/Router";
import {authService} from "fbase";

function App() {
  //console.log(firebase);
  const [init, setInit] = useState(false);
  const [isLogin, setLogin] = useState(authService.currentUser);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      console.log(user);
      if(user){
        setLogin(true);
      }else{
        setLogin(false);
      }
      setInit(true);
    });
  },[]);

  // setInterval(()=>{
  //   console.log(authService.currentUser)
  // },2000)
  return (
    <>
      {init ? <AppRouter isLogin={isLogin}/> : 'Initializing...'}
      
      <footer> &copy; Pwiter {new Date().getFullYear() }</footer>
    </>
  );
}

export default App;
 