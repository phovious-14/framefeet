"use client";
import { createContext, useContext, useState } from 'react';
const AppContext = createContext<any>(undefined);
export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {
    let [chargeData, setChargeData] = useState(null)
    return (
        <AppContext.Provider value={{
            chargeData,
            setChargeData
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}