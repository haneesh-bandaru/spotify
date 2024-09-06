import {
  Maximize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";
import usePlaybackStore from "@/store/PlayBackStore";
import API from "@/services/API";

const PlaySongs = () => {
  const [showPlayingScreen, setShowPlayingScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const {
    isPlaying,
    currentTrack,
    volume,
    isShuffle,
    isRepeat,
    trackId,
    setPlaying,
    setTrack,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = usePlaybackStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchTrackData = async (id) => {
    try {
      const response = await API.get.getSongsFromSaavan(id);
      try {
        const lyr = await API.get.getLyricsFromSong(id);
        setLyrics(lyr.data.data.lyrics);
      } catch (error) {}
      return response.data.data[0];
    } catch (error) {
      console.error("Failed to fetch track data:", error);
      return null;
    }
  };

  const formattedLyrics = lyrics.replace(/<br>/g, "\n");

  useEffect(() => {
    const loadTrackData = async () => {
      if (!trackId) return;
      const trackData = await fetchTrackData(trackId);
      if (trackData) {
        const highQualityUrl = trackData.downloadUrl.find(
          (url) => url.quality === "320kbps"
        )?.url;

        setTrack({
          id: trackData.id,
          title: trackData.name,
          artist: trackData.artists.primary[0]?.name || "Unknown Artist",
          duration: trackData.duration,
          image: trackData.image?.[2]?.url || null,
          audioUrl: highQualityUrl || "",
        });

        if (audioRef.current && highQualityUrl) {
          audioRef.current.src = highQualityUrl;
          audioRef.current.volume = volume / 100;
          audioRef.current.play();
          setPlaying(true);
        }
      }
    };

    loadTrackData();
  }, [trackId]);

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });

      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setPlaying(!isPlaying);
  };

  const togglePlayingScreen = () => setShowPlayingScreen(!showPlayingScreen);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSliderChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="">
      <footer className="h-20 bg-background border-t flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-text">
          <div className="w-14 h-14 bg-muted">
            {currentTrack?.image && (
              <img
                src={currentTrack.image}
                alt="Track Art"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="font-semibold">
              {currentTrack?.title || "Song Title"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {currentTrack?.artist || "Artist Name"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="border-none"
              onClick={toggleShuffle}
            >
              <Shuffle
                className={`h-4 w-4 ${isShuffle ? "text-blue-500" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon" className="border-none">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={togglePlay}
              className="border-none"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="border-none">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="border-none"
              onClick={toggleRepeat}
            >
              <Repeat
                className={`h-4 w-4 ${isRepeat ? "text-blue-500" : ""}`}
              />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <Slider
              className="w-[400px] mt-2"
              value={[(currentTime / duration) * 100 || 0]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
            />
            <span className="text-sm text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <Slider
            className="w-[100px]"
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => {
              setVolume(value[0]);
              if (audioRef.current) {
                audioRef.current.volume = value[0] / 100;
              }
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayingScreen}
            className="border-none"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </footer>

      {showPlayingScreen && (
        <div className=" fixed inset-0 bg-background z-50 flex flex-col">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: currentTrack
                ? `url(${currentTrack?.image})`
                : "none",
              filter: "brightness(50%) blur(10px)",
            }}
          ></div>
          <Button
            variant="ghost"
            className="relative w-10 top-4 left-[96vw] border-none cursor-pointer"
            onClick={togglePlayingScreen}
          >
            X
          </Button>
          <div className="relative flex-1 flex items-center justify-around">
            <div className="text-center">
              <div className="w-64 h-64 bg-muted mx-auto mb-8">
                {currentTrack?.image && (
                  <img
                    src={currentTrack.image}
                    alt="Track Art"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <h2 className="whitespace-pre-wrap break-words w-64 text-2xl font-bold text-text">
                {currentTrack?.title || "Song Title"}
              </h2>
              <span className="text-muted-foreground">
                {currentTrack?.artist || "Artist Name"}
              </span>
            </div>
            <div className="max-w-3xl p-4 bg-gray-100 rounded-lg shadow-lg">
              <pre className="whitespace-pre-wrap h-96 break-words text-gray-800 text-base overflow-scroll">
                {formattedLyrics}
              </pre>
            </div>
          </div>
          <div className="relative h-40 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <Slider
                className="w-[400px] mt-2"
                value={[(currentTime / duration) * 100 || 0]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
              />
              <span className="text-sm text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="border-none"
                onClick={toggleShuffle}
              >
                <Shuffle
                  className={`h-6 w-6 ${isShuffle ? "text-blue-500" : ""}`}
                />
              </Button>
              <Button variant="ghost" size="icon" className="border-none">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-12 w-12 border-none"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="border-none">
                <SkipForward className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="border-none"
                onClick={toggleRepeat}
              >
                <Repeat
                  className={`h-6 w-6 ${isRepeat ? "text-blue-500" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Audio player */}
      <audio ref={audioRef} onEnded={() => setPlaying(false)} />
    </div>
  );
};

export default PlaySongs;
