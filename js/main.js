(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true,
            showCursor: false,
        });
    }


    // // Modal Video
    // var $videoSrc;
    // $('.btn-play').click(function () {
    //     $videoSrc = $(this).data("src");
    // });
    // console.log($videoSrc);
    // $('#videoModal').on('shown.bs.modal', function (e) {
    //     $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    // })
    // $('#videoModal').on('hide.bs.modal', function (e) {
    //     $("#video").attr('src', $videoSrc);
    // })


    // // Facts counter
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 2000
    // });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // // Testimonials carousel
    // $(".testimonial-carousel").owlCarousel({
    //     autoplay: true,
    //     smartSpeed: 1000,
    //     items: 1,
    //     dots: true,
    //     loop: true,
    // });


    // Start custom js by david santana
    const modalTriggerButtons = document.querySelectorAll('[data-modal-target] [type="button"]');
    modalTriggerButtons.forEach(elem => {
        elem.addEventListener('click', function(e) {
            const wrapper = elem.closest('[data-project-title]');

            let modalSelector = '';
            if (wrapper.classList.contains('first')) {
                modalSelector = '#modal-project-multiple';
            } else {
                modalSelector = '#modal-project-single';
            }
            // inisialisasi dan aplikasikan popup modal gallery scr manual
            // utk menghindari bug swiperjs ketika digabungkan dgn popup modal
            const myModal = new bootstrap.Modal(modalSelector);
            myModal.toggle();

            const projectTitle = wrapper.getAttribute('data-project-title');
            const modalElem = document.querySelector(modalSelector);
            const modalTitle = modalElem.querySelector('.modal-title');
            modalTitle.innerHTML = projectTitle;
            modalTitle.classList.add('text-capitalize');

            if (wrapper.classList.contains('first')) {
                var swiperMain = new Swiper(".swiper-main", {
                    slidesPerView: 1,
                    autoplay: false,
                    loop: true,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                });
            
                swiperMain.removeAllSlides();
                const slideData = wrapper.querySelectorAll('.hidden-list input[type="hidden"]');
                slideData.forEach(item => {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide', 'text-center');
                    slide.innerHTML = `<img src="${item.value}">`;
                    swiperMain.appendSlide(slide);
                });


                const thumbContainer = document.querySelector('.thumb-container');
                thumbContainer.innerHTML = '';
                const images = document.querySelectorAll('.swiper .swiper-slide img');
                images.forEach((image, index) => {
                    const div = document.createElement('div');
                    div.classList.add('thumb-img', 'col-4');
                    if (index == 0) {
                        div.classList.add('active');
                    }
                    // const img = document.createElement('img');
                    // img.setAttribute('src', image.getAttribute('src'));
                    div.innerHTML = image.outerHTML;
                    thumbContainer.appendChild(div);
                });

                const thumbImages = thumbContainer.querySelectorAll('.thumb-img');
                thumbImages.forEach((thumb, index) => {
                    thumb.addEventListener('mouseover', function(e) {
                        // hapus class 'active' dr semua .thumb-img
                        const allElems = thumbContainer.querySelectorAll('.thumb-img');
                        allElems.forEach(elem => {
                            elem.classList.remove('active');
                        });
                        this.classList.add('active');
                    });
                    thumb.addEventListener('click', function(e) {
                        swiperMain.slideTo(index);
                    });
                });
            } else {
                const modalBody = modalElem.querySelector('.modal-body');
                modalBody.innerHTML = '';
                const listItem = wrapper.querySelectorAll('.hidden-list input[type="hidden"]');
                listItem.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item.value;
                    modalBody.appendChild(img);
                });
            }

        });
    });
    // end modalTriggerButtons.forEach
})(jQuery);

