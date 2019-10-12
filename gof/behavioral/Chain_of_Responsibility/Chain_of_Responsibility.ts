/*
  Pass requests along a chain of handler. Upon reception of a request, each handler decides to either
    process said request, or pass it along to the next handler in the chain.

  Context: A Car manufacturer needs to process the various components of his Cars before installing them.
*/

class Component {
  isPainted: boolean = false;
  isPolished: boolean = false;
  isDamaged: boolean = false;
}

interface Handler {
  setNext(h: Handler): Handler;
  handle(component: Component): void;
}

abstract class BaseHandler implements Handler {
  next: Handler;

  setNext(handler: Handler) {
    this.next = handler;

    return this.next;
  }

  handle(component: Component) {
    if (!this.next) return;

    this.next.handle(component);
  }
}

class PaintHandler extends BaseHandler {
  handle(component: Component) {
    if (!component.isPainted) {
      component.isPainted = true;
      console.log("Painted Component");
    }

    return super.handle(component);
  }
}

class PolishHandler extends BaseHandler {
  handle(component: Component) {
    if (!component.isPolished) {
      component.isPolished = true;
      console.log("Polished Component");
    }

    return super.handle(component);
  }
}

class DamageHandler extends BaseHandler {
  handle(component: Component) {
    // Stop the chain if the item is damaged
    if (component.isDamaged) return console.log("Item is damaged!");

    return super.handle(component);
  }
}

/* Test Code Below */
const paintHandler: PaintHandler = new PaintHandler();
const polishHandler: PolishHandler = new PolishHandler();
const damageHandler: DamageHandler = new DamageHandler();

const validComponent: Component = new Component();
const damagedComponent: Component = new Component();
damagedComponent.isDamaged = true;

damageHandler.setNext(paintHandler).setNext(polishHandler);

console.log("Processing Valid Component");
damageHandler.handle(validComponent);

console.log("Processing Damaged Component");
damageHandler.handle(damagedComponent);

console.log("Processing Damaged Component Without the Damage Handler");
paintHandler.handle(damagedComponent);
