/*
  Ensure that a class has a single instance, and provide a global access point to it

  Context: None ... 

  Some notes about the use of singleton and their downsides: 

    They are generally used as a global instance, why is that so bad? Because you hide the dependencies of your application in your code, instead of exposing them through the interfaces. Making something global to avoid passing it around is a code smell.

    They violate the single responsibility principle: by virtue of the fact that they control their own creation and lifecycle.

    They inherently cause code to be tightly coupled. This makes faking them out under test rather difficult in many cases.

    They carry state around for the lifetime of the application. Another hit to testing since you can end up with a situation where tests need to be ordered which is a big no no for unit tests. Why? Because each unit test should be independent from the other.
*/

class Singleton {
  private constructor() {}

  private static instance: Singleton;

  public static getInstance(): Singleton {
    if (!this.instance) this.instance = new Singleton();

    return this.instance;
  }
}

console.log(Singleton.getInstance());
