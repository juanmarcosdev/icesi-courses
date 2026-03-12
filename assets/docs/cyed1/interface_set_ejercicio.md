
# Problema: Señales Nuevas

## Contexto

Un radar espacial detecta N señales representadas como enteros. El sistema
cuenta con una base de datos de M señales ya conocidas y catalogadas.

El objetivo es determinar **cuántas señales DISTINTAS captó el radar que
no estaban en la base de datos** (señales genuinamente nuevas).

> Dos capturas de la misma señal desconocida cuentan como UNA sola señal nueva.

***

## Entrada

```
Primera línea:  N M
                N = cantidad de señales captadas   (1 ≤ N ≤ 100 000)
                M = cantidad de señales conocidas  (1 ≤ M ≤ 50 000)

Segunda línea:  M enteros — señales en la base de datos

Tercera línea:  N enteros — señales captadas por el radar
                (enteros, 1 ≤ valor ≤ 10^9, pueden repetirse)
```

## Salida

```
Un único entero: cantidad de señales nuevas y distintas.
```

***

## Ejemplos

### Ejemplo 1

**Entrada:**
```
8 3
5 10 15
3 5 7 3 10 7 2 9
```

**Salida:**
```
4
```

**Explicación:**

| Señal captada | ¿Está en la base de datos? | ¿Ya fue vista antes? | ¿Cuenta? |
|:---:|:---:|:---:|:---:|
| 3  | No | No  | ✅ Sí |
| 5  | Sí | —   | ❌ No |
| 7  | No | No  | ✅ Sí |
| 3  | No | Sí  | ❌ No |
| 10 | Sí | —   | ❌ No |
| 7  | No | Sí  | ❌ No |
| 2  | No | No  | ✅ Sí |
| 9  | No | No  | ✅ Sí |

Señales nuevas y distintas: `{3, 7, 2, 9}` → **4**

***

### Ejemplo 2

**Entrada:**
```
5 5
1 2 3 4 5
1 1 2 3 4
```

**Salida:**
```
0
```

***

### Ejemplo 3

**Entrada:**
```
6 1
99
4 4 4 4 4 4
```

**Salida:**
```
1
```

***

## Actividad

Implemente el método `contarSenalesNuevas` que resuelve el problema.

El `Main.java` que lee la entrada y llama su método ya está dado:

```java
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

    // TODO: implemente este método
    public static int contarSenalesNuevas(int[] captadas, int[] conocidas) {
        // su solución aquí
        return 0;
    }
}
```

**Restricción de eficiencia:** su solución debe ser capaz de manejar
N = 100 000 y M = 50 000 dentro de un límite de tiempo razonable.
