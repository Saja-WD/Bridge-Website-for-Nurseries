<?php
$host = "localhost";  // اسم المضيف (السيرفر)
$user = "root";       // اسم المستخدم لقاعدة البيانات
$pass = "";           // كلمة المرور (فارغة افتراضيًا في XAMPP)
$db = "bridgedb";     // اسم قاعدة البيانات الصحيح

// إنشاء الاتصال بقاعدة البيانات
$conn = new mysqli($host, $user, $pass, $db);

// التحقق من نجاح الاتصال
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
} else {
    echo "✅ Connected successfully!";
}
?>
