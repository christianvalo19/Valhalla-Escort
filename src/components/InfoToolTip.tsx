import { useEffect, useRef, useState } from 'react';

interface Props {

  children: React.ReactNode;

}

export default function InfoTooltip({

  children

}: Props) {

  const [open, setOpen] = useState(false);

  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClick = (

      e: MouseEvent

    ) => {

      if (

        ref.current &&

        !ref.current.contains(

          e.target as Node

        )

      ) {

        setOpen(false);

      }

    };

    document.addEventListener(

      'click',

      handleClick

    );

    return () =>

      document.removeEventListener(

        'click',

        handleClick

      );

  }, []);

  return (

    <div

      ref={ref}

      className="
        relative
        inline-block
      "

    >

      <button

        type="button"

        onClick={() =>
          setOpen(!open)
        }

        className="
          flex
          h-5
          w-5
          items-center
          justify-center

          rounded-full

          border
          border-zinc-600

          text-xs
          font-bold

          text-zinc-400

          transition

          hover:border-[#c59630]
          hover:text-[#c59630]
        "

      >

        ?

      </button>

      <div

        className={`
          absolute
          left-1/2
          top-8

          z-50

          w-72

          -translate-x-1/2

          rounded-xl

          border
          border-zinc-700

          bg-zinc-900

          p-4

          text-left
          text-sm

          leading-relaxed

          text-zinc-300

          shadow-2xl

          transition-all

          duration-200

          ${

            open

              ? 'opacity-100 scale-100'

              : 'pointer-events-none opacity-0 scale-95'

          }
        `}

      >

        {children}

      </div>

    </div>

  );

}