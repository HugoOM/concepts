/*
  Middle-layer between items and their business behavior to prevent coupling between layers (i.e. UI and Business Logic)
    and allows for redefining the behavior of an element at runtime.

  Commands should be self contained, with a single method that takes no params. Either the params are pre-configured
    or the command has a way to get fetch it from the "caller" directly.

  This pattern allows for implementation of queues, deference, etc.

  Context: Car manufacturer, multiple assembly lines need a same component from storage, for which
    a request needs to be put in for it to be delivered.
*/

type Component = {
  name: string;
  number: number;
};

// The Sender (or Invoker)
class AssemblyLine {
  private partsCommand: Command;

  setPartsCommand(command: Command) {
    this.partsCommand = command;
  }

  requestCarComponent() {
    this.partsCommand.execute();
  }
}

interface Command {
  execute(): void;
}

// For very simple commands, it can be valid to put the business logic directly inside
//  the "execute" method of the Command, as opposed to calling a "Receiver".
//  It is also valid for complex command to compose/assemble multiple simple commands.
class RequestComponentFromStorage implements Command {
  componentName: string;
  receiver: CarComponentsStorage;

  constructor(componentName: string, receiver: CarComponentsStorage) {
    this.componentName = componentName;
    this.receiver = receiver;
  }

  execute(): void {
    this.receiver.deliver(this.componentName);
  }
}

// The Receiver
class CarComponentsStorage {
  components: Component[];

  constructor(components: Component[]) {
    this.components = components;
  }

  deliver(componentName: string): Component {
    const component = this.components.find(
      component => component.name === componentName
    );

    if (!component) return null;

    console.log(`Component ${component.name} was delivered!`);

    return component;
  }
}

/* Test Code Below */

const storage: CarComponentsStorage = new CarComponentsStorage([
  {
    name: "Door",
    number: 0
  },
  {
    name: "Wheel",
    number: 1
  }
]);

const requestWheelsFromStorage: RequestComponentFromStorage = new RequestComponentFromStorage(
  "Wheel",
  storage
);

const requestDoorsFromStorage: RequestComponentFromStorage = new RequestComponentFromStorage(
  "Door",
  storage
);

const assemblyLine: AssemblyLine = new AssemblyLine();

assemblyLine.setPartsCommand(requestWheelsFromStorage);
assemblyLine.requestCarComponent();

// Runtime command swap to alter element behavior
assemblyLine.setPartsCommand(requestDoorsFromStorage);
assemblyLine.requestCarComponent();
