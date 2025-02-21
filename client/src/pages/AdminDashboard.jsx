import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors } from "../store/slices/instructorSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors.list);

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Instructors</h3>
        <ul>
          {instructors.map((instructor) => (
            <li key={instructor._id} className="border p-2 my-2 rounded">
              {instructor.name} - {instructor.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
