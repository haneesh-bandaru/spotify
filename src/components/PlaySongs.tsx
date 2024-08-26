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
import { useState } from "react";

const PlaySongs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayingScreen, setShowPlayingScreen] = useState(false);
  const togglePlay = () => setIsPlaying(!isPlaying);
  const togglePlayingScreen = () => setShowPlayingScreen(!showPlayingScreen);
  return (
    <div className="">
      <footer className="h-20  bg-[#121212] border-t flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-white">
          <div className="w-14 h-14 bg-muted"></div>
          <div>
            <h4 className="font-semibold">Song Title</h4>
            <p className="text-sm text-muted-foreground">Artist Name</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="border-none">
              <Shuffle className="h-4 w-4" />
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
            <Button variant="ghost" size="icon" className="border-none">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <Slider
            className="w-[400px] mt-2"
            defaultValue={[33]}
            max={100}
            step={1}
          />
        </div>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          <Slider
            className="w-[100px]"
            defaultValue={[66]}
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
              <div className="w-64 h-64 bg-muted mx-auto mb-8"></div>
              <h2 className="text-2xl font-bold text-white">Song Title</h2>
              <p className="text-muted-foreground">Artist Name</p>
            </div>
          </div>
          <div className="h-40 flex flex-col items-center justify-center">
            <Slider
              className="w-[80%] max-w-[400px] mb-4"
              defaultValue={[33]}
              max={100}
              step={1}
            />
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="border-none">
                <Shuffle className="h-6 w-6" />
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
              <Button variant="ghost" size="icon" className="border-none">
                <Repeat className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaySongs;
