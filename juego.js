const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10



class Juego{
    constructor(){
        
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.empezarSecuencia()
        setTimeout(() => {
            this.siguienteNivel()
        }, 500);
    }
    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this) //bind cambia el contexto por el de la clase Juego
        //ocultamos el boton.
        this.toogleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toogleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }
    empezarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        this.subnivel = 0
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumAColor(this.secuencia[i])
            setTimeout(() => {
                this.colores[color].classList.add('light')
                //Apagamos el color
                setTimeout(() => {
                    this.colores[color].classList.remove('light')
                }, 350);
            }, 1000 * i);
        }
        //Agregamos loS eventos en el click.
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        //bind para cambiar el contexto del this en este caso.... en el método elegirColor, 
        //por defecto el this es el botón, pero en el this de aqui, es la clase Juego. :O
    }
    elegirColor(e){
        const nombreColorElegido = e.target.dataset.color
        const numeroColorElegido = this.transformarColorANum(nombreColorElegido)
        //vamos a iluminar 
        this.colores[nombreColorElegido].classList.add('light')
        if(numeroColorElegido === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel === this.nivel)
            {
                this.nivel++
                //Desacrivar los clicks, ya que el usuario paso de nivel
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    //Ya ganó.
                    this.ganoElJuego()
                }else{
                    //Debe avanzar de nievel
                    console.log('Avanzaste de nivel')
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }else{
            //No tocó bien el boton correspondiente
            this.perdioElJuego()
        }
    }
    transformarNumAColor(numero){
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANum(color){
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    ganoElJuego(){
        swal('Felicitaciones','Ganaste', 'success').then(() => {
            this.inicializar()
        })
    }
    perdioElJuego(){
        swal('Sigue intentando','Perdiste','error').then(() =>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego() {
    window.juego = new Juego()
}
