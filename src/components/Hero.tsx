export default function Hero() {

  return (

    <section
  className="
    hero-enter
    overflow-hidden
    flex
    min-h-screen
    flex-col
    items-center
    justify-center
    px-6
    text-center
    py-28
    bg-cover
    bg-center
    bg-fixed
  "
  style={{
    backgroundImage: "url('/assets/Valhalla 2.jpeg')"
  }}
>
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
      text-6xl
      leading-none
      tracking-wide
      md:text-8xl
      
    "
    
    style={{
    color: 'var(--primary)'
    
  }}
  >
    VALHALLA
  </h1>
  <img src="./assets/logo2.png" alt="Valhalla Logo" className="mb-1 w-lg" />
  <p
    className="
      mb-12
      text-m
      uppercase
      tracking-[0.6em]
      text-zinc-500
    "

    
  >
    Defined by discretion
  </p>

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

          text-white
          transition
          hover:scale-105
        "
       
      >
        Catálogo
      </a>
</div>




</section>

  );

}