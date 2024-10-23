const memories = [];

// دالة لفتح نموذج كلمة المرور
function openPasswordModal() {
    document.getElementById('passwordModal').style.display = 'block';
}

// دالة لإغلاق نموذج كلمة المرور
function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

// دالة لفتح نموذج إضافة الذكرى
function openMemoryModal() {
    document.getElementById('memoryModal').style.display = 'block';
}

// دالة لإغلاق نموذج إضافة الذكرى
function closeMemoryModal() {
    document.getElementById('memoryModal').style.display = 'none';
}

// دالة للتحقق من كلمة المرور
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

// دالة لإضافة ذكرى جديدة
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

// دالة لعرض الذكريات
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

// دالة لتأكيد الحذف
function confirmDelete(index) {
    const password = prompt("أدخل كلمة المرور لتأكيد الحذف:");
    if (password === "0.0.0.0") {
        memories.splice(index, 1);
        displayMemories();
    } else {
        alert("كلمة المرور غير صحيحة!");
    }
}

// دالة لتنزيل ذكرى
function downloadMemory(index) {
    const memory = memories[index];
    const a = document.createElement('a');
    a.href = memory.image;
    a.download = memory.title || 'memory';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// دالة لتبديل الوضع
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const themeIcon = document.getElementById('themeIcon');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-adjust');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-adjust');
    }
}

// إضافة 10 ذكريات افتراضية
function addInitialMemories() {
    const initialMemories = [
        { title: "ذكرى 1", content: "لحظات مع الأصحاب. \"إنما المؤمنون إخوة\".", image: "1.jpg" },
        { title: "ذكرى 2", content: "وقت حلو مع العائلة. \"وَأَلفَ بَيْنَ قُلُوبِهِمْ\".", image: "3.jpg" },
        { title: "ذكرى 3", content: "أوقات مع الأحباب. \"وَذَكِّرْ فَإنَّ الذِّكْرَى تَنفَعُ الْمُؤْمِنِينَ\".", image: "7.jpg" },
        { title: "ذكرى 4", content: "ذكريات لا تنسى. \"كل نفس ذائقة الموت\".", image: "22.jpg" },
        { title: "ذكرى 5", content: "مع الأصحاب في العيد. \"ما يلفظ من قول إلا لديه رقيب عتيد\".", image: "33.jpg" },
        { title: "ذكرى 6", content: "رحلة مع الأصدقاء. \"فَاذْكُرُونِي أَذْكُرْكُمْ\".", image: "55.jpg" },
        { title: "ذكرى 7", content: "ذكريات المدرسة. \"إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ\".", image: "77.jpg" },
        { title: "ذكرى 8", content: "لحظات مع المعلمين. \"وَقُل رَّبِّ زِدْنِي عِلْمًا\".", image: "99.jpg" },
        { title: "ذكرى 9", content: "أيام حلوة. \"إِنَّ مَعَ الْعُسْرِ يُسْرًا\".", image: "11.jpg" },
        { title: "ذكرى 10", content: "مع العائلة في العطلة. \"وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ\".", image: "12.jpg" },
    ];

    initialMemories.forEach(memory => {
        memories.push(memory);
    });
    displayMemories();
}

// استدعاء الدالة لإضافة ذكريات افتراضية عند تحميل الصفحة
window.onload = addInitialMemories;

