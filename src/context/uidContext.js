/** @format */

"use client";

import { useEffect, createContext, useState, useLayoutEffect } from "react";

export const UidContext = createContext();

export const UidContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  if (typeof window !== "undefined")
    return (
      <UidContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UidContext.Provider>
    );
};
