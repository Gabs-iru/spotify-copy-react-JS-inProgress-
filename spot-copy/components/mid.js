import PlaylistItem from "./playlistTemp";
import PlaylistPage from "./Playlists/[id]/playlistPage";
import { usePlaylists } from "./playlistContext";

export default function MidSide() {
  const { playlists, selectedPlaylistId } = usePlaylists();
  const playlist = playlists.find((p) => p.id === selectedPlaylistId);
  const bgColor = playlist?.bgColor || "#141414";

  if (playlist) {
    return (
      <div className="midsection flex-1 p-4">
        <PlaylistPage key={playlist.id} playlist={playlist} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] z-1">
      <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: bgColor }}>
          <div className="absolute inset-0 pointer-events-none"
    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}></div> 
                <div className="relative flex-1 p-4 z-10">
                  <div className="m-5 overflow-x-hidden overflow-y-auto">
                    <button className="cursor-pointer font-bold text-[14px] m-2 p-2 bg-[#454441] rounded-2xl hover:bg-[#54534f] focus:bg-white focus:text-black">
                      Tudo
                    </button>
                    <button className="cursor-pointer font-bold text-[14px] m-2 p-2 bg-[#454441] rounded-2xl hover:bg-[#54534f] focus:bg-white focus:text-black">
                      Músicas
                    </button>
                    <button className="cursor-pointer font-bold text-[14px] m-2 p-2 bg-[#454441] rounded-2xl hover:bg-[#54534f] focus:bg-white focus:text-black">
                      Podcasts
                    </button>
                  </div>
                  <PlaylistItem />
                </div>
               
      </div>
    </div>
  );
}
