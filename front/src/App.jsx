import React, { useState, useEffect} from "react";
import MovableList from "./ListaTareas";
function App() {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const [time, setTime] = useState(new Date());
  // Actualiza la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cálculo de la manecilla de los segundos
  const secondDegree = time.getSeconds() * 6;
  const minuteDegree = new Date().getMinutes() * 6;
  const hourDegree = (new Date().getHours() % 12) * 30 + new Date().getMinutes() * 0.5;

  return (
    <div className="flex items-center justify-center h-screen bg-beige">
      <div
        className="absolute w-144 h-144 bg-red rounded-full shadow-xl flex items-center justify-center"
      >
        {/* Círculo interior beige */}
        <div className="absolute w-128 h-128 bg-beige rounded-full ">
          
          {/* Manecilla de los segundos */}
          <div
            className="absolute w-0.5 bg-red rounded-full"
            style={{
              height: '45%',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -100%) rotate(${secondDegree}deg)`, // Combinamos las transformaciones
              transformOrigin: 'center bottom', // El origen de la rotación está en el extremo inferior de la manecilla
            }}
          ></div>
          <div
            className="absolute w-1 bg-red rounded-full"
            style={{
              height: '40%',  // Manecilla de minutos más larga
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -100%) rotate(${minuteDegree}deg)`,  // Ajuste para rotación de minutos
              transformOrigin: 'center bottom',
            }}
          ></div>
          <div
            className="absolute w-2 bg-red rounded-full"
            style={{
              height: '35%',  // Manecilla de hora más corta
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -100%) rotate(${hourDegree}deg)`,  // Ajuste para rotación de hora
              transformOrigin: 'center bottom',
            }}
          ></div>
        </div>
        <div className="absolute w-14 h-14 bg-darkerbeige" style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
        }}></div>
        <div className="absolute w-8 h-8 bg-brown" style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
        }}></div>
       {/* Rayitas en el borde del reloj */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = i * 6; // 6 grados por marca
        const isMajor = i % 5 === 0; // Cada 5 minutos es una marca más larga
        const radius = 239; // Radio externo para el posicionamiento correcto
        const lineLength = isMajor ? 15 : 8; // Marcas largas y cortas

        return (
          <div
            key={i}
            className="absolute bg-red"
            style={{
              width: '2px', // Grosor de las líneas
              height: `${lineLength}px`, // Longitud de cada línea
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -100%) 
                rotate(${angle}deg) 
                translateY(-${radius}px)
              `,
              transformOrigin: 'center bottom', // Origen de transformación en la base
            }}
          ></div>
        );
      })}

        {/* Números del reloj */}
        {numbers.map((number, index) => {
          const angle = (index * 30) - 60; // Divide el círculo en 12 partes (30° cada una)
          const x = Math.cos((angle * Math.PI) / 180) * 273; // Ajusta el radio aquí
          const y = Math.sin((angle * Math.PI) / 180) * 273;

          return (
            <div
              key={number}
              className="absolute text-beige font-bold text-lg"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {number}
            </div>
          );
        })}
      
      </div>
    <MovableList/>
    </div>
    
  );
}

export default App;
