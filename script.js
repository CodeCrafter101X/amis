const memories = [];

function openPasswordModal() {
    document.getElementById('passwordModal').style.display = 'block';
}

function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function openMemoryModal() {
    document.getElementById('memoryModal').style.display = 'block';
}

function closeMemoryModal() {
    document.getElementById('memoryModal').style.display = 'none';
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const correctPassword = "0.0.0.0"; // كلمة المرور الصحيحة

    if (password === correctPassword) {
        closePasswordModal(); // إغلاق نموذج كلمة المرور
        openMemoryModal(); // فتح نموذج إضافة الذكرى
    } else {
        alert("كلمة المرور غير صحيحة!"); // رسالة تحذير في حال كانت كلمة المرور خاطئة
    }
}

function addMemory() {
    const title = document.getElementById('memoryTitle').value;
    const content = document.getElementById('memoryContent').value;
    const image = document.getElementById('memoryImage').files[0];

    if (title && content) {
        const memory = {
            title: title,
            content: content,
            image: URL.createObjectURL(image)
        };
        memories.push(memory);
        document.getElementById('memoryTitle').value = '';
        document.getElementById('memoryContent').value = '';
        document.getElementById('memoryImage').value = '';
        closeMemoryModal();
        displayMemories();
    }
}

function displayMemories() {
    const memoryList = document.getElementById('memoryList');
    memoryList.innerHTML = '';

    // عرض الذكريات في الذاكرة
    memories.forEach((memory, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.innerHTML = `
            <img src="${memory.image}" alt="ذكرى">
            <h3>${memory.title} <i class="fas fa-trash" onclick="confirmDelete(${index})"></i></h3>
            <p>${memory.content}</p>
            <button class="btn-download" onclick="downloadMemory(${index})"><i class="fas fa-download"></i> تنزيل</button>
            <button class="btn-delete" onclick="confirmDelete(${index})"><i class="fas fa-trash-alt"></i> حذف</button>
        `;
        memoryList.appendChild(memoryCard);
    });
}

function confirmDelete(index) {
    const password = prompt("أدخل كلمة المرور لتأكيد الحذف:");
    if (password === "0.0.0.0") {
        memories.splice(index, 1);
        displayMemories();
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
}

function downloadMemory(index) {
    const memory = memories[index];
    const a = document.createElement('a');
    a.href = memory.image;
    a.download = memory.title || 'memory';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
