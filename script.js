// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZkfu2HWeHFQoEBR775wRsM8jkCzLyLRQ",
  authDomain: "amis-d17f3.firebaseapp.com",
  databaseURL: "https://amis-d17f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amis-d17f3",
  storageBucket: "amis-d17f3.appspot.com",
  messagingSenderId: "456359958505",
  appId: "1:456359958505:web:c5ce9491958cbc3e659d78",
  measurementId: "G-4Z0T73Z48D"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
    const imageInput = document.getElementById('memoryImage');
    const image = imageInput.files[0];

    if (title && content && image) {
        const storageRef = firebase.storage().ref(`images/${image.name}`);
        const uploadTask = storageRef.put(image);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // يمكن إضافة مؤشر تحميل هنا إذا لزم الأمر
            }, 
            (error) => {
                alert('حدث خطأ أثناء رفع الصورة!');
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const memory = {
                        title: title,
                        content: content,
                        image: downloadURL
                    };
                    database.ref('memories').push(memory, (error) => {
                        if (error) {
                            alert('حدث خطأ أثناء حفظ الذكرى!');
                        } else {
                            document.getElementById('memoryTitle').value = '';
                            document.getElementById('memoryContent').value = '';
                            document.getElementById('memoryImage').value = '';
                            closeMemoryModal();
                            alert('تمت إضافة الذكرى بنجاح!');
                        }
                    });
                });
            }
        );
    } else {
        alert('يرجى تعبئة جميع الحقول واختيار صورة.');
    }
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

// استدعاء الدالة لإعداد الصفحة عند التحميل
window.onload = () => {
    console.log('تم الاتصال بقاعدة البيانات.');
};
