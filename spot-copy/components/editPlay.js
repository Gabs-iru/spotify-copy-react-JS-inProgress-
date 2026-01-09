import { useState } from "react";

export default function EditPlaylistPopup({ playlist, onClose, onSave }) {
  const [name, setName] = useState(playlist.name);
  const [isPrivate, setIsPrivate] = useState(playlist.private);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(playlist.image || null);
  const [bgColor, setBgColor] = useState("#242424");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

   const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    onSave({
      ...playlist,
      name,
      private: isPrivate,
      image: image ? URL.createObjectURL(image) : preview,
      bgColor
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#141414] p-6 rounded-xl flex flex-col">
        <h2 className="text-xl font-bold mb-4 ml-10">Editar Playlist</h2>
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
            <h2 className="text-xl font-bold mb-4">Editar Playlist</h2>
            <label className="text-white mb-1 block">Escolha a cor de fundo:</label>
                                    <input
                                      type="color"
                                      value={bgColor}
                                      onChange={(e) => setBgColor(e.target.value)}
                                      className="w-16 h-8 border-none cursor-pointer"
                                    />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 rounded bg-[#3d3d40] text-white"
        />
        <label className="mb-2">
          <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
          Privada
        </label>
        <div className="mt-4 flex gap-2">
          <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded">Salvar</button>
          <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  );
}