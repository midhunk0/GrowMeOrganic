import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={FirstPage}/>
                <Route path="second" Component={SecondPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
