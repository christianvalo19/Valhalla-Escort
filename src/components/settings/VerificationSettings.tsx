import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function VerificationSettings() {

  const [status, setStatus] =
    useState('not_uploaded');

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [success, setSuccess] =
    useState(false);

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

        setStatus(
        data.verificationStatus || 'not_uploaded'
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadStatus();

  }, []);

  const handleSubmit = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    if (!image) {

      setSuccess(false);

      setMessage(
        'Debes seleccionar una imagen.'
      );

      return;

    }

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      'verificationImage',
      image
    );

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await fetch(

          `${API_URL}/settings/verification`,

          {

            method: 'POST',

            headers: {

              Authorization:
                `Bearer ${token}`

            },

            body: formData

          }

        );

      const data =
        await response.json();

      setSuccess(response.ok);

      setMessage(data.message);

      if (response.ok) {

        setStatus('pending');

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

  const statusInfo = {

    not_uploaded: {

      icon: '⚪',

      text:
        'Documento no cargado'

    },

    pending: {

      icon: '🟡',

      text:
        'Pendiente de revisión'

    },

    approved: {

      icon: '🟢',

      text:
        'Cuenta verificada'

    },

    rejected: {

      icon: '🔴',

      text:
        'Documento rechazado'

    }

  };

  return (

    <form

      onSubmit={handleSubmit}

      className="
        mx-auto
        mt-16
        flex
        max-w-2xl
        flex-col
        gap-6
      "

    >

      <h1

        className="
          font-serif
          text-5xl
        "

      >

        Verificación

      </h1>

      <div

        className="
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          p-6
        "

      >

        <h2

          className="
            mb-3
            text-2xl
            font-semibold
          "

        >

          Estado actual

        </h2>

        <p
          className="
            mb-6
            text-zinc-300
          "
        >

          {

            statusInfo[
              status as keyof typeof statusInfo
            ].icon

          }

          {' '}

          {

            statusInfo[
              status as keyof typeof statusInfo
            ].text

          }

        </p>

        <ul
          className="
            space-y-2
            text-zinc-400
          "
        >

          <li>
            ✔ Solo los administradores podrán verla.
          </li>

          <li>
            ✔ Nunca aparecerá en el catálogo.
          </li>

          <li>
            ✔ Si es rechazada podrás volver a subir otra.
          </li>

        </ul>

      </div>

      <label

        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-3xl
          border-2
          border-dashed
          border-zinc-700
          bg-zinc-900
          p-12
          transition
          hover:border-[var(--primary)]
        "

      >

        <div className="text-6xl">

          📄

        </div>

        <p className="mt-4">

          Haz clic para seleccionar tu documento

        </p>

        <p className="text-sm text-zinc-500">

          JPG • PNG • WEBP

        </p>

        <input

          type="file"

          accept="image/*"

          className="hidden"

          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (!file) return;

            setImage(file);

            setPreview(

              URL.createObjectURL(file)

            );

          }}

        />

      </label>

      {

        preview && (

          <div>

            <h3

              className="
                mb-4
                font-semibold
              "

            >

              Vista previa

            </h3>

            <img

              src={preview}

              alt=""

              className="
                mx-auto
                max-h-96
                rounded-2xl
                border
                border-zinc-700
              "

            />

          </div>

        )

      }

      {

        message && (

          <div

            className={

              success

                ?

                `
                rounded-xl
                border
                border-green-600
                bg-green-900/20
                p-4
                text-green-300
                `

                :

                `
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

            ?

            'Subiendo...'

            :

            'Enviar para verificación'

        }

      </button>

    </form>

  );

}

