import React, {createContext, Dispatch, FC, SetStateAction, useState, ReactNode} from 'react'

export const userContext = createContext<IUser>({} as IUser);
export const setUserContext = createContext<Dispatch<SetStateAction<IUser>>>(
  () => undefined
);

export const UserProvider: FC<{children?: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <userContext.Provider value={user}>
      <setUserContext.Provider value={setUser}>
        {children}
      </setUserContext.Provider>
    </userContext.Provider>
  );
};