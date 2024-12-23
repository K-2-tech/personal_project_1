import React, { useState, useRef, useEffect, } from "react";
import { Play, Pause, Repeat} from "lucide-react";
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
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0); 
  /*urlが変更されたらID抽出 */
  useEffect(() => {
    extractVideoId();
  }, [videoUrl]);
  /*IDが変更されたらプレイヤー作成 */
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
  /*startTime,endTimeが変更されたら*/
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const current = playerRef.current.getCurrentTime();
      setCurrentTime(current);
      if (isLooping && currentTime >= endTime) {
        playerRef.current.seekTo(startTime);
      }
    }, 100);
  }, [startTime, endTime, isLooping, currentTime]);
  useEffect(() => { // DOMが完全にロードされた後に要素の幅を取得
   if (elementRef.current) { setWidth(elementRef.current.offsetWidth); } }, []);
    
  /*以下関数 */
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
        
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
      
        if (isLooping) {
          playerRef.current.seekTo(startTime);
          playerRef.current.playVideo();
        }
        break;
    }
  };

  const extractVideoId = () => {
    const url = videoUrl;
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (match) {
      const extractedId = match[1];
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
          <div>Please paste YouTube URL or ID</div>
          <input
            type="text"
            placeholder="Please paste YouTube URL or ID"
            value={videoUrl}
            autocomplete="videoUrl"
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
          <div className="slidebar-multithumb" ref={elementRef}>
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
              max={videoMetadata?.duration || 0}
            />

            <div
              className="thumb-3"
              style={{
                transform: `translate(${
                   width * currentTime / (videoMetadata?.duration || 0) 
                  }px,0)`
              }}
            ></div>
          </div>
          <div className="control-icons">
            <button onClick={togglePlayPause} disabled={!videoId} aria-label="play or pause">
              {isPlaying ? <Pause color="red"/> : <Play />}
            </button>

            <button
              onClick={toggleLooping}
              className={isLooping ? "looping-active" : ""}
              disabled={!videoId}
              aria-label="loop or not"
            >
              <Repeat />
            </button>
          </div>
          <div className="control-buttons"><button onClick={setCurrentTimeAsStart}>
           
            Set the <p className="setStartTime-button">starting time</p> to the current time.</button>
            <button onClick={setCurrentTimeAsEnd}>
              Set the <p className="setEndTime-button">ending time</p> to the current time.</button>
          </div>
            

        </div>
      </div>
    </div>
  );
};

export default YouTubeABLoop;