```markdown
# Computación y Estructuras Discretas 2
## Programación funcional — Taller 1 (Funciones Recursivas)

***

# 1. Recursión y naturales

## Funciones base: `suc` y `pred`

```scala
def suc(n: Int): Int = n + 1
def pred(n: Int): Int = n - 1
```

***

## 1.1. Funciones

### 1) Potencia

```scala
def potencia(x: Int, n: Int): Int = n match {
  case 0 => 1
  case _ => x * potencia(x, pred(n))
}
```

***

### 2) Factorial

```scala
def factorial(n: Int): Int = n match {
  case 0 => 1
  case _ => n * factorial(pred(n))
}
```

***

### 3) Sumatoria (acumulado)

```scala
def sumatoria(n: Int): Int = n match {
  case 0 => 0
  case _ => n + sumatoria(pred(n))
}
```

***

### 4) Suma de naturales

```scala
def suma(x: Int, y: Int): Int = x match {
  case 0 => y
  case _ => suc(suma(pred(x), y))
}
```

***

### 5) Diferencia de naturales

> Si `x < y`, se devuelve `0` (resultado mínimo en naturales).

```scala
def dif(x: Int, y: Int): Int = (x, y) match {
  case (_, 0) => x
  case (0, _) => 0
  case _      => dif(pred(x), pred(y))
}
```

***

### 6) Producto de naturales

```scala
def prod(x: Int, y: Int): Int = (x, y) match {
  case (0, _) => 0
  case (_, 0) => 0
  case (_, 1) => x
  case _      => suma(x, prod(x, pred(y)))
}
```
```
