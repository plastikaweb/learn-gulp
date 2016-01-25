/**
 * Created by plastik on 24/1/16.
 */
class Person {
    constructor(name) {
        this.name = name;
    }

    hello() {
        if (typeof this.name === 'string') {
            return 'hello my name is ' + this.name;
        } else {
            return 'Hello!';
        }
    }
}

var person = new Person('Helena'),
  greetHTML = templates.greeting({
      message: person.hello()
  });
document.write(greetHTML);

