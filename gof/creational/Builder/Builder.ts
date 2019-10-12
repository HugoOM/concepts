/*
  Instantiate and configure complex objects from a single source in a composition-based manner.

  Context: Car manufacturer: a single vehicle with multiple possible configurations & options
*/

enum CAR_TYPES {
  "SIMPLE",
  "FULL"
}

class Car {
  wheels: number;
  windows: {
    count: number;
    tintHue: number;
  };
  doors: number;
  hasSunroof: boolean = false;
  hasTrunk: boolean = false;
}

//? Is generic as a high-level "Builder", but that could make a very big builder class
//? that's highly unspecific, or very light builder that don't encompass much
interface Builder {
  reset(): void;
  setWheels(count: number): void;
  setWindows(count: number, tintHue: number): void;
  setDoors(count: number): void;
  addSunroof(): void;
  addTrunk(): void;
  getResult(): Car;
}

class CarBuilder implements Builder {
  private car: Car = new Car();

  reset() {
    this.car = new Car();
  }

  setWheels(count: number) {
    this.car.wheels = count;
  }

  setWindows(count: number, tintHue: number) {
    this.car.windows = {
      count,
      tintHue
    };
  }

  setDoors(count: number) {
    this.car.doors = count;
  }

  addSunroof() {
    this.car.hasSunroof = true;
  }

  addTrunk() {
    this.car.hasTrunk = true;
  }

  getResult() {
    return this.car;
  }
}

class Director {
  builder: Builder = new CarBuilder();

  changeBuilder(builder: Builder): void {}

  make(type: CAR_TYPES): any {
    this.builder.reset();

    this.builder.setWindows(4, 0);
    this.builder.setDoors(2);

    if (type === CAR_TYPES.FULL) this.builder.addSunroof();

    return this.builder.getResult();
  }
}

/* Testing Code Below */

const director: Director = new Director();

const testCarFull: Car = director.make(CAR_TYPES.FULL);

console.log(testCarFull);

const testCarSimple: Car = director.make(CAR_TYPES.SIMPLE);

console.log(testCarSimple);
