const createApp = require("./app");
const app = createApp();
const { config } = require("./config");
require("./db");

app.listen(config.port, (err) => {
  err
    ? console.error(`ERROR ${err}`)
    : console.log(`Server on port ${config.port}`);
});
