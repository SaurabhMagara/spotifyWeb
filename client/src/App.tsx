import { Route, Routes } from "react-router";
import Home from "./components/home.tsx";
import ExplorePage from "./components/ExplorePage.tsx";
import Albums from "./components/AlbumArtistNRPage.tsx";
import CategoriesPage from "./components/CategoriesPage.tsx";

function App() {

  return (
    <main className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<Albums passData="artist"/>}/>
        <Route path="/albums" element={<Albums passData="albums"/>}/>
        <Route path="/new-releases" element={<Albums passData="new-releases"/>}/>
        <Route path="/categories/:id" element={<CategoriesPage/>}/>
        <Route path="/categories" element={<ExplorePage/>}/>
      </Routes>
    </main>
  )
}

export default App
