

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

function GenerarNumero(used, contador){
    const label = document.getElementById("numero-generado");
    let turno = document.getElementById("contador");

    if (used.length <25)
    {
        const n = Math.floor(Math.random() * 50) + 1;
        if (!used.includes(n)){
            label.textContent=n;
            used.push(n);
            contador.valor+=1;
            turno.textContent=contador.valor;
        }
        else{
            GenerarNumero(used, contador);
        }
    }
    else
    {
        alert("El juego acabó");
        window.location.href = "landingPage.html";
    }
}

function CrearMatriz(a){
    const matriz = [];
    for (let i = 0; i < a; i++) {
        const fila = [];
        const numerosGenerados = []; // Array para almacenar los números generados en esta fila

        for (let j = 0; j < a; j++) {
            let numeroAleatorio = 0;
            do {
                numeroAleatorio = Math.floor(Math.random() * 50) + 1;
            } while (numerosGenerados.includes(numeroAleatorio)); // Verificar si el número ya ha sido generado

            numerosGenerados.push(numeroAleatorio); // Agregar el número a la lista de números generados
            fila.push(numeroAleatorio);
        }
        matriz.push(fila);
    }
    return matriz;
}


function displayMatrix()
{
    const a = localStorage.getItem("Matrix1");
    console.log(a);
}