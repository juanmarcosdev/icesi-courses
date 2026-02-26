# La interfaz `Set` en Java

La interfaz `Set` pertenece al **Java Collections Framework** y representa una colección que:

- No permite elementos duplicados.
- No garantiza un orden específico (esto depende de la implementación).
- Modela el concepto matemático de conjunto.

`Set` está en el paquete:

```java
import java.util.Set;
```

---

## Jerarquía de la interfaz `Set`

La interfaz `Set` extiende `Collection`, y tiene varias implementaciones concretas.

![Jerarquía Set](https://www.programiz.com/sites/tutorial2program/files/java-set-implementation.png)

Nos centraremos en tres implementaciones principales:

- `HashSet`
- `LinkedHashSet`
- `TreeSet`

---

# 1. ¿Qué es `Set`?

`Set<E>` es una interfaz genérica que define el comportamiento de un conjunto de elementos únicos.

Ejemplo básico:

```java
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {

        Set<Integer> numbers = new HashSet<>();

        numbers.add(1);
        numbers.add(2);
        numbers.add(2);

        System.out.println(numbers);
    }
}
```

Salida posible:

```
[1, 2]
```

El segundo `2` no se agrega porque los conjuntos no permiten duplicados.

---

# 2. HashSet

## Características

- Implementado mediante **tabla hash**.
- No mantiene orden de inserción.
- Permite un elemento `null`.
- Operaciones `add`, `remove`, `contains` son O(1) promedio.

## Instanciación

```java
Set<String> names = new HashSet<>();
```

## Ejemplo

```java
Set<String> names = new HashSet<>();

names.add("Ana");
names.add("Luis");
names.add("Carlos");
names.add("Ana");

System.out.println(names);
```

El orden puede variar:

```
[Luis, Ana, Carlos]
```

## Caso de uso típico

- Cuando solo importa la unicidad.
- Cuando se requiere máxima eficiencia.
- Cuando el orden no es relevante.

---

# 3. LinkedHashSet

## Características

- Mantiene el **orden de inserción**.
- Basado en hash + lista enlazada.
- Permite un elemento `null`.
- Rendimiento ligeramente inferior a `HashSet`.

## Instanciación

```java
Set<String> names = new LinkedHashSet<>();
```

## Ejemplo

```java
Set<String> names = new LinkedHashSet<>();

names.add("Ana");
names.add("Luis");
names.add("Carlos");

System.out.println(names);
```

Salida:

```
[Ana, Luis, Carlos]
```

Respeta el orden en que fueron agregados.

## Caso de uso típico

- Cuando se necesita unicidad y orden de inserción.
- Para mostrar resultados en el mismo orden en que se agregaron.

---

# 4. TreeSet

## Características

- Implementado como **árbol rojo-negro**.
- Mantiene los elementos **ordenados naturalmente**.
- No permite `null`.
- Operaciones son O(log n).

## Instanciación

```java
Set<Integer> numbers = new TreeSet<>();
```

## Ejemplo

```java
Set<Integer> numbers = new TreeSet<>();

numbers.add(5);
numbers.add(1);
numbers.add(3);

System.out.println(numbers);
```

Salida:

```
[1, 3, 5]
```

Siempre ordenado.

También puede usar un `Comparator` personalizado:

```java
Set<String> names = new TreeSet<>((a, b) -> b.compareTo(a));
```

Esto ordena en orden descendente.

## Caso de uso típico

- Cuando se necesita mantener los datos ordenados.
- Cuando se requieren operaciones como `first()`, `last()`, `higher()`, `lower()`.

---

# 5. Operaciones comunes en los tres

Estas operaciones funcionan igual en `HashSet`, `LinkedHashSet` y `TreeSet`:

```java
set.add(element);        // Agregar
set.remove(element);     // Eliminar
set.contains(element);   // Si el conjunto tiene el elemento o no
set.size();              // Tamaño
set.isEmpty();           // Si el conjunto es vacío o no
set.clear();             // Limpiar (volver un conjunto vacío)
```

---

# 6. Operaciones tipo teoría de conjuntos

Java no tiene métodos directos para unión, intersección o diferencia, pero se pueden simular:

## Unión

```java
Set<Integer> a = new HashSet<>(Set.of(1,2,3));
Set<Integer> b = new HashSet<>(Set.of(3,4,5));

a.addAll(b); 

System.out.println(a);  //[1,2,3,4,5]
```

## Intersección

```java
Set<Integer> a = new HashSet<>(Set.of(1,2,3));
Set<Integer> b = new HashSet<>(Set.of(2,3,4));

a.retainAll(b);

System.out.println(a); //[2,3]
```

## Diferencia

```java
Set<Integer> a = new HashSet<>(Set.of(1,2,3));
Set<Integer> b = new HashSet<>(Set.of(2,3));

a.removeAll(b);

System.out.println(a); // [1]
```

Estas operaciones funcionan igual en las tres implementaciones.

---

# 7. Comparación resumida

| Implementación  | Orden            | Permite null | Complejidad promedio | Caso ideal |
|---------------|-----------------|-------------|---------------------|------------|
| HashSet      | No garantiza     | Sí          | O(1)                | Máximo rendimiento |
| LinkedHashSet| Inserción        | Sí          | O(1)                | Orden + unicidad |
| TreeSet      | Orden natural    | No          | O(log n)            | Datos ordenados |

---

# 8. Conclusión

La interfaz `Set` modela conjuntos matemáticos en Java:

- No hay duplicados.
- El comportamiento específico depende de la implementación.
- `HashSet` prioriza rendimiento.
- `LinkedHashSet` mantiene orden de inserción.
- `TreeSet` mantiene orden natural.

Elegir la implementación correcta depende de:

- ¿Importa el orden?
- ¿Importa el rendimiento?
- ¿Se necesita ordenamiento automático?