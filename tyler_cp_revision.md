Hi Tyler. 

Thank you very much for the time and effort you have put into these conditional pass articles. Both of the articles are well-written and easy to follow. I particularly like the list of ways to improve communication in "The Power of Communication in Programming… and Beyond". Additionally, the articles were well laid out and formatted which made reading them quite enjoyable. The accuracy of both articles is good overall, but there are a few areas that we'd like you to revisit in your "Me My(Self) and I: Looking at ‘self’ in Ruby" article before moving on. These items are outlined below:

- In the section titled **Within the Instance Method**, the wording used to describe an instance of the `Person` class is a bit inaccurate and may lead to misinterpretation. You refer to this object as "John", but that is the value assigned to the instance variable `@name`. The `Person` object created in your example is not "John", that value is simply part of its state. It may be easier and more accurate to refer to this object as the object referenced by the local variable `person`. Please update this section to be more clear about the object you are talking about when referenced by `self` within the instance method in your example.
- The first line of the last paragraph states that "[`self`] is used to access attributes and methods of the current context...". How do we use `self` to access attributes? Can `self` access attributes directly? What about class methods? Please update this section to clarify this point.
- The only thing I'd like your article to include that it isn't currently is a more explicit explanation of the boundaries of where `self` references the class vs. an instance of the class. For example, where within a class does `self` reference an instance of the class, and where does it reference the class itself? Can you reference `self` anywhere other than inside an instance method or prepended to a class method definition (or within a class method)? Please include this in your revised article.

Once you've updated this article please submit the revised version here in the conversation tab.

Thank you, Tyler.  Let us know if you have any questions.
