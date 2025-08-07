<?php
session_start();
include 'connect.php'; // تضمين ملف الاتصال بقاعدة البيانات

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // التحقق من أن الحقول ليست فارغة
    if (empty($email) || empty($password)) {
        echo "<p style='color: red;'>❌ يرجى إدخال البريد الإلكتروني وكلمة المرور!</p>";
        exit();
    }

    // البحث عن المستخدم في قاعدة البيانات
    $query = "SELECT * FROM users WHERE Email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // التحقق من كلمة المرور
        if (password_verify($password, $user["Password"])) {
            $_SESSION["user_id"] = $user["id"]; // حفظ معرف المستخدم في الجلسة
            $_SESSION["username"] = $user["Username"]; // حفظ اسم المستخدم

            // إعادة توجيه المستخدم إلى الصفحة الرئيسية
            header("Location: index.html");
            exit();
        } else {
            echo "<p style='color: red;'>❌ كلمة المرور غير صحيحة!</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ البريد الإلكتروني غير مسجل!</p>";
    }

    $stmt->close();
    $conn->close();
}
?>
