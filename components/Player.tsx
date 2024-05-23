import VolumeSlider from "./VolumeSlider";
import YouTubePlayer from "./YoutubePlayer";
import LikeBtn from "./LikeBtn";

export default function Player() {
    return (
        <div className="flex justify-between items-center fixed bottom-0 w-full bg-black h-20">
            <div>
            </div>
            <div>
                <YouTubePlayer videoId="X_qN-jh9kuA" />
            </div>
            <div className="flex justify-end">
                <LikeBtn />
                <VolumeSlider />
            </div>
        </div>
    );
}
