// import {UserPage} from './apps/UserPage'
// import {Counter} from './apps/Counter'
// import {Todo} from './apps/Todo'
// import {PredictAge} from './apps/PredictAge'

import {Home} from './pages/Home'
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


function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Router>
            <TopNavbar/>
            <Routes>
              <Route path='/catfact' element={<CatFact/>}/>
              <Route path='/excuse' element={<Excuse/>}/>
 
              <Route path='/' element={<Home/>} exact/>
              
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