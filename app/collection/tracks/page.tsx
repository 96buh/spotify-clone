import Footer from "@/components/Footer";
import PlaylistHeader from "@/components/PlaylistHeader";
import PlaylistTrackContainer from "@/components/PlaylistTrackContainer";

export default function CollectionPage() {
    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[50px]">
            <PlaylistHeader id="" />
            <PlaylistTrackContainer id="" />
            <Footer />
        </div>
    );
}
