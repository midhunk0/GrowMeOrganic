import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import FirstPage from './components/FirstPage'
import SecondPage1 from './components/SecondPage1'
import SecondPage2 from './components/SecondPage2'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={FirstPage}/>
                    <Route path="second1" Component={SecondPage1}/>
                    <Route path="second2" Component={SecondPage2}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
