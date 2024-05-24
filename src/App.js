import "./App.css";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostJob from "./components/PostJob";
import SaveJobs from "./components/SaveJobs";
import ErrorPage from "./components/ErrorPage";
import ApplyJobs from "./components/ApplyJobs";
import Projects from "./components/Projects";
import AddProject from "./components/AddProjects";
import Profile from "./components/Profile";
import Register from "./components/Registration";
import Login from "./components/Login";
import SendInquiry from "./components/SendInquiry";
import MyProjects from "./components/MyProjects";
import SessionManager from "./components/SessionManager";
import MyJobs from './components/MyJobs';
import EditProject from "./components/EditProject";

function App() {
  return (
    <>
      <BrowserRouter>
      <SessionManager>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/apply-jobs" element={<ApplyJobs />} />
            <Route path="/saved-job" element={<SaveJobs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-projects" element={<AddProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/send-inquiry" element={<SendInquiry />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
        </SessionManager>
      </BrowserRouter>
    </>
  );
}

export default App;
