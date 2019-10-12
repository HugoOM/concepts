/*
  Extract the traversal behavior of different collections (simple or complex) into a separate object.

  The iterator should contain all the information related to the traversal, that way multiple iterators
    can be applied to a single collection simultaneously.

  Context: A Car manufacturer has to find/retrieve components from many different storages, which
    are organized in different ways. They don't want to bother with the specifics of every storages
    to get their components out.
*/

interface Iterator<T> {
  // Return type could be any type of "items" that this iterator will go over
  //  A specific iterator might also produce special behavior, like skip over items that don't match XYZ criteria.
  current(): T | void;
  next(): IteratorResult<T>;
  hasNext(): boolean;
  reset(): void;
}

interface IterableStorage<T> {
  createIterator(): Iterator<T>;
}

class CarComponent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Simple array iterator
class CarComponentStorageIterator implements Iterator<CarComponent> {
  storage: CarComponentStorage;
  position: number = -1;

  constructor(storage: CarComponentStorage) {
    this.storage = storage;
  }

  current(): CarComponent | void {
    if (this.position === -1) return console.log("Iterator not yet initiated");

    return this.storage.parts[this.position];
  }

  next(): IteratorResult<CarComponent> {
    if (this.hasNext()) this.position++;
    else console.log("Iterator finished at Position:", this.position);

    return {
      done: this.hasNext(),
      value: this.storage.parts[this.position]
    };
  }

  hasNext(): boolean {
    return this.position < this.storage.parts.length - 1;
  }

  reset() {
    this.position = -1;
  }
}

class CarComponentStorage implements IterableStorage<CarComponent> {
  parts: CarComponent[] = [
    new CarComponent("Doors"),
    new CarComponent("Wheels"),
    new CarComponent("Hood")
  ];

  createIterator(): CarComponentStorageIterator {
    return new CarComponentStorageIterator(this);
  }
}

/* Test Code Below */
const storage = new CarComponentStorage();
const iterator = storage.createIterator();

console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());

iterator.reset();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
