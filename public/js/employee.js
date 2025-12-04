// 先在頁面載入完成後做初始化
document.addEventListener("DOMContentLoaded", () => {
    initTopBar();
    loadEmployees();
    initEmployeeEvents();
});

/* ------------------ TopBar：和 location.js 一樣 ------------------ */
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

/* ------------------ 載入所有員工資訊（永遠顯示） ------------------ */
async function loadEmployees() {
    const empContainer = document.getElementById("employee");

    try {
        const res = await fetch("/api/employee/getAll");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const employees = await res.json();

        if (!employees || employees.length === 0) {
            empContainer.innerHTML = "<p>No employees found.</p>";
            return;
        }

        empContainer.innerHTML = "";

        employees.forEach(emp => {
            empContainer.innerHTML += `
                <div class="empBlock" data-employee-id="${emp.eId || ""}">
                    <p class="line"><strong>Name:</strong> ${emp.name}</p>
                    <p class="line"><strong>Position:</strong> ${emp.position}</p>
                    <p class="line"><strong>Email:</strong> ${emp.email || "-"}</p>
                    <p class="line"><strong>Phone:</strong> ${emp.phone || "-"}</p>
                    <p class="line"><strong>Store / Location:</strong> ${emp.store || "-"}</p>
                    <p class="line"><strong>Hire Date:</strong> ${emp.hireDate || "-"}</p>
                    <p class="line"><strong>Type:</strong> ${emp.type || "-"}</p>
                </div>
            `;
        });
    } catch (err) {
        console.error(err);
        empContainer.innerHTML = "<p>Failed to load employees.</p>";
    }
}

/* ------------------ 綁定按鈕 / 表單事件 ------------------ */
function initEmployeeEvents() {
    const addBtn = document.getElementById("addEmpBtn");
    const formBlock = document.getElementById("addEmpPlaceholder");
    const submitBtn = document.getElementById("submitEmpBtn");

    /* ---- 顯示 / 隱藏新增員工表單 ---- */
    if (addBtn && formBlock) {
        addBtn.addEventListener("click", () => {
            formBlock.classList.toggle("invisible");
        });
    }

    /* ---- Submit 新增員工 ---- */
    if (submitBtn && formBlock) {
        submitBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const formData = new FormData(formBlock);
            const data = {
                name: formData.get("name"),
                position: formData.get("position"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                store: formData.get("store"),
                hireDate: formData.get("hireDate"),
                type: formData.get("type")
            };

            try {
                alert("Sending...");
                const res = await fetch("/api/employee/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (result.success) {
                    alert("Employee added successfully!");
                    window.location.reload();
                } else {
                    alert("Failed to add employee.");
                }
            } catch (err) {
                console.error(err);
                alert("Error while adding employee.");
            }
        });
    }
}
