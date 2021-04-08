import "../css/App.css";
import Auth from "./Auth";
import Calendar from "./Calendar";
import JournalContainer from "./JournalContainer";
import NavBar from "./NavBar";
import OpenJournal from "./OpenJournal";
import {Switch, Route} from "react-router-dom"

function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/me">
          <JournalContainer/>
          <Calendar/>
        </Route>
        <Route path="/journals/:id">
          <OpenJournal/>
        </Route>
        <Route path="/login">
          <Auth/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
