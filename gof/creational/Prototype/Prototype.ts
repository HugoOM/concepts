/*
  Instantiate multiple instances of an object from one given instance that can clone itself.

  This pattern prevent having to couple with a specific class.

  Context: Car manufacturer: a single Car, where you need multiple identical copies
*/

interface Prototype {
  clone(): Prototype;
}

// Works with top-level class
class Car implements Prototype {
  windows: number;

  constructor(car?: Car) {
    if (!car) return;

    this.windows = car.windows;
  }

  clone(): Car {
    return new Car(this);
  }
}

// Works with subclasses
class Civic extends Car {
  hasSpoiler: boolean;

  constructor(civic?: Civic) {
    super(civic);

    if (!civic) return;

    this.hasSpoiler = true;
  }

  //! MUST redefine clone in subclasses to prevent returning a parent
  clone(): Civic {
    return new Civic(this);
  }
}

//* Look into prototype registry as a lot of "templates" to clone from (can be a simple map)

/* Test code below */

const civic: Civic = new Civic();

console.log(civic);

civic.windows = 1550;

const civicCp: Civic = civic.clone();

console.log(civicCp);
