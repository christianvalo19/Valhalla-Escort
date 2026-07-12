import { useEffect, useState } from 'react';

export default function EditProfileForm() {

  const [description, setDescription] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [whatsapp, setWhatsapp] =
    useState('');

  const [message, setMessage] =
    useState('');

  const API_URL =
  import.meta.env.PUBLIC_API_URL;

  const [editingField, setEditingField] =
  useState<string | null>(null);

  // cargar perfil actual

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem('token');

        const response = await fetch(
          `${API_URL}/profile/me`,
          {

            headers: {
              Authorization:
                `Bearer ${token}`
            }

          }
        );

        const data =
          await response.json();


        if (data) {

          setDescription(
            data.description || ''
          );

          setPhone(
            data.phone || ''
          );

          setWhatsapp(
            data.whatsapp || ''
          );

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchProfile();

  }, []);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem('token');


      const response = await fetch(
        `${API_URL}/profile`,
        {

          method: 'PUT',

          headers: {

            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`

          },

          body: JSON.stringify({

            description,
            phone,
            whatsapp,

          })

        }
      );


      const data =
        await response.json();


      setMessage(
        data.message ||
        'Perfil actualizado'
      );

    } catch (error) {

      console.error(error);

      setMessage(
        'Error del servidor'
      );

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
      gap-5
      "
  >

      <h2 className="text-3xl font-bold">
        Editar perfil
      </h2>

      <p
      className="
        text-zinc-400
        mb-6
      "
    >
      Actualiza la información que verán los visitantes de tu perfil.
    </p>


      <div className="mb-6">

  <div
    className="
      mb-2
      flex
      items-center
      justify-between
    "
  >

    <h3 className="font-semibold">
      Descripción
    </h3>

    <button
      type="button"
      onClick={() =>
        setEditingField(
          editingField === 'description'
            ? null
            : 'description'
        )
      }
    >
      ✏️
    </button>

  </div>

  {
    editingField === 'description'

      ? (

        <>

          <textarea

            value={description}

            maxLength={300}

            onChange={(e)=>
              setDescription(
                e.target.value
              )
            }

            className="
              min-h-40
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-3
            "
          />

          <p
            className="
              mt-2
              text-right
              text-sm
              text-zinc-500
            "
          >
            {description.length}/300
          </p>

        </>

      )

      : (

        <div
          className="
            rounded-xl
            border
            border-zinc-800
            p-4
            text-zinc-300
          "
        >

          {
            description ||
            'Sin descripción'
          }

        </div>

      )
  }

</div>


      <div className="mb-6">

  <div
    className="
      mb-2
      flex
      items-center
      justify-between
    "
  >

    <h3 className="font-semibold">
      Teléfono
    </h3>

    <button
      type="button"
      onClick={() =>
        setEditingField(
          editingField === 'phone'
            ? null
            : 'phone'
        )
      }
    >
      ✏️
    </button>

  </div>

  {

    editingField === 'phone'

    ? (

      <input

        type="tel"

        value={phone}

        onChange={(e)=>
          setPhone(
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

    )

    : (

      <div
        className="
          rounded-xl
          border
          border-zinc-800
          p-4
        "
      >

        {
          phone ||
          'No configurado'
        }

      </div>

    )

  }

</div>




  <div className="mb-6">

  <div
    className="
      mb-2
      flex
      items-center
      justify-between
    "
  >

    <h3 className="font-semibold">
      WhatsApp
    </h3>

    <button
      type="button"
      onClick={() =>
        setEditingField(
          editingField === 'whatsapp'
            ? null
            : 'whatsapp'
        )
      }
    >
      ✏️
    </button>

  </div>

  {

    editingField === 'whatsapp'

    ? (

      <input

        type="tel"

        value={whatsapp}

        onChange={(e)=>
          setWhatsapp(
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

    )

    : (

      <div
        className="
          rounded-xl
          border
          border-zinc-800
          p-4
        "
      >

        {
          whatsapp ||
          'No configurado'
        }

      </div>

    )

  }

</div>


      {
      message && (

          <div
            className="
              rounded-xl
              border
              border-green-600
              bg-green-900/20
              p-4
              text-green-300
            "
          >
            {message}
          </div>

        )
      }


      <button
        type="submit"

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
        Guardar cambios
      </button>

    </form>

  );

}