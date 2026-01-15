## Microservicio de Gestión de Cirugías

Este módulo es un microservicio desarrollado con NestJS que utiliza comunicación TCP para la gestión de las cirugías del hospital.

### Tabla de Contenidos

- [Estado](#Estado)
- [Descripción](#descripción)
- [Tech Stack del proyecto](#tech-stack-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Mensajes TCP Principales](#mensajes-tcp-principales)
- [Ejemplo de uso TCP](#ejemplo-de-uso-tcp)
- [Configuración](#configuración)

---

# Documentación

## Estado

Proyecto en **fase de desarrollo** - Funcionalidades core implementadas. Mejoras y optimizaciones en progreso.

## Descripción

Este microservicio administra y expone operaciones para la gestión de las cirugías del hospital mediante comunicación TCP, permitiendo su integración con otros módulos del sistema y facilitando el acceso seguro a la información de las cirugías. Además, permite la asignación de médicos a las cirugías, asegurando una gestión eficiente y coordinada del personal médico involucrado en cada procedimiento.

## Diagrama de clases simplificado

![Diagrama de clases](assets/diagrama.png)

## Tech Stack del proyecto

- Framework: NestJS v11 (Microservicio TCP con TypeScript)
- Comunicación: @nestjs/microservices (protocolo TCP)
- Bases de datos: PostgreSQL
- Prisma: ORM y toolkit para acceso y gestión de datos en bases de datos relacionales
- Validación: class-validator + class-transformer
- Configuración: dotenv + @nestjs/config
- Validación de esquemas: Joi
- Async: RxJS (Observables)
- Docker: Para levantar Keycloak localmente (ver docker-compose.yml) y bases de datos de los microservicios (ver en sus respectivos repositorios)
- Algunos patrones utilizados:
  - Client Pattern: Clientes dedicados para cada microservicio
  - DTO Pattern: Para validación de datos en entrada/salida
  - Singleton Pattern: Los servicios inyectados son singletons por defecto en NestJS
  - Exception Handling Pattern: Usa RpcException para capturar y lanzar errores de microservicios

## Estructura del Proyecto

```
src/
  common/         # Utilidades y excepciones comunes
  config/         # Configuración de entornos y servicios
  operating-room/ # Gestión de quirofanos hospitalarios
```

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   cd servicios-ms
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Ejecución

### Local

```bash
npm run start:dev
```

### Docker

1. Tener Docker instalado.
2. Navegar a la raiz y ejecutar:
   ```bash
   docker-compose up --build
   ```
   Esto levanta el servidor de la Base de datos
   - Credenciales: admin@gmail.com / admin

## Mensajes TCP principales

Este microservicio responde a mensajes TCP con los siguientes patrones principales:

- `findAllSurgeries`: Obtiene la lista de cirugías
- `findSurgeryById`: Obtiene una cirugía por su ID
- `createSurgery`: Crea una nueva cirugía
- `updateSurgery`: Actualiza una cirugía existente
- `deleteSurgery`: Elimina una cirugía
- `addDoctorsToSurgery`: Asigna médicos a una cirugía
- `removeDoctorsFromSurgery`: Remueve médicos de una cirugía

Consulta el código fuente para ver los payloads y DTOs utilizados en cada patrón.

## Configuración

Variables de entorno principales (ver `src/config/envs.ts`):

- `PORT`: Puerto del microservicio TCP
- `DATABASE_URL`: Cadena de conexión a la base de datos PostgreSQL utilizada por Prisma.
- `NODE_ENV`: Entorno de ejecución de la aplicación
