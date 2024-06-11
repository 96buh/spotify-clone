import Footer from "@/components/Footer";
import PopularAlbums from "@/components/PopularAlbums";
import PopularArtists from "@/components/PopularArtists";
export default async function HomePage() {
    return (
        <div className=" py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto scrollbar-thin pb-[50px]">
            <PopularArtists />
            <PopularAlbums />
            <Footer />
        </div>
    );
}
