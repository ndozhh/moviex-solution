# Prueba de frontend

Este repositorio contiene la información necesaria para realizar el desarrollo de la prueba de frontend de Aleluya. El objetivo principal de la prueba es medir el nivel actual del equipo con el fin de desarrollar estrategias que nos permitan seguir creciendo y contribuir a mejorar el desempeño del equipo de tecnología.

## Ejercicio 1: Prueba de diseño de software

### Descripción

El objetivo de este ejercicio es desarrollar el planteamiento técnico de un nuevo módulo para Aleluya. La propuesta debe centrarse en asegurar escalabilidad, mantenibilidad y una excelente experiencia de usuario.

### Recursos

- [Wireframes](https://balsamiq.cloud/s27ef5n/prpabia/rDB1B)

### Consideraciones técnicas

- El módulo implementa una nueva línea de diseño que será el estándar para los futuros módulos de Aleluya.
- Inicialmente este módulo solo será ofrecido a empresas de más de 5000 personas.
- Los endpoints del API utilizados en el módulo para `consultar el resumen de turnos de una semana` y el de `consultar el detalle completo de un día de la semana` tienen que consultar servicios externos para realizar algunas validaciones, por lo que presentan tiempos de respuesta muy altos que penalizan la UX del lado del cliente.
- Si lo considera necesario, sugiera cambios que permitan ofrecer una mejor experiencia de usuario.

### Funcionalidades principales

- El usuario puede ver un resumen de la cantidad de turnos por persona.
- El usuario puede ver un resumen de los turnos asignados en cada día de la semana.
- El usuario puede filtrar el historial de semanas y descargar toda la información de una semana en específico como un archivo de excel.
- El usuario puede hacer las siguientes acciones sobre un turno:
  - **Editarlo**: para cambiar la persona a la que fue asignado o cambiar su horario.
  - **Marcarlo como completado**: en este caso las horas totales del turno serán sumadas a la nómina de la persona.
  - **Descartarlo**: en caso de que el turno no sea ejecutado o que la persona asignada no lo realice. En cualquiera de los dos casos a la persona no se le suman horas a la nómina.
- El usuario puede ver el detalle completo de los turnos de la semana por persona.
- El usuario puede ver el detalle completo de los turnos de un día de la semana y a quienes están asignados.

### Resultado esperado

Realizar el planteamiento técnico del módulo especificando los siguientes puntos:

- Estructura de archivos donde se puedan identificar componentes, utilidades, hooks, etc.
- Todos los módulos necesarios para cumplir con cada una de las funcionalidades principales.
- Explicación de la estrategia para solucionar los retos más relevantes o de abstracciones que consideres necesarias.

> [!TIP]
> Si necesitas crear diagramas puedes utilizar la herramienta [Excalidraw](https://excalidraw.com/).

## Ejercicio 2: Prueba de desarrollo de software

### Descripción

Crear una aplicación web tipo catálogo que permita interactuar con la API de [TMDB](https://www.themoviedb.org/).

### Criterios de aceptación

- La app debe contar con una ruta para listar las películas y otra para ver el detalle de una película. Por defecto en el proyecto ya vienen configuradas, pero si lo requieres, puedes modificar la estructura.
- La app debe permitir consultar el top de películas de cada una de las siguientes categorías:

  - `now_playing`: En cartelera
  - `popular`: Populares
  - `top_rated`: Mejor valoradas
  - `upcoming`: Próximamente

- De cada película se debe mostrar: su imagen, título, descripción, fecha de lanzamiento y su calificación.
- La app debe permitir buscar una película por su nombre. Considera optimizar la búsqueda para que la API no reciba peticiones innecesarias.
- La app debe permitir ver el detalle de una película seleccionada con la información descrita anteriormente.
- En la vista del detalle de una película debe aparecer un formulario para crear una nueva reseña, el cual debe incluir nombre, calificación y comentario. Para simplificar este punto, el formulario no debe enviar la información al servidor, solo debe mostrarla en pantalla al ser enviado.
- Incluye todas las mejoras que consideres necesarias para una buena experiencia de usuario.

### Endpoints de la API

- [Obtener top de películas por categoría](https://developer.themoviedb.org/reference/movie-now-playing-list). Para todas las categorías la URL es la misma, solo cambia el nombre del último segmento.
- [Buscar película por nombre](https://developer.themoviedb.org/reference/search-movie)
- [Obtener detalles de una película](https://developer.themoviedb.org/reference/movie-details)

### Stack del proyecto

Para facilitar el desarrollo de la prueba se ha configurado un proyecto con el siguiente stack, sin embargo, puedes hacer las modificaciones que consideres necesarias:

- El proyecto está hecho con React, corriendo sobre [Vite](https://vite.dev/).
- Como router se está utilizando [React Router](https://reactrouter.com/en/main).
- Para los estilos tiene configurado [Tailwind CSS](https://tailwindcss.com/).
- Como librería de iconos se está utilizando [Lucide](https://lucide.dev/).
- Como librería de componentes está utilizando [Shadcn](https://ui.shadcn.com/).

### Información adicional

- Link de la API de TMDB: [TMDB](https://developer.themoviedb.org/docs/getting-started).
- El api key será proporcionado el día de la prueba, si aún no lo tienes, habla con JuanDa.
- Para usar [variables de entorno en Vite](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes) y que puedan ser accedidas desde el cliente, se le debe agregar el prefijo `VITE_` al nombre de la variable.
- El proyecto ya cuenta con algunos componentes de Shadcn integrados, adicionalmente puedes agregar los que necesites. También cabe aclarar que no es necesario que utilices los componentes de Shadcn para la realización de la prueba, solo es una sugerencia para agilizar el desarrollo.
- Algunos query params de la API que es importante tener en cuenta:
  - `api_key`: api key para la autenticación, el cual se debe utilizar en todas las peticiones.
  - `language`: es el idioma en el que se mostrará la información, el valor por defecto es `en-US`.
- En el proyecto ya existe una utilidad llamada `getPosterUrl` que sirve para armar la URL de las imágenes de las películas.
- El proyecto cuenta con algunos `types` que representan la estructura de los datos de los diferentes endpoints que se van a utilizar.

## Ejercicio 3: Preguntas de conocimiento

Cada uno de los siguientes fragmentos de código puede presentar una o varias de las siguientes características:

- Contener errores de implementación.
- Ser funcional pero estar implementado de forma poco eficiente.
- Utilizar malas prácticas de desarrollo.

Identifica los posibles errores y/o problemas y, sin ejecutar el código, describe cómo los solucionarías.

1. Fragmento 1

```jsx
import React, { useState, useEffect } from "react";

function RequestsHandler() {
  const [requestsCount, setRequestsCount] = useState(0);
  const [requestsLog, setRequestsLog] = useState(0);

  useEffect(() => {
    setRequestsLog(requestsLog + 1);
  }, [requestsCount, requestsLog]);

  function makeRequest() {
    // Simulates an API call
    setRequestsCount((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={makeRequest}>Make API request</button>
      <div>LOG: You've made {requestsLog} requests</div>
    </div>
  );
}

export default RequestsHandler;
```

2. Fragmento 2

```jsx
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [userLastname, setUserLastname] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    setUserFullName(`${userName} ${userLastname}`);
  }, [userName, userLastname]);

  const handleSave = () => {
    setIsLoading(true);
    // Simulating save
    setTimeout(() => {
      console.log("User data saved:", {
        userName,
        userLastname,
        userPhone,
        userAddress,
        userNickname,
      });
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div>
      <div>Editing user: {userFullName}</div>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={userLastname}
        onChange={(e) => setUserLastname(e.target.value)}
        placeholder="Lastname"
      />
      <input
        value={userPhone}
        onChange={(e) => setUserPhone(e.target.value)}
        placeholder="Phone"
      />
      <input
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        value={userNickname}
        onChange={(e) => setUserNickname(e.target.value)}
        placeholder="Nickname"
      />
      <button onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default UserProfile;
```

3. Fragmento 3

```jsx
import { memo, useCallback, useMemo, useState } from "react";

type DisplayProps = {
  count: number,
  onReset: () => void,
};

const SuperExpensiveChild = memo(({ count, onReset }: DisplayProps) => {
  const displayText = useMemo(() => {
    return `Current count is: ${count}`;
  }, [count]);

  return (
    <div className="p-4 text-center">
      <p>{displayText}</p>
      <button
        onClick={onReset}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
});

SuperExpensiveChild.displayName = "SuperExpensiveChild";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const handleReset = () => {
    setCount(0);
  };

  const isEven = useMemo(() => {
    return count % 2 === 0;
  }, [count]);

  const counterClass = useMemo(() => {
    return isEven ? "text-blue-500" : "text-red-500";
  }, [isEven]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className={`text-2xl font-bold ${counterClass}`}>{count}</h2>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>

      <SuperExpensiveChild count={count} onReset={handleReset} />
    </div>
  );
};

export default Counter;
```
