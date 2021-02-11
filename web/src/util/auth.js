import React, { useState, useEffect, useContext, createContext } from "react";
import queryString from "query-string";

/*
    Handles authentication with fakeAuth, a library for prototyping ...
    ... auth flows without need for a backend (everything is stored locally).

    [CHANGING AUTH SERVICES]: You can switch to another auth service ...
    ... like firebase, auth0, etc, by modifying the useProvideAuth() ...
    ... function below. Simply swap out the fakeAuth.function() calls for the ...
    ... correct ones for your given auth service.
  */

const fakeAuth = {
  signin: (email, key) => {
    return new Promise((resolve, reject) => {
      resolve({ email, key });
    });
  },
  signup: (email, key) => {
    return new Promise((resolve, reject) => {
      resolve({ email, key });
    });
  },
  signout: () => new Promise((resolve, reject) => resolve()), // no-op
};

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... update when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const USER_KEY = "user_key";

const getLastUser = () => {
  const lastUser = localStorage.getItem(USER_KEY);
  console.log("last_user", lastUser);
  if (lastUser) {
    try {
      return JSON.parse(lastUser);
    } catch (e) {
      localStorage.setItem(USER_KEY, null);
    }
  }
  return null;
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(getLastUser());

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const signin = (email, userKey) => {
    return fakeAuth.signin(email, userKey).then((user) => {
      setUser(user);
      return user;
    });
  };

  const signup = (email, userKey) => {
    return fakeAuth.signup(email, userKey).then((user) => {
      setUser(user);
      return user;
    });
  };

  const signout = () => {
    return fakeAuth.signout().then(() => {
      setUser(false);
      window.location.href = "/";
    });
  };
  // Fetch user on mount
  // [CHANGING AUTH SERVICES]: If your auth service doesn't have a subscribe ...
  // ... function then use this effect instead of the one above and modify ...
  // ... to work with your chosen auth service.
  /*
    useEffect(() => {
      yourAuthService.getUser().then(user => {
        setUser(user);
      });
    }, []);
    */

  return {
    user,
    signin,
    signup,
    signout,
  };
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
