import express from 'express';
const fs = require('fs-extra');
import routes from './routes/api/index';
const app = express();
const port = '3000';
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`);
});
app.use('/api', routes);
