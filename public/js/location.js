document.addEventListener("DOMContentLoaded", () => {
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
        })
});
document.getElementById("addLocationBtn").addEventListener("click", (e) => {
    document.getElementById("addLocoPlaceholder").classList.toggle("invisible");
});

const dropBtn = document.getElementById("dropBtn");
const content = document.getElementById("dropdown-content");

dropBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    content.style.display = content.style.display === "block" ? "none" : "block";
});

document.querySelectorAll("#dropdown-content input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selected = [...document.querySelectorAll("#dropdown-content input[type='checkbox']")]
            .filter(c => c.checked)
            .map(c => c.value);

        if (selected.length === 0) {
            document.getElementById("dropBtn").textContent = "";
        } else {
            document.getElementById("dropBtn").textContent = selected.join(", ");
        }
    });
});