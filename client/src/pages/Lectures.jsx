import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLectures, addLecture, editLecture, removeLecture } from "../store/slices/lectureSlice";
import { getCourses } from "../store/slices/courseSlice";
import { getInstructors } from "../store/slices/instructorSlice";
import LectureCard from "../components/LectureCard";

export default function Lectures() {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lectures.list);
  const courses = useSelector((state) => state.courses.list);
  const instructors = useSelector((state) => state.instructors.list);

  const [newLecture, setNewLecture] = useState({ course: "", instructor: "", date: "" });
  const [editingLecture, setEditingLecture] = useState(null);

  useEffect(() => {
    dispatch(getLectures());
    dispatch(getCourses()); // Fetch courses for dropdown
    dispatch(getInstructors()); // Fetch instructors for dropdown
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLecture) {
      dispatch(editLecture({ id: editingLecture._id, updatedData: newLecture }));
      setEditingLecture(null);
    } else {
      dispatch(addLecture(newLecture));
    }
    setNewLecture({ course: "", instructor: "", date: "" });
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
    setNewLecture(lecture);
  };

  const handleDelete = (id) => {
    dispatch(removeLecture(id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Manage Lectures</h2>

      <form onSubmit={handleSubmit} className="my-4 space-y-2">
        {/* Course Dropdown */}
        <select value={newLecture.course} onChange={(e) => setNewLecture({ ...newLecture, course: e.target.value })} className="border p-2 w-full" required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>

        {/* Instructor Dropdown */}
        <select value={newLecture.instructor} onChange={(e) => setNewLecture({ ...newLecture, instructor: e.target.value })} className="border p-2 w-full" required>
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
          ))}
        </select>

        {/* Date Input */}
        <input type="date" value={newLecture.date} onChange={(e) => setNewLecture({ ...newLecture, date: e.target.value })} className="border p-2 w-full" required />

        <button type="submit" className="bg-blue-500 text-white p-2">{editingLecture ? "Update Lecture" : "Add Lecture"}</button>
      </form>

      {/* Lecture List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lectures.map((lecture) => (
          <LectureCard key={lecture._id} lecture={lecture}>
            <button onClick={() => handleEdit(lecture)} className="text-yellow-500 mr-2">Edit</button>
            <button onClick={() => handleDelete(lecture._id)} className="text-red-500">Delete</button>
          </LectureCard>
        ))}
      </div>
    </div>
  );
}
