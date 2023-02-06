import './App.css';
import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import "./index.css"
import Login from './component/login'
import Signup from './component/signup';
import Chat from './component/chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route exact path="/" element={<Login/>}/>
       <Route exact path="/signup" element={<Signup/>}/>
       <Route exact path="/home" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
