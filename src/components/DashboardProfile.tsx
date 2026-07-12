import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function DashboardProfile() {

  const [profile, setProfile] =
    useState<any>(null);

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

        console.log('STATUS:', response.status);

const data =
  await response.json();
setProfile(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProfile();

  }, []);


  const calculateAge = (
    birthDate: string
  ) => {

    const birth =
      new Date(birthDate);

    const today =
      new Date();

    let age =
      today.getFullYear() -
      birth.getFullYear();

    const monthDiff =
      today.getMonth() -
      birth.getMonth();

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() <
        birth.getDate()
      )
    ) {

      age--;

    }

    return age;

  };


  if (!profile) {

    return (

      <div
        className="
          py-20
          text-center
        "
      >
        Cargando perfil...
      </div>

    );

  }


  return (

    <div
      className="
        mx-auto
        max-w-6xl
      "
    >

      <p
        className="
          mb-2
          uppercase
          tracking-[0.3em]
          text-zinc-500
        "
      >
        Bienvenido
      </p>

      <h1
        className="
          mb-12
          font-serif
          text-5xl
        "
      >
        Hola {profile?.User?.profileName}
      </h1>


      <div
        className="
          grid
          gap-12
          lg:grid-cols-[320px_1fr]
        "
      >

        {/* izquierda */}

        <div
          className="
            flex
            flex-col
            items-center
            gap-6
          "
        >
        {
  profile?.profileImage ? (        
          <img
            src={`${API_URL}/uploads/${profile.profileImage}`}
            alt="Perfil"

            className="
              h-72
              w-72
              rounded-3xl
              object-cover
            "
          />
          ) : (

    <a
      href="/photo"

      className="
        flex
        h-72
        w-72
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-zinc-700
        text-zinc-500
        transition
        hover:border-[#7a6200]
        hover:text-white
      "
    >
      + Agregar foto
    </a>

  )
}

          <div
            className="
              text-center
              text-zinc-400
            "
          >

            <p>

              {
                profile?.User?.birthDate
                  ? calculateAge(
                      profile.User.birthDate
                    )
                  : '-'
              } años

            </p>

            <p>

              {
                profile?.User?.City?.name ||
                'Sin ciudad'
              }

            </p>

          </div>


          <a
            href="/photo"

            className="
              rounded-xl
              border
              border-white/20
              px-6
              py-3
              transition
              hover:bg-white/5
            "
          >
            Cambiar foto
          </a>

        </div>


        {/* derecha */}

        <div>

          <h2
            className="
              mb-6
              font-serif
              text-6xl
            "
          >
            {profile?.User?.profileName}
          </h2>


          <div
            className="
              mb-10
            "
          >

            <h3
              className="
                mb-3
                uppercase
                tracking-[0.3em]
                text-zinc-500
              "
            >
              Acerca de mí
            </h3>

            <p
              className="
                text-zinc-300
              "
            >
              {
                profile?.description ||
                'Sin descripción'
              }
            </p>

            <div
              className="
                mb-10
              "
            >

              <h3
                className="
                  mb-3
                  uppercase
                  tracking-[0.3em]
                  text-zinc-500
                "
              >
                Catálogo
              </h3>

              <p
                className="
                  text-zinc-300
                "
              >
                Administra las 6 fotos que verán los clientes.
              </p>

              <a
                href="/dashboard/portfolio"

                className="
                  mt-4
                  inline-block
                  rounded-xl
                  border
                  border-white/20
                  px-6
                  py-3
                  transition
                  hover:bg-white/5
                "
              >
                Gestionar catálogo
              </a>

            </div>

          </div>


          <div
            className="
              mb-10
            "
          >

            <h3
              className="
                mb-3
                uppercase
                tracking-[0.3em]
                text-zinc-500
              "
            >
              Contacto
            </h3>

            <p
              className="
                text-zinc-300
              "
            >
              WhatsApp:
              {' '}
              {
                profile?.whatsapp ||
                'No configurado'
              }
            </p>

          </div>


          <a
            href="/dashboard/edit"

            className="
              inline-block
              rounded-xl
              bg-[#7a6200]
              px-8
              py-4
              text-white
              transition
              hover:scale-105
            "
          >
            Editar perfil
          </a>

        

        </div>

      </div>

    </div>

  );

}