import { getAlbum } from "@/apis/spotify";
import AlbumTrack from "./AlbumTrack";

export default async function TracksContainer({ id }: { id: string }) {
    const data = await getAlbum(id);

    return (
        <div>
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
