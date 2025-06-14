import React, { createContext, useState } from 'react'

// Create the context
export const UserContext = createContext({});

// Define the context provider component
function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
