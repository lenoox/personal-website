$(document).ready(function () {
    $('.t-site-navbar__change-mode-btn').on('click', function () {
        document.body.style.setProperty("--transition", "0.5s");
        let stateMode = ($(document.body).attr("theme") === "dark") ? "light" : "dark";
        $(document.body).attr("theme", stateMode);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        document.body.style.setProperty("--transition", "0.5s");
        const stateMode = event.matches ? "dark" : "light";
        $(document.body).attr("theme", stateMode);
    });
});