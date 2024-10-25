"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


interface SolicitudesCardProps {
  nombre: string;
  direccion: string;
  solicitante: string;
  solicitud: string;
  id: string;
}

export default function SolicitudesCard({nombre, direccion, solicitante, solicitud, id}: SolicitudesCardProps) {
  const router = useRouter();
  const handleReject = async () => {
    const response = await axios.put(`http://localhost:8000/action/${id}/reject`);
    window.location.reload();
  }

  const handleAccept = async () => {
    const email = Cookies.get("username");
    const response = await axios.put(`http://localhost:8000/action/${id}/accept/${email}`);
    window.location.reload();
  }
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-xl">
      <p className="text-center font-bold">Solicitud de {solicitud}</p>
      <p>Solicitante: {solicitante}</p>
      <p>Nombre: {nombre}</p>
      <p>Dirección: {direccion}</p>
      <div className="flex space-x-2 pt-4">
        <Button className="w-full bg-red-400 text-white rounded-md" size="sm" onClick={handleReject}>Rechazar</Button>
        <Button className="w-full bg-blue-400 text-white rounded-md" size="sm" onClick={handleAccept}>Aceptar</Button>
      </div>
    </div>
  )

}