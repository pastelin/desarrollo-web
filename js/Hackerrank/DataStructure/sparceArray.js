const strings = ['abcde','sdaklfj','asdjf','na','basdn','sdaklfj','asdjf','na','asdjf','na','basdn','sdaklfj','asdjf'];
const queries = ['abcde','sdaklfj','asdjf','na','basdn'];

const matchingStrings = (strings, queries) => {
  let contadores = [];
  
  for(let i = 0; i < queries.length; i++) {
    const query = queries[i];
    let contador = 0;
    
    for(let j = 0; j < strings.length; j++) {
      if(query == strings[j]) {
        contador++;
      }

      if(j === strings.length -1) {
        contadores.push(contador);
      }
    }
  }
  return contadores;
}

console.log(matchingStrings(strings, queries));