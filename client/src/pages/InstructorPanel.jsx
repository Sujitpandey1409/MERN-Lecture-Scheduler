import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors, addInstructor, editInstructor, removeInstructor } from "../store/slices/instructorSlice";
import InstructorCard from "../components/InstructorCard";

export default function InstructorPanel() {
  const dispatch = useDispatch();
  const { list: instructors, status, error } = useSelector((state) => state.instructors);

  const [newInstructor, setNewInstructor] = useState({ name: "", email: "" });
  const [editingInstructor, setEditingInstructor] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getInstructors());
    }
  }, [dispatch, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newInstructor.name.trim() || !newInstructor.email.trim()) return;

    if (editingInstructor) {
      dispatch(editInstructor({ id: editingInstructor._id, updatedData: newInstructor }));
      setEditingInstructor(null);
    } else {
      dispatch(addInstructor(newInstructor));
    }
    
    setNewInstructor({ name: "", email: "" });
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setNewInstructor({ name: instructor.name, email: instructor.email });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      dispatch(removeInstructor(id));
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Manage Instructors</h2>

      {status === "loading" && <p className="text-blue-500">Loading instructors...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Instructor Name"
          value={newInstructor.name}
          onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newInstructor.email}
          onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded">
          {editingInstructor ? "Update Instructor" : "Add Instructor"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor}>
            <button onClick={() => handleEdit(instructor)} className="text-yellow-500 mr-2">Edit</button>
            <button onClick={() => handleDelete(instructor._id)} className="text-red-500">Delete</button>
          </InstructorCard>
        ))}
      </div>
    </div>
  );
}
