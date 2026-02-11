import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import GameDetail from './Components/GameDetail'
import AdminLogin from './Pages/AdminLogin'
import Consoles from './Pages/Consoles'
import ConsolesPost from './Pages/ConsolesPost'
import Controllers from './Pages/Controllers'
import ControllersPost from './Pages/ControllersPost'
import Games from './Pages/Games'
import GamesPost from './Pages/GamesPost'
import HomePage from './Pages/Homepage'
import IntroWrapper from './Pages/IntroWrapper'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import PaymentSucess from './Components/PaymentSucess';
import PaymentCancel from './Components/PaymentCancel';
import {ToastContainer} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import RentPage from './Pages/RentPage'
import RentItemMainPage from './Pages/RentItemMainPage'
import ConsoleDetail from './Components/ConsoleDetail'
import ControllerDetail from './Components/ControllerDetail'
import AdminSignup from './Pages/AdminSignup'
import ProtectedRoute from './Components/ProtectedRoute'
import Adress from './Components/Adress'


const App = () => {

  const [IntroDone, setIntroDone] = useState(false);
  return (

    <div className='relative'>



      <Routes>

        {/* Special route ONLY for home page */}
        <Route path="/" element={<IntroWrapper />} />

        <Route path='/login' element={<Login />} />
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/adminSignup' element={<AdminSignup/>} />
        <Route path='/admin' element={<AdminLogin />} />
        
        <Route path='/homepage' element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>  } />

        <Route path='/gamespost' element={<GamesPost />} />
        <Route path='/consolespost' element={<ConsolesPost />} />
        <Route path='/controllerspost' element={<ControllersPost />} />

        <Route path='/cd' element={<Games />} />
        <Route path='/consoles' element={<Consoles />} />
        <Route path='/controllers' element={<Controllers />} />

        <Route path='/gameDetails/:id' element={<GameDetail />} />
        <Route path='/consoleDetails/:id' element={<ConsoleDetail/>} />
        <Route path='/controllerDetails/:id' element={<ControllerDetail/>} />

        <Route path='/success' element={<PaymentSucess/>} />
        <Route path='/cancel' element={<PaymentCancel/>} />

        <Route path='/rent' element={<RentPage/>} />

        <Route path='/rentItemMainPage/:id' element={<RentItemMainPage/>} />


        <Route path='/userAdress' element={<Adress/>} />

      </Routes>



      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light">

      </ToastContainer>

    </div>
  )
}

export default App;
