# datingAppProject
This is my feature for a dating app. It shows the user who he or she has been visited and/or liked by!

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
