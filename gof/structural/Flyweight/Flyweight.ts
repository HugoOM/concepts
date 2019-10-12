/* 
  Share common part of the state between multiple objects to reduce Memory footprint.

  The state/data of such object can be split into 2 categories, the shared "intrinsic" state,
    and the modifiable/different state, the "extrinsic" state.

  An object that contains solely the "intrinsic" state is called a Flyweight.

  Context: Car manufacturer wants to configure all sensors in a Car. Where they have different readings,
    they all point back to the same "per region" micro-controller.

  *Depicted is the variant of the pattern which relies on a factory. The existing flyweights
  * can also be stored on the flyweight itself (as static) or within the client itself.
*/

// The Flyweight -> Intrinsic state
class Sensor {
  readonly microControllerAddress: string;
  readonly type: string;

  // Some more shared state here ...

  constructor(microAddress, type) {
    this.microControllerAddress = microAddress;
    this.type = type;
  }

  // Some shared operations ...
}

class SensorFactory {
  private sensorsCache: Sensor[] = [];

  getSensor(microAddress: string, type: string): Sensor {
    let sensor = this.sensorsCache.find(
      (sensor: Sensor) =>
        sensor.microControllerAddress === microAddress && sensor.type === type
    );

    if (!sensor) sensor = new Sensor(microAddress, type);

    this.sensorsCache.push(sensor);

    return sensor;
  }

  listSensors(): void {
    console.log(this.sensorsCache);
  }
}

// The "Context" -> Extrinsic state -- Note the absence of inheritance
class WheelSensor {
  private sensor: Sensor = factory.getSensor("AAx0", "wheel");

  value: number;

  read(): number {
    return this.value;
  }
}

const factory = new SensorFactory();

/* Test Code Below */

const wheelS: WheelSensor = new WheelSensor();

factory.listSensors();
