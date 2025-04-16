import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuestionPage from "./components/QuestionPage";
import ScoreCard from "./components/ScoreCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/QuestionPage" element={<QuestionPage />} />
      <Route path="/ScoreCard" element={<ScoreCard />} />
    </Routes>
  );
}

export default App;
