function App() {
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center h-screen bg-beige">
        <div className="relative w-144 h-144 bg-red rounded-full shadow-xl flex items-center justify-center">
        <div className="absolute w-128 h-128 bg-beige rounded-full"></div>
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
    </div>
  );
}

export default App;