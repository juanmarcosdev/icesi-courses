
# Recursión de Cola (*Tail Recursion*) en Scala

***

## El problema: procesos pendientes en el stack

Cuando se escribe una función recursiva **lineal**, cada llamada genera un **marco de pila** (*stack frame*) que queda pendiente de resolución hasta que se alcanza el caso base. La JVM apila estos marcos uno sobre otro, y si la recursión es suficientemente profunda, se produce un **`StackOverflowError`**.

Veamos el patrón típico de la recursión lineal con la suma de una lista:

```scala
def sumaLista(lista: List[Int]): Int =
  lista match {
    case Nil       => 0
    case x :: xs   => x + sumaLista(xs)   // ← operando + llamado recursivo
  }
```

Si la lista tiene 100 000 elementos, Scala apilará 100 000 marcos en la JVM esperando resolver los `+` pendientes. El problema es la estructura del caso recursivo:

```
operando  operador  llamado-recursivo
   x         +       sumaLista(xs)
```

El llamado recursivo **no es lo último** que se ejecuta; primero hay que resolver la recursión y luego aplicar el `+`. Eso obliga a mantener cada frame en memoria.

***

## La solución: Recursión de Cola

La **recursión de cola** (*tail recursion*) garantiza que el llamado recursivo sea **la última operación** en ejecutarse. Para lograr esto, se introduce un **parámetro acumulador** que va "cargando" el resultado parcial durante el descenso, en lugar de esperar el ascenso.

El cambio de patrón es:

| Estilo              | Estructura del caso recursivo                          |
|---------------------|--------------------------------------------------------|
| Recursión lineal    | `operador  operando  llamado-recursivo`                |
| Recursión de cola   | `llamado-recursivo(…, acum + operando)`                |

En la recursión de cola, **la operación ocurre dentro de los argumentos** del llamado, no fuera de él. Esto le permite a la JVM (a través del compilador de Scala) **reutilizar el mismo stack frame** en lugar de crear uno nuevo, transformando la recursión en un bucle iterativo internamente.

### `@tailrec`: validación en tiempo de compilación

Scala ofrece la anotación `@tailrec` del paquete `scala.annotation`. Su función es **verificar en tiempo de compilación** que la función anotada es realmente de cola. Si no lo es, el compilador lanza un **error**, no una advertencia.

```scala
import scala.annotation.tailrec

@tailrec
def miFuncion(...): ... = ...
```

> **Importante:** `@tailrec` no *convierte* la función en tail-recursive; tú debes escribirla correctamente. La anotación simplemente **certifica** que lo es y activa la optimización del compilador (eliminación del stack frame extra).

***

## Ejemplo: Suma de Cuadrados

El objetivo es tomar una lista de enteros, elevar cada elemento al cuadrado y sumarlos todos.

### Versión con Recursión Lineal

```scala
def sumaCuadradosLineal(lista: List[Int]): Int =
  lista match {
    case Nil     => 0
    case x :: xs => (x * x) + sumaCuadradosLineal(xs)
  }
```

**Traza para `List(1, 2, 3)`:**

```
(1*1) + sumaCuadradosLineal(List(2,3))
(1*1) + (2*2) + sumaCuadradosLineal(List(3))
(1*1) + (2*2) + (3*3) + sumaCuadradosLineal(Nil)
(1*1) + (2*2) + (3*3) + 0
  1   +   4   +   9   + 0  =  14
```

Cada `+` queda **pendiente** en el stack hasta que se resuelve el caso base. Para listas grandes esto explota.

***

### Versión con Recursión de Cola

Se agrega un parámetro `acum: Int` que inicia en `0`. La operación `(x * x)` se traslada al **interior del argumento** del llamado recursivo.

```scala
import scala.annotation.tailrec

def sumaCuadrados(lista: List[Int]): Int = {

  @tailrec
  def loop(lista: List[Int], acum: Int): Int =
    lista match {
      case Nil     => acum               //caso base: devuelve el acumulado total
      case x :: xs => loop(xs, acum + (x * x))  //operación dentro del argumento
    }

  loop(lista, 0)  // se invoca con el acumulador en 0
}
```

**Traza para `List(1, 2, 3)`:**

```
loop(List(1,2,3), 0)
loop(List(2,3),   0 + 1)
loop(List(2,3),   1)
loop(List(3),     1 + 4)
loop(List(3),      5)
loop(Nil,         5 + 9)
loop(Nil,          14)
14   ← caso base, devuelve el acumulador
```

No hay operaciones pendientes. El compilador convierte esto en un **bucle interno** sin consumir stack adicional. La función `loop` está correctamente anotada con `@tailrec`, y si se rompiera la propiedad de cola, el compilador lo detectaría.

> **Nota del patrón:** Si el acumulador inicia en `0` y la lista resulta vacía desde el principio, el resultado es `0`, que es matemáticamente correcto (la suma de una lista vacía de cuadrados es cero). El caso base siempre es coherente con el valor inicial del acumulador.

***

## Recursión de Cola sobre Estructuras: Listas

La recursión de cola no aplica solo a operaciones numéricas. También puede aplicarse a **recursión estructural** sobre listas. Sin embargo, aquí aparece un desafío importante: **no todas las operaciones estructurales son conmutativas**.

Con la suma numérica se tenía que:
```
a + b  =  b + a   ✓  (conmutativa)
```
Por eso el orden en que se acumula no importaba. Pero con la **construcción de listas** usando `::` (cons), la operación **no es conmutativa**:
```
x :: xs  ≠  xs :: x   (no conmutativa — :: solo prepende al inicio)
```
Hay que ser muy cuidadoso con esto.

***

### Ejemplo: `eliminarUltimo`

La función elimina el último elemento de una lista.

#### Versión con Recursión Lineal

```scala
def eliminarUltimo(lista: List[Int]): List[Int] =
  lista match {
    case Nil      => Nil
    case x :: Nil => Nil                      // último elemento: se descarta
    case x :: xs  => x :: eliminarUltimo(xs)  // se reconstruye la lista al volver
  }
```

Esta versión reconstruye la lista **en el ascenso** (al volver del caso base hacia atrás), lo que acumula frames en el stack.

***

#### Intento Ingenuo con Recursión de Cola (⚠️ con error de orden)

Se agrega `listaAux: List[Int]` como acumulador. Intuitivamente se prepende cada elemento:

```scala
// ⚠️ ESTO INVIERTE LA LISTA — NO ES LA SOLUCIÓN CORRECTA
def eliminarUltimoRColaMAL(lista: List[Int], listaAux: List[Int]): List[Int] =
  lista match {
    case Nil      => listaAux
    case x :: Nil => listaAux
    case x :: xs  => eliminarUltimoRColaMAL(xs, x :: listaAux)  // prepende → invierte
  }
```

**Traza para `List(1, 2, 3, 4)`:**

```
eliminarUltimoRColaMAL(List(1,2,3,4), Nil)
eliminarUltimoRColaMAL(List(2,3,4),   1 :: Nil)      →  List(1)
eliminarUltimoRColaMAL(List(3,4),     2 :: List(1))  →  List(2,1)
eliminarUltimoRColaMAL(List(4),       3 :: List(2,1))→  List(3,2,1)
List(3,2,1)   ← ¡Resultado invertido! Se esperaba List(1,2,3)
```

El problema es que `::` siempre prepende al **inicio**, por lo que construir incrementalmente con `x :: listaAux` da como resultado la lista en orden inverso.

***

#### Versión Correcta con Recursión de Cola (usando `:::`)

Para preservar el orden original, se usa **append** (`:::`) en lugar de prepend (`::`) al acumulador:

```scala
import scala.annotation.tailrec

def eliminarUltimo(lista: List[Int]): List[Int] = {

  @tailrec
  def loop(lista: List[Int], listaAux: List[Int]): List[Int] =
    lista match {
      case Nil      => listaAux
      case x :: Nil => listaAux                          //descarta el último
      case x :: xs  => loop(xs, listaAux ::: List(x))   //agrega al final del acumulador
    }

  loop(lista, Nil)
}
```

**¿Por qué funciona `listaAux ::: List(x)`?**

Porque se inicia con `Nil` como acumulador, y al concatenar al final se preserva el orden:

```
Nil ::: List(1)        =  List(1)
List(1) ::: List(2)    =  List(1, 2)
List(1,2) ::: List(3)  =  List(1, 2, 3)
```

**Traza para `List(1, 2, 3, 4)`:**

```
loop(List(1,2,3,4), Nil)
loop(List(2,3,4),   Nil ::: List(1))        →  loop(List(2,3,4), List(1))
loop(List(3,4),     List(1) ::: List(2))    →  loop(List(3,4),   List(1,2))
loop(List(4),       List(1,2) ::: List(3))  →  loop(List(4),     List(1,2,3))
List(1,2,3)   ← caso base x :: Nil, devuelve el acumulador ✓
```

***

## Resumen del Patrón General

```
Recursión Lineal:
  caso base  →  valor_neutro
  caso rec   →  operación(elemento, llamado_recursivo(resto))

Recursión de Cola:
  caso base  →  acumulador
  caso rec   →  llamado_recursivo(resto, operación(acumulador, elemento))
                                         ↑
                              la operación va DENTRO del argumento
```

### Consideraciones clave al trabajar con estructuras

- **Operaciones conmutativas** (ej: `+`, `*`): el orden de acumulación no importa.
- **Operaciones no conmutativas** (ej: construcción de listas con `::`): hay que usar `acum ::: List(x)` o estrategias similares.
- **La función pública** siempre delega en una función auxiliar interna (`loop` o `helper`) anotada con `@tailrec`, para que el usuario no tenga que pasar el acumulador manualmente.
