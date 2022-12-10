import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import NavPages from "./pages/NavPages";
import './App.css'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NavPages />} />
                <Route path="create-quiz" element={<CreateQuiz />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;