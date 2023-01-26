Hi Tyler.

Thank you for your updated article on `self`. I think overall the revisions you made helped clarify the areas we originally pointed out to you. This has satisfied your Conditional Pass assignment. You may move on to the next course when you're ready. Congratulations!

Below is some additional feedback on the revised areas of your article:

---

> At the object level, self refers to the current instance of a class. For example, if you have a class called "Person" and you create an instance of that class called "person1", then self within the context of that instance would refer to "person1". Self within the context of the instance method would refer to the current object that is being called upon, which in this case is “person1” and assigning the name value as “John”

The paragraph above does a good job describing how `self` works within an instance method. My only note is that being specific when you are referring to an instance of a class or referring to a local variable would leave less room for ambiguity. In the sentence: _"...you create an instance of that class called 'person1', then self within the context of that instance would refer to 'person1'"_ it would be more accurate to refer to `person1` as a local variable and that the instance of the class has been assigned to it. Using more specific language will ensure the reader will know precisely what you ar talking about and leave less room for misinterpretation.

---

> The self keyword is used to access attributes directly (instance variables) within the current context. To access an attribute using self, you simply need to prefix the attribute name with self.. For example, if you have an attribute named name, you can access it using self.name. To set the value of an attribute, you can use the assignment operator = after self.name. self.name = "John" sets the

Nice explanation.

---

Your overall explanation of the boundaries of `self` within a class is looking good but I think a simple way of clarifying this idea is that _inside of an instance method `self` refers to an instance of the class and outside of an instance method `self` refers to the class itself_.
