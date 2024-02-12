function StartGame(){
    const user1 = document.getElementById("nombre1").value;
    const user2 = document.getElementById("nombre2").value;
    const user3 = document.getElementById("nombre3").value;
    const user4 = document.getElementById("nombre4").value;

    localStorage.setItem("user1", user1);
    localStorage.setItem("user2", user2);
    localStorage.setItem("user3", user3);
    localStorage.setItem("user4", user4);

    const opt = document.getElementById("size").value;

    if (opt=="1"){
         matrix1 = CrearMatriz(3);
         matrix2 = CrearMatriz(3);
         matrix3 = CrearMatriz(3);
         matrix4 = CrearMatriz(3);
    }
    else if (opt=="2"){
         matrix1 = CrearMatriz(4);
         matrix2 = CrearMatriz(4);
         matrix3 = CrearMatriz(4);
         matrix4 = CrearMatriz(4);

    }
    else if (opt=="3"){
         matrix1 = CrearMatriz(5);
         matrix2 = CrearMatriz(5);
         matrix3 = CrearMatriz(5);
         matrix4 = CrearMatriz(5);
    }
    localStorage.setItem("Matrix1", matrix1);
    localStorage.setItem("Matrix2", matrix2);
    localStorage.setItem("Matrix3", matrix3);
    localStorage.setItem("Matrix4", matrix4);
}

function showNamesinMenu(){

    const button1 = document.getElementById("Jugador1");
    button1.textContent = localStorage.getItem("user1");

    const button2 = document.getElementById("Jugador2");
    button2.textContent = localStorage.getItem("user2");

    const button3 = document.getElementById("Jugador3");
    button3.textContent = localStorage.getItem("user3");

    const button4 = document.getElementById("Jugador4");
    button4.textContent = localStorage.getItem("user4");
}

const CheckIfBingo = function()
{
    const m1 = stringToMatrix(localStorage.getItem("Matrix1"));
    const m2 = stringToMatrix(localStorage.getItem("Matrix2"));
    const m3 = stringToMatrix(localStorage.getItem("Matrix3"));
    const m4 = stringToMatrix(localStorage.getItem("Matrix4"));

    const m = [m1, m2, m3, m4];
    
    for (let i = 0; i < m.length; i++) {
        const matriz = m[i];
        let matrizConCeros = true; 
        
        for (let fila = 0; fila < matriz.length; fila++) {
            for (let columna = 0; columna < matriz[fila].length; columna++) {
                if (matriz[fila][columna] !== 0) {
                    matrizConCeros = false;
                    break;
                }
            }
            if (!matrizConCeros) {
                break;
            }
        }
        
        if (matrizConCeros) {
            const user = "user" + (i + 1);
            const winner = localStorage.getItem(user);
            alert(winner.toUpperCase()+" LLENO TODOS LOS NÚMEROS, EL JUEGO HA ACABADO");
            MostrarTablaDeGanadores();
            break;
        }
    }
}

function GenerarNumero(used, contador){
    const label = document.getElementById("numero-generado");
    let turno = document.getElementById("contador");

    if (used.length <25)
    {
        const n = Math.floor(Math.random() * 50) + 1;
        if (!used.includes(n)){
            label.textContent=n;
            used.push(n);
            localStorage.setItem("n-generado", n);
            contador.valor+=1;
            turno.textContent=contador.valor;
            fillNumbers(n);
            fixMatrix("Matrix1");
            fixMatrix("Matrix2");
            fixMatrix("Matrix3");
            fixMatrix("Matrix4");
            CheckIfBingo();
        }
        else{
            GenerarNumero(used, contador);
        }
    }
    else
    {
        MostrarTablaDeGanadores();
    }
}

function CrearMatriz(a){
    const matriz = [];
    const numerosUsados = new Set();
    for (let i = 0; i < a; i++) {
        const fila = [];
        for (let j = 0; j < a; j++) {
            let numeroAleatorio = 0;
            do {
                numeroAleatorio = Math.floor(Math.random() * 50) + 1;
            } while (numerosUsados.has(numeroAleatorio)); 

            numerosUsados.add(numeroAleatorio); 
            fila.push(numeroAleatorio);
        }
        matriz.push(fila);
    }
    return matriz;
}


function displayMatrix(str)
{
    const tabla = document.getElementById("Cartón");
    tabla.style.display = "table";
    const string = localStorage.getItem(str);
    const matrix = stringToMatrix(string);
    const table = document.getElementById("Cartón");
    table.innerHTML = "";

    for (let i = 0; i < matrix.length; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
          const celda = document.createElement("td");
          celda.textContent = matrix[i][j];
          if (matrix[i][j] === 0) {
            celda.style.backgroundColor = "yellow";
        }
          fila.appendChild(celda);
        }
        table.appendChild(fila);
      }
  }

function stringToMatrix(str) {

    const elements = str.split(",").map(Number);
    const n = Math.sqrt(elements.length);
    const matrix = [];
    let index = 0;

    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(elements[index]);
            index++;
        }
        matrix.push(row);
    }

    return matrix;
}

function changeEquals(matrix, n){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === n) {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}

function fillNumbers(n)
{
    let matrix1 = stringToMatrix(localStorage.getItem("Matrix1"));
    let matrix2 = stringToMatrix(localStorage.getItem("Matrix2"));
    let matrix3 = stringToMatrix(localStorage.getItem("Matrix3"));
    let matrix4 = stringToMatrix(localStorage.getItem("Matrix4"));

    matrix1 = changeEquals(matrix1, n);
    localStorage.setItem("Matrix1", matrix1);
    matrix2 = changeEquals(matrix2, n);
    localStorage.setItem("Matrix2", matrix2);
    matrix3 = changeEquals(matrix3, n);
    localStorage.setItem("Matrix3", matrix3);
    matrix4 = changeEquals(matrix4, n);
    localStorage.setItem("Matrix4", matrix4);
}

function fixMatrix(str)
{
    const tabla = document.getElementById("Cartón");
    tabla.style.display = "none";
    const string = localStorage.getItem(str);
    const matrix = stringToMatrix(string);
    const table = document.getElementById("Cartón");
    table.innerHTML = "";

    for (let i = 0; i < matrix.length; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
          const celda = document.createElement("td");
          celda.textContent = matrix[i][j];
          if (matrix[i][j] === 0) {
            celda.style.backgroundColor = "yellow";
        }
          fila.appendChild(celda);
        }
        table.appendChild(fila);
      }
  }

function MostrarTablaDeGanadores()
{

    let user1 = localStorage.getItem("user1");
    let user2 = localStorage.getItem("user2");
    let user3 = localStorage.getItem("user3");
    let user4 = localStorage.getItem("user4");

    const m1 = stringToMatrix(localStorage.getItem("Matrix1"));
    const m2 = stringToMatrix(localStorage.getItem("Matrix2"));
    const m3 = stringToMatrix(localStorage.getItem("Matrix3"));
    const m4 = stringToMatrix(localStorage.getItem("Matrix4"));

    let podium = [];
    
    podium[0] = [getPoints(m1), user1];
    podium[1] = [getPoints(m2), user2];
    podium[2] = [getPoints(m3), user3];
    podium[3] = [getPoints(m4), user4];

    podium.sort((a, b) => b[0] - a[0]);

    let mes1 ="";
    if (podium[0][0]==12)
    {
        podium[0][0]+=5;
        mes1 = podium[0][1].toUpperCase() +" ==>> "+ podium[0][0] + " PUNTOS (BINGO)\n";
    }
    else{
        mes1 = podium[0][1].toUpperCase() +" ==>> "+ podium[0][0] + " PUNTOS\n";
    }

    let mes2 = podium[1][1].toUpperCase() +" ==>> "+ podium[1][0] + " PUNTOS\n";
    let mes3 = podium[2][1].toUpperCase() +" ==>> "+ podium[2][0] + " PUNTOS\n";
    let mes4 = podium[3][1].toUpperCase() +" ==>> "+ podium[3][0] + " PUNTOS\n\n";

    let mes = "EL JUEGO HA ACABADO<br><br>"+mes1+"<br>"+mes2+"<br>"+mes3+"<br>"+mes4;

    const cc = document.getElementById("CustomConfirm");
    cc.innerHTML = mes;
    showCustomConfirm();
}

function getPoints(m) {
    let points = 0;

    //Verificar filas
    for (let i=0; i<m.length;i++)
    {
        let filaTieneCeros = true;
        for (let j=0; j<m.length; j++)
        {
            if (m[i][j]!=0)
            {
                filaTieneCeros = false;
                break;
            }
        }
        if (filaTieneCeros)
        {
            points++;
        }
    }

    //Verificar columnas
    for (let j=0; j<m.length;j++)
    {
        let columnaTieneCeros = true;
        for (let i=0; i<m.length; i++)
        {
            if (m[i][j]!=0)
            {
                columnaTieneCeros = false;
                break;
            }
        }
        if (columnaTieneCeros)
        {
            points++;
        }
    }

    // Verificar diagonal#1
    let diagonalHasZeros = true;
    for (let i = 0; i < m.length; i++) {
        if (m[i][i] != 0) {
            diagonalHasZeros = false;
            break;
        }
    }

    if (diagonalHasZeros) {
        points += 3;
    }

    //Verificar diagonal#2
    let a = m.length-1;
    let b = 0;
    diagonalHasZeros = true;

    while (a>=0)
    {
        if (m[a][b]!=0)
        {
            diagonalHasZeros = false;
            break;
        }
        a-=1;
        b+=1;
    }

    if (diagonalHasZeros) {
        points += 3;
    }
    return points;
}

function showCustomConfirm() {
    document.getElementById("CustomConfirm").style.display = 'block';
    document.getElementById("on").style.display = 'block';
    document.getElementById("hide").style.display = 'block';
    document.getElementById("turno").style.display = "none";
    document.getElementById("contador").style.display = "none";
    document.getElementById("Generador").style.display = "none";
    document.getElementById("numero-generado").style.display = "none";
}

function Salir()
{
    window.location.href = 'landingPage.html';
}

function Reiniciar()
{
    window.history.back();
}