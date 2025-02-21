export default function InstructorCard({ instructor, children }) {
    return (
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-bold">{instructor.name}</h3>
        <p className="text-gray-600">{instructor.email}</p>
        {children}
      </div>
    );
  }
  