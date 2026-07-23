import { useState } from 'react';

import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

type Props = {
  user: any;
  onClose: () => void;
};

const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function AdminUserModal({

  user,

  onClose

}: Props) {

    const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

    const [showResetModal, setShowResetModal] =
    useState(false);

    const [newPassword, setNewPassword] =
    useState('');

    const [showPassword, setShowPassword] =
    useState(false);

    const [successMessage, setSuccessMessage] =
    useState('');

    const resetPassword = async () => {

        try{

            const token =
            localStorage.getItem("token");

            const response =
            await fetch(

                `${API_URL}/admin/users/${user.id}/password`,

                {

                    method:"PUT",

                    headers:{

                        "Content-Type":"application/json",

                        Authorization:

                        `Bearer ${token}`

                    },

                    body:JSON.stringify({

                        password:newPassword

                    })

                }

            );

            const data =
            await response.json();

            if(response.ok){

            setSuccessMessage(

            "Contraseña restablecida correctamente."

            );

            setTimeout(()=>{

                setSuccessMessage("");

                setShowResetModal(false);

                setNewPassword("");

            },2000);

        }

        }

        catch(error){

            console.error(error);

        }

    };
    
    const deleteUser = async () => {

  const confirmDelete = window.confirm(

    '¿Deseas eliminar este usuario? Esta acción no se puede deshacer.'

  );

  if (!confirmDelete) return;

  try {
    const token =
    localStorage.getItem("token");

    const response = await fetch(

      `${API_URL}/admin/users/${user.id}`,

      {

        method: 'DELETE',

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    const data = await response.json();

    if (!response.ok) {

      alert(data.message);

      return;

    }

    alert('Usuario eliminado correctamente.');

    onClose();

    window.location.reload();

  } catch (error) {

    console.error(error);

    alert('Error al eliminar el usuario.');

  }

};

  if (!user) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/90
        p-6
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

          onClick={onClose}

          className="
            absolute
            right-6
            top-6
            text-3xl
            text-zinc-400
            transition
            hover:text-white
          "

        >

          ✕

        </button>

        <h1
          className="
            mb-10
            font-serif
            text-5xl
          "
        >

          {user.profileName}

        </h1>

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[320px_1fr]
          "
        >

          {/* Columna izquierda */}

          <div>

            <h3
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-zinc-500
              "
            >

              Foto de perfil:

            </h3>

            <img
            src={`${API_URL}/uploads/${user.Profile?.profileImage}`}
            alt="Perfil"

            onClick={() =>

                setSelectedImage(

                `${API_URL}/uploads/${user.Profile?.profileImage}`

                )

            }

            className="
                mb-8
                h-96
                w-full
                cursor-pointer
                rounded-2xl
                object-cover
                transition
                hover:scale-[1.02]
                hover:brightness-75
            "

            />

            <h3
              className="
                mb-3
                text-sm
                uppercase
                tracking-[0.3em]
                text-zinc-500
              "
            >

              Documento de verificación:

            </h3>

            {

              user.verificationImage

              ? (

                <img

                src={`${API_URL}/uploads/${user.verificationImage}`}

                alt="Documento"

                onClick={() =>

                    setSelectedImage(

                    `${API_URL}/uploads/${user.verificationImage}`

                    )

                }

                className="
                    w-full
                    cursor-pointer
                    rounded-2xl
                    transition
                    hover:scale-[1.02]
                    hover:brightness-75
                "

                />

              )

              : (

                <div
                  className="
                    rounded-2xl
                    border
                    border-zinc-800
                    p-10
                    text-center
                    text-zinc-500
                  "
                >

                  No hay documento.

                </div>

              )

            }

          </div>

          {/* Columna derecha */}

          <div
            className="
              space-y-6
            "
          >

            <InfoRow
              label="Usuario"
              value={user.username}
            />

            <InfoRow
              label="Correo"
              value={user.email}
            />

            <InfoRow
              label="Ciudad"
              value={user.City?.name}
            />

            <InfoRow
              label="Fecha de nacimiento"
              value={user.birthDate}
            />

            <InfoRow
              label="Pregunta secreta"
              value={user.secretQuestion}
            />

            <InfoRow
              label="Respuesta secreta"
              value={user.secretAnswer}
            />

            <InfoRow
              label="Estado de verificación"
              value={user.verificationStatus}
            />

            <button
              onClick={()=>
                setShowResetModal(true)
                }
              className="
                mt-8
                rounded-xl
                bg-[#7a6200]
                px-8
                py-3
                font-semibold
                transition
                hover:bg-[#967c14]
              "
            >

              Restablecer contraseña

            </button>
            <b> </b>
            <button
            onClick={deleteUser}
            className="
              rounded-xl
              bg-red-700
              px-8
              py-3
              text-white
              transition
              hover:bg-red-800
            "
          >
            Eliminar usuario
          </button>

          </div>

        </div>
{

showResetModal && (

<div

className="
fixed
inset-0
z-[70]

flex
items-center
justify-center

bg-black/60
"

>

<div

className="
w-full

max-w-md

rounded-3xl

bg-zinc-950

p-8
"

>

<h2

className="
mb-6

font-serif

text-3xl
"

>

Restablecer contraseña

</h2>

{

successMessage && (

<div

className="
mb-6

rounded-xl

border

border-green-700

bg-green-950/40

p-4

text-green-300
"

>

<div
className="
flex
items-center
gap-3
"
>

<span
className="text-xl"
>

✅

</span>

<span>

{successMessage}

</span>

</div>

</div>

)

}

<div className="relative">

  <input

    type={
      showPassword
        ? 'text'
        : 'password'
    }

    value={newPassword}

    onChange={(e)=>

      setNewPassword(

        e.target.value

      )

    }

    placeholder="Nueva contraseña"

    className="
      w-full
      rounded-xl
      border
      border-zinc-700
      bg-zinc-900
      p-3
      pr-14
    "

  />

  <button

    type="button"

    onClick={()=>

      setShowPassword(

        !showPassword

      )

    }

    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-zinc-400
      transition
      hover:text-white
    "

  >

    {

      showPassword

      ?

      <EyeSlashIcon className="h-5 w-5" />

      :

      <EyeIcon className="h-5 w-5" />

    }

  </button>

</div>

<div

className="
flex

justify-end

gap-4
"

>

<button

onClick={()=>

setShowResetModal(false)

}

className="
rounded-xl

border

border-zinc-700

px-6

py-3
"

>

Cancelar

</button>

<button

onClick={resetPassword}

className="
rounded-xl

bg-[#7a6200]

px-6

py-3
"

>

Guardar

</button>

</div>

</div>

</div>

)

}
      </div>
      {

selectedImage && (

<div

onClick={() =>

setSelectedImage(null)

}

className="
fixed
inset-0
z-[60]

flex
items-center
justify-center

bg-black/95

p-6
"

>

<button

onClick={()=>

setSelectedImage(null)

}

className="
absolute

right-6

top-6

flex

h-12

w-12

items-center

justify-center

rounded-full

bg-black/50

text-2xl

backdrop-blur

transition

hover:bg-black/70
"

>

✕

</button>

<img

src={selectedImage}

alt=""

onClick={(e)=>

e.stopPropagation()

}

className="
max-h-[92vh]
max-w-[92vw]

rounded-2xl

object-contain
"

/>

</div>

)

}

    </div>

  );

}



function InfoRow({

  label,

  value

}: {

  label: string;

  value: any;

}) {

  return (

    <div
      className="
        border-b
        border-zinc-800
        pb-4
      "
    >

      <p
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-zinc-500
        "
      >

        {label}

      </p>

      <p
        className="
          mt-2
          text-lg
        "
      >

        {value || 'Sin información'}

      </p>
      
      

    </div>

  );

}