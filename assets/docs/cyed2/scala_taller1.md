# Computación y Estructuras Discretas 2  
## Programación funcional — Taller 1 (Funciones Recursivas)


## Objetivos

- Diseñar e implementar programas funcionales puros con estructuras de datos inmutables utilizando recursión, reconocimiento de patrones, mecanismos de encapsulación, funciones de alto orden e iteradores para resolver problemas de programación.  
- Aplicar conceptos fundamentales de la programación funcional, usando un lenguaje adecuado como **Scala**, para analizar un problema, modelar, diseñar y desarrollar su solución.  

## Antes de empezar

- El taller debe ser desarrollado de forma **individual**.

---

# 1. Recursión y naturales

A continuación se presentan unas definiciones sobre los números enteros positivos.

## Definición

- \(0 \in \mathbb{Z}^+\) (cero es un entero positivo).
- \(n + 1 \in \mathbb{Z}^+\), si \(n \in \mathbb{Z}^+\).

## Funciones base

- \(\text{sucesor}(n) = n + 1\), para todo \(n \in \mathbb{Z}^+\).
- \(\text{predecesor}(n) = n - 1\), para todo \(n \in \mathbb{Z}^+\) excepto \(0\).

**Actividad:** Desarrolle en Scala las funciones `suc` y `pred` (sucesor y predecesor) y utilícelas para implementar las funciones que corresponden a las definiciones recursivas de la siguiente sección.

---

## 1.1. Funciones

A continuación encontrará unas definiciones recursivas. Para cada una de ellas, desarrolle una o más funciones en Scala usando la IDE o entorno de programación de su preferencia.

> Nota: Las instrucciones para entregar el taller se presentarán durante el laboratorio de la semana 2 (lo ideal es que vaya resolviendo el taller).

---

### 1) Potencia

Definición recursiva:

\[
x^n =
\begin{cases}
1 & \text{si } n = 0 \\
x \cdot x^{\text{pred}(n)} & \text{si } n > 0
\end{cases}
\]

**Actividad:** Implemente una función en Scala que calcule \(x^n\) usando `pred`.

---

### 2) Factorial

Definición recursiva:

\[
n! =
\begin{cases}
1 & \text{si } n = 0 \\
n \cdot (\text{pred}(n))! & \text{si } n > 0
\end{cases}
\]

**Actividad:** Implemente una función en Scala que calcule \(n!\) usando `pred`.

---

### 3) Sumatoria (acumulado)

Definición recursiva:

\[
\Sigma(n) =
\begin{cases}
n & \text{si } n = 0 \\
n + \Sigma(\text{pred}(n)) & \text{si } n > 0
\end{cases}
\]

**Actividad:** Implemente una función en Scala que calcule \(\Sigma(n)\) usando `pred`.

---

### 4) Suma de naturales

Definición recursiva:

\[
\text{suma}(x, y) =
\begin{cases}
y & \text{si } x = 0 \\
\text{suc}(\text{suma}(\text{pred}(x), y)) & \text{si } x > 0
\end{cases}
\]

**Actividad:** Implemente `suma(x, y)` usando `suc` y `pred`.

---

### 5) Diferencia de naturales

**Actividad:** Proponga una función similar a la anterior que calcule la diferencia entre dos números naturales (llámela `dif`).

> Sugerencia: Defina claramente qué debe pasar si \(x < y\) (por ejemplo, devolver 0, o asumir precondición \(x \ge y\)).

---

### 6) Producto de naturales (MODIFICADO)

En este punto, defina el producto siguiendo la idea:

\[
x * y = x + (x * \text{pred}(y))
\]

**Casos base requeridos:**

- Si \(x = 0\) **o** \(y = 0\), devolver \(0\).

**Caso base recomendado (para simplificar y evitar más recursión):**

- Si \(y = 1\), devolver \(x\).  
  (Análogamente podrías manejar \(x = 1\) devolviendo \(y\), pero no es obligatorio si ya controlas \(y\).)

**Definición recursiva sugerida:**

\[
\text{prod}(x, y) =
\begin{cases}
0 & \text{si } x = 0 \ \text{o}\ y = 0 \\
x & \text{si } y = 1 \\
\text{suma}(x, \text{prod}(x, \text{pred}(y))) & \text{si } y > 1
\end{cases}
\]

**Actividad:** Implemente `prod(x, y)` usando `suma` y `pred`, siguiendo la fórmula anterior.

---
