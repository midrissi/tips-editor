const express = require('express');
const app = express();

app.use('/tips-editor', express.static('../docs'));

const server = app.listen(
  process.env.PORT || 3000,
  process.env.HOST || '127.0.0.1',
  () => {
    const { address, port } = server.address();
    console.log(
      'Server started at: http://%s:%s/tips-editor',
      address,
      port,
    );
  },
);
