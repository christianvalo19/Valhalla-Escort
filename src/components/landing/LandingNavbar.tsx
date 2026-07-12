export default function LandingNavbar() {

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

      {/* logo */}

      <a
        href="/"

        className="
          font-serif
          text-4xl
          tracking-[0.2em]
        "
      >
        <img src="assets/logo2.png" alt="Logo" className="h-12 w-12" />
      </a>
      


      {/* menu */}

      <div
        className="
          hidden
          items-center
          gap-10
          md:flex
        "
      >

        <button
          onClick={() =>
            scrollToSection('about')
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
          Nosotros
        </button>

        <button
          onClick={() =>
            scrollToSection('register')
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
          Registro
        </button>


        <button
          onClick={() =>
            scrollToSection('contact')
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

        <a
        href="/catalog"

        className="
          rounded-full
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

      </div>

    </nav>

  );

}