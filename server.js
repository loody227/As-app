const express = require("express");
const path = require("path");
const db = require("./database"); // ربط قاعدة البيانات

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// مسار لإضافة عنصر إلى قاعدة البيانات
app.post("/add-item", (req, res) => {
  const { itemName, itemNumber, tableId } = req.body;
  const sql = `INSERT INTO items (item_name, item_number, table_id) 
VALUES (?, ?, ?)`;
  db.run(sql, [itemName, itemNumber, tableId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, itemName, itemNumber, tableId });
  });
});

// مسار لاسترجاع العناصر حسب معرف الجدول
app.get("/items/:tableId", (req, res) => {
  const { tableId } = req.params;
  const sql = `SELECT * FROM items WHERE table_id = ?`;
  db.all(sql, [tableId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// بدء تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
