import { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from './services/api';
import './index.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      console.log('Fetched students:', response.data);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete student');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white animate-fade-in">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-800 p-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between flex-col lg:flex-row gap-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🎓 CAREER GUIDANCE PLATFORM
          </h1>
          <p className="text-blue-200">Manage your students!</p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto p-6">
        {error && (
          <p className="text-red-400 bg-red-900 p-3 rounded-lg mb-4">{error}</p>
        )}
        {loading && (
          <p className="text-blue-300 text-center">Loading students... ⏳</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-blue-200">Add/Edit Student</h2>
            <StudentForm
              student={editingStudent}
              onSave={handleSave}
              onCancel={() => setEditingStudent(null)}
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-blue-200">Student List</h2>
            <StudentList
              students={students}
              onEdit={setEditingStudent}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-indigo-800 p-4 mt-8">
        <div className="container mx-auto text-center text-blue-200">
          <p>Built with creativity for student success! 🌟 | © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
