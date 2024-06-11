import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-4 pb-[50px] pt-[300px] bg-primary">
            <div className=" flex justify-center">
                <hr className="w-[98%] bg-inactive/10 mb-3 h-[1px] border-none" />
            </div>
            <div className="flex justify-between px-10">
                <div>
                    <div>Contact us</div>
                    <div className="text-inactive">contact@96buh.tech</div>
                </div>
                <div className="flex justify-center items-center self-center bg-secondary rounded-full w-10 h-10 hover:bg-neutral-500/10 cursor-pointer">
                    <Link href="https://github.com/96buh/spotify-clone">
                        <GitHubIcon />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
