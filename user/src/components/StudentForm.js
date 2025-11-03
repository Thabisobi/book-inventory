import { useState, useEffect } from 'react';
import { addStudent, updateStudent } from '../services/api';

const StudentForm = ({ student, onSave, onCancel }) => {
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  useEffect(() => {
    if (student) setForm(student);
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student) {
        await updateStudent(student.id, form);
      } else {
        await addStudent(form);
      }
      onSave();
      setForm({ name: '', email: '', course: '' }); // reset form
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['name', 'email', 'course'].map((field, idx) => (
        <input
          key={idx}
          type={field === 'email' ? 'email' : 'text'}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          required
          className="w-full px-4 py-3 bg-blue-800/50 border border-blue-600 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold"
        >
           Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-lg font-semibold"
        >
           Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
