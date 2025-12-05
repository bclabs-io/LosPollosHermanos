// 先在頁面載入完成後做初始化
document.addEventListener("DOMContentLoaded", () => {
    initTopBar();
    loadSuppliers();
    initSupplierEvents();
});

/* ------------------ TopBar ------------------ */
function initTopBar() {
    fetch("topBar.html")
        .then(response => response.text())
        .then(data => {
            const topBar = document.getElementById("topBar");
            topBar.innerHTML = data;

            const current = window.location.pathname.split("/").pop() || "index.html";
            const links = topBar.querySelectorAll(".nav-links a");

            links.forEach(link => {
                const linkPage = link.getAttribute("href");
                if (linkPage && linkPage !== "#" && linkPage === current) {
                    link.classList.add("selected");
                }
            });
        });
}

/* ------------------ 載入所有供應商資訊 ------------------ */
async function loadSuppliers() {
    const supContainer = document.getElementById("suppliers");

    try {
        const res = await fetch("/api/supplier/getAll");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const suppliers = await res.json();

        if (!suppliers || suppliers.length === 0) {
            supContainer.innerHTML = "<p>No suppliers found.</p>";
            return;
        }

        supContainer.innerHTML = "";

        suppliers.forEach(sup => {
            supContainer.innerHTML += `
                <div class="supBlock" data-supplier-id="${sup.supId || ""}">
                    <p class="line"><strong>Name:</strong> ${sup.name}</p>
                    <p class="line"><strong>Contact:</strong> ${sup.contact_person || "-"}</p>
                    <p class="line"><strong>Email:</strong> ${sup.email || "-"}</p>
                    <p class="line"><strong>Phone:</strong> ${sup.phone || "-"}</p>
                    <p class="line"><strong>Product Type:</strong> ${sup.product_type || "-"}</p>
                    <p class="line"><strong>City:</strong> ${sup.city || "-"}</p>
                    <p class="line"><strong>Address:</strong> ${sup.address || "-"}</p>
                    <p class="line"><strong>Notes:</strong> ${sup.notes || "-"}</p>
                </div>
            `;
        });
    } catch (err) {
        console.error(err);
        supContainer.innerHTML = "<p>Failed to load suppliers.</p>";
    }
}

/* ------------------ 綁定按鈕 / 表單事件 ------------------ */
function initSupplierEvents() {
    const addBtn = document.getElementById("addSupplierBtn");
    const formBlock = document.getElementById("addSupplierPlaceholder");
    const submitBtn = document.getElementById("submitSupplierBtn");
    const searchInput = document.getElementById("supplierInput");

    /* ---- 顯示 / 隱藏新增供應商表單 ---- */
    if (addBtn && formBlock) {
        addBtn.addEventListener("click", () => {
            formBlock.classList.toggle("invisible");
        });
    }

    /* ---- Submit 新增供應商 ---- */
    if (submitBtn && formBlock) {
        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const formData = new FormData(formBlock);
            const data = {
                name: formData.get("name"),
                contactPerson: formData.get("contactPerson"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                productType: formData.get("productType"),
                city: formData.get("city"),
                address: formData.get("address"),
                notes: formData.get("notes")
            };

            try {
                alert("Sending...");
                const res = await fetch("/api/supplier/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (result.success) {
                    alert("Supplier added successfully!");
                    window.location.reload();
                } else {
                    alert("Failed to add supplier.");
                }
            } catch (err) {
                console.error(err);
                alert("Error while adding supplier.");
            }
        });
    }

    /* ---- 簡單搜尋：依名稱關鍵字篩選 ---- */
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll("#suppliers .supBlock");
            cards.forEach(card => {
                const nameText = card.textContent.toLowerCase();
                card.style.display = nameText.includes(keyword) ? "" : "none";
            });
        });
    }
}
