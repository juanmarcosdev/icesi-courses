## Análisis de algoritmos - Conteo de operaciones 2

```java
import java.util.Scanner;

public class Main {

    static int c1=0, c2=0, c3=0, c4=0, c5=0,
               c6=0, c7=0, c8=0, c9=0, c10=0;

    public static int calcular(int n) {

        int s = 0;
        c1++;                                          // línea 1: s←0       → 1 vez

        int i = 1;
        c2++;                                          // línea 2: i←1       → 1 vez

        while (++c3 >= 0 && i <= n) {                 // línea 3: while i<=n → n+1 veces

            int t = 0;
            c4++;                                      // línea 4: t←0       → n veces

            int j = 1;
            c5++;                                      // línea 5: j←1       → n veces

            while (++c6 >= 0 && j <= i) {             // línea 6: while j<=i → n(n+3)/2 veces

                t = t + 1;
                c7++;                                  // línea 7: t←t+1     → n(n+1)/2 veces

                j = j + 1;
                c8++;                                  // línea 8: j←j+1     → n(n+1)/2 veces
            }

            s = s + t;
            c9++;                                      // línea 9: s←s+t     → n veces

            i = i + 1;
            c10++;                                     // línea 10: i←i+1    → n veces
        }

        return s;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Ingrese el valor de n: ");
        int n = sc.nextInt();

        int resultado = calcular(n);

        System.out.println("\nResultado s = " + resultado);
        System.out.println("\nConteo de ejecuciones por linea:");
        System.out.println("c1  (s=0)        : " + c1  + "  -> esperado: 1");
        System.out.println("c2  (i=1)        : " + c2  + "  -> esperado: 1");
        System.out.println("c3  (while i<=n) : " + c3  + "  -> esperado: " + (n+1));
        System.out.println("c4  (t=0)        : " + c4  + "  -> esperado: " + n);
        System.out.println("c5  (j=1)        : " + c5  + "  -> esperado: " + n);
        System.out.println("c6  (while j<=i) : " + c6  + "  -> esperado: " + (n*(n+3)/2) + "  [n(n+3)/2]");
        System.out.println("c7  (t=t+1)      : " + c7  + "  -> esperado: " + (n*(n+1)/2) + "  [n(n+1)/2]");
        System.out.println("c8  (j=j+1)      : " + c8  + "  -> esperado: " + (n*(n+1)/2) + "  [n(n+1)/2]");
        System.out.println("c9  (s=s+t)      : " + c9  + "  -> esperado: " + n);
        System.out.println("c10 (i=i+1)      : " + c10 + "  -> esperado: " + n);

        int total   = c1+c2+c3+c4+c5+c6+c7+c8+c9+c10;
        int formula = (3*n*n + 15*n + 6) / 2;

        System.out.println("\nTotal real            : " + total);
        System.out.println("Formula (3n^2+15n+6)/2: " + formula);
        System.out.println("Coincide              : " + (total == formula ? "SI" : "NO"));
        sc.close();
    }
}
