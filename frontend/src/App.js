import {Route, useHistory, useLocation} from "react-router";
import "./App.css"
import Chat from "./Chat/Chat";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";



function App() {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user){ 
      history.push("/chat");
    };
  }, []);


  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);
  return (
       <div className="App" >
         <Route path='/chat' component={Chat} exact></Route>
         <Route path='/login' component={Auth}></Route>
       </div>
  )
    

}

export default App;
