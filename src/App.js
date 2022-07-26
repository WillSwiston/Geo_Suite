import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* Global CSS */
import "./Reset.css";
import "./App.css";
import "./css/ButtonStyles.css";

/* Page Components */
import MainScreen from "./pages/main_screen/MainScreen";
import GameSelect from "./pages/game_select/GameSelect";
import GeographyDetective from "./pages/geography_detective/GeographyDetective";
import FlagQuiz from "./pages/flag_quiz/FlagQuiz";
import PixelatedFlagQuiz from "./pages/pixelated_flag_quiz/PixelatedFlagQuiz";
import LanguageQuiz from "./pages/language_quiz/LanguageQuiz";
import USCityQuiz from "./pages/us_city_quiz/USCityQuiz.js";

function App() {
  return (
    <Suspense fallback="Loading...">
      <div className="app-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/geography-detective/:dif" element={<GeographyDetective />} />
            <Route path="/flag-quiz/:dif" element={<FlagQuiz />} />
            <Route path="/pixelated-flag-quiz/:dif" element={<PixelatedFlagQuiz />} />
            <Route path="/game-select" element={<GameSelect />} />
            <Route path="/language-quiz/:dif" element={<LanguageQuiz />} />
            <Route path="/us-city-quiz/:dif" element={<USCityQuiz />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
