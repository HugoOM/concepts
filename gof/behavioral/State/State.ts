/*
  Determines a finite number of states a program can be in, and the possible transitions
    between said states, which are also finite and predetermined.

  Context: Car manufacturing machine has multiple modes and defined transitions between those.
*/

abstract class State {
  protected machine: Machine;

  setMachine(machine: Machine): void {
    this.machine = machine;
  }

  abstract process(): void;
  abstract transitionToNextState(): void;
}

// The "Context"
class Machine {
  state: State;

  constructor(state: State) {
    this.changeState(state);
  }

  changeState(state: State) {
    this.state = state;
    this.state.setMachine(this);
  }

  process() {
    this.state.process();
  }
}

class InitialState extends State {
  process() {
    console.log("{Initial} Loading part in the machine");
    this.transitionToNextState();
  }

  transitionToNextState() {
    this.machine.changeState(new WorkingState());
  }
}

class WorkingState extends State {
  process() {
    console.log("{Working} Processing the part!");
    this.transitionToNextState();
  }

  transitionToNextState() {
    this.machine.changeState(new CompletedState());
  }
}

class CompletedState extends State {
  process() {
    console.log("{Completed} Packaging the part - It is now ready for pickup!");
    this.transitionToNextState();
  }

  transitionToNextState() {
    console.log(
      "Machine has finished processing the part -- No further forward state transition"
    );
  }
}

/* Test Code Below */
const machine = new Machine(new InitialState());
machine.process();
machine.process();
machine.process();

machine.changeState(new InitialState());
machine.process();
machine.process();
