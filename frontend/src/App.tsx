import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Portfolio } from "./components/portfolio/portfolio";
import { Properties } from "./components/properties/properties";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/properties/:id" element={<Properties />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
