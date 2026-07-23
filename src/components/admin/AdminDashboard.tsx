import { useEffect, useState } from 'react';
import VerificationCard from './VerificationCard';

import AdminUserModal
from './AdminUserModal';

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function AdminDashboard() {

const [users, setUsers] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

const [message, setMessage] = useState('');


const [activeTab, setActiveTab] =


useState<'verifications' | 'users'>(

'verifications'

);

const [selectedUser, setSelectedUser] =

useState<any>(null);

const [allUsers, setAllUsers] =

useState<any[]>([]);

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

  loadAllUsers();

}, []);

const loadAllUsers = async () => {

  try {

    const token =
      localStorage.getItem('token');

    const response =
      await fetch(

        `${API_URL}/admin/users`,

        {

          headers: {

            Authorization:

            `Bearer ${token}`

          }

        }

      );

    const data =
      await response.json();

    if(response.ok){

      setAllUsers(data);

    }

  } catch(error){

    console.error(error);

  }

};

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

      <div
className="
mt-10
flex
gap-4
"
>

<button

onClick={()=>
setActiveTab(
'verifications'
)
}

className={`
rounded-xl
px-6
py-3

transition

${
activeTab==='verifications'

?

'bg-[#7a6200] text-white'

:

'bg-zinc-900 text-zinc-400'

}
`}

>

Solicitudes

</button>

<button

onClick={()=>
setActiveTab(
'users'
)
}

className={`
rounded-xl
px-6
py-3

transition

${
activeTab==='users'

?

'bg-[#7a6200] text-white'

:

'bg-zinc-900 text-zinc-400'

}
`}

>

Perfiles

</button>

</div>

      <div className="mt-12">

  {

    loading && (

      <p className="text-zinc-400">

        Cargando solicitudes...

      </p>

    )

  }

  

  {
  activeTab === 'verifications'

    ? (

      <>

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

      </>

    )
    

    : (

      allUsers.map(user => (

        <div

          key={user.id}

          className="
            mb-6
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            p-6
          "

        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-xl
                  font-semibold
                "
              >
                {user.profileName}
              </h2>

              <p className="text-zinc-400">
                {user.City?.name}
              </p>

            </div>

            <button

onClick={() =>
    setSelectedUser(user)
}

className="
rounded-xl
bg-[#7a6200]
px-5
py-2
text-sm
transition
hover:scale-105
"

>

Ver perfil

</button>

          </div>

        </div>

      ))

    )

}
{

selectedUser && (

<AdminUserModal

user={selectedUser}

onClose={()=>

setSelectedUser(null)

}

/>

)

}

</div>

    </div>
    

  );
  

}