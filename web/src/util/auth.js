import React, { useState, useEffect, useContext, createContext } from "react";
import queryString from "query-string";

// email can either be email or account id.
const hederaSession = {
  signin: (email, key) => {
    return new Promise((resolve, reject) => {
      resolve({ email, key, accountId: email });
    });
  },
  signup: (email, key) => {
    return new Promise((resolve, reject) => {
      resolve({ email, key, accountId: email });
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
    return hederaSession.signin(email, userKey).then((user) => {
      setUser(user);
      return user;
    });
  };

  const signup = (email, userKey) => {
    return hederaSession.signup(email, userKey).then((user) => {
      setUser(user);
      return user;
    });
  };

  const signout = () => {
    return hederaSession.signout().then(() => {
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
