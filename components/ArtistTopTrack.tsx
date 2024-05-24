import Image from "next/image";

export default function ArtistTopTrack({
    index,
    id,
    name,
    duration,
    image,
}: {
    index: number;
    id: string;
    name: string;
    duration: number;
    image: string;
}) {
    const mins = Math.floor(duration / 1000 / 60);
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    return (
        <div className="flex p-4 w-[55%] hover:bg-neutral-500/10 rounded-md">
            <div className="self-center mr-3 text-inactive">{index + 1}</div>
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
