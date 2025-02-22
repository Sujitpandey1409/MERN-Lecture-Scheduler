import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../store/slices/courseSlice";
import { getInstructors } from "../store/slices/instructorSlice";
import { getLectures } from "../store/slices/lectureSlice";
import { ResponsiveLine } from "@nivo/line";

export default function Home() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);
  const instructors = useSelector((state) => state.instructors.list);
  const lectures = useSelector((state) => state.lectures.list);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getInstructors());
    dispatch(getLectures());
  }, [dispatch]);

  // Prepare data for Line Graph (Lectures per Date)
  const lectureData = lectures.reduce((acc, lecture) => {
    const date = new Date(lecture.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1; // Count lectures on the same date
    return acc;
  }, {});

  const chartData = [
    {
      id: "Lectures",
      color: "hsl(217, 70%, 50%)",
      data: Object.entries(lectureData).map(([date, count]) => ({
        x: date,
        y: count,
      })),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-4">Dashboard Overview</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Courses</h3>
          <p className="text-2xl">{courses.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Instructors</h3>
          <p className="text-2xl">{instructors.length}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Lectures</h3>
          <p className="text-2xl">{lectures.length}</p>
        </div>
      </div>

      {/* Line Graph Section */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-3">Lecture Schedule Over Time</h3>
        <div className="h-96">
          {chartData[0].data.length > 0 ? (
            <ResponsiveLine
              data={chartData}
              margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
              axisBottom={{ tickRotation: -45 }}
              colors={{ scheme: "category10" }}
              lineWidth={3}
              pointSize={10}
              enablePoints
              useMesh={true}
              enableArea={true}
            />
          ) : (
            <p className="text-center text-gray-500">No lecture data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
