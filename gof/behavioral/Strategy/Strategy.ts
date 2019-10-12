/* 
  Extract multiple different logic (that aims at the same end-goal) into a different object
    structure called "strategies", which the context contains and which are interchangeable.

  This ensures that the processing logics stays independent from each other. The Context
    doesn't need to care about which strategy is in place currently (the client code manages that)
    and so the processing logic can be swapped at runtime and new strategies can be added without
    impact the logic already in place.

  Context: A vehicle manufacturer uses a single machine to process a piece of steel for many different 
    types of vehicles.
*/

// The "Context"
class Machine {
  machineStrategy: MachineStrategy;

  processPart() {
    this.machineStrategy.processPart();
  }

  changePartTypeMode(machineStrategy: MachineStrategy) {
    this.machineStrategy = machineStrategy;
  }
}

interface MachineStrategy {
  processPart(): void;
}

class CarStrategy implements MachineStrategy {
  processPart() {
    console.log("{Car} Processing Part");
  }
}

class TrainStrategy implements MachineStrategy {
  processPart() {
    console.log("{Train} Processing Part");
  }
}

class TruckStrategy implements MachineStrategy {
  processPart() {
    console.log("{Truck} Processing Part");
  }
}

/* Test Code Below */
const machine = new Machine();

machine.changePartTypeMode(new CarStrategy());
machine.processPart();

machine.changePartTypeMode(new TrainStrategy());
machine.processPart();

machine.changePartTypeMode(new TruckStrategy());
machine.processPart();
