function addItem(tableId) {
  const itemName = prompt("Enter item name:");
  const itemNumber = prompt("Enter item number:");

  if (itemName && itemNumber) {
    fetch("/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName, itemNumber, tableId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Item added:", data);

        // Update the DOM to show the new item immediately
        const table = document.getElementById(tableId);
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = data.itemName;
        cell2.innerHTML = `<span id="item${data.id}">${data.itemNumber}</span> <button onclick="copyToClipboard('item${data.id}')">Copy</button>`;
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Item name and number cannot be empty");
  }
}

function loadItems(tableId) {
  fetch(`/items/${tableId}`)
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById(tableId);
      data.forEach((item) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item.item_name;
        cell2.innerHTML = `<span id="item${item.id}">${item.item_number}</span> <button onclick="copyToClipboard('item${item.id}')">Copy</button>`;
      });
    })
    .catch((error) => console.error("Error:", error));
}

function removeItem(tableId) {
  const table = document.getElementById(tableId);
  if (table.rows.length > 1) {
    table.deleteRow(table.rows.length - 1);
  } else {
    alert("Cannot delete the last row");
  }
}

function copyToClipboard(id) {
  const itemNumberElement = document.getElementById(id);
  const itemNumber =
    itemNumberElement.innerText || itemNumberElement.textContent;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(itemNumber)
      .then(() => {
        alert("Copied: " + itemNumber);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy the item number");
      });
  } else {
    alert("Your browser does not support the clipboard API");
  }
}

// Ensure items are loaded when the page loads
window.onload = function () {
  const tables = document.querySelectorAll("table.styled-table");
  tables.forEach((table) => {
    loadItems(table.id);
  });
};


