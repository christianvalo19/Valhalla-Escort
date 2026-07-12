type Props = {

  username: string;
  profileName: string;

  city?: string;

  profileImage?: string;

};

export default function ProfileCard({

  username,
  profileName,
  city,
  profileImage

}: Props) {

  return (

    <a
      href={`/profile/${username}`}
      className="
        rounded-2xl
        overflow-hidden
        bg-zinc-900
        border
        border-zinc-800
        hover:border-zinc-700
        transition
      "
    >

      <img
        src={
          profileImage
            ? `http://localhost:3001/uploads/${profileImage}`
            : 'https://placehold.co/600x400'
        }
        alt={profileName}
        className="
          h-56
          w-full
          object-cover
        "
      />


      <div className="p-4">

        <h2 className="text-xl font-semibold">
          {profileName}
        </h2>

        <p className="text-zinc-400">
          {city || 'Colombia'}
        </p>

      </div>

    </a>

  );

}