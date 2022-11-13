import { React, Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../src/components/Header';
import Body from '../src/components/Body';
import { NoMatch } from './pages/NoMatch';
import Home from './pages/Home';
import Language from './pages/Language';
import Category from './pages/Category';
import Vocabulary from './pages/Vocabulary';
import Verb from './pages/Verb';
import Quiz from './pages/Quiz';
import Question from './pages/Question';
import Result from './pages/Result';
import Account from './pages/Account';
import { Container } from 'react-bootstrap';

export const history = createBrowserHistory()

class App extends Component {

  state = {
    sideDrawerOpen: false,
    user: null,
  };

  render() {

    return (
      <Router history={history}>
      <Header/>
      <Container>
        <Body>
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/language' component={Language} />
            <Route exact path='/category' component={Category} />
            <Route path='/vocabulary' component={Vocabulary} />
            <Route path='/verb' component={Verb} />
            <Route path='/quiz' component={Quiz} />
            <Route path='/question' component={Question} />
            <Route path='/result' component={Result} />
            <Route path='/account' component={Account}/>
            <Route path="*" component={NoMatch} />
          </Switch>
        </Body>
      </Container>
    </Router>
    );
  }
}

export default App;
