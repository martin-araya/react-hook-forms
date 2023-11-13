import {useForm} from 'react-hook-form';

function App() {

  const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert('Enviando datos ...');
    reset();
  });
  return (
    <form onSubmit={onSubmit}>

      {/* Nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input type="text" {...register("nombre", {
        required: {
          value: true,
          message: 'Nombre es requerido!'
        },
        minLength: {
          value: 3,
          message: 'Nombre debe tener al menos 3 caracteres!'
        },
        maxLength: {
          value: 20,
          message: 'Nombre debe tener menos de 20 caracteres!'
        },
      })}/>
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }
      

      {/* Correo */}
      <label htmlFor="correo">Correo</label>
      <input type="email"{...register("correo", {
        required: {
          value: true,
          message: 'Correo es requerido!'
        },
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: 'Correo invalido!'
        }
      })}/>
      {
        errors.correo && <span>{errors.correo.message};</span>
      }
      

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input type="password"{...register("password", {
        required:{
          value:true,
          message: 'Password es requerido!'
        },
        minLength: {
          value: 6,
          message: 'Password debe tener al menos 6 caracteres!',

        }
      })}/>
       {
        errors.password && <span>{errors.password.message};</span>
      }

      {/* confirmarPassword */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input type="password"{...register("confirmarPassword", {
        required: {
          value:true,
          message: 'Confirmar Password es requerido!',
        },
        validate:value => value === watch('password') || "Las contraseñas no coinciden!"
      })}/>
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
      }

      {/* fechaNacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input type="date"{...register("fechaNacimiento", {
        required:{
          value:true,
          message: 'Fecha de nacimiento es requerido!'
        },
        validate: (value) => {
          const fechaNacimiento = new Date(value);
          const fechaActual = new Date();
          const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

          return edad >= 18 || "Debes ser mayor de edad!";
        }
      })}/>

      {/* Pais */}
      <label htmlFor="pais">Pais</label>
      <select {...register("pais", {
        required:true,
      })}>
        <option value="mx">México</option>
        <option value="us">Estados Unidos</option>
        <option value="br">Brasil</option>
        <option value="ar">Argentina</option>
        <option value="cl">Chile</option>
      </select>
      
      {
        watch('pais') === 'ar' && (
          <>
          <input type='text' placeholder='Provincia' 
          {...register('provincia', {
            required: {
              value:true,
              message: 'Provincia es requerido!'
            },
      })}/>
    {
      errors.provincia && <span>{errors.provincia.message}</span>
    }      
    </>
          )}

      {/* File */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" onChange={(e) => {
        setValue('foto', e.target.files[0]);
      }}/>

      {/* Terminos */}
      <label htmlFor="terminos">Acepto terminos y condiciones</label>
      <input type="checkbox" {...register("terminos",{
        required:{
          value:true,
          message: 'Debes aceptar los terminos y condiciones!'
        }
      })}/>
      {
        errors.terminos && <span>{errors.terminos.message}</span>
      }

      <button>
        Enviar
      </button>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  )
}

export default App