# Dotcode Test Task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## General

I used the **Material UI** library because it offers a modern and visually appealing design,  
provides a wide range of ready-to-use components, and is easy to work with, especially with React.  

Additionally, it integrates well with other libraries, making it a flexible solution for interface development.  

Its layout system and the DataGrid component allowed me to build a table with implemented   
sorting and pagination logic, which significantly simplified the UI development process.

For convenient navigation between pages, I used the **react-router-dom** library.

I also used the **uuid** library to quickly generate random IDs.

For consistent code quality and formatting across the project, I also set up **ESLint** and **Prettier**.

### `Dashboard`

On the **Dashboard page**, I used the **react-rnd** library. This library covered most of the required  
functionality, but I had to manually integrate z-index management to ensure that elements could overlap correctly.  

One of the limitations of this library is that it uses only px for width, height, and positioning. This caused some   
difficulties when it came to making the layout responsive. However, I managed to solve this issue by integrating  
utility functions that convert pixels to percentages and vice versa. 

Additionally, I implemented the ability not only to delete blocks but also to add new blocks with random colors. 

Overall, **react-rnd** is easy to use, doesn’t include unnecessary functionality, and is well-suited for customization   
and integration with other code.

### `Table`

On the **Table page**, I successfully connected to the API using a WebSocket. 

All the necessary functionality was implemented. 

A key role in the development of this page was played by the **Material UI** library, which helped  
not only with adding pre-styled components but also provided a table layout ( DataGrid component ) that came with built-in   
logic for sorting, pagination, and more. This significantly simplified and accelerated development, allowing me to focus on   
improving other features.

### Links
[DEMO](https://dotcode-test-task-kappa.vercel.app/)

### Setup
* git clone https://github.com/ivaZaiets/dotcode-test-task.git
* $ npm install
* $ npm start

### Author
[Telegram](https://t.me/swugre)  
[LinkedIn](https://www.linkedin.com/in/ivanna-zaiets-6122532a0/)
