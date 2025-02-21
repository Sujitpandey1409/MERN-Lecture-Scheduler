export default function CourseCard({ course }) {
    return (
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-lg font-bold mt-2">{course.name}</h3>
        <p className="text-gray-600">{course.level}</p>
        <p className="text-sm">{course.description}</p>
      </div>
    );
  }
  