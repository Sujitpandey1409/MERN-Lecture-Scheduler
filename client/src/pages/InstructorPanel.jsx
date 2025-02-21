import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors, addInstructor, editInstructor, removeInstructor } from "../store/slices/instructorSlice";
import InstructorCard from "../components/InstructorCard";

export default function InstructorPanel() {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors.list);

  const [newInstructor, setNewInstructor] = useState({ name: "", email: "" });
  const [editingInstructor, setEditingInstructor] = useState(null);

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setNewInstructor(instructor);
  };

  const handleDelete = (id) => {
    dispatch(removeInstructor(id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Manage Instructors</h2>

      <form onSubmit={handleSubmit} className="my-4 space-y-2">
        <input type="text" placeholder="Instructor Name" value={newInstructor.name} onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })} className="border p-2 w-full" required />
        <input type="email" placeholder="Email" value={newInstructor.email} onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">{editingInstructor ? "Update Instructor" : "Add Instructor"}</button>
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
