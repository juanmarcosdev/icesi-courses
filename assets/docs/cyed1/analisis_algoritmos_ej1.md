## Análisis de algoritmos - Conteo de operaciones

```java
import java.util.Scanner;

public class Main {

    static int c1 = 0, c2 = 0, c3 = 0, c4 = 0,
               c5 = 0, c6 = 0, c7 = 0;

    public static int[][] sumarMatrices(int[][] mat1, int[][] mat2) {

        int n = mat1.length;
        int[][] mat3 = new int[n][n];

        int i = 0;
        c1++;                                          //linea 1: 1 vez

        while (++c2 >= 0 && i < mat1.length) {        //linea 2: n+1 veces 
            int j = 0;
            c3++;                                      //linea 3: n veces

            while (++c4 >= 0 && j < mat2.length) {    //linea 4: n*(n+1) veces 
                mat3[i][j] = mat1[i][j] + mat2[i][j];
                c5++;                                  //linea 5: n² veces

                j = j + 1;
                c6++;                                  // inea 6: n² veces
            }

            i = i + 1;
            c7++;                                      //linea 7: n veces
        }

        return mat3;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Ingrese el tamaño n de las matrices: ");
        int n = sc.nextInt();

        int[][] mat1 = new int[n][n];
        int[][] mat2 = new int[n][n];

        //matrices dummy de 1
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                mat1[i][j] = 1;
                mat2[i][j] = 1;
            }


        int[][] resultado = sumarMatrices(mat1, mat2);

        System.out.println("\nConteo de ejecuciones por linea:");
        System.out.println("c1  (i=0)      : " + c1);
        System.out.println("c2  (while i)  : " + c2 + "  → esperado: " + (n + 1));
        System.out.println("c3  (j=0)      : " + c3 + "  → esperado: " + n);
        System.out.println("c4  (while j)  : " + c4 + "  → esperado: " + (n * (n + 1)));
        System.out.println("c5  (suma)     : " + c5 + "  → esperado: " + (n * n));
        System.out.println("c6  (j++)      : " + c6 + "  → esperado: " + (n * n));
        System.out.println("c7  (i++)      : " + c7 + "  → esperado: " + n);
        System.out.println("Total          : " + (c1+c2+c3+c4+c5+c6+c7));
        sc.close();
    }
}
