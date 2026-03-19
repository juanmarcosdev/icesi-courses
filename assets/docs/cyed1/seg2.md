## Problema: Jugadores Activos
**Estructura sugerida: `TreeSet`**
**Operaciones utilizadas: `addAll` (unión) · `removeAll` (diferencia)**

### Contexto

Un videojuego en línea tiene dos servidores. Cada servidor tiene su propia
lista de jugadores registrados (por ID entero). El sistema central también
mantiene una lista de jugadores **baneados** que no pueden participar.

Se necesita obtener la lista de jugadores **activos**: todos los jugadores
únicos de ambos servidores que **no** estén baneados, impresos en orden
ascendente.

---

### 📌 Referencia rápida de operaciones de conjunto

| Método | Operación | Efecto sobre `setA` |
|--------|:---------:|---------------------|
| `setA.addAll(setB)` | A **∪** B | Agrega a `setA` los elementos de `setB` que no estén ya presentes |
| `setA.retainAll(setB)` | A **∩** B | Elimina de `setA` todo lo que **no** esté en `setB` |
| `setA.removeAll(setB)` | A **\\** B | Elimina de `setA` todo lo que **sí** esté en `setB` |

> Para este problema use **`addAll`** y **`removeAll`**.

---

### Entrada

Primera línea: NA NB K
NA = jugadores en servidor A (1 ≤ NA ≤ 100 000)
NB = jugadores en servidor B (1 ≤ NB ≤ 100 000)
K = jugadores baneados (0 ≤ K ≤ 50 000)

Segunda línea: NA enteros — IDs servidor A
Tercera línea: NB enteros — IDs servidor B
Cuarta línea: K enteros — IDs baneados
(1 ≤ ID ≤ 10^9, pueden repetirse dentro de cada línea)


### Salida

Primera línea: número de jugadores activos
Segunda línea: sus IDs en orden ascendente separados por espacio
(línea vacía si no hay ninguno)


---

### Ejemplos

#### Ejemplo 1

**Entrada:**

5 4 2
3 7 1 9 3
5 7 2 9
7 2


**Salida:**

4
1 3 5 9


**Explicación:**

Servidor A = {1, 3, 7, 9} ← duplicado 3 ignorado
Servidor B = {2, 5, 7, 9}
Unión = {1, 2, 3, 5, 7, 9} ← addAll
Baneados = {2, 7}
Activos = {1, 3, 5, 9} ← removeAll → 4 jugadores


---

#### Ejemplo 2 — Todos baneados

**Entrada:**

3 3 3
10 20 30
10 20 30
10 20 30


**Salida:**

0


---

#### Ejemplo 3 — Baneado no existe en ningún servidor

**Entrada:**

4 2 1
8 4 6 2
1 6
99


**Salida:**

5
1 2 4 6 8


**Explicación:**

Unión = {1, 2, 4, 6, 8}
Baneados = {99} ← no está en la unión, removeAll no elimina nada
Activos = {1, 2, 4, 6, 8} → 5 jugadores


---

### Actividad

Implemente el método `jugadoresActivos`. El `Main.java` ya está dado:

```java
import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int na = sc.nextInt(), nb = sc.nextInt(), k = sc.nextInt();

        int[] servidorA = new int[na];
        for (int i = 0; i < na; i++) servidorA[i] = sc.nextInt();

        int[] servidorB = new int[nb];
        for (int i = 0; i < nb; i++) servidorB[i] = sc.nextInt();

        int[] baneados = new int[k];
        for (int i = 0; i < k; i++) baneados[i] = sc.nextInt();

        sc.close();

        TreeSet<Integer> activos = jugadoresActivos(servidorA, servidorB, baneados);

        System.out.println(activos.size());
        StringBuilder sb = new StringBuilder();
        for (int id : activos) sb.append(id).append(' ');
        System.out.println(sb.toString().trim());
    }


    public static TreeSet<Integer> jugadoresActivos(int[] servidorA,
                                                     int[] servidorB,
                                                     int[] baneados) {
        // TODO: implemente este método
        return new TreeSet<>();
    }
}
```

GitHub Classroom: https://classroom.github.com/a/VjvN28Vj