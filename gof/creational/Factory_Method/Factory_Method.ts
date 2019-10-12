/*
  Flexible object creation/instantiation from a same hierarchical root

  Context: Car manufacturer with multiple models of a given Car, based on the Region.

*/

interface CarModel {
  drive(): void;
}

class USAModel implements CarModel {
  drive() {
    console.log("Driving the USA Configuration");
  }
}

class EMEAModel implements CarModel {
  drive() {
    console.log("Driving the EMEA Configuration");
  }
}

interface CarModelCreator {
  //* This is the factory method. This could also be an abstract class with a default return model
  //* The "Creator" would also normally hold business logic related to the CarModels, and not serve
  //* the sole purpose of instantiating. The real pattern here is the method that serves to decouple,
  //* and the associated class hierarchy.
  createCarModel(): CarModel;
}

class USACreator implements CarModelCreator {
  createCarModel() {
    return new USAModel();
  }
}

class EMEACreator implements CarModelCreator {
  createCarModel() {
    return new EMEAModel();
  }
}

/* Testing Code Below */

const usa: CarModelCreator = new USACreator();

usa.createCarModel().drive();
