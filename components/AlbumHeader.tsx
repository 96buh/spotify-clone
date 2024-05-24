import { getAlbum } from "@/apis/spotify";
import Image from "next/image";

type AlbumHeaderProps = {
    id: string;
};

export default async function AlbumHeader({ id }: AlbumHeaderProps) {
    const data = await getAlbum(id);
    let totalTime = 0;
    data.tracks.forEach((t) => {
        totalTime += t.duration;
    });
    const hour = Math.floor(totalTime / 1000 / 60 / 60);
    const mins = Math.floor((totalTime / 1000 / 60 / 60 - hour) * 60);

    return (
        // pb-5
        <div className="flex bg-gradient-to-b from-neutral-400 to-primary h-auto pt-14 pb-10">
            <Image
                className="mx-5 rounded-md shadow-2xl"
                src={data.cover}
                alt="img"
                width={200}
                height={200}
            />
            <div className="flex flex-col justify-end">
                <div className="mt-10 font-bold">專輯</div>
                <div className="text-[48px] font-bold">{data.name}</div>

                <div className="flex text-sm mb-1 font-bold">
                    <div>{data.artist}</div>
                </div>
            </div>
        </div>
    );
}
