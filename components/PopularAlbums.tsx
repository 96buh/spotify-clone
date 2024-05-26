import { searchAlbums } from "@/apis/spotify";
import { createClient } from "@/utils/supabase/server";
import SquareCard from "./SquareCard";
export default async function PopularAlbums() {
    const supabase = createClient();

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("albums");
    // 獲取每周受歡迎的十個專輯的ID
    const searchMultipleAlbums = async (albums: string[]) => {
        const serachPromises = albums.map((name) => searchAlbums(name));
        const result = await Promise.all(serachPromises);

        return result;
    };

    const albumNames = weeklyTopData?.map((o) => o.albums) || [];
    const data = await searchMultipleAlbums(albumNames);

    return (
        <div>
            <h1 className="font-bold ml-4 mb-2 mt-10 text-3xl select-none">
                Popular Albums
            </h1>
            <div className="flex w-scrren select-none overflow-hidden flex-wrap ">
                {data.map((o) => (
                    <SquareCard
                        key={data.indexOf(o)}
                        name={o.albumName}
                        image={o.cover}
                        description={o.artist}
                    />
                ))}
            </div>
        </div>
    );
}
