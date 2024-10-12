import React, { useState } from 'react';
import { User, LogOut, ArrowLeft } from 'lucide-react';

interface AdminScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

interface AdminFormData {
  email: string;
  estimatedStartDate: string;
}

function AdminScreen({ onBack, onLogout }: AdminScreenProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    email: '',
    estimatedStartDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Admin Form Data:', formData);
    alert('Usuario dado de alta con éxito');
    setFormData({ email: '', estimatedStartDate: '' });
  };

  return (
    <div className="relative py-3 sm:max-w-6xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button onClick={onBack} className="text-red-500 hover:text-red-700">
              <ArrowLeft size={24} />
            </button>
            <User size={32} className="text-red-500" />
            <img src="https://ideaingenieria.es/wp-content/uploads/2021/10/idea-ingenieria-logo.png" alt="Idea Ingeniería Logo" className="h-12" />
            <button onClick={onLogout} className="text-red-500 hover:text-red-700">
              <LogOut size={24} />
            </button>
          </div>
          
          <h1 className="text-3xl font-semibold text-center mb-5">Administración - Alta de Usuarios</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="form-input rounded-md shadow-sm" 
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="estimatedStartDate" className="mb-1">Fecha Estimada de Alta</label>
              <input 
                type="date" 
                id="estimatedStartDate" 
                name="estimatedStartDate" 
                value={formData.estimatedStartDate} 
                onChange={handleChange} 
                required 
                className="form-input rounded-md shadow-sm" 
              />
            </div>
            <div className="col-span-2 mt-6">
              <button 
                type="submit" 
                className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300 text-lg font-semibold"
              >
                Dar de Alta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;