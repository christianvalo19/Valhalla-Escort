import { useEffect, useState } from 'react';

import {
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {

  const goToSection = (id: string) => {

  if (
    window.location.pathname !== '/'
  ) {

    window.location.href = `/#${id}`;
    return;

  }

  const section =
    document.getElementById(id);

  section?.scrollIntoView({

    behavior: 'smooth'

  });

};

  const [isMenuOpen, setIsMenuOpen] =
  useState(false);

  const [isLogged, setIsLogged] =
    useState(false);


  useEffect(() => {

    const token =
      localStorage.getItem('token');

    setIsLogged(!!token);

  }, []);


  const handleLogout = () => {

    localStorage.removeItem('token');

    window.location.href = '/';

  };

  const scrollToSection = (
    id: string
  ) => {

    const section =
      document.getElementById(id);

    section?.scrollIntoView({

      behavior: 'smooth'

    });

  };


  return (

    <nav
      className="
        fixed
        top-0
        z-50
        flex
        w-full
        items-center
        justify-between
        border-b
        border-white/10
        bg-black/30
        px-8
        py-5
        backdrop-blur-xl
      "
    >
      {

    <div
  className={`
    fixed
    top-24
    left-0
    right-0
    z-40
    flex
    flex-col
    items-center
    gap-6
    border-b
    border-white/10
    bg-black/98
    py-8
    backdrop-blur-2xl
    md:hidden

    transition-all
    duration-700
    ease-out

    ${
      isMenuOpen
        ? 'opacity-100 translate-y-0'
        : 'pointer-events-none opacity-0 -translate-y-6'
    }
  `}
>

  {
    isLogged ? (

      <>
        <a
          href="/catalog"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Inicio
        </a>

        <a
          href="/dashboard"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Perfil
        </a>

        <a
          href="/settings"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Configuración
        </a>

        <button
          onClick={() => {

            setIsMenuOpen(false);

            handleLogout();

          }}
        >
          Salir
        </button>
      </>

    ) : (

      <>
        <button
          onClick={() =>
            goToSection('who')
          }
        >
          ¿Quiénes somos?
        </button>

        <button
          onClick={() =>
            goToSection('why')
          }
        >
          ¿Por qué elegirnos?
        </button>

        <button
          onClick={() =>
            goToSection('contact')
          }
        >
          Contacto
        </button>

        <button
          onClick={() =>
            goToSection('soyescort')
          }
        >
          Soy Escort
        </button>
      </>

    )
  }

</div>
      }

      {/* logo */}

      <a
        href={
          isLogged
            ? '/catalog'
            : '/'
        }

        className="        
          leading-tight
          tracking-[0.2em]
        "
      >
        <img src="/assets/logo2.png" alt="Logo" className="h-12 w-12" />
      </a>

      <div
  className="
    flex
    items-center
    gap-4
    md:hidden
  "
>

  <a
    href="/catalog"
    className="
      rounded-xl
      border
      border-white/20
      bg-[#7a6200]
      px-4
      py-2
      text-[10px]
      font-semibold
      uppercase
      tracking-[0.2em]
      text-white
    "
  >
    Catálogo
  </a>

  <button
  onClick={() =>
    setIsMenuOpen(!isMenuOpen)
  }
>

  {
    isMenuOpen
      ? <X size={28} />
      : <Menu size={28} />
  }

</button>

</div>

      


      {/* menu */}

      <div
        className="
          hidden
          items-center
          gap-10
          md:flex
        "
      >

        {
          isLogged ? (

            <>
              

              <a
                href="/dashboard"

                className="
                  text-sm
                  font-medium
                "
              >
                Mi perfil
              </a>
              
              <a
                href="/settings"

                className="
                  text-sm
                  font-medium
                "
              >
                Configuración
              </a>

              <button
                onClick={handleLogout}

                className="
                  text-sm
                  text-zinc-400
                "
              >
                Salir
              </button>

            </>

          ) : (

            <>
            <button
          onClick={() =>
            goToSection('who')
          }

          className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-zinc-300
            transition
            hover:text-white
          "
        >
          ¿Quiénes somos?
        </button>

        <button
          onClick={() =>
            goToSection('why')
          }

          className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-zinc-300
            transition
            hover:text-white
          "
        >
          ¿Por qué elegirnos?
        </button>

        <button
          onClick={() =>
            goToSection('contact')
          }

          className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-zinc-300
            transition
            hover:text-white
          "
        >
          Contacto
        </button>

              <button
          onClick={() =>
            goToSection('soyescort')
          }

          className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-zinc-300
            transition
            hover:text-white
          "
        >
          Soy Escort
        </button>
              


              <a
        href="/catalog"

        className="
          rounded-xl
          border
          border-white/20
          bg-[#7a6200]
          px-7
          py-3
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
          text-white
          transition
          hover:scale-105
        "
       
      >
        Catálogo
      </a>

            </>

          )
        }

      </div>

    </nav>

  );

}