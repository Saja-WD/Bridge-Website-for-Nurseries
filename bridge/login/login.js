// ���� ������ �� ������
const loginForm = document.getElementById('login-form');

// ����� ��� �������� ���� ��� Submit
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // ����� ������ �� ���� ���� "�����" ��� ���� ��� Submit
    alert('Login is successful!'); // ���� ����� ����
    // ��� �� ������ ���� �������� ������ѡ ����� ����� ����� ����
});