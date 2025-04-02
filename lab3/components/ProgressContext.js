import React, { createContext, useState, useContext } from "react";
import goalsData from "../assets/goals.json";

const ProgressContext = createContext(0);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(
        Object.keys(goalsData).reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {})
    );

    const updateProgress = (id, value) => {
        setProgress((prev) => ({
            ...prev,
            [id]: Math.min(value, goalsData[id]?.progressbar || 100),
        }));
    };

    return (
        <ProgressContext.Provider value={{ progress, updateProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};
