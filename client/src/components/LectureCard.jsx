export default function LectureCard({ lecture }) {
  console.log(lecture);
  
    return (
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold">{lecture.course?.name||''}</h3>
        <p className="text-gray-600">Instructor: {lecture.instructor?.name||''}</p>
        <p className="text-sm">Date: {new Date(lecture.date).toDateString()}</p>
      </div>
    );
  }
  