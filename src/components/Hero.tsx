export default function Hero() {

  return (

    <section
  className="
    relative
    hero-enter
    overflow-hidden
    flex
    min-h-screen
    flex-col
    items-center
    justify-around
    px-6
    py-20
    md:py-28
    text-center
    bg-cover
    bg-center
    bg-fixed
  "
>
    {/* Imagen de fondo */}

      <div
        className="
          hero-background
          absolute
          inset-0
        "
      ></div>

      {/* Oscurecer imagen */}

      <div
        className="
          absolute
          inset-0
          bg-black/90
        "
      ></div>

  <div className="relative z-10">
    <h1
    className="
      max-w-5xl
      font-serif
      leading-none
      tracking-wide
      text-5xl
      sm:text-6xl
      md:text-7xl
      lg:text-8xl
      
    "
    
    style={{
    color: 'var(--primary)'
    
  }}
  >
    VALHALLA
  </h1>
  <img src="./assets/logo2.png" alt="Valhalla Logo" 
       className="
            w-64
            md:w-96
            xl:w-[500px]
            mb-4
            mx-auto
            " 
            />
  <p
    className="
      mb-12
      text-m
      uppercase
      tracking-[0.25em]
      md:tracking-[0.6em]
      text-zinc-500
    " 
    >
    Defined by discretion
  </p>

  



 <a
  href="/catalog"
  className="

    inline-flex
    items-center
    justify-center

    relative
    overflow-hidden

    rounded-xl
    bg-[#7a6200]

    px-8
    py-4

    font-semibold
    uppercase
    tracking-wider

    transition-all
    duration-300

    hover:scale-105
    hover:shadow-2xl
    hover:shadow-[#7a6200]/15
  "
>
  Ver catálogo
</a>


      
</div>




</section>

  );

}