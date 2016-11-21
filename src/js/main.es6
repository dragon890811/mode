class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log('My name is ' + this.name);
  }
}

var ken = new Person('ken');
ken.say();