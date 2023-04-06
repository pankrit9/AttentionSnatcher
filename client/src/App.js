import { BrowserRouter, Navigate, Routes, Route, useActionData } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {/* SETTING UP THE ROUTES */}
                    <Route path="/" element={<LoginPage />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/profile/:userId" element={<ProfilePage />}/> 
                    {/* above is the parameter (:userID) */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;