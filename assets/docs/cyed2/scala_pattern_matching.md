# Pattern Matching en Scala 

Esta guía explica **pattern matching en Scala** paso a paso, con
ejemplos claros, relación con **recursividad**, diagramas conceptuales
de listas y ejercicios para practicar.

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

# 7. Ejemplo clásico con recursividad: suma de una lista

``` scala
def suma(xs: List[Int]): Int =
  xs match {
    case Nil => 0
    case x :: ys => x + suma(ys)
  }

@main def runEjemplo3() =
  println(suma(List(1,2,3,4)))
```

Evaluación conceptual:

    suma(List(1,2,3,4))
    1 + suma(List(2,3,4))
    1 + 2 + suma(List(3,4))
    1 + 2 + 3 + suma(List(4))
    1 + 2 + 3 + 4 + suma(Nil)
    1 + 2 + 3 + 4 + 0

Resultado:

    10

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

# 9. Encontrar el último elemento de una lista

``` scala
def ultimo(xs: List[Int]): Int =
  xs match {
    case List(x) => x
    case _ :: ys => ultimo(ys)
  }

@main def runEjemplo5() =
  println(ultimo(List(3,7,9,10)))
```

Explicación:

-   `List(x)` coincide con lista de **un solo elemento**
-   `_ :: ys` elimina el primero y continúa

------------------------------------------------------------------------

# 10. Obtener todos los elementos excepto el último (`init`)

``` scala
def init(xs: List[Int]): List[Int] =
  xs match {
    case Nil => Nil
    case List(x) => Nil
    case x :: ys => x :: init(ys)
  }

@main def runEjemplo6() =
  println(init(List(1,2,3,4)))
```

Resultado:

    List(1,2,3)

------------------------------------------------------------------------

# 11. Calcular la longitud de una lista

``` scala
def longitud(xs: List[Int]): Int =
  xs match {
    case Nil => 0
    case _ :: ys => 1 + longitud(ys)
  }

@main def runEjemplo7() =
  println(longitud(List(10,20,30,40)))
```

------------------------------------------------------------------------

# 12. Buscar un elemento en una lista

``` scala
def contiene(xs: List[Int], valor: Int): Boolean =
  xs match {
    case Nil => false
    case x :: ys =>
      if x == valor then true
      else contiene(ys, valor)
  }

@main def runEjemplo8() =
  println(contiene(List(3,7,9,11),7))
  println(contiene(List(3,7,9,11),5))
```

------------------------------------------------------------------------

# 13. Resumen de patrones comunes

  Patrón       Significado
  ------------ ----------------------
  `Nil`        lista vacía
  `x :: ys`    cabeza + cola
  `_ :: ys`    ignorar cabeza
  `x :: Nil`   lista de un elemento
  `List(x)`    lista de un elemento
  `_`          comodín

------------------------------------------------------------------------

# 14. Ejercicios propuestos

### Ejercicio 1

Implementa una función que **cuente cuántos elementos tiene una lista**.

``` scala
def contar(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 2

Implementa una función que **sume todos los números de una lista**.

``` scala
def sumaLista(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 3

Implementa una función que **devuelva el último elemento de una lista**.

``` scala
def ultimoElemento(xs: List[Int]): Int =
  ???
```

------------------------------------------------------------------------

### Ejercicio 4

Implementa una función que **elimine el primer elemento de una lista**.

``` scala
def tailLista(xs: List[Int]): List[Int] =
  ???
```

------------------------------------------------------------------------

### Ejercicio 5 (más avanzado)

Implementa una función que **invierta una lista**.

``` scala
def reverse(xs: List[Int]): List[Int] =
  ???
```

------------------------------------------------------------------------

# 15. Idea clave

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
