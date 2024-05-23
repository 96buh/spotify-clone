import dynamic from "next/dynamic";
const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

import Image from "next/image";
export default function RoundedCard({
    name,
    image,
    type,
}: {
    name: string;
    image: any;
    type: string;
}) {
    return (
        <div className="relative group p-3 mt-1 hover:bg-neutral-500/10 transition group">
            <Image
                className="aspect-[548/840] rounded-full w-[200px] h-[200px]"
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
            />
            <PlayBtn />
            <h2 className="text-white mt-2">{name}</h2>
            <h4 className="text-type">{type}</h4>
        </div>
    );
}
