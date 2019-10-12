/*
  Extract behavior-related (i.e. exporting as format XYZ) logic from object's business logic, and
    centralize it in an external inheritance-chain to cater to various sources types. 

  This pattern relies on a technique called "Double Dispatch", which enables using 
    Dynamic Binding along with overloaded methods. (Method overloading does not exist per say in TS)

  Context: A Car manufacturer needs to package his cars, in various ways, for delivery after completing 
    the assembly. While it would be possible for the various machines on the assembly line 
    to package it themselves, that would be highly inefficient ... 
*/

interface Machine {
  accept(visitor: Visitor): void;
}

// The "Visitor" interface
interface Visitor {
  visitWheel(wheel: WheelMachine): void;
  visitDoor(door: DoorMachine): void;
}

class Packager implements Visitor {
  visitWheel(wheel: WheelMachine): void {
    console.log("Packaging Wheel!");
  }

  visitDoor(door: DoorMachine): void {
    door.removeHandle();
    console.log("Packaging Door!");
  }
}

class WheelMachine implements Machine {
  accept(visitor: Visitor) {
    visitor.visitWheel(this);
  }
}

class DoorMachine implements Machine {
  accept(visitor: Visitor) {
    visitor.visitDoor(this);
  }

  // Concrete components can have internal methods not defined by the interface,
  //  but which can still be called by the visitor.
  removeHandle(): void {
    console.log("Removing handle");
  }
}

/* Test Code Below */
const machines: Machine[] = [
  new WheelMachine(),
  new WheelMachine(),
  new DoorMachine(),
  new WheelMachine()
];

const packager = new Packager();

for (let machine of machines) machine.accept(packager);
