"use client";

import React, { useState, useEffect, useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export default function VolumeSlider() {
    const [volume, setVolume] = useState(50);
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.setProperty("--range-value", `${volume}%`);
        }
    }, [volume]);

    function mute() {
        setVolume(0);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    return (
        <div className="mr-5">
            <button onClick={mute}>
                <VolumeUpIcon />
            </button>
            <input
                type="range"
                className="range-slider"
                value={volume}
                min="-1"
                max="101"
                onChange={handleChange}
                ref={sliderRef}
            />
        </div>
    );
}
