/*
  Wrap the interface of an object so that another object can understand it.
  
  Context: Car manufacturer trying to use existing.3 Tractor-related automation

  *This is the "Object" version of the Adapter pattern. A "Class" version also exists, where the Adapter inherits
  * from both the client & the service, and relies on overrides instead of wrapping the service.
*/

// The Client Interface - Defines what the client's methods are and how it interacts with the service
interface Car {
  trunkSizeInCubicMeters: number;

  carryLoad(): string;
}

// The Client
class ConcreteCar implements Car {
  trunkSizeInCubicMeters: number;

  carryLoad(): string {
    return "Cannot carry a load - No bin in a car!";
  }
}

// The Service - Imagining we have no control over it/it cannot be modified
class Tractor {
  binSizeInCubicMeters: number;

  carryLoadInBin(): string {
    return `Carrying a load of ${this.binSizeInCubicMeters} cubic meters`;
  }
}

// Wrap the Tractor in an Adapter that's also a Car; follows the Car interface
//* The client should use the adapter through methods defined in the Car (common) interface
class Adapter implements Car {
  private tractor: Tractor;

  trunkSizeInCubicMeters: number;

  constructor(tractor: Tractor) {
    this.tractor = tractor;
  }

  // Adapt the Car's method to use the new functionality provided by the Tractor (service object)
  carryLoad(): string {
    this.tractor.binSizeInCubicMeters = this.trunkSizeInCubicMeters;
    return this.tractor.carryLoadInBin();
  }
}

/* Test Code Below */

const car: ConcreteCar = new ConcreteCar();
console.log("Carrying load from Car:", car.carryLoad());

const tractor: Tractor = new Tractor();
tractor.binSizeInCubicMeters = 55;
console.log("Carrying load from Tractor:", tractor.carryLoadInBin());

const adapter: Adapter = new Adapter(tractor);
adapter.trunkSizeInCubicMeters = 25;
console.log("Carrying load from Car through Adapter:", adapter.carryLoad());
