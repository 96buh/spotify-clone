import { getPlaylist } from "@/apis/spotify";
import { getLikedTracks, getUser } from "@/app/actions";
import { redirect } from "next/navigation";
import PlaylistTrack from "./PlaylistTrack";
import { hasAlbum } from "@/lib/types";

export default async function PlaylistTrackContainer({ id }: { id: string }) {
    let data;
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }

    if (id) {
        data = await getPlaylist(id);
    } else {
        data = await getLikedTracks(user.id);
    }

    return (
        <div>
            {data.tracks.map((track, index) => (
                <PlaylistTrack
                    key={track.id}
                    name={track.name}
                    index={index}
                    id={track.id}
                    duration={track.duration}
                    artists={track.artists}
                    addedAt={track.addedAt}
                    album={hasAlbum(track) ? track.album : { name: "", id: "" }}
                />
            ))}
        </div>
    );
}
