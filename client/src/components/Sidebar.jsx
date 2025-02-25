import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  return (
    <div className="flex items-start z-[10]">
      {/* Sidebar Toggle Button */}
      <button className="p-3" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="absolute rounded z-[100] top-[7px] left-[203px] bg-gradient-to-r from-blue-500 to-purple-500" size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div ref={sidebarRef} className={`bg-gray-800 text-white h-full w-60 p-5 fixed top-0 left-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link>
          <Link to="/admin/courses" className="block py-2 px-4 hover:bg-gray-700 rounded">Courses</Link>
          <Link to="/admin/lectures" className="block py-2 px-4 hover:bg-gray-700 rounded">Lectures</Link>
        </nav>
      </div>
    </div>
  );
}
