import "../css/App.css";
import Auth from "./Auth";
import NavBar from "./NavBar";
import OpenJournal from "./OpenJournal";
import {Switch, Route} from "react-router-dom"
import {useState, useEffect} from "react"
import GoalsContainer from "./GoalsContainer";
import Dashboard from "./Dashboard";
import Prfoile from "./Profile"

function App() {
  const [user, setUser] = useState(null)
  const [newJModOpen, setNewJModOpen] = useState(false)
  const [newGModOpen, setNewGModOpen] = useState(false)
  const [newGuestModOpen, setNewGuestModOpen] = useState(false)
  const [myJournals, setMyJournals] = useState([])
  const [myLists, setMyLists] = useState([])
  const [guestList, setGuestList] = useState([])

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
          setGuestList(user["guest_journals"])
        });
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
      <NavBar setNewGuestModOpen={setNewGuestModOpen} setNewJModOpen={setNewJModOpen}   setUser={setUser} setNewGModOpen={setNewGModOpen}user={user}/>
      <Switch>
        {user ? 
          <>
            <Route path="/dashboard"> 
              <Dashboard guestList={guestList} myJournals={myJournals} setMyJournals={setMyJournals} user={user} setNewJModOpen={setNewJModOpen} newJModOpen={newJModOpen}   />
            </Route>
            <Route path="/journals/:id/:curpage?">
              <OpenJournal user={user} setMyJournals={setMyJournals} setNewGuestModOpen={setNewGuestModOpen} newGuestModOpen={newGuestModOpen}/>
            </Route>
            <Route path="/mygoals">
              <GoalsContainer  setNewGModOpen={setNewGModOpen} newGModOpen={newGModOpen}user={user} lists={myLists} setMyLists={setMyLists}/>
            </Route>
            <Route path="/me">
              <Prfoile user={user}/>
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
