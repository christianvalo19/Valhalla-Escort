import { useEffect, useState } from 'react';

export default function SettingsHome() {

  const [verificationStatus, setVerificationStatus] =
  useState('not_uploaded');

  const API_URL =
  import.meta.env.PUBLIC_API_URL;

const verificationInfo = {

  not_uploaded: {

    icon: '⚪',

    text: 'No enviada',

    className: `
      border-yellow-700
      bg-yellow-900/20
      text-yellow-300
    `

  },

  pending: {

    icon: '🟡',

    text: 'Pendiente de revisión',

    className: `
      border-blue-700
      bg-blue-900/20
      text-blue-300
    `

  },

  approved: {

    icon: '🟢',

    text: 'Verificada',

    className: `
      border-green-700
      bg-green-900/20
      text-green-300
    `

  },

  rejected: {

    icon: '🔴',

    text: 'Rechazada',

    className: `
      border-red-700
      bg-red-900/20
      text-red-300
    `

  }

};

useEffect(() => {

  const loadStatus = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await fetch(

          `${API_URL}/settings/account`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      const data =
        await response.json();

      setVerificationStatus(

        data.verificationStatus ||

        'not_uploaded'

      );

    } catch (error) {

      console.error(error);

    }

  };

  loadStatus();

}, []);

  return (

    <div
      className="
        mx-auto
        max-w-5xl
        py-16
        px-4
      "
    >

      <h1
        className="
          font-serif
          text-5xl
        "
      >
        Configuración
      </h1>

      <p
        className="
          mt-3
          mb-12
          text-zinc-400
        "
      >
        Administra la información de tu cuenta,
        tu seguridad y tu proceso de verificación.
      </p>


      {/* Información personal */}

      <div
        className="
          mb-8
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h2
              className="
                mb-2
                font-serif
                text-3xl
              "
            >
              👤 Información personal
            </h2>

            <p
              className="
                max-w-xl
                text-zinc-400
              "
            >
              Cambia tu nombre público y la ciudad
              donde prestas tus servicios.
            </p>

          </div>


          <a
            href="/settings/account"

            className="
              rounded-xl
              bg-[#7a6200]
              px-6
              py-3
              text-white
              transition
              hover:scale-105
            "
          >
            Administrar
          </a>

        </div>

      </div>



      {/* Seguridad */}

      <div
        className="
          mb-8
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h2
              className="
                mb-2
                font-serif
                text-3xl
              "
            >
              🔒 Seguridad
            </h2>

            <p
              className="
                max-w-xl
                text-zinc-400
              "
            >
              Cambia tu contraseña para mantener
              tu cuenta protegida.
            </p>

          </div>


          <a
            href="/settings/security"

            className="
              rounded-xl
              bg-[#7a6200]
              px-6
              py-3
              text-white
              transition
              hover:scale-105
            "
          >
            Administrar
          </a>

        </div>

      </div>



      {/* Verificación */}

      <div
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h2
              className="
                mb-2
                font-serif
                text-3xl
              "
            >
              🛡️ Verificación
            </h2>

            <p
              className="
                mb-4
                max-w-xl
                text-zinc-400
              "
            >
              Sube una fotografía de verificación
              para aumentar la confianza de los
              clientes.
            </p>

            <span

  className={`
    inline-block
    rounded-full
    border
    px-4
    py-2
    text-sm
    ${
      verificationInfo[
        verificationStatus as keyof typeof verificationInfo
      ].className
    }
  `}

>

  {

    verificationInfo[
      verificationStatus as keyof typeof verificationInfo
    ].icon

  }

  {' '}

  Estado:

  {' '}

  {

    verificationInfo[
      verificationStatus as keyof typeof verificationInfo
    ].text

  }

</span>

          </div>


          <a
            href="/settings/verification"

            className="
              rounded-xl
              bg-[#7a6200]
              px-6
              py-3
              text-white
              transition
              hover:scale-105
            "
          >
            Administrar
          </a>

        </div>

      </div>

    </div>

  );

}