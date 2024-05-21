import VolumeSlider from "./VolumeSlider";
import YouTubePlayer from "./text";
import LikeBtn from "./LikeBtn";

export default function Player() {
    return (
        <div className="flex items-center  fixed bottom-0 w-full bg-black h-20">
            <YouTubePlayer videoId="X_qN-jh9kuA" />
            <LikeBtn />
            <VolumeSlider />
        </div>
    );
}
