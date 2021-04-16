import "../css/App.css";
import Auth from "./Auth";
import NavBar from "./NavBar";
import OpenJournal from "./OpenJournal";
import {Switch, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import GoalsContainer from "./GoalsContainer";
import Dashboard from "./Dashboard";




function App() {
  const [user, setUser] = useState(null)
  const [newJModOpen, setNewJModOpen] = useState(false)
  const [newGModOpen, setNewGModOpen] = useState(false)
  const [myJournals, setMyJournals] = useState([])
  const [myLists, setMyLists] = useState([])
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
          setMyJournals(user["my_journals"])
          setMyLists(user.goallists)
        });
    }
  }, []);

  return (
    <div className="App">
      <NavBar setNewJModOpen={setNewJModOpen}  setNewGModOpen={setNewGModOpen}user={user}/>
      <Switch>
        {user ? 
          <>
            <Route path="/me"> 
              <Dashboard myJournals={myJournals} setMyJournals={setMyJournals} user={user} setNewJModOpen={setNewJModOpen} newJModOpen={newJModOpen}   />
            </Route>
            <Route path="/journals/:id/:curpage?">
              <OpenJournal setMyJournals={setMyJournals}/>
            </Route>
            <Route path="/mygoals">
              <GoalsContainer  setNewGModOpen={setNewGModOpen} newGModOpen={newGModOpen}user={user} lists={myLists} setMyLists={setMyLists}/>
            </Route>
          </> 
          :
          <Auth setUser={setUser}/>
        }
      </Switch>
    </div>
  );
}

export default App;
