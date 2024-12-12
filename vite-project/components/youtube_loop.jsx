import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Repeat, X } from "lucide-react";
import "./youtube_loop.css";

const YouTubeABLoop = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

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

  const createPlayer = (id) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: id,
      playerVars: {
        autoplay: 0,
        controls: 0,
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
        break;
    }
  };

  const startTimeTracking = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);

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
      alert("有効なYouTube動画URLを入力してください");
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
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    if (!playerRef.current || !progressRef.current) return;

    const progressBar = progressRef.current;
    const clickPosition = e.nativeEvent.offsetX;
    const percentage = clickPosition / progressBar.offsetWidth;
    const newTime = percentage * videoMetadata.duration;

    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
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
    }
  };

  const setCurrentTimeAsStart = () => {
    setStartTime(currentTime);
  };

  const setCurrentTimeAsEnd = () => {
    setEndTime(currentTime);
  };

  return (
    <div className="advanced-ab-loop-container">
      <div className="video-area">
        <div className="url-input-container">
          <input
            type="text"
            placeholder="YouTubeビデオURLを入力"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button onClick={loadVideo}>読み込み</button>
        </div>

        <div className="player-container">
          <div id="youtube-player" className="youtube-player"></div>

          {videoMetadata && (
            <div className="video-info">
              <span>{videoMetadata.title}</span>
            </div>
          )}

          <div
            className="progress-bar"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="progress"
              style={{
                width: `${
                  (currentTime / (videoMetadata?.duration || 1)) * 100
                }%`,
              }}
            ></div>
            <div
              className="loop-range"
              style={{
                left: `${(startTime / (videoMetadata?.duration || 1)) * 100}%`,
                width: `${
                  ((endTime - startTime) / (videoMetadata?.duration || 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className="player-controls">
            <div className="time-controls">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(videoMetadata?.duration || 0)}</span>
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
          </div>
        </div>

        <div className="ab-loop-controls">
          <div className="loop-point">
            <label>開始点</label>
            <div className="loop-point-actions">
              <input
                type="number"
                value={startTime.toFixed(2)}
                onChange={handleStartTimeChange}
                step="0.1"
                min="0"
                max={videoMetadata?.duration || 0}
              />
              <button onClick={setCurrentTimeAsStart}>現在の位置</button>
            </div>
          </div>

          <div className="loop-point">
            <label>終了点</label>
            <div className="loop-point-actions">
              <input
                type="number"
                value={endTime.toFixed(2)}
                onChange={handleEndTimeChange}
                step="0.1"
                min={startTime}
                max={videoMetadata?.duration || 0}
              />
              <button onClick={setCurrentTimeAsEnd}>現在の位置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeABLoop;
