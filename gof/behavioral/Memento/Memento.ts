/*
  Save & Restore the state of an object, without revealing the details of its implementation.

  Implementation options: 
    1. Memento nested in the Originator class.
    2. Intermediate interface -> Memento's members need to be "Public" for Originator to access
    *3. Strict encapsulation  -> Interface for both Originator and Memento, One concrete Originator matching
    *  one concrete Memento every time. The Originator is passed to the Memento on initialization.

  Context: Car manufacturer has machines that needs to track operations that they do on a component,
    which can also be reversed.
*/

interface Memento {
  restore(): void;
}

interface Originator {
  save(): Memento;
}

class Machine implements Originator {
  // Would normally be multiple members, but for simplicity's sake made into one
  private state: string;

  save(): MachineMemento {
    return new MachineMemento(this, this.state);
  }

  setState(state: string) {
    this.state = state;
  }

  // Example & test business logic
  printState(): void {
    console.log(this.state);
  }
}

class MachineMemento implements Memento {
  private originator: Machine;
  private state: string;

  constructor(originator: Machine, state: string) {
    this.originator = originator;
    this.state = state;
  }

  restore() {
    this.originator.setState(this.state);
  }
}

class Caretaker {
  private history: Memento[] = [];

  undo(): void {
    this.history.pop().restore();
  }

  //? Not sure, but how else would the Caretaker receive the mementos?
  backup(memento: Memento) {
    this.history.push(memento);
  }
}

/* Test Code Below */
const caretaker: Caretaker = new Caretaker();
const machine: Machine = new Machine();

machine.setState("State A");
machine.printState();
caretaker.backup(machine.save());

machine.setState("State B");
machine.printState();
caretaker.backup(machine.save());

machine.setState("State C");
machine.printState();

caretaker.undo();
machine.printState();
caretaker.undo();
machine.printState();
