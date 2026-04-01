const app = require('./app');
const { initDatabase } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Zorvyn Finance Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
})();
