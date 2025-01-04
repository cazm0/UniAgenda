import { useState } from "react";

const Semana = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Calendario Semanal</h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          className="px-4 py-2 bg-[#7B4D3A] text-white rounded hover:bg-opacity-90"
        >
          Semana Anterior
        </button>
        <button
          onClick={goToNextWeek}
          className="px-4 py-2 bg-[#7B4D3A] text-white rounded hover:bg-opacity-90"
        >
          Semana Siguiente
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border rounded p-4 bg-[#F5E7DE] shadow"
          >
            <span className="text-lg font-bold">
              {day.toLocaleDateString("es-ES", { weekday: "long" })}
            </span>
            <span className="text-2xl">{day.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Semana;
