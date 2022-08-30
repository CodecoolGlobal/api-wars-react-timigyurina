import { useState, useCallback } from "react";
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

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    //check if the token is still valid (on the backend we set it to expire in 1 hour) - We either have an expdate that is still valid or we set a new one
/*     const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //genereates a Date object taht is now+1h
    console.log(tokenExpirationDate);
    setTokenExpirationDate(tokenExpirationDate);
    //we can only write text and data that can be converted to text */
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
/*         expiration:
          new Date(tokenExpirationDate.toISOString()) + 2 * 1000 * 60 * 60, */
      })
    );
    //expiration should have been tokenExpirationDate.toISOString() but that was -2hours off for me (maybe because of the timezone diff?)
  }, []);
  
  const logout = useCallback(() => {
    setToken(null);
    //setTokenExpirationDate(null); //otherwise it would not let us login again
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

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
