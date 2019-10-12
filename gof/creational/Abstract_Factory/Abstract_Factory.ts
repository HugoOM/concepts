/*
  Produce multiple related objects (families) from a same generic class hierarchy

  Context: Car manufacturer with multiple lines / types of cars
*/

interface Car {
  drive(): void;
}

interface SUV {
  drive(): void;
}

interface Truck {
  drive(): void;
}

interface VehicleFactory {
  createCar(): Car;
  createSUV(): SUV;
  createTruck?(): Truck;
}

class DeluxeCar implements Car {
  drive() {
    console.log("Driving a Deluxe Car");
  }
}
class DeluxeSUV implements SUV {
  drive() {
    console.log("Driving a Deluxe SUV");
  }
}
class DeluxeTruck implements Truck {
  drive() {
    console.log("Driving a Deluxe Truck");
  }
}

class CheapCar implements Car {
  drive() {
    console.log("Driving a Cheap Car");
  }
}
class CheapSUV implements SUV {
  drive() {
    console.log("Driving a Cheap Car");
  }
}
class CheapTruck implements Truck {
  drive() {
    console.log("Driving a Cheap Truck");
  }
}

class DeluxeVehicleFactory implements VehicleFactory {
  createCar() {
    return new DeluxeCar();
  }

  createSUV() {
    return new DeluxeSUV();
  }

  createTruck() {
    return new DeluxeTruck();
  }
}

class CheapVehicleFactory implements VehicleFactory {
  createCar() {
    return new CheapCar();
  }

  createSUV() {
    return new CheapSUV();
  }
}

/* Testing Code Below */

class SomeVehicleCompany {
  constructor(factory: VehicleFactory) {
    this.factory = factory;
  }

  factory: VehicleFactory;
}

const deluxeCompany: SomeVehicleCompany = new SomeVehicleCompany(
  new DeluxeVehicleFactory()
);

const cheapCompany: SomeVehicleCompany = new SomeVehicleCompany(
  new CheapVehicleFactory()
);

deluxeCompany.factory.createCar().drive();
cheapCompany.factory.createCar().drive();
