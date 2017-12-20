const { iWnt: iWant } = require( '../../i-wnt' );

let testObj = {
    deep: { deep: { dive: "Use Caution!" } },
    colors: {
        red: {
            val: "Red"
        },
        blue: {
            val: "Blue"
        },
        green: {
            val: "Green"
        },
        yellow: {
            val: "Yellow"
        }
    },
    test: {
        shapes: [
            {
                type: "Oval",
                val: {
                    color: "Red"
                }
            },
            {
                type: "Circle",
                val: {
                    color: "Blue"
                }
            },
            {
                type: "Rectangle",
                val: {
                    color: "Green"
                }
            },
            {
                type: "Square",
                val: {
                    color: "Yellow"
                }
            }
        ],
        deepShapes: {
            "Alpha": {
                type: "Oval",
                val: {
                    color: "Red",
                    other: { size: 1 }
                }
            },
            "Beta": {
                type: "Circle",
                val: {
                    color: "Blue",
                    other: { size: 2 }
                }
            },
            "Charlie": {
                type: "Rectangle",
                val: {
                    color: "Green",
                    other: { size: 3 }
                }
            },
            "Delta": {
                type: "Square",
                val: {
                    color: "Yellow",
                    other: { size: 4 }
                }
            }
        }
    },
    "escape.test": {
        "\"harder\"": {
            "'then.\"you\".think\\_3821'-4": "ya?"
        }
    }
};

let res1 = iWant( {
    Diver: "deep.deep.dive",

    Red: "colors.red.val",
    Blue: "colors.blue.val",
    Green: "colors.green.val",
    Yellow: "colors.yellow.val",

    Shapes: {
        path: "test.shapes",
        names: "type",
        values: "val.color"
    },
    DeepShapes: {
        path: "test.deepShapes",
        names: "",
        values: {
            color: 'val.color',
            size: 'val.other.size'
        }
    },
    NoSoHard: `escape\\.test."harder".'then\\."you"\\.think\\_3821'-4`
} ).from( testObj );

let res2 = iWant( 'colors.red.val' ).from( testObj );

console.log( res1 );
console.log( res2 );