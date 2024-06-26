import { search } from "@/apis/spotify";
import RoundedCard from "@/components/RoundedCard";
import ProfileDiscography from "@/components/ProfileDiscography";
import AlbumTrack from "@/components/AlbumTrack";
import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import Footer from "@/components/Footer";
export default async function SearchPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";

    const data = await search(query);

    if (query === "") {
        return (
            <div className="flex flex-col h-full pb-[50px]">
                <div className="flex flex-col px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
                    <SearchForm />
                </div>
                <div className="mt-auto">
                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[50px]">
            <SearchForm />
            <Suspense>
                <div className="ml-4 pt-4">
                    <div className="text-2xl font-bold">歌曲</div>
                    <div>
                        {data?.trackData?.map((track, index) => {
                            return (
                                <AlbumTrack
                                    key={index}
                                    id={track.id}
                                    index={index}
                                    name={track.name}
                                    artists={track.artists}
                                    duration={track.duration}
                                    cover={track.cover}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="ml-4 pt-4">
                    <div className="text-2xl font-bold">專輯</div>
                    <div className="flex flex-wrap">
                        {data?.albumData?.map((album, index) => (
                            <ProfileDiscography
                                key={index}
                                id={album.id}
                                image={album.image}
                                type={album.type}
                                name={album.name}
                                releaseDate={album.releaseDate}
                            />
                        ))}
                    </div>
                </div>
                <div className="ml-4 pt-4">
                    <div className="text-2xl font-bold">歌手</div>
                    <div className="flex flex-wrap">
                        {data?.artistData?.map((artist, index) => {
                            if (artist.image === undefined) {
                                return null;
                            } else {
                                return (
                                    <RoundedCard
                                        key={index}
                                        id={artist.id}
                                        name={artist.name}
                                        image={artist.image}
                                        description="artist"
                                        size="small"
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
                <Footer />
            </Suspense>
        </div>
    );
}
