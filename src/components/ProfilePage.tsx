import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

interface User {
  profileName: string;
  City?: {
    name: string;
  };
  Profile?: {
    profileImage?: string;
    description?: string;
    whatsapp?: string;
    instagram?: string;
  };
  PortfolioImages?: {
    imageUrl: string;
    title: string;
  }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const params = new URLSearchParams(
        window.location.search
    );

    const username =
        params.get("username");

    if (!username) {

        setLoading(false);

        return;

    }

    fetch(
        `${API_URL}/profiles/${username}`
    )
        .then(res => res.json())
        .then(data => {

            setUser(data);

            setLoading(false);

        })
        .catch(error => {

            console.error(error);

            setLoading(false);

        });

}, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p>Cargando perfil...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p>No se encontró el perfil.</p>
      </section>
    );
  }

  const profile = user.Profile;
  const images = user.PortfolioImages || [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">

      {/* HEADER */}

      <div className="flex flex-col gap-8 md:flex-row md:items-center">

        <img
          src={
            profile?.profileImage
              ? `${API_URL}/uploads/${profile.profileImage}`
              : "https://placehold.co/300x300"
          }
          alt={user.profileName}
          className="h-48 w-48 rounded-2xl object-cover"
        />

        <div>

          <h1 className="text-5xl font-bold">
            {user.profileName}
          </h1>

          <p className="mt-2 text-zinc-400">
            {user.City?.name}
          </p>

          <p className="mt-6 max-w-2xl text-lg">
            {profile?.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            {profile?.whatsapp && (
              <a
                href={`https://wa.me/57${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-3 font-semibold"
                style={{
                  background: "var(--primary)"
                }}
              >
                WhatsApp
              </a>
            )}

            {profile?.instagram && (
              <a
                href={`https://instagram.com/${profile.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-zinc-700 px-5 py-3"
              >
                Instagram
              </a>
            )}

          </div>

        </div>

      </div>

      {/* GALERÍA */}

      <div className="mt-20">

        <h2 className="mb-8 text-3xl font-bold">
          Trabajos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image, index) => (

            <img
              key={index}
              src={`${API_URL}/uploads/${image.imageUrl}`}
              alt={image.title}
              className="h-80 w-full rounded-2xl object-cover"
            />

          ))}

        </div>

      </div>

    </section>
  );
}