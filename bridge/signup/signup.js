// ÌáÈ ÇáİæÑã æÚäÇÕÑ ÇáÅÏÎÇá
const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorMessage = document.getElementById('error-message');

// ÅÖÇİÉ ÍÏË ÚäÏ ÇáÅÑÓÇá
signupForm.addEventListener('submit', function (event) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.style.display = 'block'; // ÅÙåÇÑ ÑÓÇáÉ ÇáÎØÃ
        event.preventDefault(); // ãäÚ ÅÑÓÇá ÇáäãæĞÌ
    } else {
        errorMessage.style.display = 'none'; // ÅÎİÇÁ ÇáÑÓÇáÉ İí ÍÇáÉ ÇáäÌÇÍ
    }
});
