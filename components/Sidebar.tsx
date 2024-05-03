import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="flex flex-col flex-grow  ml-1 h-screen max-w-60 ">
            <div className="bg-primary flex flex-col rounded-md px-3 py-2 mt-1">
                <Link
                    href={"/"}
                    className="flex items-center mb-2 text-inactive hover:text-white transition-[0.3s]"
                >
                    <HomeIcon />
                    <p className="ml-3 font-bold">首頁</p>
                </Link>
                <Link
                    href={"/search"}
                    className="flex items-center text-inactive hover:text-white transition-[0.3s]"
                >
                    <SearchIcon />
                    <p className="ml-3 font-bold">搜尋</p>
                </Link>
            </div>
            <div className="bg-primary px-3 py-2 mt-1  rounded-tl-md rounded-tr-md text-inactive flex">
                <LibraryMusicIcon />
                <span className="ml-3">你的音樂庫</span>
            </div>
            {/* Playlists */}
            <div className="bg-primary rounded-bl-md rounded-br-md px-3 py-2 flex-grow overflow-hidden hover:overflow-y-auto">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
        </div>
    );
}