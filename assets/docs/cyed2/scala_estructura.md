# Estructura de un Programa en Scala

En esta sección revisamos la estructura básica de un programa en Scala y su comparación con Java.

---

## 1️⃣ El `package`

Al igual que en Java, los programas en Scala suelen declarar un **package** al inicio del archivo:

```scala
package com.mycompany.app
```

El `package` permite organizar el código, agrupar clases y objetos relacionados y evitar conflictos de nombres.

---

## 2️⃣ El `object Main`

En Java, un programa típico inicia con:

```java
public class Main {
    public static void main(String[] args) {
        ...
    }
}
```

En Scala, en lugar de usar `class Main`, normalmente usamos:

```scala
object Main {
    def main(args: Array[String]): Unit = {
        println("¡Hola, Scala!")
    }
}
```

### 🔎 Diferencias clave con Java

- Scala usa `object` en lugar de `class` para el punto de entrada.
- `object` define un **singleton** (una única instancia).
- No se necesitan las palabras clave `public` ni `static`.
- El tipo `Unit` es equivalente a `void` en Java.

---

## 3️⃣ El método `main`

Dentro del `object Main`, definimos el método principal:

```scala
def main(args: Array[String]): Unit = {
    println("Programa iniciado")
}
```

### Explicación:

- `def` → define una función.
- `args: Array[String]` → argumentos por línea de comandos.
- `: Unit` → tipo de retorno (similar a `void`).
- `=` → separa la firma del cuerpo del método.

---

## 4️⃣ Funciones adicionales en el mismo archivo

En Scala se pueden definir otras funciones dentro del mismo `object`, al mismo nivel que `main`.

```scala
object Main {

    def main(args: Array[String]): Unit = {
        val resultado = cuadrado(5)
        println(resultado)
    }

    def cuadrado(x: Int): Int = {
        x * x
    }
}
```

Aquí:

- `cuadrado` está definido al mismo nivel que `main`.
- Puede llamarse directamente desde `main`.
- No necesitamos una clase adicional como en Java.

---

## 5️⃣ El paquete `scala.math`

Scala incluye utilidades matemáticas en el paquete:

```scala
scala.math
```

Una función muy utilizada es:

```scala
scala.math.pow(base, exponente)
```

Sirve para calcular potencias.

### Ejemplo:

```scala
object Main {

    def main(args: Array[String]): Unit = {

        val resultado = scala.math.pow(2, 3)
        println(resultado)  // 8.0
    }
}
```

⚠ Importante:

- `scala.math.pow` devuelve un **Double**.
- Incluso si los argumentos son enteros.

Por ejemplo:

```scala
val resultado = scala.math.pow(2, 3)
println(resultado)          // 8.0
println(resultado.getClass) // Double
```

---

## 6️⃣ Convertir de `Double` a `Int`

Si se necesita un entero, se puede convertir usando `.toInt`:

```scala
val resultado: Int = scala.math.pow(2, 3).toInt
println(resultado)  // 8
```

⚠ Atención:

- `.toInt` elimina la parte decimal (trunca).
- No redondea.

Ejemplo:

```scala
val x = scala.math.pow(2, 3)      // 8.0
val y = scala.math.pow(2, 3.5)    // 11.313...

println(y.toInt)  // 11 (se elimina lo que hay despues de la coma)
```

---

## Ejemplo completo

```scala
package com.example.app

object Main {

    def main(args: Array[String]): Unit = {

        val base = 3
        val exponente = 4

        val potencia: Int = scala.math.pow(base, exponente).toInt

        println(s"$base^$exponente = $potencia")
    }

    def multiplicar(a: Int, b: Int): Int = {
        a * b
    }
}
```

---
