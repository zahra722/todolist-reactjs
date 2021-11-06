import { BrowserRouter, Switch , Route } from 'react-router-dom';
import Home from './components/pages/Home';
import View from "./components/Task/View";
import Edit from "./components/Task/Edit";

function App() {
  return(
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/view/:id" component={View}/>
        <Route exact path="/edit/:id" component={Edit}/>

      </Switch>
      </BrowserRouter>
    </div>
    );

}

export default App;
