import { useState } from 'react';

import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function SecuritySettings() {

  const [currentPassword, setCurrentPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showCurrent, setShowCurrent] =
  useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
  useState(false);

  const passwordStrength = () => {

    if (
      newPassword.length < 8
    ) {

      return {

        text: 'Débil',

        color: 'text-red-400'

      };

    }

    const hasUpper =
      /[A-Z]/.test(newPassword);

    const hasLower =
      /[a-z]/.test(newPassword);

    const hasNumber =
      /\d/.test(newPassword);

    const hasSpecial =
      /[^A-Za-z0-9]/.test(newPassword);

    const score =

      Number(hasUpper) +

      Number(hasLower) +

      Number(hasNumber) +

      Number(hasSpecial);

    if (

      score <= 2

    ) {

      return {  

        text: 'Media',

        color: 'text-yellow-400'

      };

    }

    return {

      text: 'Fuerte',

      color: 'text-green-400'

    };

  };

  const handleSubmit = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    setMessage('');

    if (

      newPassword !== confirmPassword

    ) {

      setMessage(
        'Las contraseñas no coinciden.'
      );

      return;

    }

    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await fetch(

          `${API_URL}/settings/security`,

          {

            method: 'PUT',

            headers: {

              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

              currentPassword,

              newPassword

            })

          }

        );

      const data =
        await response.json();

        if (response.ok) {

        setSuccess(true);

        } else {

        setSuccess(false);

        }

        setMessage(
        data.message
        );

      if (

        response.ok

      ) {

        setCurrentPassword('');

        setNewPassword('');

        setConfirmPassword('');

      }

    } catch (error) {

      console.error(error);

    setSuccess(false);

    setMessage(
    'Error del servidor.'
    );

    }

    setLoading(false);

  };

  const strength =
    passwordStrength();

  return (

    <form

      onSubmit={handleSubmit}

      className="
        mx-auto
        mt-16
        flex
        max-w-2xl
        flex-col
        gap-5
      "

    >

      <h1
        className="
          font-serif
          text-5xl
        "
      >
        Seguridad
      </h1>

      <p
        className="
          mb-6
          text-zinc-400
        "
      >
        Protege tu cuenta utilizando una contraseña segura.
      </p>
<div className="relative">
      <input

        type={showCurrent ? "text" : "password"}

        placeholder="Contraseña actual"

        value={currentPassword}

        onChange={(e) =>
          setCurrentPassword(
            e.target.value
          )
        }

        className="
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
        "

      />
      <button

        type="button"

        onClick={() => setShowCurrent(!showCurrent)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showCurrent

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>
</div>

<div className='relative'>
      <input

        type={showNew ? "text" : "password"}

        placeholder="Nueva contraseña"

        value={newPassword}

        onChange={(e) =>
          setNewPassword(
            e.target.value
          )
        }

        className="
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
        "

      />
      <button

        type="button"

        onClick={() => setShowNew(!showNew)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showNew

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>

</div>
<div className='relative'>

      <input

        type={showConfirm ? "text" : "password"}

        placeholder="Confirmar contraseña"

        value={confirmPassword}

        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }

        className="
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
        "

      />
      <button

        type="button"

        onClick={() => setShowConfirm(!showConfirm)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showConfirm

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>
</div>
      {

        newPassword && (

          <p
            className={strength.color}
          >

            Seguridad:

            {' '}

            {strength.text}

          </p>

        )

      }

      {
  message && (

    <div

      className={

        success

          ? `
            rounded-xl
            border
            border-green-600
            bg-green-900/20
            p-4
            text-green-300
          `

          : `
            rounded-xl
            border
            border-red-600
            bg-red-900/20
            p-4
            text-red-300
          `

      }

    >

      {message}

    </div>

  )

}

      <button

        type="submit"

        disabled={loading}

        className="
          rounded-xl
          py-3
          font-semibold
          transition
          hover:scale-105
        "

        style={{

          background:
            'var(--primary)'

        }}

      >

        {

          loading

            ? 'Guardando...'

            : 'Actualizar contraseña'

        }

      </button>

    </form>

  );

}