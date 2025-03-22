import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';  
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import SendMoney from './pages/SendMoney';

import Success from './pages/success';


export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sendmoney" element={<SendMoney />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}


