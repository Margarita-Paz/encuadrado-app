"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Login() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async  () => {
    try {
      const response = await axios.post("http://localhost:8000/user", data, {
        headers: {
          'Content-Type': 'application/json'  // Asegurarse de que los headers sean correctos
        }
      });
      if (response.status === 200) {
        alert("Inicio de sesión exitoso");
        console.log(response.data);
        document.cookie = `username=${response.data.email}; path=/; max-age=3600`;
        document.cookie = `name=${response.data.name}; path=/; max-age=3600`;
        router.push("/proveedor/landing")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Manejar un 404 específicamente
        if (error.response && error.response.status === 404) {
          alert("Usuario o contraseña incorrectos");
        } else {
          alert("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
        }
      } else {
        alert("Error inesperado"); // Para errores no relacionados con Axios
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 space-y-4 sm:p-20">
      <p className="bg-blue-500 text-white self-center w-fit font-bold p-2 rounded-xl">PROVEEDORES</p>
      <p className="text-center">Formulario para iniciar sesión</p>

      <div className="flex flex-col space-y-4 items-center">
        <Input 
          placeholder="example@domain.cl"
          label="Correo"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
        />
        <Input
          placeholder="*******"
          label="Contraseña"
          type="password"
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
        />

        <Button className="w-fit px-14 bg-blue-500 text-white" size="sm" onClick={handleLogin}>Iniciar sesión</Button>

        <div className="flex place-content-center space-x-2 py-14">
          <Button className="text-xs" size="sm" onClick={() => router.push("/proveedor")}>Volver</Button>
          <Button className="text-xs bg-blue-300" size="sm" onClick={() => router.push("/proveedor/signup")}>¿Aún no tienes cuenta?</Button>
        </div>
      </div>
    </div>
  )
}