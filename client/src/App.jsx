import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorPanel from "./pages/InstructorPanel";
import Courses from "./pages/Courses";
import Lectures from "./pages/Lectures";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">
          <Routes>
            {/* <Route path="/" element={<h1 className="text-3xl font-bold">Home</h1>} /> */}
            <Route path="/" element={<h1 className="text-3xl font-bold"><Home/></h1>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/instructor" element={<InstructorPanel />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/lectures" element={<Lectures />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
