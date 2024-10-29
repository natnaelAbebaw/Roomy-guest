import React, { createContext, useReducer } from "react";

export enum SearchFormActionType {
  stickyOnTop = "STICKY_ON_TOP",
  hangOnTop = "HANG_ON_TOP",
  normal = "NORMAL",
}
type GlobalContextType = {
  searchFormState: SearchFormActionType;
  dispatch?: React.Dispatch<SearchFormActionType>;
};

const GlobalContext = createContext<GlobalContextType>({
  searchFormState: SearchFormActionType.normal,
});

function reducer(state: GlobalContextType, action: SearchFormActionType) {
  switch (action) {
    case SearchFormActionType.stickyOnTop:
      return { ...state, searchFormState: SearchFormActionType.stickyOnTop };
    case SearchFormActionType.hangOnTop:
      return { ...state, searchFormState: SearchFormActionType.hangOnTop };
    case SearchFormActionType.normal:
      return { ...state, searchFormState: SearchFormActionType.normal };
    default:
      return state;
  }
}

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [{ searchFormState }, dispatch] = useReducer(reducer, {
    searchFormState: SearchFormActionType.normal,
  });

  return (
    <GlobalContext.Provider value={{ searchFormState, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}

export default GlobalProvider;
