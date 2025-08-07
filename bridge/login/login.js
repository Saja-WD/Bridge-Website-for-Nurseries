// äÌíÈ ÇáİæÑã ãä ÇáÕİÍÉ
const loginForm = document.getElementById('login-form');

// äÊÇÈÚ áãÇ ÇáãÓÊÎÏã íÏæÓ Úáì Submit
loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // ÈäãäÚ ÇáÕİÍÉ ãä ÃäåÇ ÊÚãá "ÑíİÑÔ" áãÇ äÏæÓ Úáì Submit
    alert('Login is successful!'); // äÚÑÖ ÑÓÇáÉ äÌÇÍ
    // åäÇ áæ ÚÇíÒíä äÑÓá ÇáÈíÇäÇÊ ááÓíÑİÑ¡ ÈäÖíİ ÇáßæÏ ÇáÎÇÕ ÈíåÇ
});