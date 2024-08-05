# Commands Executor - Aplicación Web

## Descripción

Commands Executor es una potente interfaz web para gestionar y crear comandos de terminal personalizados. Esta aplicación sirve como el centro de control del sistema Commands Executor, permitiendo a los usuarios crear, leer, actualizar y eliminar comandos que pueden ser ejecutados en clientes de escritorio remotos.

## Características Principales

- **Operaciones CRUD:** Crear, leer, actualizar y eliminar comandos personalizados.
- **Autenticación de Usuario:** Sistema de inicio de sesión seguro para gestionar el acceso.
- **Generación de Comandos Asistida por IA:** Utiliza IA para ayudar en la creación de comandos complejos.
- **Ejecución Remota:** Envía comandos a clientes de escritorio conectados para su ejecución.
- **Historial de Comandos:** Mantiene un registro de los comandos ejecutados previamente.

## Tecnologías Utilizadas

- **Framework:** Next.js
- **Frontend:** React
- **Estilos:** Tailwind CSS
- **Base de Datos:** Supabase
- **Integración de IA:** SDK de Vercel para IA, API de Gemini de Google

## Demos

https://github.com/user-attachments/assets/39b23d3f-3bc1-4cf9-9a66-ccfc90f56467

https://github.com/user-attachments/assets/e8beae5e-68c1-4870-b643-469ee4bfbad9

https://github.com/user-attachments/assets/2591e6f3-1a44-4e4f-a814-cf8fb599b4e1

https://github.com/user-attachments/assets/3e369c55-e760-4a62-a7b1-89ca0ee56811




## Instalación y Configuración

1. Clonar el repositorio:

   ```
   git clone https://github.com/iamyare/nextjs-command-executor
   cd nextjs-command-executor
   ```

2. Instalar dependencias:

   ```
   npm install
   ```

3. Configurar variables de entorno:

   - Crea un archivo `.env.local` en el directorio raíz.
   - Añade las siguientes variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     NEXT_PUBLIC_GEMINI_KEY=tu_clave_api_de_gemini
     ```

4. Ejecutar la aplicación:
   ```
   npm run dev
   ```

## Estado Actual y Limitaciones

- La interfaz gráfica está en desarrollo y se presenta como un prototipo funcional.
- Se están realizando mejoras continuas en rendimiento y accesibilidad.

## Contribuciones

Este proyecto es mantenido por [iamyare](https://github.com/iamyare). Las contribuciones son bienvenidas a través de pull requests.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

- **GitHub:** [iamyare](https://github.com/iamyare)
- **Instagram:** [i.am.yare](https://www.instagram.com/i.am.yare)

## Demo

Puedes ver una demostración del proyecto en: [https://command-executor.vercel.app](https://command-executor.vercel.app)

## Planes Futuros

- Mejorar la interfaz de usuario para una experiencia más intuitiva.
- Implementar funciones avanzadas de búsqueda y filtrado de comandos.
- Añadir soporte para la creación de flujos de trabajo con múltiples comandos.
