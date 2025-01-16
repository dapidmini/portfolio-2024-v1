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
    // const modalTriggerButtons = document.querySelectorAll('[data-modal-target] [type="button"]');
    // let modalSelector, modalElem;
    // modalTriggerButtons.forEach(elem => {
    //     elem.addEventListener('click', function(e) {

    //         // // inisialisasi dan aplikasikan popup modal gallery scr manual
    //         // // utk menghindari bug swiperjs ketika digabungkan dgn popup modal
    //         // const myModal = new bootstrap.Modal(modalSelector);
    //         // myModal.toggle();

    //         // const carouselElem = document.querySelector('#carouselContainer');

    //         // const carousel = new bootstrap.Carousel(carouselElem, {
    //         //     interval: 2000,
    //         //     touch: false
    //         // });
    
    //     });
    // });
    // // end modalTriggerButtons.forEach

    const modalTriggerButtons = document.querySelectorAll('[data-project-title] [type="button"]');
    console.log('buttons', modalTriggerButtons);
    modalTriggerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalWrapper = button.closest('[data-project-title]');
            console.log('click', modalWrapper);
            let slideData = [];
            const projectItems = modalWrapper.querySelectorAll('.hidden-list input[type="hidden"]');
            projectItems.forEach((item, index) => {
                const obj = {
                    src: item.value,
                    title: item.getAttribute('data-img-title'),
                    desc: item.getAttribute('data-img-desc'),
                };
                slideData.push(obj);
            });

            adjustModalContent(button, slideData);
            console.log('debug 1', slideData);
            initCarousel(slideData);
            console.log('slide data', slideData);
        });
    });

    // function ini dijalankan setelah popup modal ditampilkan
    // popup modal diisi dengan carousel yang berisi dengan gambar2 dari project tersebut
    function adjustModalContent(elem) {
        // susun data yg dibutuhkan (img src dan alt) menjadi array of object agar mudah digunakan seterusnya
        const wrapper = elem.closest('[data-project-title]');

        const modalSelector = elem.getAttribute('data-bs-target');
        const modalElem = document.querySelector(modalSelector);

        const projectTitle = wrapper.getAttribute('data-project-title');
        const modalTitle = modalElem.querySelector('.modal-title');
        modalTitle.innerHTML = projectTitle;
        modalTitle.classList.add('text-capitalize');
    }

    // Function to dynamically add carousel items
    function initCarousel(images) {
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        let active = true;
        images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (active) {
                carouselItem.classList.add('active');
                active = false;
            }

            const imgWrapper = document.createElement('div');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            img.classList.add('d-block', 'img-fluid');
            imgWrapper.appendChild(img);
            imgWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center');

            const labelWrapper = document.createElement('div');
            const label = document.createElement('h5');
            label.innerHTML = image.desc;
            label.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            labelWrapper.appendChild(label);
            labelWrapper.classList.add('carousel-caption', 'd-none', 'd-md-block');

            carouselItem.appendChild(imgWrapper);
            carouselItem.appendChild(labelWrapper);
            carouselInner.appendChild(carouselItem);

            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#carouselContainer');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.classList.add('active', 'dot');
            if (active) {
                indicator.classList.add('active');
            }

            carouselIndicators.appendChild(indicator);
        });
    }
    // end function initCarousel


    // $('#modal-project-multiple').on('shown.bs.modal', function (e) {
    //     alert('show modal');
    // });

})(jQuery);

