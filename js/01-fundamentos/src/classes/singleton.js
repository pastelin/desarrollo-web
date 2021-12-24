class Singleton {
  static instancia; // undefined
  nombre = '';

  constructor(nombre = '') {

    if (!!Singleton.instancia) {
      return Singleton.instancia;
    }
    Singleton.instancia = this;
    this.nombre = nombre;
    // return this;
  }
}

const instancia1 = new Singleton('Ironman');