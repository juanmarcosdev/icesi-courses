# Conjuntos: Ejercicios (con respuestas)

> Notación:  
> - \(x \in A\): “\(x\) pertenece a \(A\)”.  
> - \(A \subseteq B\): \(A\) es subconjunto de \(B\).  
> - \(A \subset B\): \(A\) es subconjunto **propio** de \(B\).  
> - \(|A|\): cardinalidad de \(A\).  
> - \(A \times B\): producto cartesiano.  
> - \(\mathcal{P}(A)\): conjunto potencia.  
> - Complemento: \(A^c = U \setminus A\).

---

## A) Pertenencia / No pertenencia (5)

Defina:
- \(A = \{-2, 0, 1, 3, 5\}\)
- \(B = \{x \in \mathbb{Z} \mid 1 \le x \le 4\} = \{1,2,3,4\}\)

1. \(3 \in A\) → **Verdadero**
2. \(2 \in A\) → **Falso**
3. \(0 \in B\) → **Falso**
4. \(4 \in B\) → **Verdadero**
5. \(-2 \in B\) → **Falso**

---

## B) Subconjunto y subconjunto propio (5)

Defina:
- \(C = \{1,2\}\)
- \(D = \{1,2,3\}\)
- \(E = \{2,1\}\)
- \(F = \{1,2,3,4\}\)

1. \(C \subseteq D\) → **Verdadero**
2. \(D \subset C\) → **Falso**
3. \(C \subset D\) → **Verdadero** (porque \(C \subseteq D\) y \(C \ne D\))
4. \(D \subseteq F\) → **Verdadero**
5. \(D \subseteq D\) → **Verdadero** (todo conjunto es subconjunto de sí mismo)

---

## C) Cardinalidad de conjuntos (3)

1. \(G = \{a,b,c,d\}\).  
   \(|G| = 4\).

2. \(H = \{x \in \mathbb{Z} \mid -2 \le x \le 3\} = \{-2,-1,0,1,2,3\}\).  
   \(|H| = 6\).

3. \(I = \{n \in \mathbb{N} \mid 1 \le n \le 10 \text{ y } 3 \mid n\} = \{3,6,9\}\).  
   \(|I| = 3\).

---

## D) Producto cartesiano (5)

Defina:
- \(J = \{0,1\}\)
- \(K = \{a,b,c\}\)
- \(L = \{2,4\}\)

1. \(J \times K = \{(0,a),(0,b),(0,c),(1,a),(1,b),(1,c)\}\).

2. \(|J \times K| = |J|\cdot|K| = 2\cdot 3 = 6\).

3. \(K \times J = \{(a,0),(a,1),(b,0),(b,1),(c,0),(c,1)\}\).

4. \(L \times J = \{(2,0),(2,1),(4,0),(4,1)\}\).

5. \((a,1) \in K \times J\) → **Sí**, porque \(a \in K\) y \(1 \in J\).

---

## E) Conjunto potencia (5)

Defina:
- \(M = \{p,q\}\)
- \(N = \{1,2,3\}\)

1. \(\mathcal{P}(M) = \{\varnothing,\{p\},\{q\},\{p,q\}\}\).

2. \(|\mathcal{P}(M)| = 2^{|M|} = 2^2 = 4\).

3. \(|\mathcal{P}(N)| = 2^{|N|} = 2^3 = 8\).

4. \(\{1,3\} \in \mathcal{P}(N)\) → **Verdadero** (porque \(\{1,3\} \subseteq N\)).

5. \(\{4\} \in \mathcal{P}(N)\) → **Falso** (porque \(4 \notin N\), entonces \(\{4\} \nsubseteq N\)).

---

## F) Unión (3)

Defina:
- \(P = \{1,2,4,7\}\)
- \(Q = \{2,3,7,8\}\)

1. \(P \cup Q = \{1,2,3,4,7,8\}\).

2. \(|P \cup Q| = 6\).

3. \((P \cup Q) \setminus P = \{3,8\}\).

---

## G) Intersección (3)

Con \(P\) y \(Q\):

1. \(P \cap Q = \{2,7\}\).

2. \(|P \cap Q| = 2\).

3. \(Q \setminus \{7\} = \{2,3,8\}\).  
   Entonces \(P \cap (Q \setminus \{7\}) = \{2\}\).

---

## H) Diferencia (3)

Defina:
- \(R = \{1,2,3,4,5,6\}\)
- \(S = \{2,4,6,8\}\)

1. \(R \setminus S = \{1,3,5\}\) (quitamos de \(R\) los que estén en \(S\): 2,4,6).

2. \(S \setminus R = \{8\}\) (2,4,6 están en \(R\), 8 no).

3. \((R \setminus S) \cup (S \setminus R) = \{1,3,5,8\}\).

---

## I) Complemento (3)

Universo:
- \(U = \{1,2,3,4,5,6,7,8,9,10\}\)

Conjuntos:
- \(T = \{2,4,6,8,10\}\)
- \(V = \{1,2,3,5,8\}\)

1. \(T^c = U \setminus T = \{1,3,5,7,9\}\).

2. \(V^c = U \setminus V = \{4,6,7,9,10\}\).

3. \(T \cap V = \{2,8\}\).  
   \((T \cap V)^c = U \setminus \{2,8\} = \{1,3,4,5,6,7,9,10\}\).
