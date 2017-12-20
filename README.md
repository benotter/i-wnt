# i-wnt
A small lib to digest JSON or complex JavaScript Objects.

Install:

    npm install @otter-co/i-wnt

Usage:

    const { iWnt } = require('@otter-co/i-wnt');

    let someData = {
        clients: {
            persons:{
                otto: {
                    name: "Otto Otterson"
            }},
            people: [
                { id: 545, name: "Otto Otterson", age: 55, location: { city: "Redmond" } },
                { id: 546, name: "Olivia Otterson", age: 58, location: { city: "Redmond" } }
            ]
        },
        colors: {
            red: { val: "Red" },
            blue: { val: "Blue" },
            green: { val: "Green" }
        },
        shapes: [
            { type: "Rectangle", val: {color: "Red", other: { size: 1 } } },
            { type: "Square", val: { color: "Green", other: { size: 2 } } },
            { type: "Circle", val: { color: "Blue", other: { size: 3 } } }
        ],
        'complex\.example': { 'naming\."of"\.things': { "can\.get\.\"tricky\"": "ya?" } }
    };

    // Get Single Value
    let singleVal = iWnt('clients.persons.otto.name').from(someData);

    /**
    * "Otto Otterson"
    */
    console.log(singleVal);
    

    // Get Multiple Values
    let multiVal = iWnt({
        Red: 'colors.red.val',
        Blue: 'colors.blue.val',
        Green: 'colors.green.val'
    }).from(someData);

    /** 
    * { Red: 'Red', Blue: 'Blue', Green: 'Green' } 
    */
    console.log(multiVal); 


    // A bit more Complex Multiple Values
    let complexMultiVal = iWnt({
        // All Elements in People
        Clients_allData: 'clients.people',

        // Grab Client Ages stored under their names
        Clients_AgeByName: {
            path: 'clients.people',
            names: 'name',
            values: 'age'
        }
    }).from(someData);

    /**
    * { 
    *  Clients_allData: [ 
    *   { id: 545, name: 'Otto Otterson', age: 55, location: [Object] },
    *   { id: 546, name: 'Olivia Otterson', age: 58, location: [Object] } 
    * ],
    * Clients_AgeByName: { 
    *     'Otto Otterson': 55, 
    *     'Olivia Otterson': 58 
    * }}
    */
    console.log(complexMultiVal);


    // Deep Nested Value Grabbing
    let nestedVals = iWnt({
        // Grabs and Stores shape color and size under their type
        Shapes: {
            path: 'shapes',
            names: 'type',
            values: {
                color: 'val.color',
                size: 'val.other.size'
            }
        },

        //Grabs Client Details and Stores by ID
        Clients: {
            path: 'clients.people',
            names: 'id',
            values: {
                name: 'name',
                age: 'age',
                city: 'location.city'
            }
        }
    }).from(someData);

    /**
    * { 
    * Shapes:
    * { 
    *   Rectangle: { color: 'Red', size: 1 },
    *   Square: { color: 'Green', size: 2 },
    *   Circle: { color: 'Blue', size: 3 } 
    * },
    * Clients:
    * { 
    *   '545': { name: 'Otto Otterson', age: 55, city: 'Redmond' },
    *   '546': { name: 'Olivia Otterson', age: 58, city: 'Redmond' } 
    * }}
    */
    console.log(nestedVals);