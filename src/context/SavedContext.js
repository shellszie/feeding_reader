import React, {useContext, useReducer, createContext} from "react";

const SavedContext = createContext();

const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {
                title: action.title,
                author: action.author,
                isbn: action.isbn,
                img_url: action.img_url
            }];
        case 'delete':
            let updated_books = state.filter(elt => elt.isbn !== action.isbn);
            return updated_books;
        case 'init':
            return initialState.concat(action.books);
        default:
            throw new Error();
    }
}


export const SavedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SavedContext.Provider value={{state, dispatch }}>
            {children}
        </SavedContext.Provider>
    );
}


export const useSavedContext = () => {
    return useContext(SavedContext);
}
