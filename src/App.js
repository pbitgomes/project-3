import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Homes";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
