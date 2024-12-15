import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

function MovableList() {
  const refContainer = useRef(); // Referencia al contenedor principal
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const listWidth = 300; // Ancho del contenedor de la lista
  const listHeight = 200; // Alto del contenedor de la lista

  // Función para recalcular los límites
  const updateBounds = () => {
    if (refContainer.current) {
      const containerWidth = refContainer.current.offsetWidth;
      const containerHeight = refContainer.current.offsetHeight;

      setBounds({
        left: -listWidth / 14,
        top: -listHeight / 14,
        right: containerWidth - listWidth, // Limitar dentro del contenedor
        bottom: containerHeight - listHeight, // Limitar dentro del contenedor
      });
    }
  };

  // Actualiza los límites al montar el componente y al redimensionar la ventana
  useEffect(() => {
    updateBounds(); // Recalcular los bounds al montar

    // Recalcular los bounds cuando se cambie el tamaño de la ventana
    window.addEventListener("resize", updateBounds);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div ref={refContainer} className="relative w-full h-full">
      <Draggable bounds={bounds}>
        <div
          className="relative rounded-lg p-4 cursor-move bg-darkerbeige shadow-lg"
          style={{
            width: `${listWidth}px`,
            height: `${listHeight}px`,
          }}
        >
          <h2 className="text-lg font-bold text-brown mb-4 text-center">
            Lista de Horarios
          </h2>
          <ul className="space-y-2">
            <li className="p-2 rounded-md bg-brown text-white">10:00 AM - Reunión</li>
            <li className="p-2 rounded-md bg-brown text-white">12:00 PM - Almuerzo</li>
            <li className="p-2 rounded-md bg-brown text-white">03:00 PM - Escribir informe</li>
          </ul>
        </div>
      </Draggable>
    </div>
  );
}

export default MovableList;

