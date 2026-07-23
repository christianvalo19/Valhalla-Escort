import { useEffect, useState } from 'react';

import InfoTooltip from './InfoToolTip';
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const API_URL =
  import.meta.env.PUBLIC_API_URL;

type City = {

  id: number;

  name: string;

};

export default function RegisterForm() {

  const [cities, setCities] =
    useState<City[]>([]);

  const [username, setUsername] =
    useState('');

  const [profileName, setProfileName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
  useState(false);

  const [birthDate, setBirthDate] =
    useState('');

  const [secretQuestion, setSecretQuestion] =
    useState('');

  const [secretAnswer, setSecretAnswer] =
    useState('');

  const [cityId, setCityId] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [acceptPolicy, setAcceptPolicy] =
  useState(false);

  const [showPolicy, setShowPolicy] =
  useState(false);


  // cargar ciudades

  useEffect(() => {

    const fetchCities = async () => {

      try {

        const response = await fetch(
          `${API_URL}/cities`
        );

        const data =
          await response.json();

        setCities(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchCities();

  }, []);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage('');

    if (
      !username.trim() ||
      !profileName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !birthDate ||
      !secretQuestion ||
      !secretAnswer.trim() ||
      !cityId
    ) {

      setMessage(
        'Todos los campos son obligatorios.'
      );

      return;

    }

    setLoading(true);


    try {

      const response = await fetch(
        `${API_URL}/auth/register`,
        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            username,
            profileName,
            email,
            password,
            birthDate,
            secretQuestion,
            secretAnswer,

            cityId:
              Number(cityId)

          })

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setMessage(
          data.message ||
          'Error al registrarse'
        );

        return;

      }


      setMessage(
        'Usuario creado exitosamente. Redirigiendo a la página de inicio de sesión...'
      );


      setTimeout(() => {

        window.location.href =
          '/login';

      }, 1200);

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
    
    <div
    className="
      mx-auto
      max-w-7xl
      px-6
      py-20
    "
  >

<section
  className="
    mb-80
  "
>

  <h2
    className="
      mb-10
      text-center
      font-serif
      text-5xl
      tracking-[0.3em]
      text-[#917712]
    "
  >
    REGÍSTRATE
  </h2>

  <div
    className="
      overflow-x-auto
    "
  >

    <table
      className="
        w-full
        border-collapse
      "
    >

      <thead>

        <tr>

          <th
            className="
              border-2
              border-[#917712]
              p-6
              font-serif
              text-2xl
            "
          >
            SOPORTE ELITE 24/7
          </th>

          <th
            className="
              border-2
              border-[#917712]
              p-6
              font-serif
              text-2xl
            "
          >
            CERO INVERSIÓN -<br />
            MÁXIMO RETORNO
          </th>

          <th
            className="
              border-2
              border-[#917712]
              p-6
              font-serif
              text-2xl
            "
          >
            PRIORIDAD DE EXPOSICIÓN
          </th>

        </tr>

      </thead>

      <tbody>

        <tr>

          <td
            className="
              border-2
              border-[#917712]
              p-8
              text-xl
              leading-relaxed
              text-zinc-400
              text-justify
            "
          >

            Nunca estarás sola, dispones de un canal de asistencia personalizada disponible en todo momento para resolver cualquier incidencia en tiempo real, telefónicamente o por medio de WhatsApp.

          </td>

          <td
            className="
              border-2
              border-[#917712]
              p-8
              text-xl
              leading-relaxed
              text-zinc-400
              text-justify
            "
          >

            Disfruta de todas las funcionalidades <strong>FREEMIUM</strong>, mientras la plataforma se encuentra en fase MVP de forma totalmente gratuita.

          </td>

          <td
            className="
              border-2
              border-[#917712]
              p-8
              text-xl
              leading-relaxed
              text-zinc-400
              text-justify
            "
          >

            Las pioneras en <strong>VALHALLA</strong> reciben un impulso algorítmico de visibilidad, garantizando que su perfil permanezca en las primeras posiciones del catálogo.

          </td>

        </tr>

      </tbody>

    </table>

  </div>

  <div
  className="
    my-12
    flex
    justify-center
  "
>

  <a
  href="#register-form"
  className="
    rounded-xl
    bg-[#7a6200]
    px-10
    py-4
    font-semibold
    text-white
    transition
    hover:scale-105
  "
>
  Comenzar mi registro ↓
</a>

</div>

</section>

    <form
      id="register-form"
      onSubmit={handleSubmit}
      className="
        mx-auto
        flex
        max-w-xl
        flex-col
        gap-2
        py-1
      "
      

      
    >

      <h1 className="text-4xl font-bold py-5">
        Crear cuenta
      </h1>
      <br></br>


    <div
  className="
    flex
    items-center
    gap-3
  "
>

  <label

    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "

  >

    Nombre de usuario: 

  </label>

  <InfoTooltip>

    <p className="font-semibold">

      ¿Qué es el nombre de usuario?

    </p>

    <p className="mt-2">

      Es un nombre privado que únicamente utilizarás para iniciar sesión en Valhalla.

      <br /><br />

      Tu nombre público será el <strong>Nombre de perfil</strong>, que es el que verán los clientes.

    </p>

  </InfoTooltip>

</div>

      <input
        type="text"
        placeholder="Ingrese su nombre de usuario"
        required
        value={username}

        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
    "
      />
      <br></br>


       <div
  className="
    flex
    items-center
    gap-3
  "
>

  <label

    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "

  >

    Nombre de perfil: 

  </label>

  <InfoTooltip>

    <p className="font-semibold">

      ¿Qué es el nombre de perfil?

    </p>

    <p className="mt-2">

      Es el nombre que los clientes verán cuando te busquen en Valhalla.

      <br /><br />

      Podrás cambiarlo en cualquier momento.

    </p>

  </InfoTooltip>

</div>
      <input
        type="text"
        placeholder="Ingrese su nombre de perfil"
        required

        value={profileName}

        onChange={(e) =>
          setProfileName(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
    "
      />
 <br></br>
      <label
    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Correo electrónico:
    </label>


      <input
        type="email"
        placeholder="Ingrese su correo electrónico"
        required
        value={email}

        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
    "
      />
       <br></br>
      <label
    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Contraseña:
    </label>
<div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Ingrese su contraseña"
        required
        value={password}

        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }

        className="
        w-full
          border-b
        border-zinc-700
        bg-transparent
        py-1
        text-lg
        outline-none
        transition
        focus:border-white
      "
        
      />

      <button
    type="button"

    onClick={() =>
      setShowPassword(!showPassword)
    }

    className={`
      absolute
      right-0
      top-1/2
      -translate-y-1/2
      transition
      ${
        password
          ? "text-yellow-400"
          : "text-zinc-500"
      }
      hover:text-yellow-300
    `}
  >

    {
      showPassword
        ? <EyeSlashIcon className="h-5 w-5" />
        : <EyeIcon className="h-5 w-5" />
    }

  </button>
</div>
       <br></br>
      <label
      className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Fecha de nacimiento:
    </label>

      <input
        type="date"
        required
        value={birthDate}

        onChange={(e) =>
          setBirthDate(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
      text-zinc-500
    "
      />
        <br></br>
      <label
    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Pregunta secreta:
    </label>

      <select

  value={secretQuestion}
  required
  onChange={(e) =>
    setSecretQuestion(
      e.target.value
    )
  }

  className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
      text-zinc-500
    "
>

  <option value=""
  className="
    bg-black
    text-zinc-500
  ">
    Selecciona una pregunta
  </option>

  <option value="mascota"
  className="
    bg-black
    text-zinc-500
  ">
    ¿Cuál fue tu primera mascota?
  </option>

  <option value="ciudad"
  className="
    bg-black
    text-zinc-500
  ">
    ¿En qué ciudad naciste?
  </option>

  <option value="comida"
  className="
    bg-black
    text-zinc-500
  ">
    ¿Cuál es tu comida favorita?
  </option>

  <option value="colegio"
  className="
    bg-black
    text-zinc-500
  ">
    ¿Cuál es tu color favorito?
  </option>

</select>
 <br></br>
<label
    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Respuesta secreta:
    </label>

      <input
        type="text"
        placeholder="Respuesta secreta"
        required

        value={secretAnswer}

        onChange={(e) =>
          setSecretAnswer(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
    "
      />
 <br></br>
        <label
    className="
      text-xs
      uppercase
      tracking-[0.3em]
      text-zinc-500
    "
    >
    Ubicación:
    </label>
      <select

        value={cityId}
        required
        onChange={(e) =>
          setCityId(
            e.target.value
          )
        }

        className="
          border-b
      border-zinc-700
      bg-transparent
      py-1
      text-lg
      outline-none
      transition
      focus:border-white
      text-zinc-500
    "
      >

        <option value=""
        className="
    bg-black
    text-zinc-500
  ">
          Selecciona ciudad
        </option>

        {
          cities.map((city) => (

            <option
              key={city.id}
              value={city.id}
              className="
    bg-black
    text-zinc-500
  "
            >
              {city.name}
            </option>

          ))
        }

      </select>


      {
        message && (

          <p className="text-zinc-300">
            {message}
          </p>

        )
      }

      <div
  className="
    mt-8
    flex
    items-start
    gap-3
  "
>

  <input

    type="checkbox"

    checked={acceptPolicy}

    onChange={(e) =>
      setAcceptPolicy(e.target.checked)
    }

    className="
      mt-1
      h-5
      w-5
    "
  />

  <p
    className="
      text-sm
      text-zinc-400
    "
  >

    Acepto la{' '}

    <button

      type="button"

      onClick={() =>
        setShowPolicy(true)
      }

      className="
        text-[#bfa13a]
        underline
        hover:text-white
      "
    >

      Política de Privacidad

    </button>
    {
  !acceptPolicy && (

    <p
      className="
        mt-2
        text-sm
        text-zinc-500
      "
    >
      Debes aceptar la Política de Privacidad para continuar.
    </p>

  )
}

  </p>

</div>
      <br></br>
      <br></br>

      <button

  type="submit"

  disabled={
    loading ||
    !acceptPolicy
  }

  className="
    rounded-xl
    py-3
    font-semibold
    transition
  "

  style={{

    background:

      loading || !acceptPolicy

        ? '#3f3f46' // gris

        : 'var(--primary)',

    cursor:

      loading || !acceptPolicy

        ? 'not-allowed'

        : 'pointer',

    opacity:

      loading || !acceptPolicy

        ? 0.7

        : 1

  }}

>

  {

    loading

      ? 'Creando...'

      : 'Crear cuenta'

  }

</button>

    </form>
    {
showPolicy && (

<div
  className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/80
    p-6
  "
>

  <div
    className="
      relative
      max-h-[90vh]
      w-full
      max-w-4xl
      overflow-y-auto
      rounded-3xl
      bg-zinc-950
      p-10
    "
  >

    <button

      onClick={() =>
        setShowPolicy(false)
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

    <h2
      className="
        mb-8
        font-serif
        text-4xl
      "
    >

      Política de Privacidad

    </h2>

    <p className="text-zinc-300">

      Tu información de verificación es privada y nunca será visible para otros usuarios. La utilizamos únicamente para validar identidad, confirmar mayoría de edad y fortalecer la seguridad de la comunidad. Por ende al subir tu selfie con cédula, tu perfil es automáticamente verificado

    </p>

  </div>

</div>


)

}

    </div>

  );

}