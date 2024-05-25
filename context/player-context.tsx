"use client";

import { createContext, useContext, useState } from "react";

type TrackContextProviderProps = {
    children: React.ReactNode;
};

type TrackContext = {
    currentTrack: string;
    setCurrentTrack: React.Dispatch<React.SetStateAction<string>>;
};

export const TrackContext = createContext<TrackContext | null>(null);

export default function TrackContextProvider({
    children,
}: TrackContextProviderProps) {
    const [currentTrack, setCurrentTrack] = useState("");

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    );
}

export function useTrackContext() {
    const context = useContext(TrackContext);
    if (!context) {
        throw new Error(
            "useTrackContext must be used within a TrackContextProvider"
        );
    }
    return context;
}
