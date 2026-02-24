# Conjuntos: Ejercicios (con respuestas)

## Notación

$$
x \in A
$$

$$
A \subseteq B
$$

$$
A \subset B
$$

$$
|A|
$$

$$
A \times B
$$

$$
\mathcal{P}(A)
$$

$$
A^c = U \setminus A
$$

---

## A) Pertenencia / No pertenencia (5)

Defina:

$$
A = \lbrace -2, 0, 1, 3, 5 \rbrace
$$

$$
B = \lbrace x \in \mathbb{Z} \mid 1 \le x \le 4 \rbrace = \lbrace 1,2,3,4 \rbrace
$$

1. $$3 \in A$$ → **Verdadero**  
2. $$2 \in A$$ → **Falso**  
3. $$0 \in B$$ → **Falso**  
4. $$4 \in B$$ → **Verdadero**  
5. $$-2 \in B$$ → **Falso**

---

## B) Subconjunto y subconjunto propio (5)

Defina:

$$
C = \lbrace 1,2 \rbrace
$$

$$
D = \lbrace 1,2,3 \rbrace
$$

$$
E = \lbrace 2,1 \rbrace
$$

$$
F = \lbrace 1,2,3,4 \rbrace
$$

1. $$C \subseteq D$$ → **Verdadero**  
2. $$D \subset C$$ → **Falso**  
3. $$C \subset D$$ → **Verdadero** (porque $$C \subseteq D$$ y $$C \ne D$$)  
4. $$D \subseteq F$$ → **Verdadero**  
5. $$D \subseteq D$$ → **Verdadero**

---

## C) Cardinalidad de conjuntos (3)

1. Sea:

$$
G = \lbrace a,b,c,d \rbrace
$$

Entonces:

$$
|G| = 4
$$

2. Sea:

$$
H = \lbrace x \in \mathbb{Z} \mid -2 \le x \le 3 \rbrace
= \lbrace -2,-1,0,1,2,3 \rbrace
$$

Entonces:

$$
|H| = 6
$$

3. Sea:

$$
I = \lbrace n \in \mathbb{N} \mid 1 \le n \le 10 \text{ y } 3 \mid n \rbrace
= \lbrace 3,6,9 \rbrace
$$

Entonces:

$$
|I| = 3
$$

---

## D) Producto cartesiano (5)

Defina:

$$
J = \lbrace 0,1 \rbrace
$$

$$
K = \lbrace a,b,c \rbrace
$$

$$
L = \lbrace 2,4 \rbrace
$$

1.

$$
J \times K = \lbrace (0,a),(0,b),(0,c),(1,a),(1,b),(1,c) \rbrace
$$

2.

$$
|J \times K| = |J|\cdot|K| = 2\cdot 3 = 6
$$

3.

$$
K \times J = \lbrace (a,0),(a,1),(b,0),(b,1),(c,0),(c,1) \rbrace
$$

4.

$$
L \times J = \lbrace (2,0),(2,1),(4,0),(4,1) \rbrace
$$

5.

$$
(a,1) \in K \times J
$$

→ **Sí**, porque:

$$
a \in K \quad \text{y} \quad 1 \in J
$$

---

## E) Conjunto potencia (5)

Defina:

$$
M = \lbrace p,q \rbrace
$$

$$
N = \lbrace 1,2,3 \rbrace
$$

1.

$$
\mathcal{P}(M) = \lbrace \varnothing, \lbrace p \rbrace, \lbrace q \rbrace, \lbrace p,q \rbrace \rbrace
$$

2.

$$
|\mathcal{P}(M)| = 2^{|M|} = 2^2 = 4
$$

3.

$$
|\mathcal{P}(N)| = 2^{|N|} = 2^3 = 8
$$

4.

$$
\lbrace 1,3 \rbrace \in \mathcal{P}(N)
$$

→ **Verdadero**, porque:

$$
\lbrace 1,3 \rbrace \subseteq N
$$

5.

$$
\lbrace 4 \rbrace \in \mathcal{P}(N)
$$

→ **Falso**, porque:

$$
4 \notin N
$$

y por tanto:

$$
\lbrace 4 \rbrace \nsubseteq N
$$

---

## F) Unión (3)

Defina:

$$
P = \lbrace 1,2,4,7 \rbrace
$$

$$
Q = \lbrace 2,3,7,8 \rbrace
$$

1.

$$
P \cup Q = \lbrace 1,2,3,4,7,8 \rbrace
$$

2.

$$
|P \cup Q| = 6
$$

3.

$$
(P \cup Q) \setminus P = \lbrace 3,8 \rbrace
$$

---

## G) Intersección (3)

Con $$P$$ y $$Q$$:

1.

$$
P \cap Q = \lbrace 2,7 \rbrace
$$

2.

$$
|P \cap Q| = 2
$$

3.

$$
Q \setminus \lbrace 7 \rbrace = \lbrace 2,3,8 \rbrace
$$

Entonces:

$$
P \cap (Q \setminus \lbrace 7 \rbrace) = \lbrace 2 \rbrace
$$

---

## H) Diferencia (3)

Defina:

$$
R = \lbrace 1,2,3,4,5,6 \rbrace
$$

$$
S = \lbrace 2,4,6,8 \rbrace
$$

1.

$$
R \setminus S = \lbrace 1,3,5 \rbrace
$$

2.

$$
S \setminus R = \lbrace 8 \rbrace
$$

3.

$$
(R \setminus S) \cup (S \setminus R) = \lbrace 1,3,5,8 \rbrace
$$

---

## I) Complemento (3)

Universo:

$$
U = \lbrace 1,2,3,4,5,6,7,8,9,10 \rbrace
$$

Conjuntos:

$$
T = \lbrace 2,4,6,8,10 \rbrace
$$

$$
V = \lbrace 1,2,3,5,8 \rbrace
$$

1.

$$
T^c = U \setminus T = \lbrace 1,3,5,7,9 \rbrace
$$

2.

$$
V^c = U \setminus V = \lbrace 4,6,7,9,10 \rbrace
$$

3.

$$
T \cap V = \lbrace 2,8 \rbrace
$$

Entonces:

$$
(T \cap V)^c = U \setminus \lbrace 2,8 \rbrace = \lbrace 1,3,4,5,6,7,9,10 \rbrace
$$
