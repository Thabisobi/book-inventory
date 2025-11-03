const StudentList = ({ students, onEdit, onDelete }) => {
  if (!students || students.length === 0) {
    return <p className="text-blue-300 text-center py-6">No students found. Add some above! 🎓</p>;
  }

  return (
    <ul className="space-y-3">
      {students.map((student) => (
        <li
          key={student.id}
          className="flex justify-between items-center bg-blue-900/50 p-4 rounded-lg"
        >
          <div>
            <p className="font-semibold text-white">{student.name}</p>
            <p className="text-blue-200">{student.email}</p>
            <p className="text-blue-200 italic">{student.course}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(student)}
              className="bg-darkwhite-500 hover:bg-yellow-600 px-3 py-1 rounded"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-wheat-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
