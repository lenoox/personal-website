$(document).ready(function () {
    filterSelection("all");
    $('.filterSelection').on('click', function () {
        let c = $(this).attr('data-select');
        filterSelection(c);
    });

    $('.filterSelection').on('click', function () {
        $(".filterSelection").each(function () {
            $('.c-btn__inverse--active').removeClass("c-btn__inverse--active")
        });
        $(this).addClass("c-btn__inverse--active")
    });

    function filterSelection(type) {
        hideImage();
        showImages(type);
    }

    function showImages(type) {
        $(".t-portfolio__gallery-conteiner").each(function () {
            let element = $(this);
            if (type == "all") {
                showImage(element);
            }
            if (element.hasClass(type)) {
                showImage(element);
            }
        });
    }

    function hideImage() {
        $(".t-portfolio__gallery-conteiner").each(function () {
            let element = $(this);
            element.hide();
        });
    }

    function showImage(element) {
        element.show();
    }
});