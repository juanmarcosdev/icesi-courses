```markdown
# Computación y Estructuras Discretas 2
## Programación funcional — Taller: Recursión de Cola

***

## Objetivos

- Transformar funciones recursivas lineales a su versión de **recursión de cola**,
  identificando los parámetros acumuladores necesarios.
- Reconocer cuándo una función **ya es de cola** sin necesidad de modificación.
- Aplicar `@tailrec` de Scala para verificar en tiempo de compilación que la
  transformación es correcta.

## Recordatorio del patrón

Toda función de cola sigue esta plantilla:

```scala
import scala.annotation.tailrec

def funcion(params...): TipoRetorno = {

  @tailrec
  def loop(params..., acum: TipoAcum): TipoRetorno =
    ... match {
      case BASE => acum                         // devuelve el acumulado
      case REC  => loop(..., acum op elemento)  // la operación va DENTRO
    }

  loop(params..., valorInicial)  // el usuario llama sin ver el acumulador
}
```

***

# Parte 1 — Recursión de Cola sobre Naturales

> Estas funciones provienen del **Taller 1 — Recursión y Naturales**.
> Se muestra la versión lineal que ya implementaste como referencia.
> Tu tarea es completar la versión de cola.

***

> ### 🔎 Nota: `dif` ya es de cola
>
> Antes de empezar, analiza la función `dif` que implementaste:
>
> ```scala
> def dif(x: Int, y: Int): Int = (x, y) match {
>   case (_, 0) => x
>   case (0, _) => 0
>   case _      => dif(pred(x), pred(y))   // ← llamado recursivo es lo ÚLTIMO
> }
> ```
>
> El caso recursivo termina directamente con `dif(pred(x), pred(y))` — no hay
> ninguna operación pendiente envolviendo ese llamado. **`dif` ya es tail recursive.**
> No necesita transformación. `@tailrec` podría colocarse directamente sobre ella.

***

### 1) Factorial

**Versión lineal (referencia):**

```scala
def factorial(n: Int): Int = n match {
  case 0 => 1
  case _ => n * factorial(pred(n))   // * pendiente
}
```

**Versión de cola — completa el `loop`:**

```scala
def factorialRC(n: Int): Int = {

  @tailrec
  def loop(n: Int, acum: Int): Int =
    n match {
      case 0 => ???   // ¿qué devuelves cuando n llegó a 0?
      case _ => ???   // ¿cómo mueves el * al interior del argumento?
    }

  loop(n, ???)   // ¿con qué valor neutro de la multiplicación inicia acum?
}
```

> **Pista:** El acumulador guarda el producto parcial.
> Pregúntate: ¿cuál es el elemento neutro de `*`?

***

### 2) Sumatoria

**Versión lineal (referencia):**

```scala
def sumatoria(n: Int): Int = n match {
  case 0 => 0
  case _ => n + sumatoria(pred(n))   // + pendiente
}
```

**Versión de cola — completa el `loop`:**

```scala
def sumatoriaRC(n: Int): Int = {

  @tailrec
  def loop(n: Int, acum: Int): Int =
    n match {
      case 0 => ???
      case _ => ???
    }

  loop(n, ???)   // ¿cuál es el elemento neutro de +?
}
```

***

### 3) Potencia

**Versión lineal (referencia):**

```scala
def potencia(x: Int, n: Int): Int = n match {
  case 0 => 1
  case _ => x * potencia(x, pred(n))   // * pendiente
}
```

**Versión de cola — completa el `loop`:**

```scala
def potenciaRC(x: Int, n: Int): Int = {

  @tailrec
  def loop(n: Int, acum: Int): Int =
    n match {
      case 0 => ???
      case _ => ???   // x es fijo, solo cambia n y acum
    }

  loop(n, ???)
}
```

***

### 4) Suma de naturales

**Versión lineal (referencia):**

```scala
def suma(x: Int, y: Int): Int = x match {
  case 0 => y
  case _ => suc(suma(pred(x), y))   // suc(...) envuelve el llamado
}
```

**Versión de cola — completa directamente `suma` (sin `loop` necesario):**

```scala
def sumaRC(x: Int, y: Int): Int = x match {
  case 0 => y
  case _ => ???   // Pista: ¿dónde puedes "mover" el suc para que quede
                  // DENTRO de los argumentos en vez de envolviendo el llamado?
}
```

> **Pista clave:** Si `suc(suma(pred(x), y))` tiene el `suc` por fuera, piensa
> qué pasaría si en cambio escribieras `sumaRC(pred(x), suc(y))`. ¿El resultado
> final sería el mismo? ¿Por qué? Esta transformación es especialmente elegante
> porque **`y` mismo actúa como acumulador** — no se necesita un parámetro extra.

***

### 5) Producto de naturales

**Versión lineal (referencia):**

```scala
def prod(x: Int, y: Int): Int = (x, y) match {
  case (0, _) => 0
  case (_, 0) => 0
  case (_, 1) => x
  case _      => suma(x, prod(x, pred(y)))   // suma(...) pendiente
}
```

**Versión de cola — completa el `loop`:**

```scala
def prodRC(x: Int, y: Int): Int = {

  @tailrec
  def loop(y: Int, acum: Int): Int =
    (x, y) match {
      case (0, _) => ???   // si x=0, el producto total siempre es...
      case (_, 0) => ???   // si y llegó a 0, ¿qué tiene acum?
      case _      => ???   // mueve suma(acum, x) al interior del argumento
    }

  loop(y, ???)   // ¿cuál es el elemento neutro de la suma (para producto)?
}
```

> **Pista:** El acumulador acumula sumas parciales de `x`.
> Traza: `prodRC(3, 3)` debería generar
> `loop(3,0) → loop(2,3) → loop(1,6) → loop(0,9) → 9`.

***

# Parte 2 — Recursión de Cola sobre Listas

> Estas funciones provienen del **Taller de Pattern Matching**.
> Se muestra la versión lineal como referencia.

***

> ### 🔎 Nota: `buscar` y `ultimoElemento` ya son de cola
>
> **`buscar`** — si se escribe con `if-else`, el llamado recursivo es la última operación:
> ```scala
> def buscar(lista: List[Int], elem: Int): Boolean =
>   lista match {
>     case Nil     => false
>     case x :: ys => if (x == elem) true else buscar(ys, elem)  // ← ya es cola
>   }
> ```
>
> **`ultimoElemento`** — el caso recursivo termina directamente con el llamado:
> ```scala
> def ultimoElemento(lista: List[Int]): Int =
>   lista match {
>     case x :: Nil => x
>     case _ :: ys  => ultimoElemento(ys)   // ← ya es cola
>   }
> ```
>
> Ambas cumplen la condición: el llamado recursivo es lo **último** que se ejecuta.

***

### 6) Contar elementos

**Versión lineal (referencia):**

```scala
def contar(lista: List[Int]): Int =
  lista match {
    case Nil     => 0
    case _ :: ys => 1 + contar(ys)   // + pendiente
  }
```

**Versión de cola:**

```scala
def contarRC(lista: List[Int]): Int = {

  @tailrec
  def loop(lista: List[Int], acum: Int): Int =
    lista match {
      case Nil     => ???
      case _ :: ys => ???
    }

  loop(lista, ???)
}
```

***

### 7) Suma de lista

**Versión lineal (referencia):**

```scala
def sumaLista(lista: List[Int]): Int =
  lista match {
    case Nil     => 0
    case x :: ys => x + sumaLista(ys)   // + pendiente
  }
```

**Versión de cola:**

```scala
def sumaListaRC(lista: List[Int]): Int = {

  @tailrec
  def loop(lista: List[Int], acum: Int): Int =
    lista match {
      case Nil     => ???
      case x :: ys => ???
    }

  loop(lista, ???)
}
```

***

### 8) Reversar lista

**Versión lineal (referencia):**

```scala
def reversarLista(lista: List[Int]): List[Int] =
  lista match {
    case Nil     => Nil
    case x :: ys => reversarLista(ys) ::: List(x)   // ::: pendiente
  }
```

**Versión de cola:**

```scala
def reversarListaRC(lista: List[Int]): List[Int] = {

  @tailrec
  def loop(lista: List[Int], acum: List[Int]): List[Int] =
    lista match {
      case Nil     => ???
      case x :: ys => ???   // Pista: aquí sí puedes usar x :: acum sin problema.
                            // ¿Por qué no se invierte el resultado final?
    }

  loop(lista, Nil)
}
```

> **Nota:** Esta es la función donde el acumulador con `::` (prepend) funciona
> perfectamente **sin** necesitar `:::`. Reflexiona por qué: ¿qué relación hay
> entre la naturaleza de "reversar" y que el acumulador vaya al revés?

***

### 9) Eliminar último elemento

**Versión lineal (referencia):**

```scala
def eliminarUltimo(lista: List[Int]): List[Int] =
  lista match {
    case Nil      => Nil
    case _ :: Nil => Nil
    case x :: ys  => x :: eliminarUltimo(ys)   // :: pendiente
  }
```

**Versión de cola:**

```scala
def eliminarUltimoRC(lista: List[Int]): List[Int] = {

  @tailrec
  def loop(lista: List[Int], acum: List[Int]): List[Int] =
    lista match {
      case Nil      => acum
      case _ :: Nil => ???   // llegamos al último: ¿qué devuelves?
      case x :: ys  => ???   // Pista: ¿debes usar x :: acum  o  acum ::: List(x)?
                             //        ¿Por qué importa el orden aquí?
    }

  loop(lista, Nil)
}
```

> **Advertencia de orden:** A diferencia de `reversarLista`, aquí el orden
> de los elementos debe preservarse. Piensa si `x :: acum` da el orden correcto
> o lo invierte, y qué alternativa lo soluciona.

***

### 10) Concatenar palabras

**Versión lineal (referencia):**

```scala
def concatenar(xs: List[String]): String =
  xs match {
    case Nil     => ""
    case x :: ys => x + " " + concatenar(ys)   // + pendiente
  }
```

**Versión de cola:**

```scala
def concatenarRC(xs: List[String]): String = {

  @tailrec
  def loop(xs: List[String], acum: String): String =
    xs match {
      case Nil     => ???
      case x :: ys => ???   // Pista: ¿cómo concatenas x al acumulador
                            //        sin añadir un espacio extra al inicio?
                            //        Considera: if (acum.isEmpty) x else acum + " " + x
    }

  loop(xs, "")
}
```

***

# Parte 3 — Nuevos Ejercicios

> Funciones nuevas para practicar recursión de cola.
> Se entrega la versión lineal como referencia y el esqueleto a completar.

***

### 11) Fibonacci

La sucesión de Fibonacci se define como:

$$
F(n) =
\begin{cases}
0 & \text{si } n = 0 \\
1 & \text{si } n = 1 \\
F(n-1) + F(n-2) & \text{si } n > 1
\end{cases}
$$

**Versión con recursión de árbol (referencia) — ⚠️ muy ineficiente:**

```scala
def fibonacci(n: Int): Int = n match {
  case 0 => 0
  case 1 => 1
  case _ => fibonacci(n - 1) + fibonacci(n - 2)   // DOS llamados recursivos
}
```

> Esta versión **no es lineal ni de cola** — es **recursión de árbol**: cada
> llamado genera dos ramas, dando complejidad O(2^n). Para `fibonacci(50)`,
> esto representa más de mil billones de llamados.

**Versión de cola — requiere DOS acumuladores:**

```scala
def fibonacciRC(n: Int): Int = {

  @tailrec
  def loop(n: Int, a: Int, b: Int): Int =
    n match {
      case 0 => ???   // a representa F(0) acumulado
      case _ => ???   // ¿cómo avanzas a y b en cada paso?
                      // Pista: si a=F(k) y b=F(k+1), ¿cómo obtienes F(k+2)?
    }

  loop(n, 0, 1)   // a=F(0)=0, b=F(1)=1
}
```

> **Pista de los dos acumuladores:** Piensa en una "ventana deslizante" de dos
> valores consecutivos de la sucesión: `(a, b)` representa `(F(k), F(k+1))`.
> En cada paso, la ventana avanza: el nuevo par es `(F(k+1), F(k+2))`.
> Expresa `F(k+1)` y `F(k+2)` en términos de `a` y `b`.

***

### 12) Máximo de una lista

Implementa una función que devuelva el elemento más grande de una lista.
Puedes asumir que la lista tiene al menos un elemento.

**Versión lineal (referencia):**

```scala
def maximoLista(lista: List[Int]): Int =
  lista match {
    case x :: Nil => x
    case x :: ys  =>
      val m = maximoLista(ys)
      if (x > m) x else m
  }
```

**Versión de cola:**

```scala
def maximoListaRC(lista: List[Int]): Int = {

  @tailrec
  def loop(lista: List[Int], acum: Int): Int =
    lista match {
      case Nil     => ???
      case x :: ys => ???   // ¿cómo actualizas acum con el posible nuevo máximo?
    }

  loop(lista.tail, lista.head)   // inicia acum con el primer elemento
}
```

***

### 13) Filtrar elementos de una lista

Implementa una función que devuelva solo los elementos que cumplen un predicado `p`.

**Versión lineal (referencia):**

```scala
def filtrar(lista: List[Int], p: Int => Boolean): List[Int] =
  lista match {
    case Nil     => Nil
    case x :: ys =>
      if (p(x)) x :: filtrar(ys, p)   // :: pendiente (si cumple)
      else filtrar(ys, p)             // ya es cola (si no cumple)
  }
```

**Versión de cola:**

```scala
def filtrarRC(lista: List[Int], p: Int => Boolean): List[Int] = {

  @tailrec
  def loop(lista: List[Int], acum: List[Int]): List[Int] =
    lista match {
      case Nil     => ???
      case x :: ys =>
        if (p(x)) ???   // x cumple el predicado: ¿cómo lo agregas a acum
                        //                         sin invertir el orden?
        else     ???    // x no cumple: continúa sin modificar acum
    }

  loop(lista, Nil)
}
```

> **Advertencia de orden:** Mismo problema que `eliminarUltimo`. Si usas
> `x :: acum` para agregar elementos que cumplen el predicado, la lista
> resultante quedará invertida. ¿Qué alternativa usarías para preservar
> el orden original?
```
