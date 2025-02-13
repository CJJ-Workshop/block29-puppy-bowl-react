import { Routes, Route } from "react-router-dom";
import ViewSinglePlayer from "./components/ViewSinglePlayer";
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/players" element={<h1>Blue</h1>} /> */}
        <Route path="/players/:playerId" element={<ViewSinglePlayer />} />
      </Routes>
    </>
  );
}

export default App;
