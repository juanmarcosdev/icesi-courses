
# Computación y Estructuras Discretas 2
## Programación funcional — Taller: Recursión de Cola

***

## Objetivos

- Transformar funciones recursivas lineales a su versión de **recursión de cola**
  añadiendo los parámetros acumuladores necesarios directamente en la firma.
- Aplicar `@tailrec` de Scala para verificar en tiempo de compilación que la
  transformación es correcta.

***

## Recordatorio del patrón

```scala
import scala.annotation.tailrec

// Recursión lineal — operación FUERA del llamado:
def f(n: Int): Int = n match {
  case 0 => BASE
  case _ => operacion(elemento, f(pred(n)))   // ← pendiente
}

// Recursión de cola — operación DENTRO del argumento:
@tailrec
def fRCola(n: Int, acum: Int): Int = n match {
  case 0 => acum
  case _ => fRCola(pred(n), acum operacion elemento)   // ← nada pendiente
}
```

***

# Parte 1 — Recursión de Cola sobre Naturales

> Funciones del **Taller 1 — Recursión y Naturales**.

***

> ### 🔎 `dif` ya es recursión de cola
>
> ```scala
> def dif(x: Int, y: Int): Int = (x, y) match {
>   case (_, 0) => x
>   case (0, _) => 0
>   case _      => dif(pred(x), pred(y))   // ← el llamado ES lo último
> }
> ```
> No hay ninguna operación pendiente envolviendo el llamado recursivo.
> `@tailrec` puede colocarse directamente sobre ella sin cambios.

***

### 1) Factorial

**Actividad A — Recursión lineal:**
Implementa `factorial(n: Int): Int` usando `pred`.

```scala
def factorial(n: Int): Int = n match {
  case 0 => ???
  case _ => ???
}
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def factorial(n: Int): Int = n match {
  case 0 => 1
  case _ => n * factorial(pred(n))
}
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `factorialRCola(n: Int, acum: Int): Int`.
¿Con qué valor neutro de la multiplicación debe iniciarse `acum`?

```scala
import scala.annotation.tailrec

@tailrec
def factorialRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => ???
    case _ => ???
  }

// Invocación: factorialRCola(n, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def factorialRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => acum
    case _ => factorialRCola(pred(n), n * acum)
  }

// Invocación: factorialRCola(n, 1)
// El 1 es el neutro de *.
// Traza factorialRCola(4, 1):
//   → factorialRCola(3, 4)
//   → factorialRCola(2, 12)
//   → factorialRCola(1, 24)
//   → factorialRCola(0, 24) → 24  ✓
```

</details>

***

### 2) Sumatoria

**Actividad A — Recursión lineal:**
Implementa `sumatoria(n: Int): Int` usando `pred`.

```scala
def sumatoria(n: Int): Int = n match {
  case 0 => ???
  case _ => ???
}
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def sumatoria(n: Int): Int = n match {
  case 0 => 0
  case _ => n + sumatoria(pred(n))
}
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `sumatoriaRCola(n: Int, acum: Int): Int`.
¿Con qué valor neutro de la suma debe iniciarse `acum`?

```scala
import scala.annotation.tailrec

@tailrec
def sumatoriaRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => ???
    case _ => ???
  }

// Invocación: sumatoriaRCola(n, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def sumatoriaRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => acum
    case _ => sumatoriaRCola(pred(n), acum + n)
  }

// Invocación: sumatoriaRCola(n, 0)
// Traza sumatoriaRCola(4, 0):
//   → sumatoriaRCola(3, 4)
//   → sumatoriaRCola(2, 7)
//   → sumatoriaRCola(1, 9)
//   → sumatoriaRCola(0, 10) → 10  ✓  (0+1+2+3+4 = 10)
```

</details>

***

### 3) Potencia

**Actividad A — Recursión lineal:**
Implementa `potencia(x: Int, n: Int): Int` usando `pred`.

```scala
def potencia(x: Int, n: Int): Int = n match {
  case 0 => ???
  case _ => ???
}
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def potencia(x: Int, n: Int): Int = n match {
  case 0 => 1
  case _ => x * potencia(x, pred(n))
}
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `potenciaRCola(x: Int, n: Int, acum: Int): Int`.
`x` es fijo en todos los llamados — solo cambian `n` y `acum`.

```scala
import scala.annotation.tailrec

@tailrec
def potenciaRCola(x: Int, n: Int, acum: Int): Int =
  n match {
    case 0 => ???
    case _ => ???
  }

// Invocación: potenciaRCola(x, n, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def potenciaRCola(x: Int, n: Int, acum: Int): Int =
  n match {
    case 0 => acum
    case _ => potenciaRCola(x, pred(n), acum * x)
  }

// Invocación: potenciaRCola(x, n, 1)
// Traza potenciaRCola(2, 4, 1):
//   → potenciaRCola(2, 3, 2)
//   → potenciaRCola(2, 2, 4)
//   → potenciaRCola(2, 1, 8)
//   → potenciaRCola(2, 0, 16) → 16  ✓
```

</details>


***

### 5) Producto de naturales

**Actividad A — Recursión lineal:**
Implementa `prod(x: Int, y: Int): Int` usando `suma` y `pred`.

```scala
def prod(x: Int, y: Int): Int = (x, y) match {
  case (0, _) => ???
  case (_, 0) => ???
  case (_, 1) => ???
  case _      => ???
}
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def prod(x: Int, y: Int): Int = (x, y) match {
  case (0, _) => 0
  case (_, 0) => 0
  case (_, 1) => x
  case _      => suma(x, prod(x, pred(y)))
}
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `prodRCola(x: Int, y: Int, acum: Int): Int`.
El acumulador guarda sumas parciales de `x`.

```scala
import scala.annotation.tailrec

@tailrec
def prodRCola(x: Int, y: Int, acum: Int): Int =
  (x, y) match {
    case (0, _) => ???   // si x=0, el producto siempre es...
    case (_, 0) => ???   // y llegó a 0: ¿qué contiene acum?
    case _      => ???
  }

// Invocación: prodRCola(x, y, ???)
// Traza esperada: prodRCola(3, 3, 0)
//   → prodRCola(3, 2, 3)
//   → prodRCola(3, 1, 6)
//   → prodRCola(3, 0, 9) → 9  ✓
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def prodRCola(x: Int, y: Int, acum: Int): Int =
  (x, y) match {
    case (0, _) => 0
    case (_, 0) => acum
    case _      => prodRCola(x, pred(y), suma(acum, x))
  }

// Invocación: prodRCola(x, y, 0)
// El 0 es el neutro de la suma (acumulamos multiplicaciones como sumas repetidas).
// Nota: el caso (0,_) devuelve 0 directamente, ignorando acum,
// porque si x=0 el producto es 0 sin importar cuánto lleve acumulado.
```

</details>

***

# Parte 2 — Recursión de Cola sobre Listas

> Funciones del **Taller de Pattern Matching**.

***

> ### 🔎 `buscar` y `ultimoElemento` ya son recursión de cola
>
> ```scala
> // El llamado recursivo es la ÚLTIMA operación en ambos casos:
>
> def buscar(lista: List[Int], elem: Int): Boolean =
>   lista match {
>     case Nil     => false
>     case x :: ys => if (x == elem) true else buscar(ys, elem)  // ← ya es cola
>   }
>
> def ultimoElemento(lista: List[Int]): Int =
>   lista match {
>     case x :: Nil => x
>     case _ :: ys  => ultimoElemento(ys)   // ← ya es cola
>   }
> ```

***

### 6) Contar elementos

**Actividad A — Recursión lineal:**
Implementa `contar(lista: List[Int]): Int`.

```scala
def contar(lista: List[Int]): Int =
  lista match {
    case Nil     => ???
    case _ :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def contar(lista: List[Int]): Int =
  lista match {
    case Nil     => 0
    case _ :: ys => 1 + contar(ys)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `contarRCola(lista: List[Int], acum: Int): Int`.

```scala
import scala.annotation.tailrec

@tailrec
def contarRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => ???
    case _ :: ys => ???
  }

// Invocación: contarRCola(lista, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def contarRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => acum
    case _ :: ys => contarRCola(ys, acum + 1)
  }

// Invocación: contarRCola(lista, 0)
```

</details>

***

### 7) Suma de lista

**Actividad A — Recursión lineal:**
Implementa `sumaLista(lista: List[Int]): Int`.

```scala
def sumaLista(lista: List[Int]): Int =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def sumaLista(lista: List[Int]): Int =
  lista match {
    case Nil     => 0
    case x :: ys => x + sumaLista(ys)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `sumaListaRCola(lista: List[Int], acum: Int): Int`.

```scala
import scala.annotation.tailrec

@tailrec
def sumaListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }

// Invocación: sumaListaRCola(lista, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def sumaListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => acum
    case x :: ys => sumaListaRCola(ys, acum + x)
  }

// Invocación: sumaListaRCola(lista, 0)
```

</details>

***

### 8) Reversar lista

**Actividad A — Recursión lineal:**
Implementa `reversarLista(lista: List[Int]): List[Int]`.

```scala
def reversarLista(lista: List[Int]): List[Int] =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def reversarLista(lista: List[Int]): List[Int] =
  lista match {
    case Nil     => Nil
    case x :: ys => reversarLista(ys) ::: List(x)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `reversarListaRCola(lista: List[Int], acum: List[Int]): List[Int]`.
Aquí `x :: acum` funciona sin problema. ¿Por qué no se invierte el resultado?

```scala
import scala.annotation.tailrec

@tailrec
def reversarListaRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }

// Invocación: reversarListaRCola(lista, Nil)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def reversarListaRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil     => acum
    case x :: ys => reversarListaRCola(ys, x :: acum)
  }

// Invocación: reversarListaRCola(lista, Nil)
// x :: acum prepende al inicio del acumulador, que es exactamente
// lo que queremos para revertir: el primer elemento de la lista
// queda al final del acumulador.
// Traza reversarListaRCola(List(1,2,3), Nil):
//   → reversarListaRCola(List(2,3), List(1))
//   → reversarListaRCola(List(3),   List(2,1))
//   → reversarListaRCola(Nil,       List(3,2,1)) → List(3,2,1)  ✓
```

</details>

***

### 9) Eliminar último elemento

**Actividad A — Recursión lineal:**
Implementa `eliminarUltimo(lista: List[Int]): List[Int]`.

```scala
def eliminarUltimo(lista: List[Int]): List[Int] =
  lista match {
    case Nil      => ???
    case _ :: Nil => ???
    case x :: ys  => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def eliminarUltimo(lista: List[Int]): List[Int] =
  lista match {
    case Nil      => Nil
    case _ :: Nil => Nil
    case x :: ys  => x :: eliminarUltimo(ys)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `eliminarUltimoRCola(lista: List[Int], acum: List[Int]): List[Int]`.
A diferencia de `reversarLista`, aquí el orden original debe preservarse.
¿`x :: acum` o `acum ::: List(x)`?

```scala
import scala.annotation.tailrec

@tailrec
def eliminarUltimoRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil      => acum
    case _ :: Nil => ???          // llegamos al último: no lo incluimos
    case x :: ys  => ???          // ¿cómo preservas el orden?
  }

// Invocación: eliminarUltimoRCola(lista, Nil)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def eliminarUltimoRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil      => acum
    case _ :: Nil => acum
    case x :: ys  => eliminarUltimoRCola(ys, acum ::: List(x))
  }

// Invocación: eliminarUltimoRCola(lista, Nil)
// Se usa acum ::: List(x) para agregar x AL FINAL del acumulador,
// preservando el orden original. x :: acum lo agregaría al inicio
// y produciría la lista invertida.
// Traza eliminarUltimoRCola(List(1,2,3,4), Nil):
//   → eliminarUltimoRCola(List(2,3,4), List(1))
//   → eliminarUltimoRCola(List(3,4),   List(1,2))
//   → eliminarUltimoRCola(List(4),     List(1,2,3))
//   → List(1,2,3)  ✓  (el 4 fue descartado)
```

</details>

***

### 10) Concatenar palabras

**Actividad A — Recursión lineal:**
Implementa `concatenar(xs: List[String]): String`.

```scala
def concatenar(xs: List[String]): String =
  xs match {
    case Nil     => ???
    case x :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def concatenar(xs: List[String]): String =
  xs match {
    case Nil     => ""
    case x :: ys => x + " " + concatenar(ys)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `concatenarRCola(xs: List[String], acum: String): String`.
Cuidado con el espacio extra al inicio si concatenas directamente.

```scala
import scala.annotation.tailrec

@tailrec
def concatenarRCola(xs: List[String], acum: String): String =
  xs match {
    case Nil     => ???
    case x :: ys => ???   // Pista: if (acum.isEmpty) x else acum + " " + x
  }

// Invocación: concatenarRCola(xs, "")
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def concatenarRCola(xs: List[String], acum: String): String =
  xs match {
    case Nil     => acum
    case x :: ys => concatenarRCola(ys, if (acum.isEmpty) x else acum + " " + x)
  }

// Invocación: concatenarRCola(xs, "")
// Traza concatenarRCola(List("Hola","mundo"), ""):
//   → concatenarRCola(List("mundo"), "Hola")
//   → concatenarRCola(Nil, "Hola mundo") → "Hola mundo"  ✓
```

</details>

***

# Parte 3 — Nuevos Ejercicios

***

### 11) Fibonacci

La sucesión de Fibonacci:

$$
F(n) =
\begin{cases}
0 & \text{si } n = 0 \\
1 & \text{si } n = 1 \\
F(n-1) + F(n-2) & \text{si } n > 1
\end{cases}
$$

**Actividad A — Recursión de árbol (referencia):**
Implementa `fibonacci(n: Int): Int`.
⚠️ Esta versión genera **dos llamados recursivos** por nivel — es recursión de árbol,
no lineal. Su complejidad es O(2^n).

```scala
def fibonacci(n: Int): Int = n match {
  case 0 => ???
  case 1 => ???
  case _ => ???   // dos llamados: fibonacci(n-1) y fibonacci(n-2)
}
```

<details>
<summary>💡 Ver solución — Recursión de árbol</summary>

```scala
def fibonacci(n: Int): Int = n match {
  case 0 => 0
  case 1 => 1
  case _ => fibonacci(n - 1) + fibonacci(n - 2)
}

// ⚠️ fibonacci(50) requeriría más de un billón de llamados.
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `fibonacciRCola(n: Int, a: Int, b: Int): Int`
usando **dos acumuladores**.
Pista: `(a, b)` representa la ventana `(F(k), F(k+1))`. En cada paso avanza a `(F(k+1), F(k+2))`.

```scala
import scala.annotation.tailrec

@tailrec
def fibonacciRCola(n: Int, a: Int, b: Int): Int =
  n match {
    case 0 => ???   // ¿cuál de los dos acumuladores es F(0)?
    case _ => ???   // ¿cómo avanzas la ventana (a, b)?
  }

// Invocación: fibonacciRCola(n, 0, 1)
// Traza esperada para fibonacciRCola(5, 0, 1):
//   → fibonacciRCola(4, 1, 1)
//   → fibonacciRCola(3, 1, 2)
//   → fibonacciRCola(2, 2, 3)
//   → fibonacciRCola(1, 3, 5)
//   → fibonacciRCola(0, 5, 8) → 5  ✓
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def fibonacciRCola(n: Int, a: Int, b: Int): Int =
  n match {
    case 0 => a
    case _ => fibonacciRCola(n - 1, b, a + b)
  }

// Invocación: fibonacciRCola(n, 0, 1)
// a = F(k), b = F(k+1)
// El nuevo par es (F(k+1), F(k+2)) = (b, a+b)
// Complejidad: O(n) — frente al O(2^n) de la versión de árbol.
```

</details>

***

### 12) Máximo de una lista

**Actividad A — Recursión lineal:**
Implementa `maximoLista(lista: List[Int]): Int`.
Puedes asumir que la lista tiene al menos un elemento.

```scala
def maximoLista(lista: List[Int]): Int =
  lista match {
    case x :: Nil => ???
    case x :: ys  => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def maximoLista(lista: List[Int]): Int =
  lista match {
    case x :: Nil => x
    case x :: ys  =>
      val m = maximoLista(ys)
      if (x > m) x else m
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `maximoListaRCola(lista: List[Int], acum: Int): Int`.
El acumulador guarda el máximo encontrado hasta el momento.

```scala
import scala.annotation.tailrec

@tailrec
def maximoListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => ???
    case x :: ys => ???   // ¿cómo actualizas acum?
  }

// Invocación: maximoListaRCola(lista.tail, lista.head)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def maximoListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => acum
    case x :: ys => maximoListaRCola(ys, if (x > acum) x else acum)
  }

// Invocación: maximoListaRCola(lista.tail, lista.head)
// Se inicia acum con el primer elemento para no asumir un valor mínimo arbitrario.
// Traza maximoListaRCola(List(3,7,2,9,1), ?) con lista = List(3,7,2,9,1):
//   maximoListaRCola(List(7,2,9,1), 3)
//   → maximoListaRCola(List(2,9,1), 7)
//   → maximoListaRCola(List(9,1),   7)
//   → maximoListaRCola(List(1),     9)
//   → maximoListaRCola(Nil,         9) → 9  ✓
```

</details>

***

### 13) Contar ocurrencias

**Actividad A — Recursión lineal:**
Implementa `contarOcurrencias(lista: List[Int], elem: Int): Int` que cuente
cuántas veces aparece `elem` en la lista.

```scala
def contarOcurrencias(lista: List[Int], elem: Int): Int =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def contarOcurrencias(lista: List[Int], elem: Int): Int =
  lista match {
    case Nil     => 0
    case x :: ys => (if (x == elem) 1 else 0) + contarOcurrencias(ys, elem)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `contarOcurrenciasRCola(lista: List[Int], elem: Int, acum: Int): Int`.

```scala
import scala.annotation.tailrec

@tailrec
def contarOcurrenciasRCola(lista: List[Int], elem: Int, acum: Int): Int =
  lista match {
    case Nil     => ???
    case x :: ys => ???   // ¿cuándo incrementas acum?
  }

// Invocación: contarOcurrenciasRCola(lista, elem, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def contarOcurrenciasRCola(lista: List[Int], elem: Int, acum: Int): Int =
  lista match {
    case Nil     => acum
    case x :: ys => contarOcurrenciasRCola(ys, elem, if (x == elem) acum + 1 else acum)
  }

// Invocación: contarOcurrenciasRCola(lista, elem, 0)
```

</details>

***

### 14) Filtrar elementos de una lista

**Actividad A — Recursión lineal:**
Implementa `filtrar(lista: List[Int], p: Int => Boolean): List[Int]`
que devuelva solo los elementos que cumplen el predicado `p`.

```scala
def filtrar(lista: List[Int], p: Int => Boolean): List[Int] =
  lista match {
    case Nil     => ???
    case x :: ys => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def filtrar(lista: List[Int], p: Int => Boolean): List[Int] =
  lista match {
    case Nil     => Nil
    case x :: ys =>
      if (p(x)) x :: filtrar(ys, p)
      else filtrar(ys, p)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `filtrarRCola(lista: List[Int], p: Int => Boolean, acum: List[Int]): List[Int]`.
Mismo desafío de orden que en `eliminarUltimoRCola`: ¿`x :: acum` o `acum ::: List(x)`?

```scala
import scala.annotation.tailrec

@tailrec
def filtrarRCola(lista: List[Int], p: Int => Boolean, acum: List[Int]): List[Int] =
  lista match {
    case Nil     => ???
    case x :: ys =>
      if (p(x)) ???   // x cumple: agrégalo preservando el orden
      else      ???   // x no cumple: continúa sin modificar acum
  }

// Invocación: filtrarRCola(lista, p, Nil)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def filtrarRCola(lista: List[Int], p: Int => Boolean, acum: List[Int]): List[Int] =
  lista match {
    case Nil     => acum
    case x :: ys =>
      if (p(x)) filtrarRCola(ys, p, acum ::: List(x))
      else      filtrarRCola(ys, p, acum)
  }

// Invocación: filtrarRCola(lista, p, Nil)
// acum ::: List(x) agrega x al final preservando el orden original.
// Ejemplo: filtrarRCola(List(1,2,3,4,5), x => x % 2 == 0, Nil)
//   → List(2, 4)  ✓
```

</details>

***

### 15) Aplanar lista de listas

**Actividad A — Recursión lineal:**
Implementa `aplanar(listas: List[List[Int]]): List[Int]` que convierta
una lista de listas en una sola lista, concatenando en orden.

```scala
def aplanar(listas: List[List[Int]]): List[Int] =
  listas match {
    case Nil       => ???
    case xs :: xss => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def aplanar(listas: List[List[Int]]): List[Int] =
  listas match {
    case Nil       => Nil
    case xs :: xss => xs ::: aplanar(xss)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `aplanarRCola(listas: List[List[Int]], acum: List[Int]): List[Int]`.
¿`acum ::: xs` o `xs ::: acum`? Analiza el orden con la traza.

```scala
import scala.annotation.tailrec

@tailrec
def aplanarRCola(listas: List[List[Int]], acum: List[Int]): List[Int] =
  listas match {
    case Nil       => ???
    case xs :: xss => ???
  }

// Invocación: aplanarRCola(listas, Nil)
// Ejemplo esperado:
//   aplanarRCola(List(List(1,2), List(3), List(4,5)), Nil)
//   debe producir List(1, 2, 3, 4, 5)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def aplanarRCola(listas: List[List[Int]], acum: List[Int]): List[Int] =
  listas match {
    case Nil       => acum
    case xs :: xss => aplanarRCola(xss, acum ::: xs)
  }

// Invocación: aplanarRCola(listas, Nil)
// acum ::: xs agrega xs AL FINAL del acumulador, preservando el orden.
// Traza aplanarRCola(List(List(1,2), List(3), List(4,5)), Nil):
//   → aplanarRCola(List(List(3), List(4,5)), List(1,2))
//   → aplanarRCola(List(List(4,5)),          List(1,2,3))
//   → aplanarRCola(Nil,                      List(1,2,3,4,5))
//   → List(1,2,3,4,5)  ✓
```

</details>

***

### 16) Suma de dígitos

Implementa una función que sume todos los dígitos de un número natural.
Ejemplo: `sumDigitos(1234) = 1 + 2 + 3 + 4 = 10`

**Actividad A — Recursión lineal:**
Implementa `sumDigitos(n: Int): Int`.
Pista: el último dígito de `n` es `n % 10` y el resto es `n / 10`.

```scala
def sumDigitos(n: Int): Int =
  n match {
    case 0 => ???
    case _ => ???   // extrae el último dígito y recurre sobre el resto
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def sumDigitos(n: Int): Int =
  n match {
    case 0 => 0
    case _ => (n % 10) + sumDigitos(n / 10)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `sumDigitosRCola(n: Int, acum: Int): Int`.

```scala
import scala.annotation.tailrec

@tailrec
def sumDigitosRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => ???
    case _ => ???
  }

// Invocación: sumDigitosRCola(n, ???)
// Traza esperada: sumDigitosRCola(1234, 0)
//   → sumDigitosRCola(123, 4)
//   → sumDigitosRCola(12,  7)
//   → sumDigitosRCola(1,   9)
//   → sumDigitosRCola(0,  10) → 10  ✓
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def sumDigitosRCola(n: Int, acum: Int): Int =
  n match {
    case 0 => acum
    case _ => sumDigitosRCola(n / 10, acum + (n % 10))
  }

// Invocación: sumDigitosRCola(n, 0)
```

</details>

***

### 17) Contar dígitos

Implementa una función que cuente cuántos dígitos tiene un número natural.
Ejemplo: `contarDigitos(4057) = 4`
Puedes asumir que `n >= 1`.

**Actividad A — Recursión lineal:**
Implementa `contarDigitos(n: Int): Int`.

```scala
def contarDigitos(n: Int): Int =
  n match {
    case _ if n < 10 => ???   // un solo dígito
    case _           => ???   // más de un dígito
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def contarDigitos(n: Int): Int =
  n match {
    case _ if n < 10 => 1
    case _           => 1 + contarDigitos(n / 10)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `contarDigitosRCola(n: Int, acum: Int): Int`.

```scala
import scala.annotation.tailrec

@tailrec
def contarDigitosRCola(n: Int, acum: Int): Int =
  n match {
    case _ if n < 10 => ???
    case _           => ???
  }

// Invocación: contarDigitosRCola(n, ???)
// Traza esperada: contarDigitosRCola(4057, 0)
//   → contarDigitosRCola(405, 1)
//   → contarDigitosRCola(40,  2)
//   → contarDigitosRCola(4,   3) → 4  ✓
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def contarDigitosRCola(n: Int, acum: Int): Int =
  n match {
    case _ if n < 10 => acum + 1
    case _           => contarDigitosRCola(n / 10, acum + 1)
  }

// Invocación: contarDigitosRCola(n, 0)
```

</details>

***

### 18) Multiplicar lista

Implementa una función que calcule el producto de todos los elementos de una lista.
Ejemplo: `multiplicarLista(List(2, 3, 4)) = 24`

**Actividad A — Recursión lineal:**
Implementa `multiplicarLista(lista: List[Int]): Int`.
¿Qué valor devuelve para la lista vacía?

```scala
def multiplicarLista(lista: List[Int]): Int =
  lista match {
    case Nil     => ???   // ¿cuál es el neutro de *?
    case x :: xs => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def multiplicarLista(lista: List[Int]): Int =
  lista match {
    case Nil     => 1
    case x :: xs => x * multiplicarLista(xs)
  }

// El neutro de * es 1: List() vacía multiplica a 1.
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `multiplicarListaRCola(lista: List[Int], acum: Int): Int`.
¿Con qué valor neutro inicia `acum`?

```scala
import scala.annotation.tailrec

@tailrec
def multiplicarListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => ???
    case x :: xs => ???
  }

// Invocación: multiplicarListaRCola(lista, ???)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def multiplicarListaRCola(lista: List[Int], acum: Int): Int =
  lista match {
    case Nil     => acum
    case x :: xs => multiplicarListaRCola(xs, acum * x)
  }

// Invocación: multiplicarListaRCola(lista, 1)
// El 1 es el neutro de *, igual que en factorialRCola.
// Traza multiplicarListaRCola(List(2,3,4), 1):
//   → multiplicarListaRCola(List(3,4), 2)
//   → multiplicarListaRCola(List(4),   6)
//   → multiplicarListaRCola(Nil,      24) → 24  ✓
```

</details>

***

### 19) Duplicar elementos

Implementa una función que devuelva una nueva lista donde cada elemento
está multiplicado por 2.
Ejemplo: `duplicarElementos(List(1, 2, 3)) = List(2, 4, 6)`

**Actividad A — Recursión lineal:**
Implementa `duplicarElementos(lista: List[Int]): List[Int]`.

```scala
def duplicarElementos(lista: List[Int]): List[Int] =
  lista match {
    case Nil     => ???
    case x :: xs => ???
  }
```

<details>
<summary>💡 Ver solución — Recursión lineal</summary>

```scala
def duplicarElementos(lista: List[Int]): List[Int] =
  lista match {
    case Nil     => Nil
    case x :: xs => (x * 2) :: duplicarElementos(xs)
  }
```

</details>

***

**Actividad B — Recursión de cola:**
Transforma la función a `duplicarElementosRCola(lista: List[Int], acum: List[Int]): List[Int]`.
Mismo desafío de orden que en `eliminarUltimoRCola` y `filtrarRCola`.

```scala
import scala.annotation.tailrec

@tailrec
def duplicarElementosRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil     => ???
    case x :: xs => ???   // ¿x*2 :: acum  o  acum ::: List(x*2)?
  }

// Invocación: duplicarElementosRCola(lista, Nil)
```

<details>
<summary>💡 Ver solución — Recursión de cola</summary>

```scala
import scala.annotation.tailrec

@tailrec
def duplicarElementosRCola(lista: List[Int], acum: List[Int]): List[Int] =
  lista match {
    case Nil     => acum
    case x :: xs => duplicarElementosRCola(xs, acum ::: List(x * 2))
  }

// Invocación: duplicarElementosRCola(lista, Nil)
// acum ::: List(x*2) agrega al final para preservar el orden.
// Traza duplicarElementosRCola(List(1,2,3), Nil):
//   → duplicarElementosRCola(List(2,3), List(2))
//   → duplicarElementosRCola(List(3),   List(2,4))
//   → duplicarElementosRCola(Nil,       List(2,4,6)) → List(2,4,6)  ✓
```

</details>

***