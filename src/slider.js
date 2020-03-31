class SliderClass {

    constructor(container, timeout, fadeout, fadein) {
        this.slider = $(container); // selecteur du container du slider
        this.slide = this.slider.find('.imgSlid'); // selecteur des slides
        this.timeline = this.slider.find('.timeLine'); // selecteur de la barre de progression
        this.timeout = timeout; // durée de mise en ligne du slide actif
        this.fadeout = fadeout; // durée du fadeOut des slides
        this.fadein = fadein; // durée du fadeIn des slides
        this.indexSlide = this.slide.length - 1; // index (nombre de slides)
        this.i = 0; // compteur
        this.activeSlide = this.slide.eq(this.i); // image active, qui possède l'index
        this.initSettings(); // lance les premières propriétés + événements
    }; // fin du constructor

    initSettings() {

        this.activeSlide.css({ // lance la première slide
            display: 'block'
        });

        $(document).ready(() => { // quand le DOM est prêt, on lance ces 2 méthodes
            this.launchTimeline();
            this.slideLoop();
        });
    }

    nextSlide() {

        this.i++; // on incrémente l'index
        if (this.i > this.indexSlide) { // si index supérieur au nombre de slide, on revient au début
            this.i = 0;
        }

        this.changeSlide();
        clearTimeout(this.animation); // annule le setTimeout
        this.slideLoop(); // relance le setTimeout à 0
        this.timeline.stop(); // arrête l'animation de la barre de progression
        this.timeline.css('width', 0); // remet le width à 0
        this.launchTimeline(); // relance la barre de progression
    };

    prevSlide() {

        this.i--; // on décrémente l'index
        if (this.i < 0) { // si index inférieur à 0, on passe au dernier slide
            this.i = this.indexSlide;
        }

        this.changeSlide();

        clearTimeout(this.animation); // annule le setTimeout
        this.slideLoop(); // relance le setTimeout à 0

        this.timeline.stop(); // arrête l'animation de la barre de progression
        this.timeline.css('width', 0); // remet le width à 0
        this.launchTimeline(); // relance la barre de progression
    };

    slideLoop() {

        this.animation = setTimeout( () => {
            if (this.i < this.indexSlide) { // si l'index est inférieur au nombre de slides
                this.i++; // on incrémente (on passe au slide suivant)
            }
            else {
                this.i = 0; // sinon, on revient au premier slide (dernier slide => premier slide)
            }
            this.changeSlide();
            this.slideLoop(); // on relance la fonction pour créer la boucle
            this.launchTimeline(); // on lance la barre de progression
        }, this.timeout); // toutes les 5 secondes
    };

    changeSlide() {

        this.activeSlide.fadeOut(this.fadeout); // fait disparaître lentement la slide active (remplace $slide.css('display', 'none');)
        this.activeSlide = this.slide.eq(this.i); // change l'index
        this.activeSlide.fadeIn(this.fadein); // fait apparaître lentement le slide du nouvel index(précédement : $activeSlide.css('display', 'block');)
    };

    launchTimeline() {

        let percent = this.timeline.attr('data-percent'); // récupère le data 100% de l'élément
        this.timeline.animate( {
            width: percent
        },this.timeout, 'linear', () => {
            this.timeline.css('width', 0); // une fois l'animation complète, on revient à 0
        });
    };
}