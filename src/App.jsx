function App() {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-128 h-128 bg-gray-500 rounded-full shadow-xl flex items-center justify-center">
        {numbers.map((number, index) => {
          const angle = (index * 30) - 60; // Divide el círculo en 12 partes (30° cada una)
          const x = Math.cos((angle * Math.PI) / 180) * 200; // Ajusta el radio aquí
          const y = Math.sin((angle * Math.PI) / 180) * 200;

          return (
            <div
              key={number}
              className="absolute text-white font-bold text-lg"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;