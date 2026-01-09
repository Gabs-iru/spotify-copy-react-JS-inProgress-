'use client'
import { useEffect, useState } from "react";
import { usePlaylists } from "./playlistContext";

export default function PlaylistManager({modal, setModal}){
    const {playlists, setPlaylists} = usePlaylists()
    const[name, setName] = useState('')
    const[image, setImage] = useState(null)
    const[isPrivate, setIsPrivate] = useState(false)
    const [preview, setPreview] = useState(null);
    const [bgColor, setBgColor] = useState("#242424");

    useEffect(() => {
     if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

   const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

    const addPlaylist = async () =>{
        if (!name) return;

    let imageData = null;
    if (image) {
      try {
        imageData = await fileToDataUrl(image);
      } catch (err) {
        console.error('Erro convertendo imagem:', err);
      }
    }
     const newPlaylist = {
      id: Date.now(),
      name,
      image: imageData,
      private: isPrivate,
      bgColor,
    };
        
        setPlaylists(prev => [...prev, newPlaylist]);
        setIsPrivate(false)
        setName('')
        setImage(null)

    if (typeof setModal === 'function') setModal(false);
    }
    
    return(
        <div>
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 flex-col border-2 border-amber-50">
                    <div className="bg-black w-90 rounded-2xl p-4 flex items-center justify-center flex-col">
                            <div className="flex items-center justify-center flex-col m-4">
                               <label
                                    htmlFor="image-upload"
                                    className="w-32 h-32 border-2 border-dashed border-gray-500 flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-500 transition"
                                  >
                                    {preview ? (
                                      <img
                                        src={preview}
                                        alt="Prévia"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <span className="text-gray-400">+ Adicionar foto</span>
                                    )}
                                </label>
                                <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                
                                />
                                                                
                            </div>
                            {preview && (
                              <label
                                  onClick={handleRemoveImage}
                                  className="cursor-pointer bg-transparent hover:bg-orange-800 text-white px-3 py-1 rounded-md transition"
                                >
                                  Remover imagem
                                </label>
                            )}

                            <div className="m-1 flex flex-col items-center">
                                <label className="text-white mb-1 block">Escolha a cor de fundo:</label>
                                    <input
                                      type="color"
                                      value={bgColor}
                                      onChange={(e) => setBgColor(e.target.value)}
                                      className="w-16 h-8 border-none cursor-pointer"
                                    />
                                <h2 className="text-xl font-semibold mb-4 cursor-default">Nova Playlist</h2>

                                <input type="text" placeholder="Nome da Playlist" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#3d3d40] p-1 rounded" required></input>
                            </div>
                            <div className="m-1">
                              <label>
                                <input type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} />
                                <span>Privada</span>
                              </label>
                            </div>
                            <div>
                                <button onClick={addPlaylist} className="cursor-pointer hover:bg-[#3d3d40] p-2 rounded-2xl">
                                    Criar playlist
                                </button>
                            </div>
                            
                            <div className="m-4">
                                <button className="cursor-pointer hover:bg-[#3d3d40] p-2 rounded-2xl" onClick={() => typeof setModal === 'function' && setModal(false)}>Cancelar</button>
                            </div>
                            
                    </div>
                </div>
            )}
        </div>
    )
}