/* 
  Breakdown a piece of logic that is common to multiple "paths", but with slight variations
    at specific stages, into separate methods. Then, put those methods into a superclass,
    implementing the common steps, and leaving the steps that differs as abstract, leaving
    the child classes, which are now those specific paths, to implement those methods which are
    now logic pieces of the whole logic. If needed, the implemented steps can be overriden by 
    specific implementations as well.

  Context: A car manufacturer has machines which process parts for multiple car models, 
    which only differ slightly in some specific steps. 
*/
abstract class Machine {
  protected part: string = "";

  machinePart(part: string): void {
    this.loadPart(part);
    this.processPart();
    this.unloadPart();
  }

  protected loadPart(part: string): void {
    this.part = part;
    console.log("Part:", this.part, "loaded!");
  }

  // Optional empty-bodied hook method to give subclasses more flexibility.
  protected preProcessingHook() {}

  // The abstract step to be implemented by concrete subclasses.
  protected abstract processPart(): void;

  protected unloadPart(): void {
    console.log(this.part, "unloaded!");
    this.part = "";
  }
}

class SedanMachine extends Machine {
  processPart() {
    console.log(`Processing ${this.part} for Sedan`);
  }
}

class CompactMachine extends Machine {
  processPart() {
    console.log(`Processing ${this.part} for Compact`);
  }
}

class SUVMachine extends Machine {
  processPart() {
    console.log(`Processing ${this.part} for SUV`);
  }
}

/* Test Code Below */
const sedan = new SedanMachine();
const compact = new CompactMachine();
const suv = new SUVMachine();

sedan.machinePart("Door");
compact.machinePart("Door");
suv.machinePart("Door");
