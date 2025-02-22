import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, addCourse, editCourse, removeCourse } from "../store/slices/courseSlice";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);

  const [newCourse, setNewCourse] = useState({ name: "", level: "", description: "", image: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      dispatch(editCourse({ id: editingCourse._id, updatedData: newCourse }));
      setEditingCourse(null);
    } else {
      dispatch(addCourse(newCourse));
    }
    setNewCourse({ name: "", level: "", description: "", image: "" });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse(course);
  };

  const handleDelete = (id) => {
    dispatch(removeCourse(id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Manage Courses</h2>

      <form onSubmit={handleSubmit} className="my-4 space-y-2">
        <input type="text" placeholder="Course Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} className="border p-2 w-full" required />
        <select value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} className="border p-2 w-full" required>
          <option value="" disabled>Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>
        <input type="text" placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} className="border p-2 w-full" required />
        <input type="text" placeholder="Image URL" value={newCourse.image} onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">{editingCourse ? "Update Course" : "Add Course"}</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course}>
            <button onClick={() => handleEdit(course)} className="text-yellow-500 mr-2">Edit</button>
            <button onClick={() => handleDelete(course._id)} className="text-red-500">Delete</button>
          </CourseCard>
        ))}
      </div>
    </div>
  );
}
