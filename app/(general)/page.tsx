import PopularAlbums from "@/components/PopularAlbums";
import PopularArtists from "@/components/PopularArtists";
export default async function HomePage() {
    return (
        <div className=" py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <PopularArtists />

            <PopularAlbums />
        </div>
    );
}
