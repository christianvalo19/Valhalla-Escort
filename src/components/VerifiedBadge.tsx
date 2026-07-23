type Props = {
  verified: boolean;
};

export default function VerifiedBadge({
  verified
}: Props) {

  if (!verified) return null;

  return (

    <span

      title="Perfil verificado por Valhalla "

      className="
        flex
        h-7
        w-7
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
      from-[#c59630]
      to-[#81600b]
        text-white
        shadow-md
        transition
        duration-200
        hover:scale-110
      "

    >

      <svg

        xmlns="http://www.w3.org/2000/svg"

        viewBox="0 0 24 24"

        fill="none"

        stroke="currentColor"

        strokeWidth="3"

        className="h-4 w-4"

      >

        <path

          strokeLinecap="round"

          strokeLinejoin="round"

          d="M5 13l4 4L19 7"

        />

      </svg>

    </span>

  );

}