import { createContext, useContext, useState } from "react";

const playlistContext = createContext()

export function PlaylistProvid({children}){
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    return(
        <playlistContext.Provider value={{ playlists, setPlaylists, selectedPlaylistId, setSelectedPlaylistId }}>
            {children}
        </playlistContext.Provider>
    )
}

export function usePlaylists(){
    return useContext(playlistContext)
}