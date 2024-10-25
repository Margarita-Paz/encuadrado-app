"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import SolicitudesCard from "@/components/solicitudesCard";
import HistorialCard from "@/components/historialCard";
import PendienteCard from "@/components/pendientesCard";
import axios from "axios";
import Cookies from "js-cookie";

import { Button } from "@nextui-org/react"

export default function Landing() {

  const router = useRouter();
  const [verSolicitudes, setVerSolicitudes] = useState(false);
  const [verHistorial, setVerHistorial] = useState(false);
  const [verPendientes, setVerPendientes] = useState(false);
  interface Action {
    to: string;
    address: string;
    from_name: string;
    action: string;
    id: string;
  }

  const [newActions, setNewActions] = useState<Action[]>([]);
  const [pendingActions, setPendingActions] = useState<Action[]>([]);
  const [completedActions, setCompletedActions] = useState<[]>([]);

  useEffect(() => {
    const email = Cookies.get("username");
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/actions/new");
      setNewActions(response.data);
      console.log(response.data);
    };
    fetchData();

    const fetchDataPending = async () => {
      const response = await axios.get(`http://localhost:8000/actions/pending/${email}`);
      setPendingActions(response.data);
      console.log(response.data);
    };
    fetchDataPending();
    console.log(pendingActions);

    const fetchDataCompleted = async () => {
      const response = await axios.get(`http://localhost:8000/actions/completed/${email}`);
      setCompletedActions(response.data);
      console.log(response.data);
    };
    fetchDataCompleted();
    console.log("terminado", pendingActions);


  }, []);

  const handleLogout = () => {
    Cookies.remove('name');
    Cookies.remove('username');
    router.push("/")
  };

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 space-y-6 sm:p-20">
      <p className="text-center font-bold">¿Qué quieres hacer?</p>
       
        <Button className="bg-blue-700 text-white" onClick={() => setVerSolicitudes(!verSolicitudes)}>
          Nuevas solicitudes!
        </Button>
        {verSolicitudes && (
          <div className="mx-10 space-y-3">
            {newActions.map((data, index) => (
              <div key={index}>
                <SolicitudesCard
                nombre={data.to}
                direccion={data.address}
                solicitante={data.from_name}
                solicitud={data.action}
                id={data.id}
              />
              </div>
            ))}
          </div>
        )}

        <Button className="bg-blue-500 text-white" onClick={() => setVerPendientes(!verPendientes)}>Solicitudes pendientes</Button>
        {verPendientes && (
          <div className="mx-10 space-y-3">
            {pendingActions.map((data, index) => (
              <div key={index}>
                <PendienteCard
                solicitante={data.from_name}
                recibidor={data.to}
                accion={data.action}
                id={data.id}
              />
              </div>
            ))}
          {/* <PendienteCard solicitante="Maria" recibidor="Juan" accion="Abrazo" /> */}
          </div>
        )}

        <Button className="bg-blue-500 text-white" onClick={() => setVerHistorial(!verHistorial)}>
          Ver historial de abrazos y charchazos
        </Button>
        {verHistorial && (
          <HistorialCard data={completedActions} />
        )}

        <Button className="w-fit self-center" size="sm" onClick={handleLogout}>Salir</Button>
    </div>
  )
}