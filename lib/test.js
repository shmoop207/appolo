var date = new Date().getTime();
var Rectangle = appolo.Class.define(function () {


    this.constructor = function (width, height) {
        this.height = height;
        this.width = width;
    };

    this.area = function () {
        return this.width * this.height;
    };
});

var rectangle = new Rectangle(3, 7);
console.log(rectangle.area());
var Events = appolo.Class.define(function () {

    this.bind = function (event, fn) {
        return true;
    };

    this.unbind = function (event, fn) {
        return false;
    };
});
var Square =  appolo.Class.define({
    extend: Rectangle,
    test:'aaaa',
    statics: {
        MIN_AGE:   1,
        MAX_AGE: 150
    },
    properties : {
        foo: 'foo',
        total: 0,
        initialized: false,
        other: undefined
    },
    mixins: [Events]
}, function (base) {
    this.constructor = function (side) {

        this.callParent('constructor', side, side);

    };
});

var square = new Square(5);
console.log(square.area());



var Cube = Square.define(function (base) {

    this.constructor = function (side) {

        this.callParent('constructor', side);
        this.side = side;

        console.log('call parent constructor');

    };

    this.area = function () {
        return 6 * base.area.call(this);
    };

    this.volume = function () {
        return this.side * base.area.call(this);
    };
});

var Conus = Cube.define(function (base) {

    var working = "working";

    //this.constructor = function (side) {
    //    console.log(working);
    //};
});

var cube = new Cube(5);
console.log(cube.volume());
console.log(cube.area());
console.log(Square.MIN_AGE);

console.log(square.bind());

console.log(square.getFoo());

var defaults = {
    timeout: false,
    name: 'example',
};
var opts = {
    name: 'blogpost',
    kooko:'aaaaa'
};

var test = appolo.Object.extend({}, defaults, opts);

console.log(defaults,test);

var conss = new Conus();

console.log(new Date().getTime() - date);




var rectangle = new Fundrs.Test.Rectangle(3, 7);
console.log(rectangle.area());
console.log(Fundrs.Test.Rectangle.MIN_AGE);

var Square = Fundrs.Test.Rectangle.define(function () {
    this.constructor = function (side) {
        this.callParent('constructor', side, side);
    };
});

var square = new Square(5);
console.log(square.area());

var Cube = Square.define(function (base) {
    this.constructor = function (side) {
        this.callParent('constructor', side);
        this.side = side;
    };

    this.area = function () {
        return 6 * this.callParent('area');
    };

    this.volume = function () {
        return this.side * this.callParent('area');
    };
});

var cube = new Cube(5);
console.log(cube.volume());
console.log(cube.area());