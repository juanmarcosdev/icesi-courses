# Soluciones de los ejercicios de Pattern Matching y Recursividad Estructural

### Ejercicio 1

Contar cuántos elementos tiene una lista.

```scala
def contar(lista: List[Int]): Int =
  lista match {
    case Nil => 0
    case x :: ys => 1 + contar(ys)
  }
```

---

### Ejercicio 2

Sumar todos los números de una lista.

```scala
def sumaLista(lista: List[Int]): Int =
  lista match {
    case Nil => 0
    case x :: ys => x + sumaLista(ys)
  }
```

---

### Ejercicio 3

Buscar un elemento en una lista y devolver `true` si existe y `false` en caso contrario.

```scala
def buscar(lista: List[Int], elem: Int): Boolean =
  lista match {
    case Nil => false
    case x :: ys =>
      if (x == elem) true
      else buscar(ys, elem)
  }
```

---

### Ejercicio 4

Devolver el último elemento de una lista.

```scala
def ultimoElemento(lista: List[Int]): Int =
  lista match {
    case x :: Nil => x
    case _ :: ys => ultimoElemento(ys)
  }
```

---

### Ejercicio 5

Eliminar el último elemento de una lista.

```scala
def eliminarUltimo(lista: List[Int]): List[Int] =
  lista match {
    case Nil => Nil
    case x :: Nil => Nil
    case x :: ys => x :: eliminarUltimo(ys)
  }
```

---

### Ejercicio 6

Invertir una lista.

```scala
def reversa(lista: List[Int]): List[Int] =
  lista match {
    case Nil => Nil
    case x :: Nil => List(x)
    case _ :: ys => ultimoElemento(lista) :: reversa(eliminarUltimo(lista))
  }
```