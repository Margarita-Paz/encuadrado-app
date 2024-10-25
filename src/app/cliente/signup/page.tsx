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
      <p className="text-center">Formulario para registrarse como cliente</p>

      <div className="flex flex-col space-y-4">
        <Input placeholder="example@domain.cl" label="Correo" />
        <Input placeholder="Nombre" label="Nombre" />
        <Input placeholder="Apellido" label="Apellido" />
        <Input placeholder="*******" label="Contraseña" type="password" />
        <div className="flex space-x-2 pt-8">
          <Button className="w-full bg-purple-400 text-white" variant="solid" size="sm" onClick={() => handleButton("/cliente/login")}>Ya tengo cuenta</Button>
          <Button className="w-full" color="secondary" variant="solid" size="sm">Registrarse</Button>
        </div>
        <Button className="text-xs w-fit self-center" size="sm" onClick={() => handleButton("/cliente")}>Volver</Button>
      </div>
    </div>
  )
}