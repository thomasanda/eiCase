import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Portfolio } from "./components/portfolio/portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
