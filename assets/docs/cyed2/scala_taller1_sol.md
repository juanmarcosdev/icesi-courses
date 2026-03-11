```markdown
# Computación y Estructuras Discretas 2
## Programación funcional — Taller 1 (Solución: Funciones Recursivas)

## Objetivos

- Diseñar e implementar programas funcionales puros con estructuras de datos inmutables utilizando recursión, reconocimiento de patrones, mecanismos de encapsulación, funciones de alto orden e iteradores para resolver problemas de programación.
- Aplicar conceptos fundamentales de la programación funcional, usando un lenguaje adecuado como **Scala**, para analizar un problema, modelar, diseñar y desarrollar su solución.

## Antes de empezar

- El taller debe ser desarrollado de forma **individual**.

***

# 1. Recursión y naturales

## Definición

- 0 ∈ ℤ⁺ (cero es un entero positivo).
- n + 1 ∈ ℤ⁺, si n ∈ ℤ⁺.

## Funciones base

- sucesor(n) = n + 1, para todo n ∈ ℤ⁺.
- predecesor(n) = n − 1, para todo n ∈ ℤ⁺ excepto 0.

**Solución en Scala:**

~~~scala
def suc(n: Int): Int = n + 1
def pred(n: Int): Int = n - 1
~~~

> **Nota:** Se asume como precondición que `pred(n)` solo se invoca cuando `n > 0`.

***

## 1.1. Funciones

***

### 1) Potencia

Definición recursiva:

- Si n = 0  →  x^n = 1
- Si n > 0  →  x^n = x * x^pred(n)

**Implementación en Scala:**

~~~scala
def potencia(x: Int, n: Int): Int = n match
  case 0 => 1
  case _ => x * potencia(x, pred(n))
~~~

**Ejemplos de uso:**

~~~scala
println(potencia(2, 0))  // 1
println(potencia(2, 3))  // 8
println(potencia(5, 4))  // 625
~~~

***

### 2) Factorial

Definición recursiva:

- Si n = 0  →  n! = 1
- Si n > 0  →  n! = n * pred(n)!

**Implementación en Scala:**

~~~scala
def factorial(n: Int): Int = n match
  case 0 => 1
  case _ => n * factorial(pred(n))
~~~

**Ejemplos de uso:**

~~~scala
println(factorial(0))  // 1
println(factorial(1))  // 1
println(factorial(5))  // 120
~~~

***

### 3) Sumatoria (acumulado)

Definición recursiva:

- Si n = 0  →  Σ(n) = 0
- Si n > 0  →  Σ(n) = n + Σ(pred(n))

**Implementación en Scala:**

~~~scala
def sumatoria(n: Int): Int = n match
  case 0 => 0
  case _ => n + sumatoria(pred(n))
~~~

**Ejemplos de uso:**

~~~scala
println(sumatoria(0))   // 0
println(sumatoria(1))   // 1
println(sumatoria(4))   // 10
println(sumatoria(10))  // 55
~~~

***

### 4) Suma de naturales

Definición recursiva:

- Si x = 0  →  suma(x, y) = y
- Si x > 0  →  suma(x, y) = suc(suma(pred(x), y))

**Implementación en Scala:**

~~~scala
def suma(x: Int, y: Int): Int = x match
  case 0 => y
  case _ => suc(suma(pred(x), y))
~~~

**Ejemplos de uso:**

~~~scala
println(suma(0, 5))   // 5
println(suma(3, 4))   // 7
println(suma(10, 2))  // 12
~~~

***

### 5) Diferencia de naturales

Definición recursiva propuesta:

- Si x = 0           →  dif(x, y) = 0
- Si y = 0           →  dif(x, y) = x
- Si x > 0 y y > 0  →  dif(x, y) = dif(pred(x), pred(y))

> Si x < y, el resultado es 0 (diferencia truncada en naturales).

**Implementación en Scala:**

~~~scala
def dif(x: Int, y: Int): Int = (x, y) match
  case (0, _) => 0
  case (_, 0) => x
  case _      => dif(pred(x), pred(y))
~~~

**Ejemplos de uso:**

~~~scala
println(dif(5, 3))   // 2
println(dif(3, 3))   // 0
println(dif(2, 5))   // 0
println(dif(10, 4))  // 6
~~~

***

### 6) Producto de naturales

Definición recursiva sugerida:

- Si x = 0 o y = 0  →  prod(x, y) = 0
- Si y = 1          →  prod(x, y) = x
- Si y > 1          →  prod(x, y) = suma(x, prod(x, pred(y)))

**Implementación en Scala:**

~~~scala
def prod(x: Int, y: Int): Int = (x, y) match
  case (0, _) => 0
  case (_, 0) => 0
  case (_, 1) => x
  case _      => suma(x, prod(x, pred(y)))
~~~

**Ejemplos de uso:**

~~~scala
println(prod(0, 5))  // 0
println(prod(3, 1))  // 3
println(prod(4, 3))  // 12
println(prod(7, 8))  // 56
~~~

***

# Programa completo en Scala

~~~scala
object TallerRecursividad:

  def suc(n: Int): Int = n + 1

  def pred(n: Int): Int = n - 1

  def potencia(x: Int, n: Int): Int = n match
    case 0 => 1
    case _ => x * potencia(x, pred(n))

  def factorial(n: Int): Int = n match
    case 0 => 1
    case _ => n * factorial(pred(n))

  def sumatoria(n: Int): Int = n match
    case 0 => 0
    case _ => n + sumatoria(pred(n))

  def suma(x: Int, y: Int): Int = x match
    case 0 => y
    case _ => suc(suma(pred(x), y))

  def dif(x: Int, y: Int): Int = (x, y) match
    case (0, _) => 0
    case (_, 0) => x
    case _      => dif(pred(x), pred(y))

  def prod(x: Int, y: Int): Int = (x, y) match
    case (0, _) => 0
    case (_, 0) => 0
    case (_, 1) => x
    case _      => suma(x, prod(x, pred(y)))

  @main def run(): Unit =
    println("=== Pruebas del taller ===")
    println(s"potencia(2, 5)  = ${potencia(2, 5)}")
    println(s"factorial(5)    = ${factorial(5)}")
    println(s"sumatoria(10)   = ${sumatoria(10)}")
    println(s"suma(8, 7)      = ${suma(8, 7)}")
    println(s"dif(9, 4)       = ${dif(9, 4)}")
    println(s"prod(6, 4)      = ${prod(6, 4)}")
~~~

***

# Comentarios finales

- Todas las funciones fueron desarrolladas usando **recursión directa**.
- Se usó **reconocimiento de patrones** con `match` en lugar de `if/else`.
- No se emplearon variables mutables ni estructuras imperativas.
- Las funciones `suma`, `dif` y `prod` se construyen a partir de `suc` y `pred`,
  siguiendo el espíritu de la definición inductiva de los naturales.
```
