import React, {SetStateAction, useState } from "react";

// to define custom context type
type ContextType = {
    token : string,
    setToken : React.Dispatch<SetStateAction<string>> //setStateAction is type of setter function in react
}

//define custom Provider type
type Providertype = {children: React.ReactNode} // type react node is for react child nodes or children


//Creating context 
const TokenContext = React.createContext<ContextType | null>(null); // generic type needed to define context type null because fitst its null


//using useContext for use context 
export const useTokenContext = ()=>{
    // taking value of useContext
    const context = React.useContext(TokenContext);

    //checking if context does not hav any value then it simply give an error
    if(!context) throw new Error('token context problem...');
    return context
}

//creating provider for context
export const TokenContextProvider = ({children}: Providertype) =>{

    //useState for passing values
    const [token, setToken] = useState('');

    return <TokenContext.Provider value={{token, setToken}}>
        {children}
    </TokenContext.Provider>
}