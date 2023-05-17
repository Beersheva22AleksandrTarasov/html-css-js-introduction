class Rectangle {
    #width;
    #height;
    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }
    square(){
        return this.#width * this.#height;
    }
    perimeter(){
        return 2 * (this.#width + this.#height);
    }
}
const rectangle = new Rectangle(3, 4);
console.log(rectangle.square());
let c;
class Square extends Rectangle{
    constructor(width){
        super(width, width);
    }
}
const square = new Square(10);
console.log(square.perimeter());
Array.prototype.map = function(){
    console.log(this);
    return 'kuku'
};
const ar = [1, 2, 3];
console.log(ar.map());