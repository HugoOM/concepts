/*
  Pub-Sub that enables reactive, asynchronous, processing of events in a one-way messaging context.

  The pattern can also be implemented with an "Event Manager" class that would handle any of the event-related
    publisher responsibilities, and allows to handle multiple event types without bloating the business logic class.

  Context: Car manufacturer wants to notify their dealership, clients, and partners, once their orders are ready to ship.
*/

interface Publisher {
  subscribers: Subscriber[];
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber: Subscriber): void;
  notifySubscribers(): void;
}

interface Subscriber {
  update(publisher: Publisher): void;
}

class Manufacturer implements Publisher {
  subscribers: Subscriber[] = [];
  isCarAvailable: boolean = false;

  subscribe(subscriber: Subscriber) {
    if (this.subscribers.indexOf(subscriber) !== -1) return;

    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
  }

  notifySubscribers() {
    for (let subscriber of this.subscribers) subscriber.update(this);
  }

  // Test "business" logic
  setCarAvailable(isCarAvailable: boolean): void {
    this.isCarAvailable = isCarAvailable;
    this.notifySubscribers();
  }
}

class CarDealer implements Subscriber {
  update(manufacturer: Manufacturer): void {
    if (manufacturer.isCarAvailable)
      console.log("{Dealer} Car available for sale!");
  }
}

class CarBuyer implements Subscriber {
  update(manufacturer: Manufacturer): void {
    if (manufacturer.isCarAvailable)
      console.log("{Buyer} Car available for order!");
  }
}

/* Test Code Below */
const manufacturer = new Manufacturer();
const dealer = new CarDealer();
const buyer = new CarBuyer();

manufacturer.subscribe(dealer);
manufacturer.subscribe(buyer);

manufacturer.setCarAvailable(true);
manufacturer.setCarAvailable(false);
