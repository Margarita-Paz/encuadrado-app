import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import axios from "axios";

interface PendienteCardProps {
  solicitante: string;
  recibidor: string;
  accion: string;
  id: string;
}

export default function PendienteCard({ solicitante, recibidor, accion, id }: PendienteCardProps) {

  const handleCompleted = async () => {
    const email = Cookies.get("username");
    const response = await axios.put(`http://localhost:8000/action/${id}/completed`);
    console.log(response.data);
    window.location.reload();
  }

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-xl">
      <p className="text-center font-bold">Solicitud de {accion}</p>
      <p>Solicitante: {solicitante}</p>
      <p>Recibidor: {recibidor}</p>
      <div className="flex space-x-2 pt-4 px-12">
        {/* <Button className="w-full bg-red-400 text-white rounded-md" size="sm">Cancelar</Button> */}
        <Button
          className="w-full bg-green-600 text-white rounded-md"
          size="sm"
          onClick={handleCompleted}
        >
          Completado
        </Button>
      </div>
    </div>
  )

}