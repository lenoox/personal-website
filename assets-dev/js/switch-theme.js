$(document).ready(function () {
    $('.t-site-navbar__change-mode-btn').on('click', function () {
        let stateMode = ($(document.body).attr("light-mode") === "dark") ? "light" : "dark";
        $(document.body).attr("light-mode", stateMode);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const stateMode = event.matches ? "dark" : "light";
        $(document.body).attr("light-mode", stateMode);
    });
});