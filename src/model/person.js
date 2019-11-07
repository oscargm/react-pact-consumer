class Person {
  constructor(name, id) {
    this.id = id;
    this.name = name;
  }

  static validateName(person) {
    if (typeof person.name !== 'string') {
      throw new Error(
        `Person name must be a string! Invalid value: ${person.name}`
      );
    }
  }

  static validateId(person) {
    if (typeof person.id !== 'number') {
      throw new Error(
        `Person id must be a number! Invalid value: ${person.id}`
      );
    }
  }
}

export default Person;
