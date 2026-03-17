## Análisis de algoritmos - Conteo de operaciones

```java
import java.util.Scanner;

public class Main {

    // Contadores de cada línea
    static int c1 = 0;
    static int c2 = 0;
    static int c3 = 0;
    static int c4 = 0;
    static int c5 = 0;
    static int c6 = 0;
    static int c7 = 0;

    public static int[][] sumarMatrices(int[][] mat1, int[][] mat2) {

        int n = mat1.length;
        int[][] mat3 = new int[n][n];

        int i = 0; 
        c1++; // línea 1

        while (true) {
            c2++; // evaluación while i
            if (!(i < n)) break;

            int j = 0;
            c3++; // línea 3

            while (true) {
                c4++; // evaluación while j
                if (!(j < n)) break;

                mat3[i][j] = mat1[i][j] + mat2[i][j];
                c5++; // línea 5

                j = j + 1;
                c6++; // línea 6
            }

            i = i + 1;
            c7++; // línea 7
        }

        return mat3;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese el tamaño n de las matrices: ");
        int n = sc.nextInt();

        int[][] mat1 = new int[n][n];
        int[][] mat2 = new int[n][n];

        // Inicialización simple
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                mat1[i][j] = i + j;
                mat2[i][j] = i - j;
            }
        }

        int[][] resultado = sumarMatrices(mat1, mat2);

        // Mostrar contadores
        System.out.println("\nConteo de operaciones:");
        System.out.println("c1 (i=0): " + c1);
        System.out.println("c2 (while i): " + c2);
        System.out.println("c3 (j=0): " + c3);
        System.out.println("c4 (while j): " + c4);
        System.out.println("c5 (suma): " + c5);
        System.out.println("c6 (j++): " + c6);
        System.out.println("c7 (i++): " + c7);

        sc.close();
    }
}