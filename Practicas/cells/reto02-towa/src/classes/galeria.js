import { Imagen } from './imagen';

export class Galeria extends Imagen {
	constructor() {
		super();
		this.listaImgBase64 = [];
		this.contador = 0;
		this.banderaSiguiente = false;
		this.banderaAnterior = false;
		this.listaNombreImg = [];
		this.mensaje;
	}

	// Funcionalidad para guardar una lista de imagenes en base64, siempre y cuando la imagen no haya sido guardada previamente
	async guardarImagen(elementoInputFile) {
		const imgSeleccionada = elementoInputFile.files;
		let status;

		if (imgSeleccionada.length) {
			this.listaImgBase64 = this.inicializaListaImgBase64(true);
			this.listaNombreImg = this.inicializaListaNombreImg();
			const nombreImgSeleccionada = imgSeleccionada[0].name;

			if (!this.validarSiExisteImg(nombreImgSeleccionada)) {
				const imgBase64 = await this.getBase64(imgSeleccionada[0]);

				this.guardarImgEnLocalStorage(imgBase64);
				this.guardarNombreImgEnLocalStorage(nombreImgSeleccionada);

				status = 'ok';
				this.setMensaje('¡Imagen agregada correctamente!');
			} else {
				status = 'error';
				this.setMensaje('¡La imagen seleccionada ya existe!');
			}
		} else {
			status = 'error';
			this.setMensaje('¡Favor de seleccionar una imagen antes de guardar!');
		}

		return status;
	}

	setMensaje(mensaje) {
		this.mensaje = mensaje;
	}

	getMensaje() {
		return this.mensaje;
	}

	validarSiExisteImg(nombreImgSeleccionada) {
		let existeImg = false;
		if (this.listaNombreImg.length) {
			for (let i = 0; i < this.listaNombreImg.length; i++) {
				if (this.listaNombreImg[i] === nombreImgSeleccionada) {
					existeImg = true;
					break;
				}
			}
		}
		return existeImg;
	}

	async getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	guardarImgEnLocalStorage(imgBase64) {
		this.listaImgBase64.push(imgBase64.toString() + '@');
		localStorage.setItem('listaImgBase64', this.listaImgBase64.toString());
	}

	guardarNombreImgEnLocalStorage(nombreImgSeleccionada) {
		this.listaNombreImg.push(nombreImgSeleccionada);
		localStorage.setItem('listaNombreImgBase64', this.listaNombreImg);
	}

	// Funcionalidad para mostrar la galeria de imagenes alojadas en localStorage
	mostrarAnterior(elementoGaleriaImg) {
		this.listaImgBase64 = this.inicializaListaImgBase64(false);
		let status;

		if (this.banderaSiguiente) {
			this.contador -= 1;
			this.banderaSiguiente = false;
		}
		if (this.listaImgBase64.length && this.contador > 0) {
			this.contador--;
			this.banderaAnterior = true;
			let imagenActual = this.listaImgBase64[this.contador];
			elementoGaleriaImg.src = imagenActual;
		} else {
			status = 'error';
			this.setMensaje('¡No hay imagen por mostrar!');
		}

		return status;
	}

	mostrarSiguiente(elementoGaleriaImg) {
		this.listaImgBase64 = this.inicializaListaImgBase64(false);
		let status;

		if (this.banderaAnterior) {
			this.contador += 1;
			this.banderaAnterior = false;
		}

		if (this.listaImgBase64.length && this.contador < this.listaImgBase64.length) {
			let imagenActual = this.listaImgBase64[this.contador];
			elementoGaleriaImg.src = imagenActual;
			this.contador += 1;
			this.banderaSiguiente = true;
		} else {
			status = 'error';
			this.setMensaje('¡No hay imagen por mostrar!');
		}

		return status;
	}

	imagenDefault(elementoGaleriaImg) {
		this.listaImgBase64 = this.inicializaListaImgBase64(false);
		this.contador = 0;

		if (this.listaImgBase64.length) {
			elementoGaleriaImg.src = this.listaImgBase64[0];
			this.contador += 1;
			this.banderaSiguiente = true;
		}
	}
}
