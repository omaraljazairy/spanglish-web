import { React, Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../src/components/Header';
import Body from '../src/components/Body';
import { NoMatch } from './pages/NoMatch';
import Home from './pages/Home';
import Language from './pages/Language';
import Category from './pages/Category';
import Word from './pages/Word';
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
      <BrowserRouter history={history}>
      <Header/>
      <Container>
        <Body>
          <Routes>
            <Route path='/home' element={<Home/>} />
            <Route exact path='/language' element={<Language/>} />
            <Route exact path='/category' element={<Category/>} />
            <Route path='/word' element={<Word/>} />
            <Route path='/verb' element={<Verb/>} />
            <Route path='/quiz' element={<Quiz/>} />
            <Route path='/question' element={<Question/>} />
            <Route path='/result' element={<Result/>} />
            <Route path='/account' element={<Account/>}/>
            <Route path="*" element={<NoMatch/>} />
          </Routes>
        </Body>
      </Container>
    </BrowserRouter>
    );
  }
}

export default App;
