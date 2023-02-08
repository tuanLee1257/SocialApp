import React, {createContext, useContext, useState} from 'react';

export const AuthContex = createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <AuthContex.Provider value={{user, setUser}}>
      {children}
    </AuthContex.Provider>
  );
}

export default AuthProvider;
