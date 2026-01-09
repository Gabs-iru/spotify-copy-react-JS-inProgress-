'use client'

import { useEffect, useRef, useState } from "react"
import { FaFolder, FaMusic } from "react-icons/fa6"
import { FiPlus } from "react-icons/fi"
import { HiUsers } from "react-icons/hi2"


export default function MenuP({ setModal }){
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    
    
    useEffect(() =>{
        function clickOutside(e){
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", clickOutside)
        return()=> removeEventListener("mousedown", clickOutside)
    }, [])
    
    return(
        <div ref={menuRef} className="z-15">
            
            <button onClick={() => setOpen(!open)} className="flex cursor-pointer hover:text-white">
                <FiPlus size={24} className="text-[#9ea1a3] "/> Criar
            </button>

        {open && (
            <div ref={menuRef} className="absolute bg-[#202021] w-110 rounded-xl p-2">
                <div className="flex m-2 cursor-pointer rounded-xl hover:bg-[#3d3d40]" onClick={() => setModal(true)}>
                    <FaMusic size={25} className="m-2 cursor-pointer"/>
                    <button className="flex flex-col m-1 text-left cursor-pointer" ><p className="cursor-pointer">Playlist</p> <p className="cursor-pointer mr-5 text-[13px] font-light text-[#9ea1a3]">Crie uma playlist com músicas ou episodios</p></button>
                    
                </div>
                <hr/>
                <div className="flex m-2 cursor-pointer rounded-xl hover:bg-[#3d3d40]">
                    <HiUsers size={25} className="m-2 cursor-pointer"/>
                    <button className="flex m-1 justify-around flex-col text-left cursor-pointer"><p className="cursor-pointer">Match</p><p className="cursor-pointer mr-5 text-[13px] font-light text-[#9ea1a3]">Junte os gostos musicais da sua galera em uma playlist</p></button>
                </div>
                <div className="flex m-2 cursor-pointer rounded-xl hover:bg-[#3d3d40]">
                    <FaFolder size={25} className="m-2"/>
                    <button className="flex m-1 justify-around flex-col text-left"><p className="cursor-pointer">Pasta</p><p className="mr-5 text-[13px] font-light text-[#9ea1a3] cursor-pointer">Organize suas playlists</p></button>
                </div>
            </div>
           
        )}
        </div>


    )
}