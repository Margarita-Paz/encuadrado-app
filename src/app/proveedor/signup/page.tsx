"use client";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const handleButton = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex self-center space-x-2 items-center">
        <p className="">Formulario para registrarse como</p>
        <p className="font-bold bg-blue-600 text-white p-2 rounded-xl">Proveedor</p>
      </div>

      <div className="flex flex-col space-y-4">
        <Input placeholder="example@domain.cl" label="Correo" />
        <Input placeholder="Nombre" label="Nombre" />
        <Input placeholder="Apellido" label="Apellido" />
        <Input placeholder="*******" label="Contraseña" type="password" />
        
        <div className="flex space-x-2 pt-8">
          <Button className="w-full bg-blue-400 text-white" variant="solid" size="sm" onClick={() => handleButton("/proveedor/login")}>Ya tengo cuenta</Button>
          <Button className="w-full bg-blue-600 text-white" variant="solid" size="sm">Registrarse</Button>
        </div>
        <div>

        </div>
        <Button className="text-xs w-fit self-center" size="sm" onClick={() => handleButton("/proveedor")}>Volver</Button>
      </div>
    </div>
  )
}