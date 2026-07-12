import { useState } from 'react';

export default function UploadProfilePhotoForm() {

  const [preview, setPreview] =
  useState('');

  const [file, setFile] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState('');

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      'image',
      file
    );

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        'http://localhost:3001/profile/photo',

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

    } catch (error) {

      console.error(error);

      setMessage(
        'Error al subir imagen'
      );

    }

  };

  return (

    <form
      onSubmit={handleSubmit}

      className="
        flex
        flex-col
        gap-8
      "
    >

      <h1
        className="
          font-serif
          text-5xl
        "
      >
        Cambiar foto
      </h1>

      <input
        type="file"

        accept="image/*"

        onChange={(e) => {

  const selectedFile =
    e.target.files?.[0];

  if (!selectedFile) return;

  setFile(selectedFile);

  setPreview(
    URL.createObjectURL(
      selectedFile
    )
  );

}}
      />
      {
  preview && (

    <img
      src={preview}
      alt="Vista previa"

      className="
        h-72
        w-72
        self-center
        rounded-full
        border
        border-zinc-700
        object-cover
      "
    />

  )
}

      <button
        type="submit"

        className="
          w-fit
          rounded-xl
          bg-[#7a6200]
          px-8
          py-4
          text-white
          transition
          hover:scale-105
        "
      >
        Guardar foto
      </button>

      {
        message && (

          <p>
            {message}
          </p>

        )
      }

    </form>

  );

}