import {useCallback, useEffect, useState, useRef} from "react";
import SoundPlayer, {SoundPlayerEventData} from "react-native-sound-player";
import {useDispatch} from "react-redux";
import {updateFavorites} from "../redux/slices/meditationSlice";

export default function usePlayer({uri}: {uri: string}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicLoading, setIsMusicLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const [repeat, setRepeat] = useState(false);
  // Ref to track if the component is mounted
  const isMounted = useRef(true);

  // Memoized play function
  const play = useCallback(() => {
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
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isPaused, isLoaded, uri]);

  // Memoized pause function
  const pause = useCallback(() => {
    try {
      SoundPlayer.pause();
      setIsPlaying(false);
      setIsPaused(true);
    } catch (error) {
      console.log("Error pausing:", error);
    }
  }, []);

  // Memoized stop function
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

  // Memoized loop function
  const loop = useCallback(() => {
    setRepeat(prev => !prev);
  }, []);

  // Memoized seek function
  const forward = useCallback(async (seconds: number) => {
    try {
      const info = await SoundPlayer.getInfo();
      const newTime = Math.max(0, Math.min(info.duration, info.currentTime + seconds));
      await SoundPlayer.seek(newTime);
      setCurrentTime(newTime);
      setProgress(newTime / info.duration);
    } catch (error) {
      console.log("Error seeking:", error);
    }
  }, []);

  // Load the track only once when the URI changes
  useEffect(() => {
    const loadAndPlayTrack = () => {
      try {
        SoundPlayer.loadUrl(uri);
        setIsLoaded(true);
        setIsMusicLoading(false);
        SoundPlayer.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Error loading track:", error);
        setIsMusicLoading(false);
      }
    };

    if (!isLoaded && isMounted.current) {
      loadAndPlayTrack();
    }
  }, [uri, isLoaded]);

  // Set up event listeners and time updates
  useEffect(() => {
    if (!isMounted.current) return;

    const loadingListener = SoundPlayer.addEventListener("FinishedLoadingURL", () => {
      setIsMusicLoading(false);
      setIsLoaded(true);
    });

    const finishedPlayingEvent = SoundPlayer.addEventListener("FinishedPlaying", () => {
      if (repeat && !isPaused) {
        // Small delay to prevent immediate replay
        setTimeout(() => {
          play();
        }, 100);
      } else {
        stop();
      }
    });

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
    };
  }, [isPlaying, isPaused, repeat, play, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      stop();
    };
  }, [stop]);

  return {
    isMusicLoading,
    isPlaying,
    isPaused,
    repeat,
    currentTime,
    duration,
    progress,
    play,
    pause,
    stop,
    loop,
    forward,
  };
}
