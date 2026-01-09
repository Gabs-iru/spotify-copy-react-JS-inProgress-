import { useState } from "react";
import { FaRandom } from "react-icons/fa";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { usePlayer } from "./playerContext";

export default function Footer(){
    const {
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    toggleLoop,
    loop,
    currentTrack,
    currentTime,
    duration,
    seekTo,
  } = usePlayer();
    const progress = duration ? (currentTime / duration) * 100 : 0;
    const remaining = duration - currentTime;
    const [repeat, setRepeat] = useState(false)



const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };

  const formatTime = (t) => {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

    return(
        <>
        <div className="bg-black w-full  flex items-center p-4 relative">
  
  <div className="flex flex-col items-center flex-shrink-0">
    <img src="vinil.png" className={`w-12 h-12 rounded-full ${isPlaying ? 'spin' : ''}`} alt="Vinil" />
  </div>

 
  <div className="flex flex-col justify-center ml-4">
    <p className="text-white font-semibold">{currentTrack?.name || "Música"}</p>
    <p className="text-gray-400 text-sm">{currentTrack?.artist || "Artista/Banda"}</p>
  </div>

  
  <div className="flex-1 flex flex-col items-center mr-35">
   
    <div className="flex items-center space-x-4 mb-2">
      <button><FaRandom size={20} className="text-white cursor-pointer"/></button>
      <button onClick={() => playPrev()}><IoPlaySkipBackSharp  size={30} className="text-white cursor-pointer"/></button>
      <button onClick={togglePlay}>
        {isPlaying ? (
          <FaCirclePause size={35} className="text-white transition-all duration-300 cursor-pointer" />
        ) : (
          <FaCirclePlay size={35} className="text-white transition-all duration-300 cursor-pointer" />
        )}
      </button>
      <button onClick={playNext}><IoPlaySkipForward  size={30} className="text-white cursor-pointer"/></button>
      <button onClick={toggleLoop}>
        {loop ? <LuRepeat1 size={23} className="text-white cursor-pointer"/> : <LuRepeat size={23} className="text-white cursor-pointer"/>}
      </button>
    </div>

   
    <div
      className="w-80 h-2 bg-gray-700 rounded relative cursor-pointer"
      onClick={handleSeek}
    >
      <div
        className="absolute top-0 left-0 h-2 bg-green-500 rounded"
        style={{ width: `${progress}%`, transition: "width 0.3s linear" }}
      />
      
      <span className="text-xs text-white absolute -top-5 left-0">{formatTime(currentTime)}</span>
      
      <span className="text-xs text-white absolute -top-5 right-0">{formatTime(remaining)}</span>
    </div>
  </div>
</div>

        </>
    )
}