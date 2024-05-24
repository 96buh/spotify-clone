import AlbumHeader from "@/components/AlbumHeader";
import AlbumTrack from "@/components/AlbumTrack";
import { getAlbum } from "@/apis/spotify";

export default async function AlbumPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const data = await getAlbum(id);

    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <AlbumHeader id={id} />
            {data.tracks.map((track, index) => (
                <AlbumTrack
                    key={track.id}
                    index={index}
                    name={track.name}
                    artists={track.artists}
                    duration={track.duration}
                />
            ))}
        </div>
    );
}
