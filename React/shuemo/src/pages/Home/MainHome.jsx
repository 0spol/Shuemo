export const MainHome = () => {
    return (
        <>
            <div className="flex justify-center items-center mb-8">
                <img src="/assets/Logo.png" className="w-32 h-32" alt="Logo de Shuemo" />
            </div>
            <h1 className="text-5xl font-extrabold mb-8">¡Bienvenido a Shuemo!</h1>
            <p className="text-lg mb-12 text-center max-w-2xl">Tu CRM remoto de confianza.</p>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 max-w-5xl">
                <h2 className="text-2xl font-bold mb-4">¿Qué es Shuemo?</h2>
                <p>Somos una plataforma que ofrece una herramienta para la gestión eficiente de un negocio pequeño, un freelance u incluso una empresa grande. Te ayuda a organizar citas con clientes, administrar facturas y gestionar tus empleados desde un solo lugar.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">¿Qué proporcionamos?</h2>
                    <p>Damos una amplia gama de características diseñadas para mejorar la productividad y la colaboración en tu equipo. Desde la gestión de pagos hasta la planificación de citas, todo esto para profesionalizar más tu negocio.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">¿Qué tecnologías usamos?</h2>
                    <p>Utilizamos tecnologías modernas y seguras para garantizar un rendimiento óptimo y una experiencia de usuario excepcional. Nuestra plataforma está construida con tecnologías como React para la interfaz de usuario, Hibernate para el backend y MySQL como base de datos.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h2>
                    <p>Shuemo es la solución ideal para freelancers y equipos que buscan una forma eficiente de gestionar tu negocio y profesionalizarlo un nivel más. Con herramientas potentes y un soporte dedicado, te ayudamos a hacer crecer tu negocio de una manera más rápida y efectiva.</p>
                </div>
            </div>
        </>
    )
}