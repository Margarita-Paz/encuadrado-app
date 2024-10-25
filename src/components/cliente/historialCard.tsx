"use client";
import React, { useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import axios from "axios";

const actionNumber = [
  {key: "1", label: "1"},
  {key: "2", label: "2"},
  {key: "3", label: "3"},
  {key: "4", label: "4"},
  {key: "5", label: "5"},
]

const historialData = [
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan',
    status: 'pendiente'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María',
    status: 'cancelado'
    
  },
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan',
    status: 'completado'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María',
    status: 'pendiente'
  },
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan',
    status: 'pendiente'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María',
    status: 'pendiente'
  },
]

interface historialData {
  data: {
    id: string,
    correo: string,
    from_name: string,
    to: string,
    fase: string,
    action: string,
    calificacion: string
    wait_time: number
    start_date: string
  } []
}

export default function HistorialCard({data}: historialData) {

  const handleCalificacion = async (id: string, calificacion: string) => {
    const response = await axios.put(`http://localhost:8000/action/${id}/calificacion/${calificacion}`)
  }

  const handleCancel = async (id: string) => {
    const response = await axios.put(`http://localhost:8000/action/${id}/cancel`)
    window.location.reload();
  }

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-xl">
      <p className="text-center font-bold">Historial de abrazos y charchazos</p>
      {data.map((data, index) => (
        <div key={index} className="flex flex-col space-x-2 space-y-1 pt-4 w-full">
          <p>{new Date(data.start_date).toISOString().split('T')[0]}</p>
          <div className="flex space-x-1">
            <p className={`${data.fase === "pendiente" ? "bg-yellow-500" : data.fase === "cancelado" ? "bg-red-500" : "bg-green-600" } px-2 rounded-xl w-fit text-white`}>
              {data.fase}
            </p>
            <p className={`${data.fase !== "pendiente" && "hidden"}`}>Aún quedan: {data.wait_time} horas</p>
            <hr />
          </div>
          

          <div className="flex py-4 w-full place-content-between pb-6">
            <p className="px-4">{data.action} de {data.from_name} a {data.to}</p>
            <div className="flex space-x-1 w-full items-center place-content-end">
              <Select 
                className="w-16"
                size="sm" 
                // selectedKeys={calificacion}
                defaultSelectedKeys={data.calificacion}
                onChange={(e) => handleCalificacion(data.id, e.target.value)}
              >
                {actionNumber.map((accion) => (
                  <SelectItem key={accion.key}>
                    {accion.label}
                  </SelectItem>
                ))}
              </Select>
              <p>/5</p>
            </div>
          </div>
          <Button
            className="bg-red-500 disabled:bg-gray-300 text-white w-fit h-fit py-2 self-center text-xs"
            disabled={data.fase === "cancelado" || data.fase === "completado"}
            size="sm"
            onClick={() => handleCancel(data.id)}
          >
            Cancelar solicitud
          </Button>
          <hr />
        </div>
        
      ))}
    </div>
  )
}