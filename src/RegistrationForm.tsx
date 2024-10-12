import React, { useState } from 'react';
import { User, LogOut, HelpCircle, Settings } from 'lucide-react';

interface RegistrationFormProps {
  userEmail: string;
  isAdmin: boolean;
  onShowAdminScreen: () => void;
  onLogout: () => void;
}

interface FormData {
  apellidos: string;
  nombre: string;
  sexo: string;
  dni: string;
  nss: string;
  discapacidad: boolean;
  porcentajeDiscapacidad: string;
  direccion: string;
  localidad: string;
  provincia: string;
  codigoPostal: string;
  fechaNacimiento: string;
  pais: string;
  localidadNacimiento: string;
  provinciaNacimiento: string;
  email: string;
  telefonoFijo: string;
  telefonoMovil: string;
  titulacion: string;
  nombreEntidadBancaria: string;
  iban: string;
  bicCode: string;
  contactoEmergenciaNombre: string;
  contactoEmergenciaParentesco: string;
  contactoEmergenciaTelefono: string;
}

interface FileData {
  fotoFile: File | null;
  certificadoTitularidad: File | null;
  titulacionFile: File | null;
  discapacidadFile: File | null;
}

function RegistrationForm({ userEmail, isAdmin, onShowAdminScreen, onLogout }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    apellidos: '',
    nombre: '',
    sexo: '',
    dni: '',
    nss: '',
    discapacidad: false,
    porcentajeDiscapacidad: '',
    direccion: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    fechaNacimiento: '',
    pais: '',
    localidadNacimiento: '',
    provinciaNacimiento: '',
    email: '',
    telefonoFijo: '',
    telefonoMovil: '',
    titulacion: '',
    nombreEntidadBancaria: '',
    iban: '',
    bicCode: '',
    contactoEmergenciaNombre: '',
    contactoEmergenciaParentesco: '',
    contactoEmergenciaTelefono: '',
  });

  const [fileData, setFileData] = useState<FileData>({
    fotoFile: null,
    certificadoTitularidad: null,
    titulacionFile: null,
    discapacidadFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileData(prev => ({
        ...prev,
        [name as keyof FileData]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Añadir los datos del formulario
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });
    
    // Añadir los archivos
    Object.entries(fileData).forEach(([key, file]) => {
      if (file) {
        formDataToSend.append(key, file);
      }
    });

    // Añadir el correo del usuario que inició sesión
    formDataToSend.append('userEmail', userEmail);

    console.log('Datos del formulario:', Object.fromEntries(formDataToSend));
    alert('Formulario enviado con éxito');
  };

  const renderFileInput = (name: keyof FileData, label: string, helpText?: string) => (
    <div className="flex flex-col">
      <div className="flex items-center mb-1">
        <label htmlFor={name} className="mr-2">{label}</label>
        {helpText && (
          <div className="relative group">
            <HelpCircle size={16} className="text-red-500 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-white border border-gray-200 rounded p-2 shadow-lg w-64">
              <p className="text-sm text-gray-600">{helpText}</p>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="bg-red-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors duration-300 cursor-pointer">
          {fileData[name] ? 'Archivo seleccionado' : 'Seleccionar archivo'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative py-3 sm:max-w-6xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <User size={32} className="text-red-500 mr-2" />
              <span className="text-lg font-semibold">{userEmail}</span>
            </div>
            <img src="https://ideaingenieria.es/wp-content/uploads/2021/10/idea-ingenieria-logo.png" alt="Idea Ingeniería Logo" className="h-12" />
            <div className="flex items-center">
              {isAdmin && (
                <button onClick={onShowAdminScreen} className="mr-4 text-red-500 hover:text-red-700">
                  <Settings size={24} />
                </button>
              )}
              <button onClick={onLogout} className="text-red-500 hover:text-red-700">
                <LogOut size={24} />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold text-center mb-8">Formulario de Registro</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4">Datos Personales</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sexo">Sexo</label>
              <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} className="form-select mt-1" required>
                <option value="">Seleccione</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dni">DNI</label>
              <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nss">Número de Seguridad Social</label>
              <input type="text" id="nss" name="nss" value={formData.nss} onChange={handleChange} className="form-input mt-1" required />
            </div>
            {renderFileInput("fotoFile", "Adjuntar Foto")}
            <div className="flex items-center">
              <input type="checkbox" id="discapacidad" name="discapacidad" checked={formData.discapacidad} onChange={handleChange} className="form-checkbox" />
              <label htmlFor="discapacidad" className="ml-2">Discapacidad</label>
              {formData.discapacidad && (
                <input
                  type="text"
                  name="porcentajeDiscapacidad"
                  value={formData.porcentajeDiscapacidad}
                  onChange={handleChange}
                  placeholder="Porcentaje"
                  className="form-input ml-2 w-24"
                />
              )}
            </div>
            {formData.discapacidad && renderFileInput("discapacidadFile", "Adjuntar Certificado de Discapacidad")}

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-8">Dirección</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="localidad">Localidad</label>
              <input type="text" id="localidad" name="localidad" value={formData.localidad} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="provincia">Provincia</label>
              <input type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="codigoPostal">Código Postal</label>
              <input type="text" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pais">País</label>
              <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="localidadNacimiento">Localidad de Nacimiento</label>
              <input type="text" id="localidadNacimiento" name="localidadNacimiento" value={formData.localidadNacimiento} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="provinciaNacimiento">Provincia de Nacimiento</label>
              <input type="text" id="provinciaNacimiento" name="provinciaNacimiento" value={formData.provinciaNacimiento} onChange={handleChange} className="form-input mt-1" required />
            </div>

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-8">Contacto</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefonoFijo">Teléfono Fijo</label>
              <input type="tel" id="telefonoFijo" name="telefonoFijo" value={formData.telefonoFijo} onChange={handleChange} className="form-input mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="telefonoMovil">Teléfono Móvil</label>
              <input type="tel" id="telefonoMovil" name="telefonoMovil" value={formData.telefonoMovil} onChange={handleChange} className="form-input mt-1" required />
            </div>

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-8">Formación</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="titulacion">Titulación</label>
              <input type="text" id="titulacion" name="titulacion" value={formData.titulacion} onChange={handleChange} className="form-input mt-1" required />
            </div>
            {renderFileInput("titulacionFile", "Adjuntar Título")}

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-8">Datos Bancarios</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="nombreEntidadBancaria">Nombre de la Entidad Bancaria</label>
              <input type="text" id="nombreEntidadBancaria" name="nombreEntidadBancaria" value={formData.nombreEntidadBancaria} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="iban">IBAN</label>
              <input type="text" id="iban" name="iban" value={formData.iban} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bicCode">BIC Code</label>
              <input type="text" id="bicCode" name="bicCode" value={formData.bicCode} onChange={handleChange} className="form-input mt-1" required />
            </div>
            {renderFileInput("certificadoTitularidad", "Adjuntar Certificado de Titularidad", "Puede descargarlo desde su banca online")}

            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4 mt-8">Contacto de Emergencia</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactoEmergenciaNombre">Nombre del Contacto de Emergencia</label>
              <input type="text" id="contactoEmergenciaNombre" name="contactoEmergenciaNombre" value={formData.contactoEmergenciaNombre} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactoEmergenciaParentesco">Parentesco</label>
              <input type="text" id="contactoEmergenciaParentesco" name="contactoEmergenciaParentesco" value={formData.contactoEmergenciaParentesco} onChange={handleChange} className="form-input mt-1" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactoEmergenciaTelefono">Teléfono del Contacto de Emergencia</label>
              <input type="tel" id="contactoEmergenciaTelefono" name="contactoEmergenciaTelefono" value={formData.contactoEmergenciaTelefono} onChange={handleChange} className="form-input mt-1" required />
            </div>
            
            <div className="col-span-2 mt-8">
              <button type="submit" className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300 text-lg font-semibold">
                Enviar Formulario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;