import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";


const API_URL =
  import.meta.env.PUBLIC_API_URL;

export default function AdminSettings() {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [isSuccess, setIsSuccess] =
useState(false);

  const changePassword = async () => {

    setMessage("");

    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {
        setIsSuccess(false);
        setMessage("Todos los campos son obligatorios.");

        return;

    }

    if (newPassword !== confirmPassword) {

        setIsSuccess(false);
        setMessage("Las nuevas contraseñas no coinciden.");

        return;

    }

    try {

        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(

            `${API_URL}/admin/settings/password`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    currentPassword,

                    newPassword

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {
            setIsSuccess(false);
            setMessage(data.message);

            return;

        }

        setIsSuccess(true);
        setMessage(data.message);

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

    }

    catch (error) {

        console.error(error);
        setIsSuccess(false);
        setMessage("Error al conectar con el servidor.");

    }

    finally {

        setLoading(false);

    }

};

  return (

    <div className="max-w-lg mx-auto mt-10 rounded-lg border border-white/10 bg-[#111] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">

        Configuración

      </h2>

      <div className="space-y-5">

    <div>

        <label className="mb-2 block text-sm text-gray-300">

            Contraseña actual

        </label>

        <div className="relative">

    <input

        type={showCurrent ? "text" : "password"}

        value={currentPassword}

        onChange={(e)=>

            setCurrentPassword(e.target.value)

        }

        className="w-full rounded border border-gray-700 bg-black px-4 py-2 pr-12 text-white"

    />

    <button

        type="button"

        onClick={() => setShowCurrent(!showCurrent)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showCurrent

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>

</div>
    </div>

    <div>
       

        <label className="mb-2 block text-sm text-gray-300">

            Nueva contraseña

        </label>

         <div className="relative">

        <input

            type={showNew ? "text" : "password"}

            value={newPassword}

            onChange={(e)=>

                setNewPassword(e.target.value)

            }

            className="w-full rounded border border-gray-700 bg-black px-4 py-2 text-white"

        />
        <button

        type="button"

        onClick={() => setShowNew(!showNew)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showNew

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>
</div>
    </div>

    <div>

        <label className="mb-2 block text-sm text-gray-300">

            Confirmar contraseña

        </label>

        <div className="relative">

        <input

            type={showConfirm ? "text" : "password"}

            value={confirmPassword}

            onChange={(e)=>

                setConfirmPassword(e.target.value)

            }

            className="w-full rounded border border-gray-700 bg-black px-4 py-2 text-white"

        />
        <button

        type="button"

        onClick={() => setShowConfirm(!showConfirm)}

        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"

    >

        {

            showConfirm

            ?

            <EyeSlashIcon className="h-5 w-5" />

            :

            <EyeIcon className="h-5 w-5" />

        }

    </button>
</div>
    </div>

</div>

<button

    onClick={changePassword}

    disabled={loading}

    className="mt-6 w-full rounded bg-[#7a6200] px-4 py-3 font-semibold text-white transition hover:bg-[#967c14] disabled:opacity-50"

>

    {

        loading

        ? "Guardando..."

        : "Guardar cambios"

    }

</button>
{

    message && (

        <p

className={

`mt-4 text-center text-sm font-medium

${

isSuccess

? "text-green-400"

: "text-red-400"

}`

}

>

    {message}

</p>

    )

}

    </div>

    

  );

}