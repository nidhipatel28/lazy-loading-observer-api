/** First we get all the non-loaded image elements **/
var cards = [].slice.call(document.querySelectorAll(".card"));

/** Then we set up a intersection observer watching over those images and whenever any of those becomes visible on the view then replace the placeholder image with actual one, remove the non-loaded class and then unobserve for that element **/
let cardObserver = new IntersectionObserver(function(entries, observer) {
   
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            let card = entry.target;
            let loader = card.querySelector(".loader")
            let cardWrapper = card.querySelector(".card-wrapper")
            let imgWrapper = cardWrapper.querySelector(".img-wrapper img")
            imgWrapper.src = imgWrapper.dataset.src;

            setTimeout(() => {
                cardWrapper.classList.remove("lazy");
                loader?.classList.remove("loader");
                cardObserver.unobserve(cardWrapper);
            }, 500)
        }
    });
});

/** Now observe all the non-loaded images using the observer we have setup above **/
cards.forEach(function(card) {
    cardObserver.observe(card);
});