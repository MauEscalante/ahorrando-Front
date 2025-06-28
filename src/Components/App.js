import { Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";

const App = () => {
    return (
        <>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

export default App;