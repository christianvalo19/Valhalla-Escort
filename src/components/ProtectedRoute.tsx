import { useEffect, useState } from 'react';

type Props = {

  children: React.ReactNode;

};

export default function ProtectedRoute({

  children

}: Props) {

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const token =
      localStorage.getItem('token');


    if (!token) {

      window.location.href =
        '/login';

      return;

    }

    setLoading(false);

  }, []);


  if (loading) {

    return (

      <p className="p-10">
        Cargando...
      </p>

    );

  }


  return children;

}