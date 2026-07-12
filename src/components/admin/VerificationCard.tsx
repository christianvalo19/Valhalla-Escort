import { useState } from 'react';

const API_URL =
  import.meta.env.PUBLIC_API_URL;



interface VerificationCardProps {

  user: any;

  onApprove: (
    id: number
  ) => void;

  onReject: (
    id: number
  ) => void;

}

export default function VerificationCard({

  user,

  onApprove,

  onReject

}: VerificationCardProps) {

  const [selectedImage, setSelectedImage] =
  useState(false);

  const [

  modal,

  setModal

] = useState<

  'approve' |

  'reject' |

  null

>(null);

  return (

    <div

      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
      "

    >

      <img

        src={`${API_URL}/uploads/${user.verificationImage}`}

        alt={user.profileName}

        onClick={() =>
            setSelectedImage(true)
        }

        className="
            h-80
            w-full
            cursor-pointer
            object-cover
            transition
            hover:opacity-90
        "

        />

      <p
      className="
        py-3
        text-center
        text-sm
        text-zinc-500
      "
    >
      🔍 Haz clic en la imagen para ampliarla
    </p>

      <div className="p-6">

        <h2

          className="
            text-2xl
            font-semibold
          "

        >

          {user.profileName}

        </h2>

        <div

          className="
            mt-4
            space-y-2
            text-zinc-400
          "

        >


          <p>

            📧 {user.email}

          </p>

          <p>

            📍 {user.City?.name}

          </p>

        </div>

        <div

          className="
            mt-6
            flex
            items-center
            justify-between
          "

        >

          <span

            className="
              rounded-full
              border
              border-yellow-700
              bg-yellow-900/20
              px-4
              py-2
              text-sm
              text-yellow-300
            "

          >

            🟡 Pendiente

          </span>

        </div>

        <div

          className="
            mt-8
            flex
            gap-4
          "

        >

          <button

           onClick={() =>

            setModal('approve')

          }

            className="
                flex-1
                rounded-xl
                bg-green-700
                py-3
                font-semibold
                transition
                hover:bg-green-600
            "

            >

            ✔ Aprobar

            </button>

          <button

            onClick={() =>

            setModal('reject')

          }

            className="
                  flex-1
                rounded-xl
                bg-red-700
                py-3
                font-semibold
                transition
                hover:bg-red-600
            "

            >

            ✖ Rechazar

            </button>

        </div>

      </div>
      {

modal && (

<div

onClick={() =>
setModal(null)
}

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

onClick={(e)=>
e.stopPropagation()
}

className="
w-full
max-w-md
rounded-3xl
bg-zinc-900
p-8
"

>

<h2

className="
text-3xl
font-serif
"

>

{

modal === 'approve'

?

'✅ Aprobar verificación'

:

'❌ Rechazar verificación'

}

</h2>

<p

className="
mt-6
text-zinc-400
"

>

{

modal === 'approve'

?

`¿Deseas aprobar la verificación de ${user.profileName}?`

:

`¿Deseas rechazar la verificación de ${user.profileName}?`

}

</p>

<div

className="
mt-8
flex
justify-end
gap-4
"

>

<button

onClick={() =>
setModal(null)
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

onClick={() => {

if (

modal === 'approve'

) {

onApprove(user.id);

}

else {

onReject(user.id);

}

setModal(null);

}}

className={

modal === 'approve'

?

`
rounded-xl
bg-green-700
px-6
py-3
`

:

`
rounded-xl
bg-red-700
px-6
py-3
`

}

>

{

modal === 'approve'

?

'Aprobar'

:

'Rechazar'

}

</button>

</div>

</div>

</div>

)

}

      {

  selectedImage && (

    <div
      onClick={() =>
    setSelectedImage(false)
  }
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/95
        p-6
      "

    >

      <button

        onClick={() =>
          setSelectedImage(false)
        }

        className="
          absolute
          right-8
          top-8
          text-5xl
          text-white
        "

      >

        ✕

      </button>

      <img
        onClick={(e) =>
    e.stopPropagation()
  }
        src={`${API_URL}/uploads/${user.verificationImage}`}

        alt={user.profileName}

        className="
          max-h-[90vh]
          max-w-[90vw]
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



