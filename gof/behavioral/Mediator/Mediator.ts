/*
  Break coupling by making all elements that need to interact together go through a single 
    "mediator" entity, which will then re-distribute the requests/events.

  A container can act as the mediator - I.E. The top-level parent component for it's children.

  Context: Car manufacturer, many machines producing parts which need to communicate between each
    others for coordination.
*/

abstract class Machine {
  protected mediator: Mediator;

  constructor(mediator: Mediator = null) {
    this.mediator = mediator;
  }

  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
}

interface Mediator {
  notify(sender: any, event: string): void;
}

class MachineSpace implements Mediator {
  private wheelMachine: WheelMachine;
  private rimsMachine: RimsMachine;

  constructor(wheelsMachine: WheelMachine, rimsMachine: RimsMachine) {
    this.wheelMachine = wheelsMachine;
    this.wheelMachine.setMediator(this);

    this.rimsMachine = rimsMachine;
    this.rimsMachine.setMediator(this);
  }

  // All the (cross) logic goes here
  notify(sender: any, event: string): void {
    if (event === "Wheel") {
      console.log(
        "{Wheel Machine} Finished Building Wheel --> Calling Mediator"
      );
      this.rimsMachine.buildRims(sender.wheel);
    } else if (event === "Rims") {
      console.log(
        "{Rims Machine} Finished Building Rims From Wheel received through Mediator"
      );
    }
  }
}

class WheelMachine extends Machine {
  private wheel: string;

  buildWheel(): void {
    this.wheel = "A Wheel!";
    this.mediator.notify(this, "Wheel");
  }
}

class RimsMachine extends Machine {
  buildRims(wheel: string): void {
    if (!!wheel) this.mediator.notify(this, "Rims");
  }
}

/* Test Code Below */

const wheelMachine = new WheelMachine();
const rimsMachine = new RimsMachine();
const space = new MachineSpace(wheelMachine, rimsMachine);

wheelMachine.buildWheel();
