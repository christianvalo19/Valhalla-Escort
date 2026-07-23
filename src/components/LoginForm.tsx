import { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";



const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function LoginForm() {

 const [login, setLogin] = useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [showRecoveryModal, setShowRecoveryModal] =
    useState(false);
  
  const [showPassword, setShowPassword] =
  useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError('');

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/auth/login`,
        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

      login,
      password

    })

        }
      );


      const data = await response.json();




      if (!response.ok) {

        setError(
          data.message ||
          'Error al iniciar sesión'
        );

        setLoading(false);

        return;
      }


      // guardar token

localStorage.setItem(
  'token',
  data.token
);

// guardar rol

localStorage.setItem(
  'role',
  data.user.role
);

console.log("Role guardado:", localStorage.getItem("role"));

// redireccionar

if (data.user.role === 'admin') {

  window.location.href =
    '/admin';
    console.log('admin'); 

} else {

  window.location.href =
    '/dashboard';
    console.log('user');

}


    } catch (error) {

      console.error(error);

      setError(
        'Error del servidor'
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div>

    <form
      onSubmit={handleSubmit}
      className="
        mx-auto
        flex
        max-w-md
        flex-col
        gap-2
        py-1
        pt-32
      "
    >

      <h1 className="text-4xl font-bold py-8">
        Login
      </h1>


      <input
  type="text"

  placeholder="
    Correo o usuario
  "

  value={login}

  onChange={(e) =>
    setLogin(
      e.target.value
    )
  }

  className="
    border-b
    border-zinc-700
    bg-transparent
    py-1
    text-lg
    outline-none
    transition
    focus:border-white
  "
/>

<div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
      w-full
    "
      />
    <button
    type="button"

    onClick={() =>
      setShowPassword(!showPassword)
    }

    className={`
      absolute
      right-0
      top-1/2
      -translate-y-1/2
      transition
      ${
        password
          ? "text-yellow-400"
          : "text-zinc-500"
      }
      hover:text-yellow-300
    `}
  >

    {
      showPassword
        ? <EyeSlashIcon className="h-5 w-5" />
        : <EyeIcon className="h-5 w-5" />
    }

  </button>

      </div>


      {
        error && (

          <p className="text-red-500">
            {error}
          </p>

        )
      }

      <button

      type="button"

      onClick={() =>
        setShowRecoveryModal(true)
      }

      className="
        self-end
        text-sm
        text-zinc-400
        transition
        hover:text-white
      "

    >

      ¿Olvidaste tu contraseña?

    </button>
      
      <button
        type="submit"

        disabled={loading}

        className="
          rounded-xl
          py-3
          font-semibold
          gap-2
          transition
          hover:scale-105
          mt-4
        "

        style={{
          background: 'var(--primary)'
        }}
      >

        {
          loading
            ? 'Cargando...'
            : 'Ingresar'
        }

      </button>
      

    </form>
{

  showRecoveryModal && (

    <div

      onClick={() =>
        setShowRecoveryModal(false)
      }

      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/90
        p-6
      "

    >

      <div

        onClick={(e) =>
          e.stopPropagation()
        }

        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
          shadow-2xl
        "

      >

        <button

          onClick={() =>
            setShowRecoveryModal(false)
          }

          className="
            absolute
            right-8
            top-8
            text-xl
          "

        >

          ✕

        </button>

        <h2

          className="
            font-serif
            text-4xl
          "

        >

          ¿Olvidaste tu contraseña?

        </h2>

        <p

          className="
            mt-6
            text-zinc-400
            leading-7
          "

        >

          Si olvidaste tu contraseña,
          comunícate con el administrador de
          <strong className="text-white">
            {' '}Valhalla Escort Colombia{' '} 
          </strong>
           para iniciar el proceso de recuperación.

        </p>

        <div

          className="
            mt-8
            space-y-4
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-6
          "

        >

          <a

  href="mailto:valhallaescortcolombia@gmail.com"

  className="
    text-[var(--primary)]
    hover:underline
  "

>

  📧 valhallaescortcolombia@gmail.com

</a>
<br></br>

          <a

  href="https://wa.me/573502079446"

  target="_blank"

  className="
    text-green-400
    hover:underline
  "

>

  📱 +57 350 207 9446

</a>

        </div>

        <button

          onClick={() =>
            setShowRecoveryModal(false)
          }

          className="
            mt-8
            w-full
            rounded-xl
            py-3
            font-semibold
          "

          style={{
            background: 'var(--primary)'
          }}

        >

          Entendido

        </button>

      </div>

    </div>

  )

}
    </div>

  );



  

}