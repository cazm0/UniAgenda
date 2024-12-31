import React from "react";

const ClockDiagram = ({ tasks }) => {
  // Función para calcular los ángulos de inicio y fin
  const getAnglesFromTime = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Función para calcular el ángulo de acuerdo con el reloj tradicional
    const getAngleForHour = (hour, minute) => {
      if (hour == 12 & minute ==0){
        return 360;
      } else {
        let baseAngle = (hour % 12) * 30; // 12:00 -> 90, 1:00 -> 60, etc.
        if (baseAngle < 0) baseAngle += 360; // Asegura que el ángulo esté en el rango de 0 a 360 grados
        const minuteAdjustment = (minute / 60) * 30; 
        return baseAngle + minuteAdjustment;
      }
    };

    const startAngle = getAngleForHour(startHour, startMinute);
    const endAngle = getAngleForHour(endHour, endMinute);

    return { startAngle, endAngle };
  };

  // Función para generar el path SVG de un sector circular
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${x} ${y}`, // Mueve al centro
      `L ${start.x} ${start.y}`, // Línea al borde exterior (ángulo inicial)
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, // Arco circular
      "Z", // Cierra el path
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const getMidAngle = (startAngle, endAngle) => {
    return (startAngle + endAngle) / 2;
  };
  const getRotTexto = (anguloMedio) => {
      if ((360>anguloMedio && anguloMedio<180)){
      return anguloMedio;
    } else {
      return anguloMedio-180;
    };
  };
  return (
    <div className="absolute w-128 h-128 rounded-full">
      <svg
        viewBox="0 0 200 200"
        className="w-128 h-128 rounded-full"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Reloj de fondo */}
        <circle cx="100" cy="100" r="100" fill="#fff" />

        {/* Dibujar sectores para cada tarea */}
        {tasks.map((task) => {
          const { startAngle, endAngle } = getAnglesFromTime(
            task.startTime,
            task.endTime
          );

          // Calcular la posición del texto basado en el ángulo promedio
          const midAngle = getMidAngle(startAngle, endAngle);
          const rotTexto = getRotTexto(midAngle);
        
          const textX =
            100 + Math.cos((midAngle * Math.PI)*(-1) / 180) * 60; // Reducimos el radio a 60
          const textY =
            100 - Math.sin(((midAngle * Math.PI))*(-1) / 180) * 60; // Reducimos el radio a 60

          return (
            <g key={task.id}>
            <path
              d={describeArc(100, 100, 200, startAngle, endAngle)}
              fill="#FFF2C2"
              stroke="#DEAA79"
              strokeWidth="0.2"
              opacity="0.8"
            />
            
            {/* Ajustar el tamaño del texto basado en el ángulo del sector */}
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#000"
              fontSize={Math.max(10, Math.min(12, (endAngle - startAngle) / 10))} // Ajuste dinámico del tamaño del texto
              transform={`rotate(${rotTexto}, ${textX}, ${textY})`} // Rotar el texto en su centro
            >
              {task.description}
            </text>
          </g>

          );
        })}
      </svg>
    </div>
  );
};

export default ClockDiagram;
