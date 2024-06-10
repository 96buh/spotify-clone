import dynamic from "next/dynamic";
const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

import Image from "next/image";
import Link from "next/link";
export default function RoundedCard({
    name,
    image,
    description,
    id,
    size,
}: {
    name: string;
    image: any;
    description: string;
    id: string;
    size: string;
}) {
    let style;
    if (size === "small") {
        style = "w-[150px] h-[150px]";
    } else {
        style = "w-[200px] h-[200px]";
    }
    return (
        <Link
            href={{ pathname: `/artist/${id}` }}
            className="relative group p-3 mt-1 hover:bg-neutral-500/10 transition group"
        >
            <Image
                className={`aspect-[548/840] rounded-full ${style} object-cover`}
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
                priority
            />
            <PlayBtn type="artist" id={id} on="card" size="large" />
            <h2 className="text-white mt-2 text-ellipsis text-nowrap overflow-hidden w-[150px]">
                {name}
            </h2>
            <h4 className="text-type">{description}</h4>
        </Link>
    );
}
