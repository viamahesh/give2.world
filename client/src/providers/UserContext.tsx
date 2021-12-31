import React, { createContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  __typename: string;
}

interface UserResponse {
  token: string;
  user: User;
  __typename: string;
}

interface UserContextInterface {
  userData: UserResponse | null;
  setUserData: (response: UserResponse) => void;
}

const userContextDefaultValues: UserContextInterface = {
  userData: null,
  setUserData: (response: UserResponse) => {}
};

export const UserContext = createContext<UserContextInterface>(
  userContextDefaultValues
);

const UserProvider = ({ children }: { children?: ReactNode }) => {
  const [userData, setUserData] = useState<UserResponse | null>(userContextDefaultValues.userData);
  
  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;





