import React, {useContext, useReducer, createContext} from "react";

const SavedContext = createContext();

// const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...state.books, action.payload] };
        case 'DELETE':
            let updated_books = state.books.filter(elt => elt.isbn !== action.payload);
            return updated_books;
        case 'INIT':
            return { books: (action.payload || [])  };
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
