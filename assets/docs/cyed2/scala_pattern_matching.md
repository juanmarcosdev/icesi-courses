# Pattern Matching en Scala 

Esta guía explica **pattern matching en Scala** paso a paso, con
ejemplos claros, relación con **recursividad** y ejercicios para practicar.

El objetivo es que puedas **copiar los ejemplos directamente en un
archivo `Main.scala`** y ejecutarlos.

------------------------------------------------------------------------

# 1. ¿Qué es Pattern Matching?

El **pattern matching** permite analizar la **estructura de un valor** y
ejecutar código dependiendo de su forma.

Estructura básica:

``` scala
valor match {
  case patron1 => expresion1
  case patron2 => expresion2
  case patron3 => expresion3
}
```

Scala evalúa los patrones **de arriba hacia abajo**.\
El primer patrón que coincide se ejecuta.

Ejemplo simple:

``` scala
def describir(x: Int): String =
  x match {
    case 0 => "cero"
    case 1 => "uno"
    case _ => "otro número"
  }

@main def runEjemplo1() =
  println(describir(0))
  println(describir(5))
```

Salida esperada:

    cero
    otro número

------------------------------------------------------------------------

# 2. El comodín `_`

El símbolo `_` significa:

> "coincidir con cualquier valor, pero ignorarlo"

Ejemplo:

``` scala
def esCero(x: Int): Boolean =
  x match {
    case 0 => true
    case _ => false
  }
```

Aquí `_` representa **cualquier número distinto de 0**.

------------------------------------------------------------------------

# 3. Pattern Matching con listas

En Scala, una lista puede verse como una estructura recursiva.

Por ejemplo:

    List(4,7,9)

equivale conceptualmente a:

    4 :: List(7,9)

y luego:

    7 :: List(9)

y finalmente:

    9 :: Nil

Donde

    Nil

representa **la lista vacía**.

------------------------------------------------------------------------

# 4. Diagramas mentales de listas

Lista:

    List(1,2,3,4)

puede visualizarse así:

    1 :: 2 :: 3 :: 4 :: Nil

o como descomposición:

    x :: ys

    x  = 1
    ys = List(2,3,4)

Luego:

    2 :: List(3,4)

y así sucesivamente.

Esto explica por qué **pattern matching y recursividad funcionan tan
bien con listas**.

------------------------------------------------------------------------

# 5. El patrón `Nil`

`Nil` representa **una lista vacía**.

Ejemplo:

``` scala
def esVacia(xs: List[Int]): Boolean =
  xs match {
    case Nil => true
    case _ => false
  }

@main def runEjemplo2() =
  println(esVacia(List()))
  println(esVacia(List(1,2)))
```

------------------------------------------------------------------------

# 6. El patrón `x :: ys`

El patrón

    x :: ys

significa:

  variable   significado
  ---------- -------------------
  x          primer elemento
  ys         resto de la lista

Ejemplo:

    List(5,8,10)

se descompone como:

    x = 5
    ys = List(8,10)

Este es un **patrón de constructor**, porque usa el constructor de
listas `::`.

------------------------------------------------------------------------

# 7. Ejemplo clásico con recursividad: construir un String a partir de una lista

Supongamos que tenemos una lista de palabras y queremos **construir un solo String donde cada palabra esté separada por un espacio**.

```scala
def concatenar(xs: List[String]): String =
  xs match {
    case Nil => ""
    case x :: ys => x + " " + concatenar(ys)
  }

@main def runEjemplo3() =
  println(concatenar(List("Scala","es","muy","potente")))
```

Evaluación conceptual:

    concatenar(List("Scala","es","muy","potente"))

    "Scala " + concatenar(List("es","muy","potente"))
    "Scala " + "es " + concatenar(List("muy","potente"))
    "Scala " + "es " + "muy " + concatenar(List("potente"))
    "Scala " + "es " + "muy " + "potente " + concatenar(Nil)
    "Scala " + "es " + "muy " + "potente " + ""

Resultado:

    "Scala es muy potente "

------------------------------------------------------------------------

# 8. El patrón `_ :: ys`

El patrón

    _ :: ys

significa:

-   ignorar el primer elemento
-   conservar el resto

Ejemplo:

``` scala
def quitarPrimero(xs: List[Int]): List[Int] =
  xs match {
    case Nil => Nil
    case _ :: ys => ys
  }

@main def runEjemplo4() =
  println(quitarPrimero(List(5,6,7)))
```

Resultado:

    List(6,7)

------------------------------------------------------------------------


# 9. Resumen de patrones comunes

| Patrón   | Significado            |
|----------|------------------------|
| `Nil`    | lista vacía            |
| `x :: ys`| cabeza + cola          |
| `_ :: ys`| ignorar cabeza         |
| `x :: Nil`| lista de un elemento  |
| `List(x)`| lista de un elemento   |
| `_`      | comodín                |

------------------------------------------------------------------------

# 10. Ejercicios propuestos


### Ejercicio 1

Implementa una función que **cuente cuántos elementos tiene una lista**.

```scala
def contar(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 2

Implementa una función que **sume todos los números de una lista**.

```scala
def sumaLista(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 3

Implementa una función que **busque un elemento en una lista y devuelva `true` si existe y `false` en caso contrario**.

```scala
def buscar(xs: List[Int], v: Int): Boolean =
  ???
```

------------------------------------------------------------------------

### Ejercicio 4

Implementa una función que **devuelva el último elemento de una lista**.

```scala
def ultimoElemento(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 5

Implementa una función que **elimine el último elemento de una lista**.

```scala
def eliminarUltimo(xs: List[Int]): List[Int] =
  ???
```

------------------------------------------------------------------------

### Ejercicio 6

Implementa una función que **invierta una lista**.

```scala
def reversarLista(xs: List[Int]): List[Int] =
  ???
```

------------------------------------------------------------------------

# 11. Idea clave

Las listas en Scala son **estructuras recursivas**:

    Lista = Nil
    Lista = x :: Lista

Por eso las funciones sobre listas suelen escribirse así:

``` scala
def funcion(xs: List[Int]): Int =
  xs match {
    case Nil => ...
    case x :: ys => ...
  }
```

Esto refleja directamente **la estructura inductiva de las listas**.

Comprender este patrón es fundamental para trabajar con:

-   programación funcional
-   estructuras recursivas
-   colecciones en Scala
