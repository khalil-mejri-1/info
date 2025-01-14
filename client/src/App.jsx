import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_admin from "./pages/home_admin.jsx";
import Home from "./pages/home.jsx";

function App() {

  return (
    <>
   <BrowserRouter>
     
     <Routes>
       
       <Route path="/" element={<Home />} />
       <Route path="/khalilslam1234" element={<Home_admin/>} />



  </Routes>
</BrowserRouter>
    </>
  )
}

export default App
