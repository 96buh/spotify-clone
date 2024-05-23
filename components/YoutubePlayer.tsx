"use client";
import React, { useEffect, useRef, useState } from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface YouTubePlayerProps {
    videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    const playerRef = useRef<YT.Player | null>(null);
    const iframeRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        // 检查 YouTube IFrame Player API 是否已经加载
        if (window.YT) {
            initializePlayer();
        } else {
            // 动态加载 YouTube IFrame Player API
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            if (firstScriptTag?.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
            // 创建一个全局变量以便 YouTube API 调用
            (window as any).onYouTubeIframeAPIReady = initializePlayer;
        }

        // 清除全局变量
        return () => {
            (window as any).onYouTubeIframeAPIReady = null;
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    const initializePlayer = () => {
        playerRef.current = new YT.Player(iframeRef.current!, {
            videoId,
            events: {
                onReady: onPlayerReady,
            },
            playerVars: {
                autoplay: 0, // 不自动播放
                controls: 0, // 隐藏播放器控件
                modestbranding: 1, // 减少 YouTube 品牌暴露
            },
        });
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
        // 可以在这里控制视频
        // event.target.playVideo(); // 自动播放视频
    };

    const togglePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div>
            <div id="player" ref={iframeRef} style={{ display: "none" }}></div>
            <button onClick={togglePlayPause} className="active:scale-[1.1]">
                {isPlaying ? (
                    <PauseCircleIcon fontSize="large" />
                ) : (
                    <PlayCircleIcon fontSize="large" />
                )}
            </button>
        </div>
    );
};

export default YouTubePlayer;
