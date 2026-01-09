"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import LeftSide from "@/components/left";
import MidSide from "@/components/mid";
import { PlayerProvider } from "@/components/playerContext";
import { PlaylistProvid } from "@/components/playlistContext";
import RightSide from "@/components/right";
import { useState } from "react";
import { GoGrabber } from "react-icons/go";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";


export default function Home() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  return (
    <>
    <PlaylistProvid>
      <PlayerProvider>
    <div className="h-screen overflow-hidden">
        <Header/>
        <div className="h-200 z-0">
             <PanelGroup direction="horizontal">
                <Panel maxSize={23} minSize={10}>
                   left
                   <LeftSide/>
                 </Panel>
                 <PanelResizeHandle >
                  <GoGrabber className="mt-100" size={20}/>
                 </PanelResizeHandle>
                 <Panel minSize={30}>
                   middle
                   <MidSide selectedPlaylistId={selectedPlaylistId}/>
                 </Panel>
                 <PanelResizeHandle >
                  <GoGrabber className="mt-100" size={20}/>
                 </PanelResizeHandle>
                 <Panel maxSize={15} minSize={7}>
                   right
                   <RightSide/>
                 </Panel>
            </PanelGroup>
        </div>
                <Footer className='fixed bottom-0 left-0 w-full z-50'/>
    </div>
    </PlayerProvider>
  </PlaylistProvid>
</>

  );
}
