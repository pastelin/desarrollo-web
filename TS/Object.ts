/**
 * Object types
 * 
 * In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through object types.
 */

// anonymous
function greet(person: { name: string; age: number }) {
    return "Hello " + person.name;
}

const i = 10;
let varfd;
let varfdc = 2;

// can be named by using either an interface
interface Person {
    name: string;
    age: number;
}

function gree2(person: Person) {
    return "Hello " + person.name;
}

// or type alias 
type Persona = {
    name: string;
    age: number;
}

function greet3(persona: Persona) {
    return "Hello " + persona.name;
}

/**
 * Property Modifiers
 * 
 * Each property in an object type can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.
 *
 * Optional Properties: Much of the time, we’ll find ourselves dealing with objects that might have a property set. In those cases
 * we can mark those properties as optional by adding a question mark (?) to the end of their names.
 * en este caso de intentar usar una propiedad opcionar arrojara un error ya que puede recibir un tipo undefined
 * 
 *  
 */

interface Shape { }
declare function getShape(): Shape;

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    // ...
}

const shape = getShape;
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// In JavaScript, even if the property has never been set, we can still access it - it’s just going to give us the value undefined. We can just handle undefined specially.

function paintShape2(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
}

// Note that this pattern of setting defaults for unspecified values is so common that JavaScript has syntax to support it
// Here we used a destructuring pattern for paintShape’s parameter, and provided default values for xPos and yPos.


function paintShape3({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log("y cordinate at", yPos);
}

/**
 * readonly Properties
 * 
 * Properties can also be marked as readonly for TypeScript. While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.
 * 
 */


interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'
    console.log(`prop has the value '${obj.prop}'.`);

    // But we can't re-assign it
    obj.prop = "Hello";
}

// Using the readonly modifier doesn’t necessarily imply that a value is totally immutable - or in other words,
// that its internal contents can’t be changed. It just means the property itself can’t be re-written to.

interface Home {
    readonly resident: { name: string, age: number };
}

function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'
    console.log(`happy birthday ${home.resident.name}!`);
    home.resident.age++;
}

function evit(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'
    home.resident = {
        name: "Victor the Evictor",
        arguments: 42
    };
}

/**
 * Index Signatures
 * 
 * Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values
 * In those cases you can use an index signature to describe the types of possible values, for example:
 */

declare function getStringArray(): StringArray;
// ---cut---
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
//     ^?

// In the following example, name’s type does not match the string index’s type, and the type checker gives an error:

interface NumberDictionary {
    [index: string]: number;
    length: number; //ok
    name: string;
}

// However, properties of different types are acceptable if the index signature is a union of the property types:

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:

declare function getReadOnlyStringArray(): ReadonlyStringArray;

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = getReadOnlyStringArray();
myArray2[2] = "Mallory";


/**
 * Extending Types
 * 
 * It’s pretty common to have types that might be more specific versions of other types.
 * The extends keyword on an interface allows us to effectively copy members from other named types, and add whatever new members we want.
 * interfaces can also extend from multiple types.
 */

interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
    unit: string;
}

interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle { }

const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};


/**
 * Intersection Types
 * 
 * interfaces allowed us to build up new types from other types by extending them.
 * TypeScript provides another construct called intersection types that is mainly used to combine existing object types.
 * 
 */

interface ColorFul {
    color: string;
}

interface Circle {
    radius: number
}

type ColorfulCircle2 = ColorFul & Circle;

function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });


// The principle difference between the two is how conflicts are handled, and that difference is typically one of the main
// reasons why you’d pick one over the other between an interface and a type alias of an intersection type.


/**
 * Generic Object Types
 * 
 * We could instead use unknown, but that would mean that in cases where we already know the type of contents,
 * we’d need to do precautionary checks, or use error-prone type assertions.
 */

interface Box {
    contents: unknown;
}

let x: Box = {
    contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
    console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());

// One type safe approach would be to instead scaffold out different Box types for every type of contents.
interface NumberBox {
    contents: number;
}

interface StringBox {
    contents: string;
}

interface BooleanBox {
    contents: boolean;
}

// But that means we’ll have to create different functions, or overloads of functions, to operate on these types.

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
}

interface Box2<Type> {
    contents: Type;
}
interface StringBox {
    contents: string;
}

let boxA: Box2<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "world" };
boxB.contents;

/**
 * The Array Type
 * 
 * Generic object types are often some sort of container type that work independently of the type of elements they contain
 * It’s ideal for data structures to work this way so that they’re re-usable across different data types
 * 
 * 
 */
function doSomething2(value: Array<string>) {
    // ...
}

let myArray3: string[] = ["hello", "world"];

// either of these work!
doSomething2(myArray3);
doSomething2(new Array("hello", "world"));

/**
 * The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.
 * 
 */


function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate 'values'.
    values.push("hello!");
}

// Unlike Array, there isn’t a ReadonlyArray constructor that we can use.

new ReadonlyArray("red", "green", "blue");

// Instead, we can assign regular Arrays to ReadonlyArrays.

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

// One last thing to note is that unlike the readonly property modifier, assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.

let x1: readonly string[] = [];
let y1: string[] = [];

x1 = y1;
y1 = x1;


/**
 * Tuple Types
 * 
 * A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
 */

type StringNumberPair = [string, number];

// StringNumberPair is a tuple type of string and number. Like ReadonlyArray, it has no representation at runtime, but is significant to TypeScript.
// To the type system, StringNumberPair describes arrays whose 0 index contains a string and whose 1 index contains a number.

function doSomething3(pair: [string, number]) {
    const a = pair[0];

    const b = pair[1];
}

doSomething3(["hello", 42]);

function doSomething4(stringHash: [string, number]) {
    const [inputString, hash] = stringHash;

    console.log(inputString);
    //          ^?

    console.log(hash);
    //          ^?
}

interface StringNumberPair1 {
    // specialized properties
    length: 2;
    0: string;
    1: number;
  
    // Other 'Array<string | number>' members...
    slice(start?: number, end?: number): Array<string | number>;
  }