import { useEffect, useState } from 'react';
import VerificationCard from './VerificationCard';

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function AdminDashboard() {

const [users, setUsers] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

const [message, setMessage] = useState('');

useEffect(() => {

  const loadUsers = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(

        `${API_URL}/admin/verifications`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

      const data =
        await response.json();

      if (response.ok) {

        setUsers(data);

      } else {

        setMessage(
          data.message
        );

      }

    } catch (error) {

      console.error(error);

      setMessage(
        'Error del servidor.'
      );

    }

    setLoading(false);

  };

  loadUsers();

}, []);

const approveUser = async (
  id: number
) => {

  try {

    const token =
      localStorage.getItem('token');

    const response =
      await fetch(

        `${API_URL}/admin/verifications/${id}/approve`,

        {

          method: 'PUT',

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    const data =
      await response.json();

    if (response.ok) {

      setUsers(

        users.filter(

          user => user.id !== id

        )

      );

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

  }

};

const rejectUser = async (
  id: number
) => {

  try {

    const token =
      localStorage.getItem('token');

    const response =
      await fetch(

        `${API_URL}/admin/verifications/${id}/reject`,

        {

          method: 'PUT',

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    const data =
      await response.json();

    if (response.ok) {

      setUsers(

        users.filter(

          user => user.id !== id

        )

      );

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

  }

};

  return (

    <div
      className="
        mx-auto
        max-w-7xl
        px-4
        py-16
      "
    >

      <h1
        className="
          font-serif
          text-5xl
        "
      >
        Panel de administrador
      </h1>

      <p
        className="
          mt-4
          text-zinc-400
        "
      >
        Revisa las solicitudes de verificación de los usuarios.
      </p>

      <div className="mt-12">

  {

    loading && (

      <p className="text-zinc-400">

        Cargando solicitudes...

      </p>

    )

  }

  {

    !loading && users.length === 0 && (

      <div

        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-12
          text-center
        "

      >

        <div className="text-6xl">

          ✅

        </div>

        <h2

          className="
            mt-6
            text-2xl
            font-semibold
          "

        >

          No hay solicitudes pendientes

        </h2>

        <p

          className="
            mt-2
            text-zinc-400
          "

        >

          Todos los documentos ya fueron revisados.

        </p>

      </div>

    )

  }

  {

    users.map(user => (

  <VerificationCard

    key={user.id}

    user={user}

    onApprove={approveUser}

    onReject={rejectUser}

  />

))

  }

</div>

    </div>

  );

}