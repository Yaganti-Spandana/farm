import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/navbar/login';
import Signup from './components/navbar/signup';
import AnimalForm from './components/animal_management';
import MilkForm from './components/milk_production';
import SaleForm from './components/Sales';
import ExpenseForm from './components/Expense';
import FeedInventory from './components/inventory';
import ProfitLoss from './components/profit_loss';
import AccountDashboard from './components/records';
function App() {
  return (
    <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/animal" element={<AnimalForm/>}/>
        <Route path="/milk" element={<MilkForm/>}/>
        <Route path="/sales" element={<SaleForm></SaleForm>}/>
        <Route path="/expense" element={<ExpenseForm></ExpenseForm>}/>
        <Route path="/inventory" element={<FeedInventory/>}/>
        <Route path="/profit" element={<ProfitLoss/>}/>
  <Route path="/accounts" element={<AccountDashboard />} />
      </Routes>
      </BrowserRouter></div>
  );
}

export default App;
