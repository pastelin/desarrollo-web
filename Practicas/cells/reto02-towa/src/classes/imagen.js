export class Imagen {
	vistaPrevia(elementoInputFile, elementoImgVistaPrevia) {
		const imgSeleccionada = elementoInputFile.files;
		if (imgSeleccionada) {
			const objUrlImg = URL.createObjectURL(imgSeleccionada[0]);
			elementoImgVistaPrevia.src = objUrlImg;
		} else {
			this.msgError = 'No ha seleccionado una imagen.';
			alert('hi');
		}
	}

	inicializaListaImgBase64(agregaSeparador) {
		let listaImg = [];
		if (localStorage.getItem('listaImgBase64')) {
			listaImg = this.getListaImgBase64(agregaSeparador);
		}

		return listaImg;
	}

	getListaImgBase64(agregaSeparador) {
		let listaImgBase64 = localStorage.getItem('listaImgBase64');
		listaImgBase64 = listaImgBase64.split('@');
		// elimina elementos vacios del arreglo
		listaImgBase64 = listaImgBase64.filter((img) => img != '');
		// agrega '@' al final de la cadena de cada elemento, para poder usarlo como separador al convertir de cadena a arreglo
		if (agregaSeparador) {
			listaImgBase64 = listaImgBase64.map((img) => img.toString() + '@');
		}

		// elimina comas que se agregan al inicio de la cadena, ya que se usa @ como separador y las comas persisten en la conversion
		listaImgBase64.forEach((img, index) => {
			let inciaConComa = img.startsWith(',');
			while (inciaConComa) {
				img = img.substring(1, img.length);
				listaImgBase64[index] = img;
				inciaConComa = img.startsWith(',');
			}
		});

		return listaImgBase64;
	}

	inicializaListaNombreImg() {
		let listaNombreImg = [];
		if (localStorage.getItem('listaNombreImgBase64')) {
			listaNombreImg = this.getListaNombreImg();
		}

		return listaNombreImg;
	}

	getListaNombreImg() {
		let listaNombreImg = localStorage.getItem('listaNombreImgBase64');
		listaNombreImg = listaNombreImg.split(',');

		return listaNombreImg;
	}
}
