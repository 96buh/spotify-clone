export default function AlbumTrack({
    index,
    name,
    artists,
    duration,
}: {
    index: number;
    name: string;
    artists: { name: string; id: string }[];
    duration: number;
}) {
    const mins = Math.floor(duration / 1000 / 60);
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    return (
        <div className="flex mx-3 justify-between py-2 hover:bg-neutral-500/10">
            <div className="flex">
                {/* index */}
                <div className="mx-4 self-center text-inactive">
                    {index + 1}
                </div>
                <div className="flex flex-col">
                    {/* track name */}
                    <div className="text-base">{name}</div>
                    {/* track artists */}
                    <div className="flex text-inactive">
                        {artists.length === 1 ? (
                            <div>
                                {artists.map(({ name }) => (
                                    <div key={name}>{name}</div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex">
                                {artists.map(({ name }, i) => (
                                    <div key={artists[i].id}>
                                        {name}
                                        {i === artists.length - 1 ? "" : ","}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="self-center mr-10">
                {mins}:{secs}
            </div>
        </div>
    );
}
