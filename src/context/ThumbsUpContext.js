import React, {useContext, useReducer, createContext} from "react";

const ThumbsUpContext = createContext();

const thumbsUpReducer = (thumbsUpState, action) => {
    switch (action.type) {
        case 'ADD':
            return { books: [...thumbsUpState.books, action.payload] };
        case 'REMOVE':
            if (thumbsUpState.books && thumbsUpState.books.length > 0) {
                let result = removeIsbnElt(thumbsUpState.books, action.payload);
                return {books: result};
            }
            else {
                console.log("thumbsUpState.books is empty");
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


export const ThumbsUpProvider = ({ children }) => {
    const [thumbsUpState, thumbsUpDispatch] = useReducer(thumbsUpReducer, { books: [] });

    return (
        <ThumbsUpContext.Provider value={{thumbsUpState, thumbsUpDispatch }}>
            {children}
        </ThumbsUpContext.Provider>
    );
}


export const useThumbsUpContext = () => {
    return useContext(ThumbsUpContext);
}
