import React, {useContext, useReducer, createContext} from "react";

const SavedContext = createContext();

// const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...state.books, action.payload] };
        case 'delete':
            let updated_books = state.filter(elt => elt.isbn !== action.isbn);
            return updated_books;
        case 'init':
            return { books: action.payload || [] };
        default:
            throw new Error();
    }
}


export const SavedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { books: [] });

    return (
        <SavedContext.Provider value={{state, dispatch }}>
            {children}
        </SavedContext.Provider>
    );
}


export const useSavedContext = () => {
    return useContext(SavedContext);
}
