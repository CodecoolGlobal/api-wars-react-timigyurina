import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Components/Navigation/Navbar";
import { AuthContext } from "./HooksAndContext/auth-context";
import "./App.css";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      /* whenever this value changes, this new value will be passed down to all components that are interested in it */
      //!! here means that token will be converted to true if it is truthy and false otherwise
      //Now we store the token itself in the context and the question to whether we are logged in (like before but with a different logic)
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/myPage" element={<HomePage />}></Route>
            <Route path="/myVotes" element={<HomePage />}></Route>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
