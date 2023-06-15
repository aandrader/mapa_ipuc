import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/home/Home";
import Boots from "../pages/boots";
import Navbar from "../components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boots" element={<Boots/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
