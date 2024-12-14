import { Route, Routes } from "react-router";
import Home from "./components/home.tsx";
import ExplorePage from "./components/ExplorePage.tsx";
import Albums from "./components/AlbumArtist.tsx";

function App() {

  return (
    <main className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/artist" element={<Albums passData="artist"/>}/>
        <Route path="/albums" element={<Albums passData="albums"/>}/>
      </Routes>
    </main>
  )
}

export default App
