
const historialData = [
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María'
  },
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María'
  },
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María'
  },
  {
    type: 'abrazo',
    from: 'María',
    to: 'Juan'
  },
  {
    type: 'charchazo',
    from: 'Juan',
    to: 'María'
  },
]

interface CompletedActionsProps {
  data: {
    action: string;
    from_name: string;
    to: string;
    calificacion: string;
    fase: string;
  }[]
}

export default function HistorialCard({data}: CompletedActionsProps) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-xl">
      <p className="text-center font-bold">Historial de abrazos y charchazos</p>
      {data.map((data, index) => (
        <div key={index} className="flex flex-col space-x-2 pt-4">
          <p className={`${data.fase === "cancelado" ? "bg-red-400" : "bg-green-600"} w-fit p-1 rounded-xl text-xs`}>{data.fase}</p>
          <div className="flex place-content-between pt-2">
            <p className="px-4">{data.action} de {data.from_name} a {data.to}</p>
            <p>Puntuación {data.calificacion}/5</p>
          </div>
          <hr />
        </div>
        
      ))}
    </div>
  )
}