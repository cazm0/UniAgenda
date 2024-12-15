import { useState, useEffect } from "react";

function MovableList() {
  const [x, setX] = useState(100); // Posición inicial X
  const [y, setY] = useState(100); // Posición inicial Y
  const [dragging, setDragging] = useState(false); // Estado de arrastre
  const [offsetX, setOffsetX] = useState(0); // Offset horizontal
  const [offsetY, setOffsetY] = useState(0); // Offset vertical
  const [bounds, setBounds] = useState({
    left: - window.innerWidth + 833,
    top: - window.innerHeight + 406,
    right: window.innerWidth - 833,
    bottom: window.innerHeight - 406
  });

  // Actualizar los límites cuando la ventana cambie de tamaño
  useEffect(() => {
    const updateBounds = () => {
      setBounds({
        left: - window.innerWidth + 709,
        top: - window.innerHeight + 406,
        right: window.innerWidth - 709,
        bottom: window.innerHeight - 406
      });
    };

    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const startDrag = (event) => {
    setDragging(true);
    setOffsetX(event.clientX - x);
    setOffsetY(event.clientY - y);
  };

  const drag = (event) => {
    if (dragging) {
      // Calcular la nueva posición de X y Y, asegurándose de que no salga de los límites
      const newX = Math.max(bounds.left, Math.min(bounds.right, event.clientX - offsetX));
      const newY = Math.max(bounds.top, Math.min(bounds.bottom, event.clientY - offsetY));

      setX(newX);
      setY(newY);
    }
  };

  const stopDrag = () => {
    setDragging(false);
  };

  return (
    <div
      className="absolute rounded-lg p-4 cursor-move bg-darkerbeige shadow-lg"
      style={{
        width: "300px",
        transform: `translate(${x}px, ${y}px)`,
      }}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
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
  );
}

export default MovableList;
