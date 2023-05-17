// write myForEach to call from any array with the same behavioral as the standard forEach
// write myMap to call from any array
// write myFilter
// write myReduce

Array.prototype.myForEach = function (func) {
    for (let i = 0; i < this.length; i++) {
        func(this[i], i, this);
    }
}
const array = [1, 2, 3, 4, 5];

array.myForEach(n => console.log(n));

Array.prototype.myMap = function (func) {
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray[i] = func(this[i], i, this);
    }
    return newArray;
}

console.log(array.myMap(n => n + 1));

Array.prototype.myFilter = function (func) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (func(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
}

console.log(array.myFilter(n => n > 3));

Array.prototype.myReduce = function (func, value) {
    let res = value;
    let i = 0;
    if (value == undefined) {
        res = this[0];
        i = 1;
    }
    if (res != undefined) {
        for (i; i < this.length; i++) {
            res = func(res, this[i], i, this);
        }
    }
    return res;
}

console.log(array.myReduce(((a, b) => a + b), 10));

class Deferred {
    ar = [];
    then(func) {
        this.ar.push(func)
    }

    resolve(e1) {
        this.ar.forEach(func => e1 = func(e1));
    }
}

const d = new Deferred()

d.then(function (res) {
    console.log("1 ", res);
    return "a";
});

d.then(function (res) {
    console.log("2 ", res);
    return "b";
});

d.then(function (res) {
    console.log("3 ", res);
    return "c";
});

d.resolve('hello');

// 1  hello
// 2  a
// 3  b