"use client";

import Link from "next/link";
import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
});

export default function PlaylistTrack({
    id,
    index,
    name,
    artists,
    duration,
    album,
    addedAt,
}: {
    id: string;
    index: number;
    name: string;
    artists: { name: string; id: string }[];
    duration: number;
    album: { name: string; id: string };
    addedAt: string;
}) {
    return (
        <div className="flex mx-3 justify-between py-2 hover:bg-neutral-500/10 hover:cursor-pointer select-none">
            <div className="flex cursor-pointer w-[30%]">
                {/* index顯示歌曲順序 (對其第二位數字) */}
                <div className="self-center mr-4 text-inactive">
                    <div
                        className={`mx-4 self-center text-inactive flex items-center ${roboto_mono.className}`}
                    >
                        {index + 1 < 10 ? <span>&nbsp;</span> : null}
                        {index + 1}
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* track name */}
                    <div className="text-base">{name}</div>
                    {/* track artists */}
                    <div className="flex text-inactive">
                        {artists.map((artist, index) => (
                            <div key={index} className="flex">
                                <Link
                                    href={`/artist/${artist.id}`}
                                    className="hover:underline text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {artist.name}
                                </Link>
                                {index === artists.length - 1 ? null : (
                                    <div className="mr-1">,</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="self-center text-inactive text-sm w-[20%] text-nowrap text-ellipsis overflow-hidden">
                {album.name}
            </div>
            <div className="self-center text-inactive text-sm w-[20%]">
                {addedAt.split("-")[0]}
            </div>
            {/* 歌曲持續時間 */}
            <div
                className={`self-center mr-10 text-sm text-inactive ${roboto_mono.className} cursor-pointer w-[10%]`}
            >
                0:00
            </div>
        </div>
    );
}
