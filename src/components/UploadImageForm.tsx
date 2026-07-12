import { useState } from 'react';

export default function UploadImageForm() {

  const [title, setTitle] =
    useState('');

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState('');


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!image) return;

    setLoading(true);

    setMessage('');


    try {

      const token =
        localStorage.getItem('token');


      const formData =
        new FormData();

      formData.append(
        'title',
        title
      );

      formData.append(
        'image',
        image
      );


      const response = await fetch(
        'http://localhost:3001/portfolio/upload',
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


      if (!response.ok) {

        setMessage(
          data.message ||
          'Error al subir imagen'
        );

        return;

      }


      setMessage(
        'Imagen subida 😄'
      );

      setTitle('');

    } catch (error) {

      console.error(error);

      setMessage(
        'Error del servidor'
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex
        max-w-xl
        flex-col
        gap-4
      "
    >

      <h2 className="text-3xl font-bold">
        Subir trabajo
      </h2>


      <input
        type="text"

        placeholder="Título"

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }

        className="
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
        "
      />


      <input
        type="file"

        accept="image/*"

        onChange={(e) => {

          if (e.target.files?.[0]) {

            setImage(
              e.target.files[0]
            );

          }

        }}

        className="
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
        "
      />


      {
        message && (

          <p className="text-zinc-300">
            {message}
          </p>

        )
      }


      <button
        type="submit"

        disabled={loading}

        className="
          rounded-xl
          py-3
          font-semibold
        "

        style={{
          background: 'var(--primary)'
        }}
      >

        {
          loading
            ? 'Subiendo...'
            : 'Subir imagen'
        }

      </button>

    </form>

  );

}