class Display {
    constructor(displayValorAnterior, displayValorActual) {
        // Guardar referencias a los elementos del DOM donde se muestran los valores
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        // Crear una instancia de la calculadora
        this.calculador = new Calculadora();
        // Inicializar variables para el tipo de operación y los valores actuales y anteriores
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';

        // simbolos de las operaciones
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    // Método para borrar el último dígito ingresado
    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    // Método para borrar todos los valores y la operación actual
    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    // Método para realizar una operación matemática
    computar(tipo) {
        // Si hay una operación pendiente, realizar el cálculo antes de definir el nuevo tipo de operación
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    // Método para agregar un número al valor actual
    agregarNumero(numero) {
        // Evitar agregar más de un punto decimal
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    // Método para actualizar los valores mostrados en la pantalla
    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        // Mostrar el valor anterior y el signo de la operación actual
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    // realizar que  el cálculo matemático basado en el tipo de operación
    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        // Si alguno de los valores no es un número, salir sin hacer nada
        if(isNaN(valorActual) || isNaN(valorAnterior)) return

        // Realizar el cálculo usando la calculadora y actualizar el valor actual con el resultado
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}
