"use client";

import { useTrackContext } from "@/context/player-context";
import Image from "next/image";

export default function ArtistTopTrack({
    index,
    id,
    name,
    duration,
    image,
    mainArtist,
}: {
    index: number;
    id: string;
    name: string;
    duration: number;
    image: string;
    mainArtist: string;
    artists: { name: string; id: string }[];
}) {
    const { currentTrack, setCurrentTrack } = useTrackContext();

    const mins = Math.floor(duration / 1000 / 60);
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    const handleClick = async (e: any) => {
        e.preventDefault();
        const search = `${name} ${mainArtist} audio`;

        const res = await fetch(`/api?search=${search}`);
        const data = await res.json();
        setCurrentTrack(data.videoId);
    };

    return (
        <div className="flex p-4 w-[55%] hover:bg-neutral-500/10 rounded-md">
            <form
                onSubmit={handleClick}
                className="self-center mr-4 text-inactive"
            >
                <button>{index + 1}</button>
            </form>
            <div className="mr-3">
                <Image src={image} alt={name} width={40} height={40} />
            </div>
            <div>{name}</div>
            <div className="ml-auto self-center text-inactive text-sm">
                {mins}:{secs}
            </div>
        </div>
    );
}
