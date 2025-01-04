import React, {useContext, useReducer, createContext} from "react";

const SavedContext = createContext();

// const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...state.books, action.payload] };
        case 'DELETE':
            if (state.books && state.books.length > 0) {
                let result = removeIsbnElt(state.books, action.payload);
                return {books: result};
            }
            else {
                console.log("state.books is empty");
            }
        case 'INIT':
            return { books: (action.payload || [])  };
        default:
            throw new Error();
    }
}

function removeIsbnElt(arr, isbn) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isbn !== isbn){
            result.push(arr[i]);
        }
    }
    return result;
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
