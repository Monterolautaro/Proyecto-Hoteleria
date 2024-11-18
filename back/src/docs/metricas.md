# METRICAS DE LA APLICACION

- ## 1. Tasa de cancelación

// ¿Qué mide?
Porcentaje de reservas canceladas en comparación con el total de reservas hechas.

// Cálculo:
Tasa de cancelación = Reservas canceladas / Total de reservas \* 100

### \* _Tener en cuenta_ \*

la entidad `Booking` debe que tener la propiedad **total_bookings** y **cancelled_bookings**
y se debe almacenar la información sobre reservas activas y canceladas.

- ## 2. Tasa de conversión de reservas

// ¿Qué mide?
Porcentaje de usuarios que completan una reserva en comparación con los que visitan la aplicación

// Cálculo:
Tasa de conversión = Reservas completadas / usuarios totales \* 100

### \* _Tener en cuenta_ \*

Se debe capturar la información del total de visitas de la página.

- ## 3. Tiempo medio de sesión

// ¿Qué mide?
Duración promedio que los usuarios pasan en la aplicación.

// Cálculo:
tiempo total de todas las sesiones \* n de sesiones en un periodo especifico

### \* _Tener en cuenta_ \*

Se debe registrar la `hora` de `inicio` y`fin` de cada sesión, luego calcular la duración promedio.

- ## 4. Número de busquedas por usuario

// ¿Qué mide?
Cuántas veces en promedio, un usuario realiza búsquedas de hoteles

// Cálculo:
Busquedas por usuario = total de busquedas / total de usuarios

### \* _Tener en cuenta_ \*

Llevar un registro de las `busquedas por usuario`

- ## 5. Cantidad de visitas a la página.

// ¿Qué mide?
El número de visitas individuales que recibe la página de inicio de la aplicación.

// Cálculo:
Cantidad de Visitas= ∑(Visitas en un Periodo)

### \* _Como implementarlo_ \*

Crear middleware para registrar cada visita a la página. Almacenar los datos de cada sesión única
mediante cookies o un identificador único de sesión, Luego, calcular el total de visitas sumando
las entradas registradas en un periodo definido, como diario, semanal o mensual.
