import { Route, Routes } from "react-router";

import Home from "./components/home.tsx";
import ExplorePage from "./components/ExplorePage.tsx";

function App() {

  return (
    <main className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </main>
  )
}

export default App
