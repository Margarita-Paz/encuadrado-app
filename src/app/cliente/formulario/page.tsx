"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModalInfo from "@/components/modal";
import axios from "axios";
import Cookies from "js-cookie";

import { Button, Input, Select, SelectItem } from "@nextui-org/react"

export default function Formulario() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const username = Cookies.get('username');
  const name = Cookies.get('name');
  const [data, setData] = useState({
    to: "",
    from_name: name,
    message: "",
    address: "",
    action: "",
    quantity: "",
    fase: "pendiente",
    correo: username
  });

  const sendType = [
    {key: "abrazo", label: "Abrazo"},
    {key: "charchazo", label: "Charchazo"},
  ]

  const actionNumber = [
    {key: "1", label: "1"},
    {key: "2", label: "2"},
    {key: "3", label: "3"},
    {key: "4", label: "4"},
    {key: "5", label: "5"},
  ]

  const handleSend = async () => {
    try {
      const response = await axios.post("http://localhost:8000/action", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setModal(true);
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 space-y-6 sm:p-20">
      <p className="text-center">Formulario para enviar abrazo o charchazo</p>
      <div className="flex flex-col space-y-8 items-center">
        <Input
          labelPlacement={"outside"}
          placeholder="María Donoso"
          label="Nombre del receptor"
          size="sm"
          value={data.to}
          onChange={(e) => setData({...data, to: e.target.value})}
        />
        <Input
          labelPlacement={"outside"}
          placeholder="Las verbenas #023, Maipú"
          label="Dirección del receptor"
          size="sm"
          value={data.address}
          onChange={(e) => setData({...data, address: e.target.value})}
        />
        <Input
          labelPlacement={"outside"}
          placeholder="Hola, María, te envío un abrazo"
          label="Mensaje"
          size="sm"
          value={data.message}
          onChange={(e) => setData({...data, message: e.target.value})}
        />
      </div>
      <div className="flex w-full place-content-center space-x-2">
        <Select 
          label="Seleccione abrazo o charchazo" 
          className="max-w-xs"
          size="sm" 
          selectedKeys={[data.action]}
          onChange={(e) => setData({...data, action: e.target.value})}
        >
          {sendType.map((accion) => (
            <SelectItem key={accion.key}>
              {accion.label}
            </SelectItem>
          ))}
        </Select>

        <Select 
          label="Seleccione cantidad" 
          className="max-w-xs"
          size="sm"
          selectedKeys={[data.quantity]}
          onChange={(e) => setData({...data, quantity: e.target.value})}
        >
          {actionNumber.map((accion) => (
            <SelectItem key={accion.key}>
              {accion.label}
            </SelectItem>
          ))}
        </Select>
        
    </div>
      <Button color="secondary" onClick={handleSend}>Enviar!</Button>

      <div className="pt-8 w-full flex place-content-center">
        <Button className="self-center" size="sm" onClick={() => router.push("/cliente/landing")}>Volver</Button>
      </div>
      <ModalInfo message="Mensaje enviado correctamente ✅" message2={"Envía un nuevo abrazo/charchazo"} status={modal} setStatus={setModal} />
    </div>
  )
}