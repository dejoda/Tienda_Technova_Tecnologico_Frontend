const ClienteSeccionAdmin = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
            <p className="text-gray-700 mb-6">
                Bienvenido a tu panel de clientes. Aquí podrás ver y gestionar toda la información relacionada con tus clientes, incluyendo sus datos de contacto, historial de compras y preferencias.
            </p>
            PARA ADMIN
            🔥 ¿QUÉ HACE EL ADMIN CON CLIENTES?
👥 1. Gestión básica

Basado en tu tabla cliente

✔ Ver todos los clientes
✔ Buscar / filtrar
✔ Editar datos (si hay errores)
✔ Desactivar cuentas (NO borrar idealmente)

💡 Ejemplo real:

cliente puso mal su correo → admin lo corrige

🚫 2. Control y seguridad (MUY IMPORTANTE)

✔ Bloquear clientes problemáticos
✔ Detectar fraude
✔ Revisar actividad sospechosa


        </div>
    );
}

export default ClienteSeccionAdmin;