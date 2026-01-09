import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loop, setLoop] = useState(false);
  const audioRef = useRef(null);
  

  // Lista de músicas da playlist atual
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  const playTrack = (file, songs = []) => {
    let url, name;
    if (file instanceof File) {
      url = URL.createObjectURL(file);
      name = file.name.replace(/\.[^/.]+$/, "");
    } else if (typeof file === "string") {
      url = file;
      name = "Música";
    }

    setCurrentTrack({ name, url });
    setPlaylistSongs(songs); // passa a lista da playlist
    const index = songs.findIndex((s) => s.url === url);
    setCurrentIndex(index >= 0 ? index : 0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
  if (!playlistSongs || playlistSongs.length === 0) return;

  let nextIndex = currentIndex + 1;
  if (nextIndex >= playlistSongs.length) {
    nextIndex = 0; // volta para a primeira música
  }

  setCurrentIndex(nextIndex);
  setCurrentTrack(playlistSongs[nextIndex]);
  setIsPlaying(true);
};

const playPrev = () => {
  if (!playlistSongs || playlistSongs.length === 0) return;

  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = playlistSongs.length - 1; // volta para a última música
  }

  setCurrentIndex(prevIndex);
  setCurrentTrack(playlistSongs[prevIndex]);
  setIsPlaying(true);
};
  const toggleLoop = () => setLoop(!loop);

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        loop,
        playlistSongs,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
        toggleLoop,
        seekTo,
        setPlaylistSongs,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.url || null}
        autoPlay={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (loop) audioRef.current.play();
          else playNext();
        }}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer deve ser usado dentro do PlayerProvider");
  return context;
}
