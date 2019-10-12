/* 
  Provide a substitute or placeholder for another object (i.e. a Service). Controls access to the
    original object allowing to perform something either before or after the request is made to said object.

  The proxy, as opposed to the decorator, controls the lifecycle of the composed object by itself. 
    In decorator's case, the client code does so.

  Context: A Car manufacturer has a massive, complex, and resources consuming, assembly machine at the end of it's 
    assembly chain. That machine should only by operated by authorized personnel, and only run when needed.
*/

interface AssemblyMachineInterface {
  assembleComponents(components: string[]): string;
}

class AssemblyMachine implements AssemblyMachineInterface {
  assembleComponents(components: string[]): string {
    return `Final assembled part from components: ${components.join("_")}`;
  }
}

class AssemblyMachineProxy implements AssemblyMachineInterface {
  private machine: AssemblyMachine;

  // Could also be managed by the proxy itself (enabling, for instance, lazy-loading)
  constructor(machine: AssemblyMachine) {
    this.machine = machine;
  }

  assembleComponents(components: string[]): string {
    if (!this.isUserAuthorized("Hugo")) return;

    return this.machine.assembleComponents(components);
  }

  // The "user" value could be gathered as an initialization step, or from context,
  //  but the top-level method signature needs to stay the same for the proxy and the subject.
  isUserAuthorized(user: string): boolean {
    console.log(`Validating User access for ${user} before proceeding ...`);
    return true;
  }
}

/* Test Code Below */
const machine = new AssemblyMachine();

const proxy = new AssemblyMachineProxy(machine);

console.log(proxy.assembleComponents(["Doors", "Wheels", "Engine"]));
