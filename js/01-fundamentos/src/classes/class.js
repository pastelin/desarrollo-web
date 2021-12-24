class Persona {

  static _conteo = 0;
  
  static get conteo() {
    return Persona._conteo + ' instancias';
  }

  static mensaje() {
    console.log(this.nombre);
    console.log('Hola a todos, soy un metodo estatico');
  }

  nombre  = '';
  codigo  = ''; 
  frase   = '';
  comida  = '';

  constructor(nombre='Sin nombre', codigo='Sin condigo', frase='Sin frase') {
    this.nombre = nombre;
    this.codigo = codigo;
    this.frase = frase;

    Persona._conteo++;
  }

  set setComidaFavorita(comida) {
    this.comida = comida.toUpperCase();
  }

  get getComidaFavorita() {
    return `La comida favorita de ${this.nombre} es ${this.comida}`;
  }

  quienSoy() {
    console.log(`Soy ${this.nombre} mi identidad es ${this.codigo}`);
  }

  miFrase() {
    this.quienSoy();
    console.log(`${this.codigo} dice: ${this.frase}`);
  }

}

const spiderman = new Persona('Peter Parker', 'Spider', '...');
const ironman = new Persona('Tony Stark', 'Ironman', '...');

spiderman.quienSoy();
spiderman.miFrase();
spiderman.setComidaFavorita = 'El pie de cereza de la tía May';