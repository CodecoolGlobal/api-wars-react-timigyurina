import { createContext } from "react";

/*
useContext: behind-the-scene data mechanism for app-wide state management
Because passing it everywhere through props would be madness.
*/

//We initialise our context with an object that has 3 keys: a boolean and 2 methods.
export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
  });

//Wecan now pass this object between components. When we update it, any component that listens to it will also update.
//Wrap the parts of our app that should be able toonuse it with it - App.jsx