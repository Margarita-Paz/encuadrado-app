"use client";
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleClient = () => {
    router.push('/cliente');
  };

  const handleProvider = () => {
    router.push('/proveedor');
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    document.body.classList.add('vsc-initialized');
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // O una versión de carga, o el render del componente en el servidor
  }

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <p className="text-2xl text-center text-black">
        Aplicación de charchazos y abrazos: ya no tienes que demostrar tu afecto o enojo presencialmente, nosotros ofrecemos ese servicio por ti
      </p>

      <div className='flex w-full place-content-center'>
        <div className='border-2 border-purple-500 p-20 w-fit rounded-2xl'>
          <p className='py-4 text-black text-center font-thin'>¿Qué tipo de usuario eres?</p>
          <div className='flex text-white space-x-3 place-content-center w-full outline-none'>
            <Button className='bg-purple-500 px-4 py-2 rounded-xl hover:bg-purple-200 text-white' variant="solid" onClick={handleClient}>Cliente</Button>
            <Button className='bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-200 text-white ' onClick={handleProvider}>Proveedor</Button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
