// import {UserPage} from './apps/UserPage'
// import {Counter} from './apps/Counter'
// import {Todo} from './apps/Todo'
// import {PredictAge} from './apps/PredictAge'

import {CatFact} from './apps/CatFact'
import {Excuse} from './apps/Excuse'
import { Login } from './pages/Login';
import { TopNavbar } from './pages/TopNavbar';
import {BottomNavbar} from './pages/BottomNavbar';
import {NotFound} from './pages/NotFound';
import {ProfilePage} from './pages/ProfilePage';

// import {PrivateRoute} from './components/PrivateRoute'
import { PrivateOutlet } from './components/PrivateOutlet';
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Form from './components/Form';
import Heater from './components/Heater';
import ClockList from './components/ClockList';
import FunClock from './components/FunClock';
import Composition from './components/Composition';

import themeContext from './context/themeContext';
import Home from './pages/Home';
import Opti from './components/Opti';

function App() {
  const client = new QueryClient();
  const clocks = [1,2,3];

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Router>
            <TopNavbar/>
            <Routes>
              <Route path='/clock' element={<ClockList clocks={clocks}/>}/>
              <Route path='/funclock' element={<FunClock/>}/>
              <Route path='/opti' element={<Opti/>}/>
              <Route path='/form' element={<Form/>}/>
              <Route path='/heater' element={<Heater/>}/>
              <Route path='/composition' element={<Composition/>}/>

              <Route path='/catfact' element={<CatFact/>}/>
              <Route path='/excuse' element={<Excuse/>}/>

              <Route path='/' element={
                <themeContext.Provider value={{theme: 'dark'}}>
                  <Home/>
                </themeContext.Provider>
              } exact/>
              
              
              {/* <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>} /> */}
              <Route path='/' element={<PrivateOutlet/>}>
                <Route path='profile' element={<ProfilePage/>}/>
              </Route>

              <Route path='/login' element={<Login/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
            <BottomNavbar/>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;