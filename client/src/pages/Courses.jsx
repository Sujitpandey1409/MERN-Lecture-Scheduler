import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, addCourse, editCourse, removeCourse } from "../store/slices/courseSlice";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const dispatch = useDispatch();
  const { list: courses, status, error } = useSelector((state) => state.courses);

  const [newCourse, setNewCourse] = useState({ name: "", level: "", description: "", image: "" });
  const [editingCourse, setEditingCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingCourse) {
      await dispatch(editCourse({ id: editingCourse._id, updatedData: newCourse }));
      setEditingCourse(null);
    } else {
      await dispatch(addCourse(newCourse));
    }

    setNewCourse({ name: "", level: "", description: "", image: "" });
    setIsSubmitting(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse(course);
  };

  const handleDelete = async (id) => {
    await dispatch(removeCourse(id));
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Manage Courses</h2>

      {/* Show error if any */}
      {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}

      {/* Show loader while fetching courses */}
      {status === "loading" && <p className="text-blue-500">Loading courses...</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md">
        <input type="text" placeholder="Course Name" value={newCourse.name} 
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} 
          className="border p-2 rounded w-full" required 
          disabled={isSubmitting} />

        <select value={newCourse.level} 
          onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} 
          className="border p-2 rounded w-full" required 
          disabled={isSubmitting}>
          <option value="" disabled>Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>

        <input type="text" placeholder="Description" value={newCourse.description} 
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} 
          className="border p-2 rounded w-full" required 
          disabled={isSubmitting} />

        <input type="text" placeholder="Image URL" value={newCourse.image} 
          onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })} 
          className="border p-2 rounded w-full" required 
          disabled={isSubmitting} />

        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : editingCourse ? "Update Course" : "Add Course"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course}>
              <button onClick={() => handleEdit(course)} className="text-yellow-500 mr-2">Edit</button>
              <button onClick={() => handleDelete(course._id)} className="text-red-500">Delete</button>
            </CourseCard>
          ))
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </div>
    </div>
  );
}
