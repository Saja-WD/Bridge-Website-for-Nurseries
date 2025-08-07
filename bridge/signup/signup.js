// ��� ������ ������ �������
const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorMessage = document.getElementById('error-message');

// ����� ��� ��� �������
signupForm.addEventListener('submit', function (event) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.style.display = 'block'; // ����� ����� �����
        event.preventDefault(); // ��� ����� �������
    } else {
        errorMessage.style.display = 'none'; // ����� ������� �� ���� ������
    }
});
