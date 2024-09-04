import { useEffect, useRef, useState } from "react";
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
import usePlaybackStore from "@/store/PlayBackStore";

const PlaySongs = () => {
  const {
    isPlaying,
    currentTrack,
    setPlaying,
    volume,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    isShuffle,
    isRepeat,
  } = usePlaybackStore();

  const [currentTime, setCurrentTime] = useState(0);
  const [showPlayingScreen, setShowPlayingScreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing the audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => setPlaying(!isPlaying);

  const togglePlayingScreen = () => setShowPlayingScreen(!showPlayingScreen);

  return (
    <div>
      <footer className="h-20 bg-[#121212] border-t flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-white">
          <div className="w-14 h-14 bg-muted">
            {currentTrack?.image ? (
              <img
                src={currentTrack.image}
                alt="Album Art"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-image.png"; // Local fallback image
                }}
              />
            ) : (
              <img
                src="/fallback-image.png"
                alt="Fallback Album Art"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="font-semibold">
              {currentTrack ? currentTrack.title : "Song Title"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {currentTrack ? currentTrack.artist : "Artist Name"}
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
                className={`h-4 w-4 ${isShuffle ? "text-green-500" : ""}`}
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
                className={`h-4 w-4 ${isRepeat ? "text-green-500" : ""}`}
              />
            </Button>
          </div>
          <Slider
            className="w-[400px] mt-2"
            value={[currentTime]}
            onValueChange={handleSeek}
            max={audioRef.current?.duration || 100}
            step={1}
          />
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <Slider
            className="w-[100px]"
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            max={100}
            step={1}
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
        <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col">
          <Button
            variant="ghost"
            className="absolute top-4 right-4 border-none"
            onClick={togglePlayingScreen}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 bg-muted mx-auto mb-8">
                {currentTrack?.image ? (
                  <img
                    src={currentTrack.image}
                    alt="Album Art"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.png";
                    }}
                  />
                ) : (
                  <img
                    src="/fallback-image.png"
                    alt="Fallback Album Art"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {currentTrack ? currentTrack.title : "Song Title"}
              </h2>
              <p className="text-muted-foreground">
                {currentTrack ? currentTrack.artist : "Artist Name"}
              </p>
            </div>
          </div>
          <div className="h-40 flex flex-col items-center justify-center">
            <Slider
              className="w-[80%] max-w-[400px] mb-4"
              value={[currentTime]}
              onValueChange={handleSeek}
              max={audioRef.current?.duration || 100}
              step={1}
            />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="border-none"
                onClick={toggleShuffle}
              >
                <Shuffle
                  className={`h-6 w-6 ${isShuffle ? "text-green-500" : ""}`}
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
                  className={`h-6 w-6 ${isRepeat ? "text-green-500" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentTrack?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onError={() => console.error("Failed to load audio source.")}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  );
};

export default PlaySongs;
