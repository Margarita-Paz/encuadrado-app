"use client";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Client() {
  const router = useRouter();

  const handleButton = (href: string) => {
    router.push(href);
  }

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 space-y-6 sm:p-20">
      <p className="text-2xl text-center text-black">
        ¡Bienvenido a charchazo y abrazo!
      </p>
      <p className='self-center'>¿Quieres enviar un charchazo o un abrazo?</p>

      <div className='flex text-white space-x-3 place-content-center w-full outline-none'>
        <Button className='bg-purple-500 px-4 py-2 rounded-xl hover:bg-purple-200 text-white' onClick={() => handleButton("/cliente/signup")}>Registrarse</Button>
        <Button className='bg-purple-800 px-4 py-2 rounded-xl hover:bg-purple-200 text-white' onClick={() => handleButton("/cliente/login")}>Iniciar sesión</Button>
      </div>
      <Button size='sm' className='w-fit self-center' onClick={() => handleButton("/")}>Volver</Button>
    </div>
  )
}