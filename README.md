# Estudiantica ⚔
> Conviértete en el mejor estudiante y domina todas tus materias.

| Rama    | Estado
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|`main`   | [![Backend CI (main)](https://github.com/srp-mx/equipo-4-ing-sw/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/srp-mx/equipo-4-ing-sw/actions/workflows/ci.yml)
|`develop`| [![Backend CI (develop)](https://github.com/srp-mx/equipo-4-ing-sw/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/srp-mx/equipo-4-ing-sw/actions/workflows/ci.yml)

Ha llegado la hora de que organices tu vida estudiantil. Toma tus espadas y
recoge las flechas necesarias para salir a la aventura, conquistando todas tus
materias una mazmorra a la vez. Tareas, horarios y promedios, cada uno de ellos
esperando ser conquistado.

Estudiar nunca ha sido tan simple y emocionante, no sólo estarás bien organizado
sino que también conseguiras gran *loot*. Además de eso, podrás presumirle el
grado de estudiante que eres a todos tus amigos (o enemigos).

Disfruta de nuestra historia y llega a tu objetivo de vida acompañado del mejor
amigo del estudiante 😼. Cambia tu relación con tu vida estudiantil y disfruta
aprender.

## Instalación

Para esto, se requiere tener instalado el software Docker en el servidor (computadora)
en el que se desea desplegar la aplicación. De este modo:

1. Clonar el repositorio

```bash
git clone https://github.com/srp-mx/equipo-4-ing-sw
cd equipo-4-ing-sw
```

2. Inicializar los servicios de Backend (GO), Frontend(Vite.js) y DB (Postgres)

```bash
docker compose up --build (-d -> Para que corra en segundo plano)  
```
3. Acceder a la página [principal](http://localhost:3000/)

Para el manejo de los contenedores dirigirte a la carpeta raíz del proyecto.
- Para finalizar la ejecución:

```bash
cd equipo-4-ing-sw
docker compose stop
```

- Para reiniciar el proyecto:

```bash
cd equipo-4-ing-sw
docker compose restart
```

- Para inicializar el proyecto:

```bash
cd equipo-4-ing-sw
docker compose start
```

- Para correr las pruebas del backend

```bash
cd equipo-4-ing-sw/Backend
go test ./test
```
