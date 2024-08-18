function copyToClipboard(id) {
    const itemNumberElement = document.getElementById(id);
    if (!itemNumberElement) {
        alert("Element not found");
        return;
    }
    const itemNumber = itemNumberElement.innerText || itemNumberElement.textContent;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(itemNumber).then(() => {
            alert("Copied: " + itemNumber);
        }).catch((err) => {
            console.error("Failed to copy: ", err);
            alert("Failed to copy the item number");
        });
    } else {
        alert("Your browser does not support the clipboard API");
    }
}

// دالة جديدة لإضافة العناصر عبر الاتصال بالخادم
function addItem(tableId) {
    const itemName = prompt("Enter item name:");
    const itemNumber = prompt("Enter item number:");
    if (itemName && itemNumber) {
        fetch('/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemName, itemNumber, tableId })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Item added:', data);
            // هنا يمكنك إضافة الصف إلى الجدول في الواجهة الأمامية
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Item name and number cannot be empty");
    }
}

// دالة جديدة لتحميل العناصر من قاعدة البيانات عند تحميل الصفحة
function loadItems(tableId) {
    fetch(`/items/${tableId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // هنا قم بإضافة الصفوف المسترجعة من قاعدة البيانات إلى الجدول
            });
        })
        .catch(error => console.error('Error:', error));
}

// تأكد من تحميل العناصر عند فتح الصفحة
window.onload = function() {
    const tables = document.querySelectorAll("table.styled-table");
    tables.forEach(table => {
        loadItems(table.id);
    });
};
