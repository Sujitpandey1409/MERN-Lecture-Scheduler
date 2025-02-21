import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Lecture Scheduler</h1>
      <div>
        <Link to="/" className="px-3">Home</Link>
        <Link to="/admin" className="px-3">Admin</Link>
        <Link to="/instructor" className="px-3">Instructor</Link>
      </div>
    </nav>
  );
}
