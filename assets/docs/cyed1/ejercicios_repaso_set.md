```markdown
# Taller: Implementaciones de `Set` en Java

> Cada problema indica qué implementación de `Set` resulta más apropiada
> y por qué. Las soluciones están ocultas — intenta resolverlo primero.

***

## Problema 1 — Primera Repetición
**Estructura sugerida: `HashSet`**

Una central de seguridad registra `N` intentos de acceso con IDs de usuario.
Se sabe que el sistema fue comprometido en el momento exacto en que
un usuario intenta acceder **por segunda vez**. Encuentra ese ID.
Si ningún ID se repite, imprime `-1`.

### Entrada
```
Primera línea:  N  (1 ≤ N ≤ 100 000)
Segunda línea:  N enteros — IDs de acceso en orden cronológico
                (1 ≤ ID ≤ 10^9)
```

### Salida
```
El primer ID que se repite, o -1 si no hay ninguno.
```

### Ejemplo
```
Entrada:        Salida:
8               7
4 9 2 7 1 3 7 5
```

```
Entrada:        Salida:
4               -1
1 2 3 4
```

### ¿Por qué `HashSet`?
El método `add()` de `HashSet` retorna `false` si el elemento **ya estaba
presente**. Esto permite detectar duplicados en una sola pasada O(n),
sin necesidad de una segunda estructura auxiliar.
Con `ArrayList`, `contains()` costaría O(n) por llamado → O(n²) total.
Ni `LinkedHashSet` ni `TreeSet` aportan beneficio extra aquí: no se
necesita orden de ningún tipo.

<details>
<summary>💡 Ver solución</summary>

```java
import java.util.*;

public class PrimeraRepeticion {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> vistos = new HashSet<>();
        int resultado = -1;
        for (int i = 0; i < n; i++) {
            int id = sc.nextInt();
            if (!vistos.add(id)) {
                resultado = id;
                break;
            }
        }
        System.out.println(resultado);
        sc.close();
    }
}
```

> `vistos.add(id)` retorna `false` cuando `id` ya existía — condición de
> duplicado en una sola operación O(1), sin llamado extra a `contains`.

</details>

***

## Problema 2 — Feed Sin Repetidos
**Estructura sugerida: `LinkedHashSet`**

Una plataforma recibe `N` publicaciones en orden cronológico, identificadas
por un entero. Algunas son republicaciones del mismo contenido (mismo ID).
El sistema debe mostrarle al usuario cada publicación **solo la primera vez**
que aparece, respetando ese orden de aparición.

Luego llegan `Q` consultas. Cada consulta es un entero `K` y pregunta:
*¿cuál es el ID de la K-ésima publicación única?*

### Entrada
```
Primera línea:  N  (1 ≤ N ≤ 200 000)
Segunda línea:  N enteros — IDs en orden de llegada
Tercera línea:  Q  (1 ≤ Q ≤ 100 000)
Siguientes Q:   un entero K por línea  (1 ≤ K ≤ número de publicaciones únicas)
```

### Salida
```
Por cada consulta, el ID de la K-ésima publicación única (en orden de primera aparición).
```

### Ejemplo
```
Entrada:                Salida:
9                       101
101 305 101 200 305     200
101 412 200 412         412
3
1
3
4
```

### ¿Por qué `LinkedHashSet`?
`LinkedHashSet` deduplica automáticamente **y** mantiene el orden en que
cada elemento fue insertado por primera vez. Convertirlo luego a
`ArrayList` permite responder consultas por índice en O(1).

Con `HashSet` se pierde el orden de inserción — imposible responder las consultas.  
Con `TreeSet` los IDs quedarían ordenados numéricamente, no cronológicamente.  
Sin Set: habría que mantener una lista + un Set por separado, duplicando código.

<details>
<summary>💡 Ver solución</summary>

```java
import java.util.*;

public class FeedSinRepetidos {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedHashSet<Integer> feed = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) feed.add(sc.nextInt());

        List<Integer> orden = new ArrayList<>(feed);

        int q = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int k = sc.nextInt();
            sb.append(orden.get(k - 1)).append('\n');
        }
        System.out.print(sb);
        sc.close();
    }
}
```

> `new ArrayList<>(feed)` copia los elementos en el orden de inserción
> del `LinkedHashSet` — una sola línea que reemplaza toda la lógica
> manual de "ya lo vi antes, ¿en qué posición lo agregué?".

</details>

***

## Problema 3 — Score Más Cercano
**Estructura sugerida: `TreeSet`**

Un torneo en línea registra los puntajes de sus participantes.
Dado el marcador actual y `Q` consultas, cada consulta entrega un valor `X`
y pregunta dos cosas:

1. ¿Cuál es el **mayor puntaje ≤ X** registrado? (`NONE` si no existe)
2. ¿Cuál es el **menor puntaje ≥ X** registrado? (`NONE` si no existe)

### Entrada
```
Primera línea:  N  (1 ≤ N ≤ 100 000) — puntajes registrados
Segunda línea:  N enteros (pueden repetirse, 1 ≤ puntaje ≤ 10^9)
Tercera línea:  Q  (1 ≤ Q ≤ 100 000)
Siguientes Q:   un entero X por línea
```

### Salida
```
Por cada consulta: "p s" donde p es el piso y s es el techo.
Usar NONE si no existe.
```

### Ejemplo
```
Entrada:            Salida:
6                   5 9
3 9 5 14 5 22       9 9
4                   14 22
7                   NONE 3
9
15
2
```

### ¿Por qué `TreeSet`?
`TreeSet.floor(x)` y `TreeSet.ceiling(x)` resuelven ambas preguntas en
**O(log n)** gracias al árbol Red-Black interno. El set también deduplica
automáticamente, así que puntajes repetidos no afectan el resultado.

Con cualquier lista ordenada se podría hacer búsqueda binaria, pero
se necesitaría deduplicación manual previa y más código.
`HashSet` o `LinkedHashSet` no tienen orden: imposible hacer floor/ceiling.

<details>
<summary>💡 Ver solución</summary>

```java
import java.util.*;

public class ScoreMasCercano {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeSet<Integer> scores = new TreeSet<>();
        for (int i = 0; i < n; i++) scores.add(sc.nextInt());

        int q = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int x = sc.nextInt();
            Integer piso  = scores.floor(x);
            Integer techo = scores.ceiling(x);
            sb.append(piso  != null ? piso  : "NONE").append(' ')
              .append(techo != null ? techo : "NONE").append('\n');
        }
        System.out.print(sb);
        sc.close();
    }
}
```

</details>

***

## Problema 4 — Alumnos en Todos los Grupos
**Estructura sugerida: `HashSet`**

Una universidad tiene `K` grupos de estudio. Cada grupo tiene una lista
de IDs de alumnos. Se necesita saber cuántos alumnos están inscritos
en **absolutamente todos** los grupos, e imprimir sus IDs en orden ascendente.

### Entrada
```
Primera línea:  K  (2 ≤ K ≤ 50) — número de grupos
Por cada grupo: una línea con M seguido de M enteros (IDs de alumnos)
                (1 ≤ M ≤ 10 000, 1 ≤ ID ≤ 10^6)
```

### Salida
```
Primera línea:  cantidad de alumnos en todos los grupos
Segunda línea:  sus IDs en orden ascendente (o vacía si no hay ninguno)
```

### Ejemplo
```
Entrada:                Salida:
3                       2
5 10 20 30 40 50        10 40
4 10 40 60 70
6 5 10 15 40 80 90
```

### ¿Por qué `HashSet`?
`HashSet.retainAll(otroSet)` calcula la **intersección en una sola línea**,
modificando el set en O(n). Encadenar esto para K grupos es directo y legible.

Sin Set: necesitarías comparar cada par de listas con bucles anidados → O(M² × K).  
`TreeSet` funcionaría pero pagaría O(log n) innecesario en cada `add` durante
la carga; el orden solo se necesita al final, y para eso basta un `Collections.sort`.  
`LinkedHashSet` no aporta nada: el orden de inserción no es relevante aquí.

<details>
<summary>💡 Ver solución</summary>

```java
import java.util.*;

public class AlumnosTodosGrupos {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();

        HashSet<Integer> comunes = null;
        for (int i = 0; i < k; i++) {
            int m = sc.nextInt();
            HashSet<Integer> grupo = new HashSet<>();
            for (int j = 0; j < m; j++) grupo.add(sc.nextInt());
            if (comunes == null) comunes = grupo;
            else comunes.retainAll(grupo);
        }

        List<Integer> resultado = new ArrayList<>(comunes);
        Collections.sort(resultado);

        System.out.println(resultado.size());
        StringBuilder sb = new StringBuilder();
        for (int id : resultado) sb.append(id).append(' ');
        System.out.println(sb.toString().trim());
        sc.close();
    }
}
```

> `comunes.retainAll(grupo)` elimina de `comunes` todo lo que no esté en
> `grupo` — intersección completa en una llamada, sin bucles explícitos.

</details>

***

## Problema 5 — El K-ésimo Único
**Estructura sugerida: `TreeSet`**

Dado un arreglo de `N` enteros con posibles repeticiones y `Q` consultas,
cada consulta entrega un valor `K` y pregunta: *¿cuál es el K-ésimo entero
más pequeño considerando solo valores distintos?*
Si no existe el K-ésimo único, imprime `-1`.

### Entrada
```
Primera línea:  N  (1 ≤ N ≤ 200 000)
Segunda línea:  N enteros (pueden repetirse, −10^9 ≤ valor ≤ 10^9)
Tercera línea:  Q  (1 ≤ Q ≤ 100 000)
Siguientes Q:   un entero K por línea
```

### Salida
```
Por cada consulta: el K-ésimo valor distinto en orden ascendente, o -1.
```

### Ejemplo
```
Entrada:                    Salida:
8                           1
4 1 7 1 3 7 3 9             4
5                           7
1                           -1
3
5
7
2
```

*Valores distintos ordenados:  — hay 5 únicos.*[1][2][3][4][5]

### ¿Por qué `TreeSet`?
`TreeSet` deduplica **y** mantiene orden natural en una sola estructura.
Al convertirlo a `ArrayList`, las consultas por índice cuestan O(1) cada una
tras un preprocesamiento O(n log n).

Con `HashSet` habría que ordenar manualmente después de deduplicar.  
Con `LinkedHashSet` ídem — el orden de inserción no es el orden numérico.  
Sin Set: ordenar + deduplicar con lógica manual requiere más código y
es más propenso a errores de índice.

<details>
<summary>💡 Ver solución</summary>

```java
import java.util.*;

public class KesimoUnico {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeSet<Integer> set = new TreeSet<>();
        for (int i = 0; i < n; i++) set.add(sc.nextInt());

        List<Integer> unicos = new ArrayList<>(set);

        int q = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int k = sc.nextInt();
            sb.append(k <= unicos.size() ? unicos.get(k - 1) : -1).append('\n');
        }
        System.out.print(sb);
        sc.close();
    }
}
```

> `new ArrayList<>(set)` produce directamente la lista de valores únicos
> en orden ascendente — `TreeSet` hizo el trabajo de ordenar y deduplicar
> durante las inserciones, sin ningún paso extra.

</details>
```
