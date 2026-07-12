import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function PortfolioManager() {

  const [images, setImages] =
    useState<any[]>([]);

  const [previews, setPreviews] =
    useState<Record<number, string>>({});

  const [message, setMessage] =
    useState('');

  const loadPortfolio = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        `${API_URL}/portfolio/me`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      const data =
        await response.json();

      setImages(
        Array.isArray(data)
            ? data
            : []
);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadPortfolio();

  }, []);

  const uploadImage = async (

    slot: number,
    file: File

  ) => {

    try {

      const token =
        localStorage.getItem('token');

      const formData =
        new FormData();

      formData.append(
        'image',
        file
      );

      const response =
        await fetch(

          `${API_URL}/portfolio/upload/${slot}`,

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

      setMessage(
        data.message
      );

      loadPortfolio();

    } catch (error) {

      console.error(error);

    }

  };

  const deleteImage = async (
    id: number
  ) => {

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await fetch(

          `${API_URL}/portfolio/${id}`,

          {

            method: 'DELETE',

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      const data =
        await response.json();

      setMessage(
        data.message
      );

      loadPortfolio();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div
      className="
        mx-auto
        max-w-6xl
      "
    >

      <h1
        className="
          mb-4
          font-serif
          text-5xl
        "
      >
        Mi Portafolio
      </h1>

      <p
        className="
          mb-8
          text-zinc-400
        "
      >
        {images.length}/6 fotos cargadas
      </p>

      {
        message && (

          <p
            className="
              mb-6
            "
          >
            {message}
          </p>

        )
      }

      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >

        {
          [1, 2, 3, 4, 5, 6].map(
            (slot) => {

              const image =
                images.find(

                  (img) =>
                    img.slot === slot

                );

              return (

                <div

                  key={slot}

                  className="
                    rounded-2xl
                    border
                    border-zinc-700
                    p-4
                  "
                >

                  <div
                    className="
                      mb-4
                    "
                  >

                    {
                      previews[slot] ? (

                        <img

                          src={
                            previews[slot]
                          }

                          alt="Preview"

                          className="
                            h-64
                            w-full
                            rounded-xl
                            object-cover
                          "
                        />

                      ) : image ? (

                        <img

                          src={
                            `${API_URL}/uploads/${image.imageUrl}`
                          }

                          alt="Portfolio"

                          className="
                            h-64
                            w-full
                            rounded-xl
                            object-cover
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-64
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-zinc-600
                            text-zinc-500
                          "
                        >

                          Agregar foto

                        </div>

                      )
                    }

                  </div>

                  <input

                    type="file"

                    accept="image/*"

                    onChange={(e) => {

                      const file =
                        e.target.files?.[0];

                      if (!file)
                        return;

                      setPreviews(
                        (prev) => ({

                          ...prev,

                          [slot]:
                            URL.createObjectURL(
                              file
                            )

                        })
                      );

                      uploadImage(
                        slot,
                        file
                      );

                    }}

                    className="
                      mb-4
                      w-full
                    "
                  />

                  {
                    image && (

                      <button

                        onClick={() =>
                          deleteImage(
                            image.id
                          )
                        }

                        className="
                          rounded-xl
                          border
                          border-red-500
                          px-4
                          py-2
                          transition
                          hover:bg-red-500/10
                        "
                      >
                        Eliminar
                      </button>

                    )
                  }

                </div>

              );

            }
          )
        }

      </div>

    </div>

  );

}