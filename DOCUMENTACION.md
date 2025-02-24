# Estudiántica

## Tabla de contenidos

* [Argumento](#argumento)
* [Especificación](#especificación)
* [Diseño](#diseño)
    * [Base de datos](#base-de-datos)
    * [Interfaz de usuario](#interfaz-de-usuario)
    * [Diagrama de clases](#diagrama-de-clases)

## Argumento
Convertirse en el mejor estudiante que uno puede ser es difícil. A pesar de
saber lo que debemos hacer, es fácil distraerse con algo más. Las buenas
prácticas son buenas y las malas prácticas son malas, pero no basta con
saber cuál es cuál.

Nuestro producto no sólo facilita que el estudiante planee su trayectoria
académica, sino también que pueda administrar su vida escolar y mantenerse fiel
a sus metas con ayuda de la
[*ludificación*](https://es.wikipedia.org/wiki/Ludificaci%C3%B3n).
El estudiante
podrá organizar sus tareas, prácticas y exámenes, evaluando su progreso y
también sus logros. A lo largo del ciclo escolar se planteará metas y se verá
recompensado al cumplirlas.

Con *Estudiántica*, buscamos darle un poco de emoción a la vida del estudiante
promedio, ayudando a que tome el control de sus estudios a través de incentivos
en forma de un *videojuego-agenda*. El estudiante va a generar hábitos positivos
con recompensas estilo *RPG* como: habilidades, items, mascotas y armaduras con
estilo. Enfrentándose a las hordas de tareas y a los malvados profesores (por
supuesto no todos) que se encuentre en su camino, el estudiante podrá recolectar
distintas mejoras para su personaje, así como para su vida académica.

## Especificación
El componente más escencial de la aplicación es una agenda escolar. El aspecto
de *ludificación* sirve para motivar al estudiante a interactuar con los
sistemas de la agenda a través de incentivos y consecuencias.

Para empezar a usar *Estudiántica* el usuario debe ingresar la fecha de incio y
término de su periódo escolar actual (bimestre, cuatrimestre, semestre, etc.) y
la carga de materias. Cada materia se puede personalizar agregándole las
siguientes calificaciones subjetivas: el interés que tiene el estudiante por la
materia y el grado de dificultad de esta. Opcionalmente también se pueden
asignar porcentajes personalizados al peso total de tareas, prácticas y examenes
en la calificación de cada materia (por defecto 50/50 entre tareas/prácticas y
examenes).

A partir de esto, se da lugar a la interacción principal de la agenda: la carga,
personalización y manejo de trabajos. Las tareas/prácticas y las evaluaciones no
tienen mayor distinción fuera del peso que tienen para la calificación de cada
materia. Para subir un trabajo se deben configurar los siguientes aspectos: la
materia a la que pertenece el trabajo, su fecha de entrega y un tiempo aproximado
para completarse.

El estudiante tendrá acceso a distintas métricas respecto a su desempeño como:
calificación promedio por materia, porcentaje de trabajos entregados y
puntualidad en realizar tareas. Además, podrá ver una lista de todos sus
pendientes en el orden en el que se entregan. La aplicación alertará dentro de
un periódo configurable que el estudiante debería empezar a trabajar en una
tarea. Para poder trabajar parcialmente en una tarea se le pueden agregar campos
que son subtareas para realizarla, por ejemplo: escribir el borrador del
documento, leer las notas correspondientes, contestar las primeras dos
preguntas, etc.

En el aspecto más básico de *ludificación* tu personaje tendrá métricas como
salud, experiencia, fuerza y habilidad. El personaje podrá subir de nivel a
través de buen desempeño académico y buena organización al entregar trabajos.
Por otro lado, perderá experiencia al tener calificaciones bajas o no
aprobatorias. Como incentivo adicional, obtener una califiación perfecta en una
evaluación tendrá una recompensa especial en el juego, como un insta-heal para
su personaje.

La aplicación contará con un componente social que permitirá a los estudiantes
unirse a grupos de estudio (*guilds*), donde podrán compartir progreso,
motivarse entre sí y participar en desafíos académicos en grupo. Además, cada
estudiante podrá visualizar un resumen de su desempeño por materia.

Para ayudar a la administración del tiempo y la motivación, se implementará un
período de gracia donde si cumple con el resto de sus pendientes se anularan las
consecuencias negativas y podrá obtener una recompensa adicional, pero si no lo
logra, perderá aun más experiencia.

El progreso en el juego estará vinculado al rendimiento académico. A medida que
el estudiante sube de nivel en la aplicación, desbloqueará perks especiales,
como la capacidad de realizar una tarea un día antes sin recibir penalización.
Además, el personaje del estudiante tendrá estadísticas que reflejarán su
desempeño, tales como concentración, disciplina y gestión del tiempo, las cuales
podrán mejorar con buenos hábitos.

Por último, de manera opcional, los estudiantes podrán elegir entre diferentes
clases dentro del juego, como el estratega, el multitarea o el metódico, cada
una con habilidades que influirán en la manera en que interactúan con la agenda
y los incentivos de la aplicación.

## Diseño

Como parte del desarrollo del problema, se tiene el diseño de la base de datos,
de los módulos y de la vista para el usuario.

### Base de datos

Para esto, tendremos las siguientes estructuras, las cuales presentamos por
medio de entidades:
   - User: contiene la información de los usuarios para la aplicación, de esta manera
     se requiere un nombre de usuario, correo y contraseña.
   - Clan: es un grupo social dentro de la aplicación donde los distintos usuarios
     se pueden relacionar, el cuál contiene un nombre,una descripción, números de victorias,
     logotipo y experiencia.
   - Character: es el personaje del usuario dentro del videojuego, donde existe tres distintas
     clases (mago, caballero y ), donde cada personaje tiene su nombre, experiencia,nivel,legenda,
     vida, última vez que estuvo en acción, su racha y sus stats (máximo de vida, inteligencia,
     defensa y fuerza).
   - Item: son los objetos que el personaje puede llevar, el cual tiene información de los mismos
     stats (fuerza, defensa, inteligencia y vida), rareza y dependiendo de su tipo puede tener las
     siguientes caracteristicas:
     - Weapon:
     - Armor: debe de tener el nivel de daño recibido.
     - Pet: tiene el vinculo y su nombre.
   - Class: son las materias que los usuarios tienen las cuales deben de tener su nombre,
     fecha de inicio y fin, y .
   - Assigment: es la lista de tareas del estudiante, la cual debe de tener nombre, grado, tipo,
     fecha de finalización, notas, si es opcional y tags (las cuales pueden ser varias).

Las entidades se tomaron de esta manera, ya que engloba la mayoría de las acciones que hará la aplicación
y nos permite acoplarlo con el resto de los módulos, los cuales se detallarán en la siguiente sección.

![Diagrama entidad-relación](.repo/EntidadRelacion/EntidadRelaciónEstudiantica.png)

### Diagrama de clases

![Diagrama-clase](.repo/DiagramaDeClases/DiagramaDeClases.png)

### Interfaz de usuario



