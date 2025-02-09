import {useCallback, useEffect, useState} from "react";
import SoundPlayer, {SoundPlayerEventData} from "react-native-sound-player";

export default function usePlayer({uri}: {uri: string}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicLoading, setIsMusicLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const [repeat, setRepeat] = useState(false);

  const play = useCallback(async () => {
    try {
      if (isPaused) {
        // Resume from paused state
        SoundPlayer.resume();
        setIsPaused(false);
        setIsPlaying(true);
      } else if (!isLoaded) {
        // Initial load and play
        SoundPlayer.loadUrl(uri);
        setIsLoaded(true);
        SoundPlayer.play();
        setIsPlaying(true);
      } else {
        // Already loaded, just play
        SoundPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Error playing:", error);
      // Reset states on error
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isPaused, isLoaded, uri]);

  const pause = useCallback(() => {
    SoundPlayer.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  const loop = useCallback(() => {
    setRepeat(prev => !prev);
  }, []);

  const forward = useCallback(async (seconds: number) => {
    try {
      const info = await SoundPlayer.getInfo();
      const newTime = Math.max(0, Math.min(info.duration, info.currentTime + seconds));
      SoundPlayer.seek(newTime);
      setCurrentTime(newTime);
      setProgress(newTime / info.duration);
    } catch (error) {
      console.log("Error seeking:", error);
    }
  }, []);

  const stop = useCallback(() => {
    try {
      SoundPlayer.stop();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
      setProgress(0);
      setIsLoaded(false);
    } catch (error) {
      console.log("Error stopping:", error);
    }
  }, []);

  useEffect(() => {
    // Initial load
    const loadTrack = () => {
      try {
        SoundPlayer.loadUrl(uri);
        setIsLoaded(true);
        setIsMusicLoading(false);
        play();
      } catch (error) {
        console.log("Error loading track:", error);
        setIsMusicLoading(false);
      }
    };
    loadTrack();

    const loadingListener = SoundPlayer.addEventListener("FinishedLoadingURL", (data: SoundPlayerEventData) => {
      setIsMusicLoading(false);
      setIsLoaded(true);
    });

    const finishedPlayingEvent = SoundPlayer.addEventListener("FinishedPlaying", (data: SoundPlayerEventData) => {
      if (repeat && !isPaused) {
        // Small delay to prevent immediate replay
        setTimeout(() => {
          play();
        }, 100);
      } else {
        stop();
      }
    });

    // Add time update listener
    let timeInterval: NodeJS.Timeout;
    if (isPlaying) {
      timeInterval = setInterval(async () => {
        try {
          const info = await SoundPlayer.getInfo();
          setCurrentTime(info.currentTime);
          setDuration(info.duration);
          setProgress(info.currentTime / info.duration);
        } catch (error) {
          console.log("Error getting current time:", error);
        }
      }, 1000);
    }

    return () => {
      loadingListener.remove();
      finishedPlayingEvent.remove();
      if (timeInterval) clearInterval(timeInterval);
      stop();
    };
  }, [isPlaying, isPaused, repeat, play, stop, uri]);

  return {isMusicLoading, isPlaying, progress, duration, currentTime, repeat, play, pause, loop, forward};
}
