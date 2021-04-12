import "../css/App.css";
import Auth from "./Auth";
import MyCalendar from "./Calendar";
import JournalContainer from "./JournalContainer";
import NavBar from "./NavBar";
import OpenJournal from "./OpenJournal";
import {Switch, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import GoalsContainer from "./GoalsContainer";


function App() {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const token = localStorage.getItem("token")
    if (token){
      fetch('http://localhost:3000/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((r) => r.json())
        .then((user) => { 
          setUser(user);
        });
    }
  }, []);

  return (
    <>
      <NavBar/>
      <Switch>
        {user ? 
          <>
            <Route path="/me"> 
              <JournalContainer user={user}/>
              <MyCalendar user={user}/>
            </Route>
            <Route path="/journals/:id/:curpage?">
              <OpenJournal/>
            </Route>
            <Route path="/mygoals">
              <GoalsContainer lists={user.goallists}/>
            </Route>
          </> 
          :
          <Auth setUser={setUser}/>
        }
      </Switch>
    </>
  );
}

export default App;
