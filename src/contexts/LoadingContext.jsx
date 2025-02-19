// contexts/LoadingContext.js
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const setLoadingState = (state) => {
        setLoading(state);
    };

    return (
        <LoadingContext.Provider value={{ loading, setLoadingState }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
