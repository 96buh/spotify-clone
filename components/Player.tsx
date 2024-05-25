"use client";

import VolumeSlider from "./VolumeSlider";
import YouTubePlayer from "./YoutubePlayer";
import LikeBtn from "./LikeBtn";
import Image from "next/image";
import { useTrackContext } from "@/context/player-context";

export default function Player() {
    const { currentTrack, setCurrentTrack } = useTrackContext();

    return (
        <div className="flex justify-between items-center fixed bottom-0 w-full bg-black h-20">
            <div className="flex pl-2">
                <div className=" w-14 h-14 rounded-md object-cover">
                    <Image
                        className="rounded-md"
                        src="https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62"
                        alt="image"
                        width={56}
                        height={56}
                    />
                </div>
                <div className="flex flex-col pl-3 self-center">
                    <div className="text-sm">SONG NAME</div>
                    <div className="text-inactive text-xs">artist</div>
                </div>
            </div>
            <div>
                <YouTubePlayer videoId={currentTrack} />
            </div>
            <div className="flex justify-end">
                <LikeBtn />
                <VolumeSlider />
            </div>
        </div>
    );
}
