import { useEffect, useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;

type PortfolioImage = {

  id: number;

  slot: number;

  imageUrl: string;

};

export default function MyPortfolio() {

  const [images, setImages] =
    useState<PortfolioImage[]>([]);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const fetchImages = async () => {

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

      setImages(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchImages();

  }, []);

  

  return (

    <div
      className="
        mt-20
        max-w-6xl
        mx-auto
      "
    >

      <h2
        className="
          mb-8
          text-4xl
          font-serif
        "
      >
        Mi catálogo
      </h2>

      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >

        {
          images.map((image) => (

            <div

              key={image.id}

              className="
                overflow-hidden
                rounded-md
                border
                border-zinc-800
              "
            >

              <img

              src={
                `${API_URL}/uploads/${image.imageUrl}`
              }

              alt={`Foto ${image.slot}`}

              onClick={() =>
                setSelectedImage(
                  `${API_URL}/uploads/${image.imageUrl}`
                )
              }

              className="
                h-64
                w-full
                cursor-pointer
                object-cover
                transition
                hover:scale-105
              "
/>

            

            </div>

          ))
        }

      </div>
{
  selectedImage && (

    <div

      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/95
        p-4
      "

      onClick={() =>
        setSelectedImage(null)
      }
    >

      <button

        onClick={() =>
          setSelectedImage(null)
        }

        className="
          absolute
          right-6
          top-6
          text-4xl
          text-white
          transition
          hover:scale-110
        "
      >
        ×
      </button>

      <img

        src={selectedImage}

        alt="Vista completa"

        onClick={(e) =>
          e.stopPropagation()
        }

        className="
          max-h-[90vh]
          max-w-[90vw]
          rounded-xl
          object-contain
        "
      />

    </div>

  )
}
    </div>

  );

}