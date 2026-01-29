const app = require("./app");
const { PORT } = require("./config/env");

const port = PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
