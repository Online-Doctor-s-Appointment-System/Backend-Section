const db = require('./src/config/db');

(async () => {
  try {
    const res = await db.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
    );
    console.log("Existing tables:", res.rows.map(r => r.table_name));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
})();
