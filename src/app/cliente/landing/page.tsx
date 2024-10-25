"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react"
import HistorialCard from "@/components/cliente/historialCard";
import axios from "axios";
import Cookies from "js-cookie";


export default function Landing() {
  const [verhistorial, setVerhistorial] = useState(false);
  const router = useRouter();
  const [historial, setHistorial] = useState([]);

  const handleLogout = () => {
    Cookies.remove('name');
    Cookies.remove('username');
    router.push("/")
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/action");
      setHistorial(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 space-y-6 sm:p-20">
      <p className="text-center font-bold">¿Qué quieres hacer?</p>
        <Button className="bg-purple-500 text-white" onClick={() => router.push("/cliente/formulario")}>
          Enviar un abrazo o charchazo
        </Button>
        <Button className="bg-purple-500 text-white" onClick={() => setVerhistorial(!verhistorial)}>
          Ver historial de abrazos y charchazos
        </Button>
        {verhistorial && <HistorialCard data={historial} />}
        <Button className="w-fit self-center" size="sm" onClick={handleLogout}>Salir</Button>
    </div>
  )
}