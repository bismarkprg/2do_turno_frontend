import { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Accion, Columna, DataTable, EstadoPill } from "./components/DataTable.js";
import { FaPencil } from "react-icons/fa6";
import CharacterTable from "./components/CharacterTable";

interface Character {
  RU: number;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  fecha_nacimiento: string;
  universidad: string;
}

type FilaTarea = {
  empleado: string;
  idTarea: string;
  tarea: string;
  inicio: string;
  fin: string;
  conteo: number;
  estado: string;
  colorEstado: "verde" | "amarillo" | "rojo" | "azul" | "gris";
};

export default function App() {
  const [contador, setContador] = useState<number>(0);
  const [datos, setDatos] = useState<Array<Character>>([]);

  const obtenerDatos = async () => {
    const resultado = await fetch("http://localhost:3000/usuarios").then((res) => res.json());
    setDatos(resultado);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const columnas: Array<Columna<Character>> = [
    { key: "RU", encabezado: "RU", ordenable: true },
    { key: "nombre", encabezado: "Nombre", ordenable: true },
    { key: "ap_paterno", encabezado: "Apellido Paterno", ordenable: true },
    { key: "ap_materno", encabezado: "Apellido Materno", ordenable: true },
    { key: "fecha_nacimiento", encabezado: "Fecha de nacimiento", ordenable: true },
    { key: "universidad", encabezado: "Universidad", ordenable: true },
  ];
  /*
    // Datos de ejemplo
    const datos: FilaTarea[] = [
      { empleado: "John, Peterson", idTarea: "TID0002501", tarea: "Desarrollo Frontend", inicio: "12/09/2018", fin: "15/09/2018", conteo: 10, estado: "Completado", colorEstado: "verde" },
      { empleado: "Nattali Rize", idTarea: "TID0002498", tarea: "Desarrollo Tema RWD", inicio: "28/08/2018", fin: "05/09/2018", conteo: 9, estado: "Completado", colorEstado: "verde" },
      { empleado: "Jennifer Lawrence", idTarea: "TID0002497", tarea: "Desarrollo Frontend", inicio: "28/08/2018", fin: "05/09/2018", conteo: 7, estado: "Completado", colorEstado: "verde" },
      { empleado: "Jason Statham", idTarea: "TID0002486", tarea: "Desarrollo Tema RWD", inicio: "20/08/2018", fin: "28/08/2018", conteo: 9, estado: "Completado", colorEstado: "verde" },
      { empleado: "Selena Gomez", idTarea: "TID0002481", tarea: "Tema Wordpress", inicio: "15/08/2018", fin: "26/08/2018", conteo: 6, estado: "Completado", colorEstado: "verde" },
    ];
  */
  // Acciones (ver, editar, eliminar)
  const acciones: Array<Accion<Character>> = [
    { etiqueta: "Ver", icono: <FaEye size={16} />, onClick: (fila) => alert("Ver: " + fila.nombre) },
    { etiqueta: "Editar", icono: <FaPencil size={16} />, onClick: (fila) => alert("Editar: " + fila.nombre) },
    { etiqueta: "Eliminar", icono: <FaTrash size={16} />, onClick: (fila) => alert("Eliminar: " + fila.nombre) },
  ];

  // Filtro visual (chip)
  const filtros = (
    <div className="flex items-center gap-2">
      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
        Estado : Completado
      </span>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bandeja de Tareas</h1>
        <button className="bg-sky-700 text-white px-4 py-2 rounded-xl" onClick={obtenerDatos}>Anadir datos</button>
      </div>
      <DataTable<Character>
        columnas={columnas}
        datos={datos}
        acciones={acciones}
        filtrosUI={filtros}
        ordenInicial={{ key: "nombre", direccion: "asc" }}
        opcionesTamPagina={[5, 10, 20]}
      />
    </div>
  );
}
