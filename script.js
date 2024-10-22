// عند تحميل الصفحة، قم بتحميل الذكريات المحفوظة من localStorage
document.addEventListener('DOMContentLoaded', loadMemories);

document.getElementById('addMemoryBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('memoryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('memoryTitle').value;
    const description = document.getElementById('memoryDescription').value;
    const image = document.getElementById('memoryImage').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const memory = {
            title: title,
            description: description,
            image: reader.result,
        };

        // حفظ الذكرى في localStorage
        saveMemory(memory);
        displayMemory(memory); // عرض الذكرى بعد إضافتها

        // إعادة ضبط النموذج وإغلاق النافذة المنبثقة
        document.getElementById('memoryForm').reset();
        document.getElementById('modal').style.display = 'none';
    }

    if (image) {
        reader.readAsDataURL(image);
    }
});

// دالة لتحميل الذكريات من localStorage
function loadMemories() {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.forEach(displayMemory);
}

// دالة لحفظ الذكرى في localStorage
function saveMemory(memory) {
    const memories = JSON.parse(localStorage.getItem('memories')) || [];
    memories.push(memory);
    localStorage.setItem('memories', JSON.stringify(memories));
}

// دالة لعرض الذكرى في الصفحة
function displayMemory(memory) {
    const memoryContainer = document.getElementById('memoryContainer');
    const memoryCard = document.createElement('div');
    memoryCard.className = 'memory-card';

    memoryCard.innerHTML = `
        <img src="${memory.image}" alt="${memory.title}">
        <h3>${memory.title}</h3>
        <p>${memory.description}</p>
        <button class="btn-download" onclick="downloadImage('${memory.image}', '${memory.title}')"><i class="fas fa-download"></i> تنزيل</button>
    `;

    memoryContainer.appendChild(memoryCard);
}

// دالة لتنزيل الصورة
function downloadImage(imageSrc, title) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
