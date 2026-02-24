# Conjuntos — Ejercicios (Solución)

Estas actividades practican: pertenencia, subconjuntos, cardinalidad, producto cartesiano, conjunto potencia, unión, intersección, diferencia y complemento.

## Notación

- $x \in A$: “$x$ pertenece a $A$”.
- $A \subseteq B$: $A$ es subconjunto de $B$.
- $A \subset B$: $A$ es subconjunto **propio** de $B$.
- $|A|$: cardinalidad de $A$.
- $A \times B$: producto cartesiano.
- $\mathcal{P}(A)$: conjunto potencia.
- $A^c = U \setminus A$: complemento de $A$ en el universo $U$.

---

## A) Pertenencia / No pertenencia

**Defina:**

- $A = \lbrace -2, 0, 1, 3, 5 \rbrace$
- $B = \lbrace x \in \mathbb{Z} \mid 1 \le x \le 4 \rbrace$

**Determine si es verdadero o falso:**

1. $3 \in A$ → **Verdadero**
2. $2 \in A$ → **Falso**
3. $0 \in B$ → **Falso**
4. $4 \in B$ → **Verdadero**
5. $-2 \in B$ → **Falso**

---

## B) Subconjunto y subconjunto propio

**Defina:**

- $C = \lbrace 1,2 \rbrace$
- $D = \lbrace 1,2,3 \rbrace$
- $E = \lbrace 2,1 \rbrace$
- $F = \lbrace 1,2,3,4 \rbrace$

**Determine si es verdadero o falso:**

1. $C \subseteq D$ → **Verdadero**
2. $D \subset C$ → **Falso**
3. $C \subset D$ → **Verdadero**
4. $D \subseteq F$ → **Verdadero**
5. $D \subseteq D$ → **Verdadero**

---

## C) Cardinalidad

1. Sea $G = \lbrace a,b,c,d \rbrace$. Calcule $|G|$. → **Respuesta:** $|G| = 4$.

2. Sea  
   $H = \lbrace x \in \mathbb{Z} \mid -2 \le x \le 3 \rbrace$.  
   Calcule $|H|$. → **Respuesta:** $|H| = 6$.

3. Sea  
   $I = \lbrace n \in \mathbb{N} \mid 1 \le n \le 10 \text{ y } n \text{ es múltiplo de } 3 \rbrace$.  
   Calcule $|I|$. → **Respuesta:** $|I| = 3$.

---

## D) Producto cartesiano

**Defina:**

- $J = \lbrace 0,1 \rbrace$
- $K = \lbrace a,b,c \rbrace$
- $L = \lbrace 2,4 \rbrace$

1. Escriba $J \times K$. → **Respuesta:** $\lbrace (0,a),(0,b),(0,c),(1,a),(1,b),(1,c) \rbrace$.

2. ¿Cuál es $|J \times K|$? → **Respuesta:** $|J \times K| = 6$.

3. Escriba $K \times J$. → **Respuesta:** $\lbrace (a,0),(a,1),(b,0),(b,1),(c,0),(c,1) \rbrace$.

4. Escriba $L \times J$. → **Respuesta:** $\lbrace (2,0),(2,1),(4,0),(4,1) \rbrace$.

5. Determine si $(a,1) \in K \times J$. → **Respuesta:** **Sí**.

---

## E) Conjunto potencia

**Defina:**

- $M = \lbrace p,q \rbrace$
- $N = \lbrace 1,2,3 \rbrace$

1. Escriba $\mathcal{P}(M)$. → **Respuesta:** $\lbrace \varnothing, \lbrace p \rbrace, \lbrace q \rbrace, \lbrace p,q \rbrace \rbrace$.

2. Calcule $|\mathcal{P}(M)|$. → **Respuesta:** $|\mathcal{P}(M)| = 4$.

3. Calcule $|\mathcal{P}(N)|$. → **Respuesta:** $|\mathcal{P}(N)| = 8$.

4. Determine si $\lbrace 1,3 \rbrace \in \mathcal{P}(N)$. → **Respuesta:** **Verdadero**.

5. Determine si $\lbrace 4 \rbrace \in \mathcal{P}(N)$. → **Respuesta:** **Falso**.

---

## F) Unión

**Defina:**

- $P = \lbrace 1,2,4,7 \rbrace$
- $Q = \lbrace 2,3,7,8 \rbrace$

1. $P \cup Q$ → **Respuesta:** $\lbrace 1,2,3,4,7,8 \rbrace$.
2. $|P \cup Q|$ → **Respuesta:** $6$.
3. $(P \cup Q) \setminus P$ → **Respuesta:** $\lbrace 3,8 \rbrace$.

---

## G) Intersección

Con los conjuntos $P$ y $Q$ anteriores:

1. $P \cap Q$ → **Respuesta:** $\lbrace 2,7 \rbrace$.
2. $|P \cap Q|$ → **Respuesta:** $2$.
3. $P \cap (Q \setminus \lbrace 7 \rbrace)$ → **Respuesta:** $\lbrace 2 \rbrace$.

---

## H) Diferencia

**Defina:**

- $R = \lbrace 1,2,3,4,5,6 \rbrace$
- $S = \lbrace 2,4,6,8 \rbrace$

1. $R \setminus S$ → **Respuesta:** $\lbrace 1,3,5 \rbrace$.
2. $S \setminus R$ → **Respuesta:** $\lbrace 8 \rbrace$.
3. $(R \setminus S) \cup (S \setminus R)$ → **Respuesta:** $\lbrace 1,3,5,8 \rbrace$.

---

## I) Complemento

**Universo:**

- $U = \lbrace 1,2,3,4,5,6,7,8,9,10 \rbrace$

**Conjuntos:**

- $T = \lbrace 2,4,6,8,10 \rbrace$
- $V = \lbrace 1,2,3,5,8 \rbrace$

1. $\overline{T}$ → **Respuesta:** $\lbrace 1,3,5,7,9 \rbrace$.
2. $\overline{V}$ → **Respuesta:** $\lbrace 4,6,7,9,10 \rbrace$.
3. $\overline{(T \cap V)}$ → **Respuesta:** $\lbrace 1,3,4,5,6,7,9,10 \rbrace$.