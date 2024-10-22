const cantidad = document.getElementById('cantidad');
const boton = document.getElementById('generar');
const contraseña = document.getElementById('contrasena');
const botonL = document.getElementById('limpiar');
const mensaje = document.getElementById("aviso");
const alerta = document.getElementById("alerta");

const cadenaCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

boton.addEventListener('click', generar);
botonL.addEventListener('click', limpiar);

function generar() {
    const numeroDigitado = parseInt(cantidad.value);

    if (!validarEntrada(numeroDigitado)) {
        return;
    }

    const password = generarContraseña(numeroDigitado);
    validar(password);
    contraseña.value = password;
}

function limpiar() {
    contraseña.value = '';
    cantidad.value = '';
    mensaje.textContent = '';
    ocultarAlerta();
}

function validarEntrada(numero) {
    if (isNaN(numero)) {
        mostrarAlerta("Debes introducir un número de caracteres para la contraseña!!", "error");
        return false;
    }
    if (numero < 8) {
        mostrarAlerta("La cantidad de caracteres tiene que ser mayor o igual a 8!!", "error");
        return false;
    }
    return true;
}

function generarContraseña(longitud) {
    let password = '';
    for (let i = 0; i < longitud; i++) {
        password += obtenerCaracterAleatorio();
    }
    return password;
}

function obtenerCaracterAleatorio() {
    return cadenaCaracteres[Math.floor(Math.random() * cadenaCaracteres.length)];
}

function validar(password) {
    const esFuerte = tieneCaracteristicas(password);
    if (esFuerte) {
        mostrarAlerta("La contraseña es fuerte!!", "success");
    } else {
        mostrarAlerta("CONTRASEÑA DÉBIL!! Debe incluir mayúsculas, minúsculas, números y caracteres especiales.", "error");
    }
}

function tieneCaracteristicas(password) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*()]/.test(password);
    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

function mostrarAlerta(texto, tipo) {
    alerta.textContent = texto;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = 'block';

    setTimeout(ocultarAlerta, 5000);
}

function ocultarAlerta() {
    alerta.style.display = 'none';
}

function copiarContrasena() {
    const contrasenaInput = document.getElementById('contrasena');
    if (contrasenaInput.value.trim() === '') {
        mostrarAlerta('No hay ninguna contraseña para copiar.', "error");
        return;
    }
    contrasenaInput.select();
    document.execCommand('copy');
    mostrarAlerta('Contraseña copiada al portapapeles!', "success");
}
