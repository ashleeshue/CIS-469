//Step 1
// Import the Express library, which provides functionality for building web applications.
const express = require('express');

// Import the bodyParser middleware, to parses incoming request

const bodyParser = require('body-parser');

// Import the fs module, which provides an API for interacting with the file system.
const fs = require('fs');

// Create an instance of the Express application.
const app = express();

// Define the port number on which the server will listen for incoming requests.
const PORT = 3000;

// Tell the Express application to use the bodyParser middleware to parse JSON data

app.use(bodyParser.json());



//Step 2
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


//Step 3
// Endpoint to get all items
app.get('/items', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(JSON.parse(data));
    });
  });



  //Step 4
  // Endpoint to add a new item
app.post('/items', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const items = JSON.parse(data);
      const newItem = req.body;
      newItem.id = items.length + 1; // Auto-increment ID (for simplicity)

      items.push(newItem);

      fs.writeFile('data.json', JSON.stringify(items), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).send('Item created successfully');
      });
    });
  });

  //Step 5
  // Endpoint to delete an item
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);

    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      let items = JSON.parse(data);
      const index = items.findIndex(item => item.id === itemId);

      if (index === -1) {
        res.status(404).send('Item not found');
        return;
      }

      items.splice(index, 1);

      fs.writeFile('data.json', JSON.stringify(items), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).send('Item deleted successfully');
      });
    });
  });


  //Step 6
  // Endpoint to update an item
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);

    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      let items = JSON.parse(data);
      const index = items.findIndex(item => item.id === itemId);

      if (index === -1) {
        res.status(404).send('Item not found');
        return;
      }

      items[index] = req.body;

      fs.writeFile('data.json', JSON.stringify(items), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).send('Item updated successfully');
      });
    });
  });
