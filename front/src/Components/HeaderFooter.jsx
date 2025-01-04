import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderFooter = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-[#7B4D3A] text-white px-8 py-4">
        {/* Título o logo */}
        <h3 className="text-2xl font-arial">Hola Cami, va a ser un gran día</h3>
        {/* Enlaces */}
        <nav className="flex items-center space-x-6">
          {/* Cambiar <a> por <Link> */}
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <Link to="/Semana" className="hover:underline">
            Semana
          </Link>
          {/* Icono de usuario */}
          <Link to="/login" className="flex items-center space-x-2 hover:underline">
            <FaUserCircle size={24} />
            <span>Iniciar Sesión</span>
          </Link>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#7B4D3A] text-white text-center py-4">
        © 2025 Mi Proyecto. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default HeaderFooter;
