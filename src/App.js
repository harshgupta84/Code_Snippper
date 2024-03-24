import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Foot from "./components/Foot";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterScreen from "./components/Register/RegisterScreen";
import LoginScreen from "./components/Login/LoginScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import MyNotes from "./components/noteList/MyNotes";
import CreateNote from "./components/CreateNotes/CreateNote";
import SingleNote from "./components/CreateNotes/SingleNote";
import viewNotes from "./viewNote/viewNotes";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Nav setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" Component={LandingPage} />

            <Route
              path="/mynotes"
              Component={() => <MyNotes search={search} />}
            />

            <Route path="/createnote" Component={CreateNote} />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="note/:id" Component={SingleNote} />
            <Route path="note/view/:id" Component={viewNotes} />
            <Route path="/profile" Component={ProfileScreen} />
          </Routes>
        </main>
        <Foot />
      </BrowserRouter>
    </div>
  );
};

export default App;
