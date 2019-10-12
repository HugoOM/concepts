/* 
  Works when the model can be represented as a Tree.

  Determine a common interface for Containers and Content alike to be (recursively) traversed. 

  Context: A Vehicle manufacturer transporting their components by freight. They want to know the total weight of the freight.
*/

interface Item {
  weight: number;

  getWeight(): number;
}

// The "Composite" part of the pattern. Can contain both more sub-containers as well as Components.
class Container implements Item {
  weight: number;
  contents: Array<Item> = [];

  constructor(weight: number) {
    this.weight = weight;
  }

  getWeight(): number {
    return this.contents.reduce(
      (weightTotal, contentItem) => weightTotal + contentItem.getWeight(),
      this.weight
    );
  }
}

// This is the "Leaf" part of the pattern. In the context, could be any component of a car.
class Component implements Item {
  weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  getWeight(): number {
    return this.weight;
  }
}

/* Test Code Below */

const mainFreightContainer: Container = new Container(100);
mainFreightContainer.contents.push(new Component(25));

const subContainer: Container = new Container(25);
subContainer.contents.push(new Component(50));

mainFreightContainer.contents.push(subContainer);

console.log(
  `The total weight of the freight is: ${mainFreightContainer.getWeight()} *units*`
);
