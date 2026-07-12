import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function Catalog() {

  const [profiles, setProfiles] =
  useState<any[]>([]);

  const [cities, setCities] =
  useState<any[]>([]);

  const [selectedCity, setSelectedCity] =
  useState('');

  const [selectedProfile, setSelectedProfile] =
  useState<any>(null);

  const [selectedImageIndex, setSelectedImageIndex] =
  useState<number | null>(null);


const loadCities = async () => {

  try {

    const response =
      await fetch(
        `${API_URL}/cities`
      );

    const data =
      await response.json();

    setCities(data);

  } catch (error) {

    console.error(error);

  }

};

const loadProfiles = async (
  city = ''
) => {

  try {

    const response =
      await fetch(

        city

          ? `${API_URL}/catalog?city=${city}`

          : `${API_URL}/catalog`

      );

    const data =
      await response.json();

    setProfiles(data);

  } catch (error) {

    console.error(error);

  }

};

useEffect(() => {

  loadCities();

  loadProfiles();

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

return (

  <div
    className="
      px-4
      py-20
    "
  >

    <h1
      className="
        mb-10
        text-center
        font-serif
        text-5xl
      "
    >
      Catálogo
    </h1>
    <center>Seleccionar ciudad: </center>
    <div
  className="
    mb-10
    flex
    justify-center
  "
>

  <select

    value={selectedCity}

    onChange={(e) => {

      setSelectedCity(
        e.target.value
      );

      loadProfiles(
        e.target.value
      );

    }}

    className="
      rounded-xl
      border
      border-zinc-700
      bg-zinc-900
      px-5
      py-3
      text-white
    "

  >

    <option value="">
      Todas las ciudades
    </option>

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

    <div
      className="
        flex
        gap-6
        overflow-x-auto
        pb-4
      "
    >

      {
        profiles.map(
          (profile) => (

            <div

              key={profile.id}
              
              onClick={() =>
    setSelectedProfile(profile)
  }

                className="
                min-w-45
                md:min-w-62.5

                cursor-pointer

                overflow-hidden
                rounded-3xl

                border
                border-zinc-800

                bg-black
              "
            >

              <img

                src={
                  `${API_URL}/uploads/${profile.Profile.profileImage}`
                }

                alt={
                  profile.profileName
                }

                className="
                  h-72
                  w-full
                  object-cover
                "
              />

              <div
                className="
                  p-4
                "
              >

                <h2
                  className="
                    font-serif
                    text-2xl
                  "
                >
                  {
                    profile.profileName
                  }
                </h2>

                <p
                  className="
                    text-zinc-400
                  "
                >
                  {
                    calculateAge(
                      profile.birthDate
                    )
                  } años
                </p>

                <p
                  className="
                    text-zinc-500
                  "
                >
                  {
                    profile.City?.name
                  }
                </p>

              </div>

            </div>

          )
        )
      }

    </div>
      {
  selectedProfile && (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/90
        p-4
      "
    >

      <div
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-6xl
          overflow-y-auto
          rounded-3xl
          bg-zinc-950
          p-8
        "
      >

        <button
          onClick={() =>
            setSelectedProfile(null)
          }
          className="
            absolute
            right-6
            top-6
            text-3xl
          "
        >
          ✕
        </button>

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[320px_1fr]
          "
        >

          {/* Foto perfil */}

          <img
            src={`${API_URL}/uploads/${selectedProfile.Profile.profileImage}`}
            alt="Perfil"
            className="
              h-96
              w-full
              rounded-3xl
              object-cover
            "
          />

          <div>

            <h2
              className="
                mb-4
                font-serif
                text-5xl
              "
            >
              {selectedProfile.profileName}
            </h2>

            <p
              className="
                mb-2
                text-zinc-400
              "
            >
              {selectedProfile.City?.name}
            </p>

            <p
              className="
                mb-6
                text-zinc-400
              "
            >
              {
                calculateAge(
                  selectedProfile.birthDate
                )
              } años
            </p>

            <p
              className="
                text-zinc-300
              "
            >
              {
                selectedProfile.Profile
                  ?.description ||
                'Sin descripción'
              }
            </p>

                      {
            selectedProfile.Profile?.whatsapp && (

              <a
                href={`https://wa.me/+57${selectedProfile.Profile.whatsapp.replace(/\D/g, '')}?text=Hola!%20Te%20ví%20en%20VALHALLA%20me%20gustaría%20quedar%20contigo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-[#7a6200]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:scale-105
                "
                >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.54 4.14 1.56 5.95L0 24l6.34-1.66a11.8 11.8 0 005.71 1.46h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.42-8.44zM12.06 21.8h-.01a9.86 9.86 0 01-5.02-1.38l-.36-.22-3.76.98 1-3.67-.24-.38a9.83 9.83 0 01-1.51-5.25C2.17 6.43 6.6 2 12.05 2c2.63 0 5.11 1.02 6.97 2.89a9.8 9.8 0 012.88 6.98c0 5.45-4.43 9.93-9.84 9.93zm5.4-7.4c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.74-1.66-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.66-.95-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.14 4.53.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.71.25-1.31.17-1.43-.08-.13-.28-.2-.58-.35z"/>
      </svg>

      Contactar por WhatsApp

    </a>

  )
}

          </div>

        </div>

        {/* Portfolio */}

        <div
          className="
            mt-10
            grid
            gap-4
            md:grid-cols-3
          "
        >

          {
            selectedProfile
              .PortfolioImages
              ?.sort(
                (a:any,b:any) =>
                  a.slot - b.slot
              )
              .map(

                (
                    image:any,
                    index:number
                ) => (

                    <img

                    key={image.id}

                    src={`${API_URL}/uploads/${image.imageUrl}`}

                    alt=""

                    onClick={() =>
                        setSelectedImageIndex(index)
                    }

                    className="
                        h-72
                        w-full
                        cursor-pointer
                        rounded-2xl
                        object-cover
                    "
                    />

                )

)
          }

          {
  selectedImageIndex !== null && (

    <div
      className="
        fixed
        inset-0
        z-60
        flex
        items-center
        justify-center
        bg-black/95
      "
    >

      <button

      onClick={() =>
        setSelectedImageIndex(null)
      }

      className="
      absolute
      top-6
      right-6
      z-20
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-full
      bg-black/50
      backdrop-blur
      hover:bg-black/70
      transition
      "
    >
      ✕
    </button>

      <button

        onClick={() => {

          const total =
            selectedProfile
              .PortfolioImages
              .length;

          setSelectedImageIndex(

            (selectedImageIndex - 1 + total)
            % total

          );

        }}

        className="
        absolute
        left-6
        top-1/2
        -ztranslate-y-1/2
        z-20
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black/40
        backdrop-blur
        text-4xl
        hover:bg-black/70
        transition
        "
      >
        ‹
      </button>

      <img

        src={`${API_URL}/uploads/${
          selectedProfile
            .PortfolioImages
            .sort(
              (a:any,b:any) =>
                a.slot - b.slot
            )[selectedImageIndex]
            .imageUrl
        }`}

        alt=""

        className="
          max-h-[90vh]
          max-w-[90vw]
          object-contain
        "
      />

      <button

        onClick={() => {

          const total =
            selectedProfile
              .PortfolioImages
              .length;

          setSelectedImageIndex(

            (selectedImageIndex + 1)
            % total

          );

        }}

        className="
        absolute
        right-6
        top-1/2
        -ztranslate-y-1/2
        z-20
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black/40
        backdrop-blur
        text-4xl
        hover:bg-black/70
        transition
        "
      >
        ›
      </button>

    </div>

  )
}

        </div>

      </div>

    </div>

  )
}
  </div>

);

}