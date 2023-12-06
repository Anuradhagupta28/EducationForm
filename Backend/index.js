const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());



const dataValidation = [
  check('name').isString().notEmpty(),
  check('email').isEmail(),
  check('phone').isMobilePhone(),
  check('course').isString().notEmpty(),
  check('passingyear').isString().notEmpty(),
  check('additionaldetail').isString()


];


const dataDirectory = path.join(__dirname, 'data');


fs.mkdir(dataDirectory, { recursive: true })
  .then(() => {
   
    app.post('/api/data', dataValidation, async (req, res) => {
      try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

       
        const data = req.body;

        const filename = `data_${Date.now()}.json`;

      
        const filePath = path.join(dataDirectory, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    
        res.status(201).json({ message: 'Data saved successfully', filePath });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error creating data directory:', error);
  });


  app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));
  