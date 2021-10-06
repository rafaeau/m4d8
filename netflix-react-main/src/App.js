import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";

const App = () => (
  <Router>
    <Route path = '/' component= {HomePage}/>
    <Route path = '/details/:FilmId' component= {MovieDetails}/>
  </Router>
)

export default App