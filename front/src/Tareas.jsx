import React from "react";

const ClockDiagram = ({ tasks }) => {
  // Función para calcular los ángulos de inicio y fin
  const getAnglesFromTime = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Función para calcular el ángulo de acuerdo con el reloj tradicional
    const getAngleForHour = (hour, minute) => {
      // Las 12:00 son 90 grados, y avanzamos en sentido horario
      let baseAngle = (hour % 12) * 30; // 12:00 -> 90, 1:00 -> 60, etc.
      if (baseAngle < 0) baseAngle += 360; // Asegura que el ángulo esté en el rango de 0 a 360 grados
      const minuteAdjustment = (minute / 60) * 30; // Ajuste de los minutos
      return baseAngle + minuteAdjustment;  // Restamos el ajuste por los minutos
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

  return (
    <div className="absolute w-128 h-128 rounded-full">
      <svg
        viewBox="0 0 200 200"
        className="w-128 h-128 rounded-full"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Reloj de fondo */}
        <circle cx="100" cy="100" r="100" fill="#fff"  />

        {/* Dibujar sectores para cada tarea */}
        {tasks.map((task) => {
          const { startAngle, endAngle } = getAnglesFromTime(task.startTime, task.endTime);

          return (
            <path
              key={task.id}
              d={describeArc(100, 100, 200, startAngle, endAngle)}
              fill="#f5a623"
              opacity="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ClockDiagram;
