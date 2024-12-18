import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Repeat, X } from "lucide-react";
import "./youtube_loop.css";

const YouTubeABLoop = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=lN8xbrzvggA&ab_channel=JazzTutorial%7CwithJulianBradley"
  );
  const [videoId, setVideoId] = useState("");
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (videoId) createPlayer(videoId);
      };
    } else if (videoId) {
      createPlayer(videoId);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [videoId]);
  useEffect(() => {
    if (playerRef.current) {
      startTimeTracking(startTime, endTime);
    }
  }, [startTime, endTime, isLooping]);
  useEffect(() => {
    loadVideo();
  }, [videoUrl]);
  const createPlayer = (id) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: id,
      playerVars: {
        autoplay: 0,
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = (event) => {
    const duration = event.target.getDuration();
    setVideoMetadata({
      duration: duration,
      title: event.target.getVideoData().title,
    });

    // 初期のデフォルト設定
    setEndTime(duration);
  };

  const onPlayerStateChange = (event) => {
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        startTimeTracking();
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        stopTimeTracking();
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        stopTimeTracking();
        if (isLooping) {
          playerRef.current.seekTo(startTime);
          playerRef.current.playVideo();
        }
        break;
    }
  };
  const startTimeTracking = (start, end) => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);
      console.log(end);
      console.log(isLooping);
      console.log(start);
      if (isLooping && currentTime >= endTime) {
        playerRef.current.seekTo(startTime);
      }
    }, 100);
  };

  const stopTimeTracking = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const loadVideo = () => {
    const extractedId = extractVideoId(videoUrl);
    if (extractedId) {
      setVideoId(extractedId);
    } else {
      alert("Please enter a valid YouTube video URL");
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleLooping = () => {
    setIsLooping(!isLooping);
    if (playerRef.current) {
      playerRef.current.seekTo(startTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = parseFloat(e.target.value);
    if (
      newStartTime >= 0 &&
      newStartTime < (videoMetadata?.duration || Infinity)
    ) {
      setStartTime(newStartTime);

      // エンドタイムが開始時間より前の場合は調整
      if (newStartTime >= endTime) {
        setEndTime(videoMetadata.duration);
      }
    }
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = parseFloat(e.target.value);
    if (
      newEndTime > startTime &&
      newEndTime <= (videoMetadata?.duration || Infinity)
    ) {
      setEndTime(newEndTime);
      console.log("endtime updated" + newEndTime);
    }
  };

  const setCurrentTimeAsStart = () => {
    setStartTime(currentTime);
  };

  const setCurrentTimeAsEnd = () => {
    setEndTime(currentTime);
  };

  return (
    <div className="aab-loop-container">
      <div className="video-area">
        <div className="url-input-container">
          <div>Please paste YouTube URL or Video ID</div>
          <input
            type="text"
            placeholder="Please paste YouTube URL or ID"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <div className="player-container">
          <div id="youtube-player" className="youtube-player"></div>

          {videoMetadata && (
            <div className="video-info">
              <span>{videoMetadata.title}</span>
            </div>
          )}
        </div>

        <div className="ab-loop-controls">
          <div className="slidebar-multithumb">
            <p className="thumb-1-title">{formatTime(startTime)}</p>
            <input
              className="thumb-1-input"
              type="range"
              value={startTime}
              onChange={handleStartTimeChange}
              step="0.1"
              min="0"
              max={videoMetadata?.duration || 0}
            />
            <p className="thumb-2-title">{formatTime(endTime)}</p>
            <input
              className="thumb-2-input"
              type="range"
              value={endTime}
              onChange={handleEndTimeChange}
              step="0.1"
              min={startTime}
              max={videoMetadata?.duration || 0}
            />

            <div
              className="thumb-3"
              style={{
                width: `${
                  (currentTime / (videoMetadata?.duration || 1)) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="control-buttons">
            <button onClick={togglePlayPause} disabled={!videoId}>
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <button
              onClick={toggleLooping}
              className={isLooping ? "active" : ""}
              disabled={!videoId}
            >
              <Repeat />
            </button>
          </div>
          <button onClick={setCurrentTimeAsStart}>
            Set the starting time to the current time.
          </button>
          <button onClick={setCurrentTimeAsEnd}>
            Set the ending time to the current time.
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeABLoop;
