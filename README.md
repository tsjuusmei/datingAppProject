# datingAppProject
This is my feature for a dating app. It shows the user who he or she has been visited and/or liked by, and can like (and unlike) users back!

<div align="center">

<img src="https://github.com/tsjuusmei/datingAppProject/blob/master/docs/images/html.pages.png?raw=true" width="600">

</div>

# About this project
This will be my dating app for Project Tech, a project for the second year of Communication & Multimedia Design.

# Install

Follow these steps to install the feature.

1. Clone this repository by typing the following command in your terminal:

   ``` git clone https://github.com/tsjuusmei/datingAppProject.git ```

2. Install the Node modules by typing the following command in your terminal:

   ``` npm install ``` 

3. Create a .env file within the folder and add the following lines to the file:

   ``` 
   DB_NAME= yourDbName
   DB_URI= yourDbUri
   SESSION_SECRET= yourSecret
   ``` 

4. Create a .gitignore file in the same folder and add the following lines to the file:

   ```
   /node_modules
   .env
   ``` 

5. Run the server by running the following command in your terminal:
   ```
   npm start
   ``` 

6. Go to ```localhost:3000``` in your browser to use the application.

# Database Structure

My feature is that users can see who visited and/or liked their profile. So i set up the database as following:
```
Object ID 
name: "firstName"
age: number
likedby: Array
   0: ObjectIdOfUser
   1: ObjectIdOfUser
visitedBy: Array
   0: ObjectIdOfUser
   1: ObjectIdOfUser
   2: ObjectIdOfUser
   3: ObjectIdOfUser
```
In the example above, the user has two likes and four visitors.

Here's an example of how it looks in MongoBD: 

<img src="https://github.com/tsjuusmei/datingAppProject/blob/master/docs/images/db.structure.png?raw=true" width="400">

# License

[MIT](https://github.com/tsjuusmei/datingAppProject/blob/master/LICENSE)

# Sources 

* Progressive enhancement explained simply. (April 1, 2018) Retrieved March 18, 2020 from https://medium.com/@adambsilver/progressive-enhancement-explained-simply-32dd1dc9e064

* Progressive enhancement YouTube. (December 3, 2008) Retrieved March 18, 2020 from https://www.youtube.com/watch?v=U38dyJhpUnA

* HTML Semantic elements. Retrieved March 18, 2020 from https://www.w3schools.com/html/html5_semantic_elements.asp

* Eloquent JavaScript (December 4, 2018) Retrieved March 18, 2020 from https://eloquentjavascript.net/

* Tutorial videos by Danny de Vries. Retrieved March 18, 2020 from https://www.youtube.com/channel/UCNtqkUUWlncsFu5qhfDZ4oA

* Express documentation. Retrieved March 18, 2020 from https://expressjs.com/

* 12 Principles for clean HTML code. (November 12, 2008) Retrieved March 25, 2020 from https://www.smashingmagazine.com/2008/11/12-principles-for-keeping-your-code-clean/

* ID your body for greater CSS control an specificity. (December 17, 2007) Retrieved March 25, 2020 from https://css-tricks.com/id-your-body-for-greater-css-control-and-specificity/

* 20 HTML best practices you should follow. Retrieved March 25, 2020 from https://www.webfx.com/blog/web-design/20-html-best-practices-you-should-follow/

* 10 Best practices in CSS. (July 17, 2017) Retrieved March 25, 2020 from https://www.tothenew.com/blog/10-best-practices-in-css/

* 24 JavaScript best practices for beginners. (June 16, 2009) Retrieved March 25, 2020 from https://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399

* JavaScript best practices. Retrieved March 25, 2020 from https://www.thinkful.com/learn/javascript-best-practices-1/Enhance-Progressively#Make-it-Understandable

* JavaScript for loop. Retrieved March 25, 2020 from https://www.w3schools.com/js/js_loop_for.asp

* JavaScript while loop. Retrieved March 25, 2020 from https://www.w3schools.com/js/js_loop_while.asp

* Loops and iteration. (January 30, 2020) Retrieved March 25, 2020 from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

* Understanding higher-order functions in JavaScript. (October 23, 2018) Retrieved March 25, 2020 from https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad

* JavaScript prototypes. Retrieved March 28, 2020 from https://www.w3schools.com/js/js_object_prototypes.asp

* Prototyping and Javascript - p5.js Tutorial. (February 22, 2017) Retrieved March 28, 2020 from https://www.youtube.com/watch?v=hS_WqkyUah8

* Hoisting. Retrieved March 28, 2020 from https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

* Closures. Retrieved March 28, 2020 from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

* Lint (software). Retrieved March 28, 2020 from https://en.wikipedia.org/wiki/Lint_%28software%29 

* What is linting? (June, 2016) Retrieved March 28, 2020 from https://www.freecodecamp.org/forum/t/what-is-linting-code-linting-in-javascript-explained-with-example-tools/14680

* How to use HTML5 localStorage and sessionStorage. Retrieved April 5, 2020 from https://www.tutorialrepublic.com/html-tutorial/html5-web-storage.php

* Understanding the GitHub flow. Retrieved April 5, 2020 from https://guides.github.com/introduction/flow/

* GitHub branches video by Danny de Vries. (April 1, 2020) Retrieved April 5, 2020 from https://www.loom.com/share/7b6edea466184758beb8e56a7c7f8b61

* Progressive Enhancement image. Retrieved April 11, 2020 from https://www.shopify.com/partners/blog/what-is-progressive-enhancement-and-why-should-you-care
