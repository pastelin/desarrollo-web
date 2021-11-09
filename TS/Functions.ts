/**
 * Functions are the basic building block of any application, whether they’re local functions, imported from another module, or methods on a class
 * 
 * Function Type Expressions
 * 
 * The simplest way to describe a function is with a function type expression. These types are syntactically similar to arrow functions:
 */

// 01 - The syntax (a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”. 
function greeter(fn: (a: string) => void) {
    fn("Hello, World!");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole);

// 02 - we can use a type alias to name a function type

type GreatFunction = (a: string) => void;
function greeter2(fn: GreatFunction) {
    //...
}

/**
 * Call Signatures
 * 
 * In JavaScript, functions can have properties in addition to being callable. However, the function type expression syntax doesn’t allow for declaring properties.
 * If we want to describe something callable with properties, we can write a call signature in an object type:
 */

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

/**
 * Construct Signatures
 * 
 * JavaScript functions can also be invoked with the new operator. TypeScript refers to these as constructors because they usually create a new object
 * You can write a construct signature by adding the new keyword in front of a call signature:
 * 
 */

type SomeConstructor = {
    new (s: string): any;
};

function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

// Some objects, like JavaScript’s Date object, can be called with or without new. You can combine call and construct signatures in the same type arbitrarily:
interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}


/**
 * Generic Functions
 * 
 * In TypeScript, generics are used when we want to describe a correspondence between two values. We do this by declaring a type parameter in the function signature:
 * 
 * By adding a type parameter Type to this function and using it in two places, we’ve created a link between the input of the function (the array) and the output (the return value)
 * 
 */

function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
}

// s is of type 'string'
const s = firstElement(["a","b","c"]);
// n is of type 'number'
const n = firstElement([1,2,3]);

/**
 * Inference
 * 
 * TypeScript could infer both the type of the Input type parameter (from the given string array), as well as the Output type parameter based on the 
 * return value of the function expression (number).
 * 
 */

function map<Input, Output>(arr: Input[], func:(arg: Input) => Output): Output[] {
    return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));


/**
 * Constraints
 * 
 * we can use a constraint to limit the kinds of types that a type parameter can accept.
 * We constrain the type parameter to that type by writing an extends clause:
 * Because we constrained Type to { length: number }, we were allowed to access the .length property of the a and b parameters
 * Without the type constraint, we wouldn’t be able to access those properties because the values might have been some other type without a length property.
 * 
 * 
 */

function longest<Type extends { length: number; }>(a:Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } 
    else {
        return b;
    }
}

// LongerArray is of type 'number[]'
const longerArray = longest([1,2], [1,2,3]);
// LongerString is of type 'string'
const longerString = longest("alice", "bob");
// Error! numbers don't have a 'length' property
const notOk = longest(10,100);

// Working with Constrained Values 
// Here’s a common error when working with generic constraints:

function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
): Type {

    if (obj.length >= minimum) {
        return obj;
    }
    else {
        return {length: minimum};
    }

}

// It might look like this function is OK - Type is constrained to { length: number }, and the function either returns Type or a value matching that constraint.
// The problem is that the function promises to return the same kind of object as was passed in, not just some object matching the constraint.

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));

/**
 * Specifying Type Arguments
 * 
 * TypeScript can usually infer the intended type arguments in a generic call, but not always. For example, let’s say you wrote a function to combine two arrays:
 */

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

// Normally it would be an error to call this function with mismatched arrays:
const arr2 = combine([1,2,3], ["hello"]);

// If you intended to do this, however, you could manually specify Type:
const arr3 = combine<string | number>([1,2,3], ["hello"]);}


// Here are two ways of writing a function that appear similar:

function firstElement2<Type>(arr: Type[]) {
    return arr[0];
}

function firstElement3<Type extends any[]>(arr: Type) {
    return arr[0];
}

// a: number (good)
const a = firstElement2([1,2,3]);
// b: any (bad)
const b = firstElement3([1,2,3]);

/** 
 * Use Fewer Type Parameters 
 * 
 * Func doesn’t do anything but make the function harder to read and reason about!
 * Rule: Always use as few type parameters as possible
 */

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
): Type[] {

    return arr.filter(func);
}

/**
 * Type Parameters Should Appear Twice
 * 
 * Sometimes we forget that a function might not need to be generic: 
 * 
 * Remember, type parameters are for relating the types of multiple values. If a type parameter is only used once in the function signature, it’s not relating anything.
 * Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it
 */

function greet<Str extends string>(s: Str) {
    console.log("Hello, " + s);
}

greet("world");

// We could just as easily have written a simpler version:

function greet2(s: string) {
    console.log("Hello, " + s);
}

/**
 * Optional Parameters
 * 
 * Functions in JavaScript often take a variable number of arguments. For example, the toFixed method of number takes an optional digit count:
 */

function f(n: number) {
    console.log(n.toFixed());// 0 arguments
    console.log(n.toFixed(3)); // 1 argument
}

// We can model this in TypeScript by marking the parameter as optional with ?:
function f2(x?: number) {
    // ...
}

f2(); // Ok
f2(10); // Ok

// You can also provide a parameter default:
function f3(x = 10) {
    // ...
}

// Optional Parameters in Callbacks
// Once you’ve learned about optional parameters and function type expressions, it’s very easy to make the following mistakes when writing functions that invoke callbacks:

function myForEach(arr: any[], callback: (arg: any, index?: number) => void ) {
    for(let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

// What people usually intend when writing index? as an optional parameter is that they want both of these calls to be legal:
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// What this actually means is that callback might get invoked with one argument. In other words, the function definition says that the implementation might look like this:

function myForEach2(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      // I don't feel like providing the index today
      callback(arr[i]);
    }
  }

// In turn, TypeScript will enforce this meaning and issue errors that aren’t really possible

myForEach2([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
});

// if you call a function with more arguments than there are parameters, the extra arguments are simply ignored.
// TypeScript behaves the same way. Functions with fewer parameters (of the same types) can always take the place of functions with more parameters.

/**
 * Function Overloads
 * 
 *  When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
 * 
 * Always prefer parameters with union types instead of overloads when possible
 * 
 * In TypeScript, we can specify a function that can be called in different ways by writing overload signatures.
 * To do this, write some number of function signatures (usually two or more), followed by the body of the function:
 */

// In this example, we wrote two overloads: one accepting one argument, and another accepting three arguments. These first two signatures are called the overload signatures.

function makeDate(timestamp: number): Date;

function makeDate(m: number, d: number, y: number): Date;

function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if ( d!== undefined && y !== undefined ) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

// The implementation signature must also be compatible with the overload signatures. 
// los tipos de datos deben ser los mismos tanto para los parametros como para los tipo de retorno

function fn1(x: boolean): void;
// Argument  type isn't right
function fn1(x: string): void;

function fn1(x: boolean) {}

// Writing Good Overloads

function len(s: string | any[]): number;
function len(x: any) {
    return x.length;
}

len("");
len([0]);
len(Math.random() > 0.5 ? "Hello" : [0]);

/**
 * Declaring this in a Function
 * 
 * TypeScript will infer what the this should be in a function via code flow analysis
 */

interface User {
    id: number;
    isAdmin: boolean;
    admin: boolean;
}
declare const getDB: () => DB;

const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    }
}

// The JavaScript specification states that you cannot have a parameter called this, and so TypeScript 
// uses that syntax space to let you declare the type for this in the function body.

interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
    return this.admin;
});

// This pattern is common with callback-style APIs, where another object typically controls when your function is called. 
// Note that you need to use function and not arrow functions to get this behavior:

// The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
const admins2 = db.filterUsers( () => this.admin );

/**
 * Other Types to Know AboutOther Types to Know About
 * 
 */

// void represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements
// The inferred return type is void, In JavaScript, a function that doesn’t return any value will implicitly return the value undefined
// However, void and undefined are not the same thing in TypeScript.

function noop() {
    return;
  }

// object refers to any value that isn’t a primitive (string, number, boolean, symbol, null, or undefined). This is different from the empty object type { }
// object is not Object. Always use object!


// unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:

function f1(a: any) {
    a.b(); // Ok
}

function f4(a: unknown) {
    a.b();
}

// This is useful when describing function types because you can describe functions that accept any value without having any values in your function body.
declare const someRandomString: string;

function safeParse(s: string): unknown {
    return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);

// The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.
// never also appears when TypeScript determines there’s nothing left in a union.

function fail(msg: string): never {
    throw new Error(msg);
}

function fn5(x: string | number) {
    if (typeof x === "string") {
      // do something
    } else if (typeof x === "number") {
      // do something else
    } else {
      x; // has type 'never'!
    }
  }


// Function describes properties like bind, call, apply, and others present on all function values in JavaScript. It also has the special property that values 
// of type Function can always be called; these calls return any:

function doSomething1(f: Function) {
    f(1, 2, 3);
}

/**
 * Rest Parameters and Arguments
 * 
 * In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts
 * we can also define functions that take an unbounded number of arguments using rest parameters.
 * A rest parameter appears after all other parameters, and uses the ... syntax:
 */

 function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
  }
  // 'a' gets value [10, 20, 30, 40]
  const a1 = multiply(10, 1, 2, 3, 4);


  // Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);

// Inferred as 2-length tuple
const args1 = [8, 5] as const;
// OK
const angle1 = Math.atan2(...args1);


/**
 * Parameter Destructuring
 * 
 * You can use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body.
 * 
 */

function sum({ a, b, c }: { a: number; b: number; c: number }) {
   console.log(a + b + c);
}

// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum1({ a, b, c }: ABC) {
  console.log(a + b + c);
}

/**
 * Assignability of Functions
 * 
 * 
 */