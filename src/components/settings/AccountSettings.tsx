import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function AccountSettings() {

  const [profileName, setProfileName] =
    useState('');

  const [cityId, setCityId] =
    useState('');

  const [cities, setCities] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const loadData = async () => {

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

        setProfileName(
          data.profileName
        );

        setCityId(
          data.CityId
            .toString()
        );

        setCities(
          data.cities
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadData();

  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await fetch(

          `${API_URL}/settings/account`,

          {

            method: 'PUT',

            headers: {

              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

              profileName,

              CityId:
                Number(cityId)

            })

          }

        );

      const data =
        await response.json();

      setMessage(
        data.message
      );

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

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
        Información personal
      </h1>

      <p
        className="
          mb-6
          text-zinc-400
        "
      >
        Cambia el nombre público que verán los
        usuarios y la ciudad donde prestas tus
        servicios.
      </p>


      {/* Nombre */}

      <div>

        <label
          className="
            mb-2
            block
            text-zinc-300
          "
        >
          Nombre de perfil
        </label>

        <input

          type="text"

          value={profileName}

          onChange={(e) =>
            setProfileName(
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

      </div>


      {/* Ciudad */}

      <div>

        <label
          className="
            mb-2
            block
            text-zinc-300
          "
        >
          Ciudad
        </label>

        <select

          value={cityId}

          onChange={(e) =>
            setCityId(
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

        >

          {

            cities.map(

              (city) => (

                <option

                  key={city.id}

                  value={city.id}

                >

                  {city.name}

                </option>

              )

            )

          }

        </select>

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


      <div
        className="
          flex
          justify-end
        "
      >

        <button

          type="submit"

          disabled={loading}

          className="
            rounded-xl
            bg-[#7a6200]
            px-8
            py-3
            font-semibold
            transition
            hover:scale-105
          "

        >

          {

            loading

              ? 'Guardando...'

              : 'Guardar cambios'

          }

        </button>

      </div>

    </form>

  );

}