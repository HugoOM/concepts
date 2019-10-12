/*
  Split a massive class or set of inter-dependent class separating it into 2 hierarchies, the abstraction and the implementation, and wrapping the latter inside the former.

  This has the effect of reducing coupling, and respecting the Open/Closed Principle. 

  Context: Vehicle manufacturer. Some generic vehicle part can be used for multiple different vehicle types.

  Note: This pattern prevents having over-specified mass inheritance -> CarWheel, BoatWheel, ... 
*/

//* By having the Vehicle (implementation) wrapped in the Wheel (abstraction), those two are now "independent".
//*   The abstraction class can also be extended without impacting the abstraction
class Wheel {
  private vehicle: Vehicle;

  isInstalled: boolean = true;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  turnLeft(): void {
    this.vehicle.changeDirectionLeft();
  }

  turnRight(): void {
    this.vehicle.changeDirectionRight();
  }

  checkIfInstalled(): boolean {
    return this.isInstalled;
  }
}

interface Vehicle {
  changeDirectionLeft(): void;
  changeDirectionRight(): void;
}

class Boat implements Vehicle {
  changeDirectionLeft(): void {
    console.log("Boat is turning left");
  }
  changeDirectionRight(): void {
    console.log("Boat is turning right");
  }
}

class Car implements Vehicle {
  changeDirectionLeft(): void {
    console.log("Car is turning left");
  }
  changeDirectionRight(): void {
    console.log("Car is turning right");
  }
}

/* Test Code Below */

let wheel: Wheel = new Wheel(new Car());
wheel.turnLeft();

wheel = new Wheel(new Boat());
wheel.turnRight();
