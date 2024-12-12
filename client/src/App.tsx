import { Route, Routes } from "react-router";
import Home from "./components/home.tsx";
import ExplorePage from "./components/ExplorePage.tsx";
import Albums from "./components/Albums.tsx";

function App() {

  return (
    <main className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/albums" element={<Albums/>}/>
      </Routes>
    </main>
  )
}

export default App
