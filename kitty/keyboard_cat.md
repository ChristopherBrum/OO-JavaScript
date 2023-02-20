[comment]: # (from Christopher Brum)
​
### Question
​
We're styling a simple webpage but for some reason the background colors of the `article-container`, `article-subtitle`, and `article-content` classes are not being applied. Why are these styles not being applied and how do we fix this issue in our CSS file?

Out HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test Page</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="./css/stylesheet.css">
  </head>
  <body>
    <h1>Page Title</h1>
    <div class="article-container">
      <h2 class="article-subtitle">Subtitle</h2>
      <p class="article-content">
        Content
      </p>
    </div>
  </body>
</html>
```

Our CSS file:

```css
div {
  border: 2px solid gray;
  padding: 8px;
  margin: 0px 10px 0px 5px;
  box-shadow: 10px 5px 5px black;
}

h2 {
  padding: 5px;
}

p {
  padding: 10px;
}

.article-container {
  background-color: aquamarine;
}

.article-title {
  background-color: chartreuse;
}

.article-content {
  background-color: red;
}
```

### Answer
​
Within our CSS file we are using CSS ID selectors (`#`) and not CSS class selectors (`.`).

```css
.article-container {
  background-color: aquamarine;
}

.article-title {
  background-color: chartreuse;
}

.article-content {
  background-color: red;
}
```

### Explanation
​
In our HTML file we don't have ID attributes on elements by the names `article-container`, `article-subtitle`, or `article-content`. We do have _class_ attributes by those names though. By replacing the ID selectors (`#`) in our CSS file with class selectors (`.`) our CSS styling should be applied to all of our HTML elements.

- [info](https://launchschool.com/lessons/4495fbf7/assignments/0941b604) on classes, elements, and CSS selectors.