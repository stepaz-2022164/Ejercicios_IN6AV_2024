
const palabras = ["KINAL", "JAVA", "MONITOR", "TECLADO", "MOUSE", "JAVASCRIPT", "COMPUTADORA", "VARIABLE", "INTEL", "MEMORIA", "CONSTANTE", "INSTANCIA", "MYSQL", "NETBEANS", "OBJETO" ]; 
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)]; 
let letrasAdivinadas = [];
let oportunidades = 7;
let errores = 0;


function drawHangman() {
    const canvas = document.getElementById("muñeco");
    const ctx = canvas.getContext("2d");
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
  
    if (errores >= 1) {
      // Dibujar base
      ctx.beginPath();
      ctx.moveTo(20, 150);
      ctx.lineTo(130, 150);
      ctx.stroke();
    }
  
    if (errores >= 2) {
      // Dibujar poste vertical
      ctx.beginPath();
      ctx.moveTo(75, 150);
      ctx.lineTo(75, 20);
      ctx.stroke();
    }
  
    if (errores >= 3) {
      // Dibujar travesaño
      ctx.beginPath();
      ctx.moveTo(75, 20);
      ctx.lineTo(130, 20);
      ctx.stroke();
    }
  
    if (errores >= 4) {
      // Dibujar cuerda
      ctx.beginPath();
      ctx.moveTo(130, 20);
      ctx.lineTo(130, 40);
      ctx.stroke();
    }
  
    if (errores >= 5) {
      // Dibujar cabeza
      ctx.beginPath();
      ctx.arc(130, 55, 15, 0, Math.PI * 2);
      ctx.stroke();
    }
  
    if (errores >= 6) {
      // Dibujar cuerpo
      ctx.beginPath();
      ctx.moveTo(130, 70);
      ctx.lineTo(130, 110);
      ctx.stroke();
    }
  
    if (errores >= 7) {
      // Dibujar brazos y piernas
      ctx.beginPath();
      ctx.moveTo(130, 80);
      ctx.lineTo(110, 100);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.moveTo(130, 80);
      ctx.lineTo(150, 100);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.moveTo(130, 110);
      ctx.lineTo(110, 130);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.moveTo(130, 110);
      ctx.lineTo(150, 130);
      ctx.stroke();
    }
  }

    function iniciar() {
      let displayPalabra = "";
      for (let i = 0; i < palabraSeleccionada.length; i++) {
        displayPalabra += "_ ";
      }
      document.getElementById("displayPalabra").textContent = displayPalabra;
    }

    function actualizarDisplayPalabra() {
        let displayPalabra = "";
        for (let letra of palabraSeleccionada) {
          if (letrasAdivinadas.includes(letra)) {
            displayPalabra += letra + " ";
          } else {
            displayPalabra += "_ ";
          }
        }
        document.getElementById("displayPalabra").textContent = displayPalabra;
      }

    function seleccionarLetra(letra) {
        if (!letrasAdivinadas.includes(letra)) {
          letrasAdivinadas.push(letra);
          if (!palabraSeleccionada.includes(letra)) {
            errores++;
            drawHangman();
          }
          actualizarDisplayPalabra();
          document.getElementById("letrasUsadas").textContent = letrasAdivinadas.join(", ");
          document.getElementById("oportunidadesRestantes").textContent = 7 - errores;
      
          if (errores === 7) {
            alert("Perdiste :( , La palabra era: " + palabraSeleccionada);
            location.reload();
          } else if (!document.getElementById("displayPalabra").textContent.includes("_")) {
            alert("Ganaste :D");
            location.reload();
          }
        }
    }
      
    for (let i = 65; i <= 90; i++) {
      let letra = String.fromCharCode(i);
      let boton = document.createElement("button");
      boton.textContent = letra;
      boton.id = `letra-boton-${letra}`;
      boton.addEventListener("click", function() {
        seleccionarLetra(letra);
        boton.disabled = true;
      });
      document.body.appendChild(boton);
    }

    iniciar();