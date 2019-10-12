/*
  Provides a simplified interface to a library, a framework, or any other complex set of classes.

  Creates a distance/separation between these implementation details and the current business logic.

  A facade doesn't have to provide an access to all the underlying functionalities of the "covered" item,
    only what is relevant to the 'client' code.

  Context: A Car manufacturer wants to certify his cars for crash-tests, using a system provided by the governing body for all motor vehicles.
*/

class Car {
  isSafetyCertified: boolean;
}

// The Facade - it could contain and/or call multiple subsystems (possible Additional Facade) to further simplify.
//  Those could also be usable as standalone facades.
class CarCertifier {
  certifyCar(car: Car) {
    HUGEVehicleCertificationLibrary.car = car;

    car.isSafetyCertified = HUGEVehicleCertificationLibrary.certifyCar();
  }
}

// The imaginary complex 3rd party code ...
class HUGEVehicleCertificationLibrary {
  // plane: Plane;
  // horse: Horse;
  // faa: FAA;
  // ...

  static car: Car;

  // certifyPlane()
  // certifyHorse()

  static certifyCar() {
    // Complex logic
    return this.crashTest(this.car);
  }

  static crashTest(vehicle) {
    return true;
  }
}

/* Test Code Below */

const car: Car = new Car();
new CarCertifier().certifyCar(car);

console.log(car.isSafetyCertified);
