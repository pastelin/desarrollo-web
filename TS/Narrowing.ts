
//TS indica que agregando un number a number | string no nos puede dar el resultado esperado
function padLeft(padding: number | string, input: string) {
    return new Array(padding + 1).join(" ") + input;
}

function padLeft2(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}

/**
 * typeof type guards
 * este operador puede darnos informacion basica acerca del tipo de dato de los valores, los cuales pueden ser los siguientes
 * "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"
 * 
 * valida contra el valor retornado por typeof que sea un tipo seguro.
 * arrays are object types in JavaScript
 * 
 * For example, notice that in the list above, typeof doesn’t return the string null. Check out the following example:
 */

function printAll(strs: string | string[] | null) {
    if (typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs);
    } else {
        // do nothing
    }
}

/**
 * Truthiness narrowing
 * la declaracion if no siempre espera una condicion de tipo booleana
 * 
 * constructs like if first “coerce” their conditions to booleans to make sense of them,
 * and then choose their branches depending on whether the result is true or false. Values like:  0, NaN, "", 0n, null, undefined
 * los valores mencionados anterior mente regresan false, 
 */

function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now`;
    }
    return "Nobody's here. :C";
}
 
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world";        // type: boolean, value: true

//One last word on narrowing by truthiness is that Boolean negations with ! filter out from negated branches.

function multiplyAll(
    values: number[] | undefined,
    factor: number): number[] | undefined {
    
        if (!values) {
            return values;
        }
        else {
            return values.map( (x) => x * factor )
        }

}

/**
 * Equality narrowing
 * 
 * JavaScript’s looser equality checks with == and != also get narrowed correctly.
 * checking whether something == null actually not only checks whether it is specifically the value null - it also checks whether it’s potentially undefined. 
 * The same applies to == undefined: it checks whether a value is either null or undefined.
 * 
 * TypeScript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. For example:
 * 
 */

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();
        y.toLowerCase();
    } 
    else {
        console.log(x);
        console.log(y);
    }
}

interface Container {
    value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type
    if (container.value != null) {
        console.log(container.value);
    }
    // Now we can safely multyply 'cantainer.value'.
    container.value *= factor;
}

/**
 * The in operator narrowing
 * 
 * Javascript has an operator for determining if an object has a property with a name: the in operator. TypeScript takes this into account as a way to 
 * narrow down potential types.
 * 
 */

type Fish = { swim: () => void };
type Bird = { fly: () => void }
type Human = { swim?: () => void, fly?: () => void }

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}

function move2(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
        animal
    }
    else {
        animal
    }
}

/**
 * instanceof narrowing
 * 
 * JavaScript has an operator for checking whether or not a value is an “instance” of another value. 
 * x instanceof Foo checks whether the prototype chain of x contains Foo.prototype. 
 * While we won’t dive deep here, and you’ll see more of this when we get into classes, they can still be useful for most values that can be constructed with new
 * 
 */

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}

/**
 * Assignments
 * 
 * when we assign to any variable, TypeScript looks at the right side of the assignment and narrows the left side appropriately.
 * 
 */

// En este ejemplo la variable 'x' puede recibir los valores de number o string, ya que se asigno implicitamente en la primera declaracion y asignacion
// y si se le pasara una tipo de dato diferente mandaria un error

let x = Math.random() < 0.5 ? 10 : "hellow world!";

x = 1;
console.log(x);

x = "goodbye!";
console.log(x);

x = true;

/**
 * Control flow analysis
 * 
 * This analysis of code based on reachability is called control flow analysis, and TypeScript uses this flow analysis to
 * narrow types as it encounters type guards and assignments. When a variable is analyzed, control flow can split off and re-merge over
 * and over again, and that variable can be observed to have a different type at each point.
 * 
 */

function padLeft3(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }

    return padding + input;
}

function example2() {
    let x: string | number | boolean;

    x = Math.random() < 0.5;
    console.log(x);

    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
    }
    else {
        x = 100;
        console.log(x);
    }
    return x;
}

/**
 * Using type predicates
 * 
 * We’ve worked with existing JavaScript constructs to handle narrowing so far, however sometimes you want more direct control over how types change throughout your code.
 * 
 * To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:
 */

// pet is Fish is our type predicate in this example
// A predicate takes the form parameterName is Type, where parameterName must be the name of a parameter from the current function signature.
// Any time isFish is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
let pet = {fly: () => void};

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

/**
 * Discriminated unions
 * 
 * most of the time in JavaScript we’ll be dealing with slightly more complex structures.
 * When every type in a union contains a common property with literal types, TypeScript considers that to be a discriminated union
 * kind was that common property (which is what’s considered a discriminant property of Shape).
 * 
 */

// Notice we’re using a union of string literal types: "circle" and "square" to tell us whether we should treat the shape as a circle or square respectively.
// By using "circle" | "square" instead of string, we can avoid misspelling issues.
interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape2 = Circle | Square;

function handleShape(shape: Shape) {
    // oops!
    if (shape.kind === "rect") {

    }
}

// TypeScript is telling us that shape might be a Square, and Squares don’t have radius defined on them!
function getArea(shape: Shape2) {
    return Math.PI * shape.radius ** 2;
}

function getArea2(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
}

function getArea3(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
  
      case "square":
        return shape.sideLength ** 2;
                
    }
  }

  /**
   * The never type
   * 
   * you can reduce the options of a union to a point where you have removed all possibilities and have nothing left.
   * In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.
   * 
   */

// Exhaustiveness checking
// The never type is assignable to every type; however, no type is assignable to never (except never itself). 
// This means you can use narrowing and rely on never turning up to do exhaustive checking in a switch statement.

function getArea4(shape: Shape2) {
    switch(shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// Adding a new member to the Shape union, will cause a TypeScript error:
interface Triangle {
    kind: "triangle";
    sideLength: number;
}

type Shape3 = Circle | Square | Triangle;

function getArea5(shape: Shape2) {
    switch(shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            // Type 'Triangle' is not assignable to type 'never'.
            return _exhaustiveCheck;
    }
}


