import { useState } from 'react'
import { z } from 'zod'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const userSchemaZod = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  apellido: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
  email: z.string().email('El email es inválido'),
  fechaNacimiento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD')
    .refine(
      (val) => {
        const today = new Date();
        const inputDate = new Date(val);
        // Solo compara si la fecha es válida y no está en el futuro
        return !isNaN(inputDate) && inputDate <= today;
      },
      { message: 'La fecha no puede estar en el futuro' }
    ),
  direccion: z.string().min(5, 'Introduce tu dirección completa'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .regex(/[0-9]/, 'La contraseña debe tener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter especial')
})

function App() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    direccion: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined
    });
  };

  const easyHandleChange = (e) => {
    const new_form = { ...form }
    const input_name = e.target.name
    new_form[input_name] = e.target.value
    setForm(new_form)

    const data =  userSchemaZod.safeParse(new_form) 

    // .forEach
    // .map
    // .reduce

    console.log(data.error.issues)

    //const error_list = data.error.issues.reduce((obj, error) => {obj[error.path] = error.message; return obj}, {})
    const issues = data.error.issues
    const error_list = {}
    for(let i = 0; i<issues.length;i++) {
      error_list[issues[i].path] = issues[i].message
    }

    console.log(error_list)

    const new_errors = { ...errors }
    const error_label_name = e.target.name
    new_errors[error_label_name] = error_list[e.target.name] ? error_list[e.target.name] : ""
    // new_errors[error_label_name] = error_list[e.target.name] || ""
    setErrors(new_errors)


  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
  };

  return (
    <div className="App">
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className={errors.nombre ? 'input-error' : ''}>
          <label data-error={errors.nombre || ''}>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={easyHandleChange}
            required
          />
        </div>
        <div className={errors.apellido ? 'input-error' : ''}>
          <label data-error={errors.apellido || ''}>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={easyHandleChange}
            required
          />
        </div>
        <div className={errors.email ? 'input-error' : ''}>
          <label data-error={errors.email || ''}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={easyHandleChange}
            required
          />
        </div>
        <div className={errors.fechaNacimiento ? 'input-error' : ''}>
          <label data-error={errors.fechaNacimiento || ''}>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={easyHandleChange}
            required
          />
        </div>
        <div className={errors.direccion ? 'input-error' : ''}>
          <label data-error={errors.direccion || ''}>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={easyHandleChange}
            required
          />
        </div>
        <div className={errors.password ? 'input-error' : ''}>
          <label data-error={errors.password || ''}>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={easyHandleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
