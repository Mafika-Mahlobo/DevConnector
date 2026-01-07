import './App.css';
import { Fragment } from 'react/jsx-runtime';
import Navbar from './componets/layouts/Navbar';
import Landing from './componets/layouts/Landing';
import Register from './componets/auth/Register';
import Login from './componets/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './Store';
import Alert from './componets/layouts/Alert';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
