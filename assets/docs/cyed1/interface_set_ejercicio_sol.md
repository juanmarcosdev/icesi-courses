# Solución: Señales Nuevas

***

## Estrategia

El problema requiere dos operaciones que se repiten para cada una
de las N señales captadas:

1. **¿Está esta señal en la base de datos?** → membresía en un conjunto
2. **¿Ya contamos esta señal antes?** → deduplicación automática

Ambas operaciones sobre una **colección sin orden relevante** son la
definición exacta de lo que hace un `Set`. La pregunta es cuál de las
tres implementaciones usar.

***

## Comparación de implementaciones de `Set`

| Operación necesaria             | `ArrayList`    | `LinkedHashSet` | `TreeSet`    | `HashSet`        |
|---------------------------------|----------------|-----------------|--------------|------------------|
| `contains(x)`                   | O(N) lineal    | O(1)            | O(log N)     | **O(1)**         |
| `add(x)` con deduplicación      | O(N) manual    | O(1)            | O(log N)     | **O(1)**         |
| ¿Mantiene orden de inserción?   | —              | Sí (overhead)   | No           | No               |
| ¿Mantiene orden natural sorted? | —              | No              | Sí (overhead)| No               |
| ¿El problema necesita orden?    | —              | ❌ No           | ❌ No        | ✅ Tampoco, y es el más rápido |

- **`LinkedHashSet`**: funciona correctamente pero consume memoria extra
  manteniendo una lista doblemente enlazada para preservar el orden de
  inserción — información que nadie solicitó en este problema.
- **`TreeSet`**: funciona correctamente pero paga O(log N) por cada
  `add` y `contains` porque mantiene un árbol Red-Black ordenado —
  orden que tampoco fue solicitado.
- **`HashSet`**: O(1) amortizado para todo, sin estructuras auxiliares.
  **Es la elección óptima.**

***

## El costo de no usar Set

Con `ArrayList`, el código ingenuo sería:

```java
for (int senal : captadas) {
    if (!listaConocidas.contains(senal)) {  // O(M) — recorre toda la lista
        if (!listaNuevas.contains(senal)) { // O(N) — recorre toda la lista
            listaNuevas.add(senal);
        }
    }
}
```

Cada iteración puede costar hasta O(N + M). Para N = 100 000 y M = 50 000
esto es en el peor caso **~15 mil millones de comparaciones** → `TLE`.

Con `HashSet` ambas comprobaciones son O(1) → **100 000 operaciones en total**.

***

## Solución Completa

```java
import java.util.HashSet;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();

        int[] conocidas = new int[m];
        for (int i = 0; i < m; i++) {
            conocidas[i] = sc.nextInt();
        }

        int[] captadas = new int[n];
        for (int i = 0; i < n; i++) {
            captadas[i] = sc.nextInt();
        }

        sc.close();

        int resultado = contarSenalesNuevas(captadas, conocidas);
        System.out.println(resultado);
    }

    public static int contarSenalesNuevas(int[] captadas, int[] conocidas) {

        // HashSet 1: base de datos — permite consulta O(1)
        HashSet<Integer> baseDatos = new HashSet<>();
        for (int s : conocidas) {
            baseDatos.add(s);
        }

        // HashSet 2: acumulador de señales nuevas
        // add() ignora automáticamente duplicados → deduplicación gratuita
        HashSet<Integer> nuevas = new HashSet<>();
        for (int senal : captadas) {
            if (!baseDatos.contains(senal)) {  // O(1)
                nuevas.add(senal);             // O(1), duplicado = no-op
            }
        }

        return nuevas.size();
    }
}
```

***

## Traza del Ejemplo 1

```
conocidas = {5, 10, 15}   ← HashSet construido en O(M)

Procesando captadas: [3, 5, 7, 3, 10, 7, 2, 9]

senal=3  → baseDatos.contains(3)? No  → nuevas.add(3)  → nuevas={3}
senal=5  → baseDatos.contains(5)? Sí  → ignorar
senal=7  → baseDatos.contains(7)? No  → nuevas.add(7)  → nuevas={3,7}
senal=3  → baseDatos.contains(3)? No  → nuevas.add(3)  → sin cambio (ya está)
senal=10 → baseDatos.contains(10)? Sí → ignorar
senal=7  → baseDatos.contains(7)? No  → nuevas.add(7)  → sin cambio (ya está)
senal=2  → baseDatos.contains(2)? No  → nuevas.add(2)  → nuevas={3,7,2}
senal=9  → baseDatos.contains(9)? No  → nuevas.add(9)  → nuevas={3,7,2,9}

nuevas.size() = 4  ✓
```

***

## Complejidad

| Fase                          | Costo       |
|-------------------------------|-------------|
| Construir `baseDatos`         | O(M)        |
| Procesar N señales captadas   | O(N)        |
| **Total tiempo**              | **O(N + M)**|
| **Espacio adicional**         | **O(N + M)**|

Con N = 100 000 y M = 50 000 → ~150 000 operaciones.
Frente a la solución con `ArrayList` → ~15 000 000 000 operaciones.
**El uso de `HashSet` representa una mejora de ~100 000x en este caso.**