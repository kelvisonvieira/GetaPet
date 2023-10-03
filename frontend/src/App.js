import { BrowserRouter as Router, Route} from 'react-router-dom'
//import pages
import Login from './components/pages/Auth/Login'
import Register  from './components/pages/Auth/Register'
import Home from './components/pages/Home';
function App() {
  return (
    <Router>
       <Route path="/login">
         <Login> </Login>
       </Route>
       <Route path="/register">
        <Register></Register>
       </Route>
       <Route path="/">
        <Home></Home>
       </Route>
       
    </Router>
  );
}

export default App;
