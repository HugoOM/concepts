//* Aggregation: object A contains objects B; B can live without A.
//* Composition: object A consists of objects B; A manages life cycle of B; B can’t live without A.
/* 
  Wrap an existing object into a new Wrapper (the Decorator) which presents the same Interface as the existing / wrapped object,
    but which can extend it as well. Decorators can be chained so as to combined multiple new/added features 
    through composition. 
    
    This pattern allows for "extending" a behavior at runtime.

    Context: A Car manufacturer offers multiple different warranty options to its resellers.
      Those can be combined together to offer a tailored deal.
*/

// The 'Component' interface
interface Warranty {
  details: string;
  price: number;

  cover(): void;
}

// The "Base" warranty which defines basic behavior
class ConcreteWarranty implements Warranty {
  details: string = "Global Basic Warranty";
  price: number = 500;

  cover(): void {
    console.log(`Warranty: ${this.details} for ${this.price} USD.`);
  }
}

abstract class WarrantyDecorator implements Warranty {
  details: string;
  price: number;

  // The 'wrappee'
  protected warranty: Warranty;

  constructor(component: Warranty) {
    this.warranty = component;
  }

  cover(): void {
    this.warranty.cover();
  }
}

class MotorWarranty extends WarrantyDecorator {
  details: string = "Specialized Motor Coverage";
  price: number = 2000;

  cover() {
    super.cover();
    console.log(`Warranty: ${this.details} for ${this.price} USD.`);
  }
}

class RimsWarranty extends WarrantyDecorator {
  details: string = "Cover dem Spinners";
  price: number = 5000;

  cover() {
    super.cover();
    console.log(`Warranty: ${this.details} for ${this.price} USD.`);
  }
}

/* Test Code Below */

const simple: ConcreteWarranty = new ConcreteWarranty();
const motorDecorator: MotorWarranty = new MotorWarranty(simple);
const rimsDecorator: RimsWarranty = new RimsWarranty(motorDecorator);

// The last decorator is the one the 'client code' will use
rimsDecorator.cover();
