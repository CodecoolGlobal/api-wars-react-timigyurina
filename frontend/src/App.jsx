import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegistrationPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Components/Navigation/Navbar";
import { AuthContext } from "./HooksAndContext/auth-context";
import "./App.css";

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    //check if the token is still valid (on the backend we set it to expire in 10mins) - We either have an expdate that is still valid or we set a new one
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 10);
    console.log(tokenExpirationDate);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration:
          new Date(tokenExpirationDate.toISOString()) + 2 * 1000 * 60 * 60,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null); //otherwise it would not let us login again
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  //Set logoutTimer whenever our token changes - either when the user logged in or when logged out
  useEffect(() => {
    if (token && tokenExpirationDate) {
      //get the difference in milliseconds - settTimeout needs the duration in milliseconds
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      //the duration here depends - can be 1 hour but after auto-login it might be less - we need to manage the exp time - it changes whenever we login -> we can store that as a state
      logoutTimer = setTimeout(logout, remainingTime);
      console.log(new Date(remainingTime));
    } else {
      //else need to clear the timer!
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //This will run after React has already rendered the App component (in the default unathorized state)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    } 
  }, [login]);

  return (
    <AuthContext.Provider
      /* whenever this value changes, this new value will be passed down to all components that are interested in it */
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
