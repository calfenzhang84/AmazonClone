import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";


// Prepares the dataLayer
export const StateContext = createContext();

//Wrap our app and provide the Data layer

const StateProvider = ({ children }) => {

    //const[{basket, user}, dispatch] = useReducer(reducer, initialState); //const[state, dispatch] = useReducer(reducer, initialState)

    return (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
    )
};

export default StateProvider;

//Pull information from the data layer
export const useStateValue = () =>  useContext(StateContext);