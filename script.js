
//CURSOR ANIMATION    --> not applicable on all pages: cross-check from my own website

const coords = {x: 0, y: 0};
const circles = document.querySelectorAll(".circle-pointer");

const colors = ["#98904d", "#a58a47", "#b28345", "#be7b48", "#c8724f", "#d0695a", "#d66168", "#d75a79", "#d4578c", "#cc57a0", "#bd5cb5", "#a663c8"];

circles.forEach(function(circle, index){
    circle.x = 0;
    circle.y = 0;

    circle.style.backgroundColor = colors[index%colors.length];
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animatePointer(){
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index){
        circle.style.left = x-12 + "px";
        circle.style.top = y-12 + "px";

        circle.style.scale = (circles.length-index)/circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index+1] || circles[0];  //if index+1 doesn't exist, then back to 0th idx
        x += (nextCircle.x-x)*0.1;
        y += (nextCircle.y-y)*0.1;
    });

    requestAnimationFrame(animatePointer);
}

animatePointer();


Shery.makeMagnet(".nav-hover");

// Shery.mouseFollower({
//     // color: green,
//     skew: true, 
//     ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//     duration: 1,
// });

//-------------------------------------------------COVER_PAGE-------------------------------------------------//

//CIRCULAR NAME DISPLAY


//COVER PAGE ANIMATION

var tl = gsap.timeline();
gsap.set("#circle img", {opacity: 0});
tl.from('.section', {
    stagger: .3,
    width: 0,
    duration: 2,
    opacity: 0,
    ease: 'Expo.easeInOut'
}).from('nav a', {
    stagger: .1,
    x: 30,
    duration: 1.5,
    opacity: 0,
    ease: 'Expo.easeInOut'
}, '-=1')
.from('#circle', {
    rotate: '90deg',
    opacity: 0,
    ease: 'Expo.easeInOut',
    duration: 2
}, '-=2')
.from('#circle img', {
    x: '300',
    y: '800',
    // opacity: 0,
    // delay: -1,
    ease: 'slow(1.8)',
    duration: .81,
}, '-=1')
.to('#circle img', {
    opacity: 1,
    ease: 'slow(0.5)'
}, "-=.6")



//INTRO TEXT ANIMATION

const text = `I am Ashvin Soin, a Journalism and Mass comm undergrad.`;
const typingSpeed = 0.2;
const cursorElement = document.querySelector(".typing-cursor");
const typedTextElement = document.querySelector(".typed-text");

typedTextElement.style.fontFamily="sans-serif";
typedTextElement.style.fontWeight="lighter";
function typeText() {
    let charIndex = 0;
    let lineIndex = 0;

    const typingInterval = setInterval(() => {
        if (lineIndex === 0) {
            typedTextElement.textContent += text[charIndex];
        } else {  
            const currentText = typedTextElement.textContent.split("\n");   // read each character
            const currentLine = currentText[lineIndex];
            typedTextElement.textContent = currentText
                .slice(0, lineIndex + 1)
                .join("\n");
            typedTextElement.textContent += "\n" + currentLine + text[charIndex];
        }
        if (charIndex === text.length - 1) {
            clearInterval(typingInterval);
        }
        charIndex++;
        if (text[charIndex - 1] === "\n") {   // detect line break, to move cursor to next line
            lineIndex++; 
            cursorElement.style.top = `${lineIndex * 30}px`; 
        }
    }, typingSpeed);
}
window.addEventListener("load", () => {
    setTimeout(() => {
        typeText();
        cursorElement.style.display = "none"; // Hide the cursor when typing is finished
    }, 1000); // Delay the start of typing for 1 second
});


gsap.to(".sec-elem", {
    scrollTrigger: {   //allows to pin the screen elements after a certain level
        trigger: "#sec-container", 
        pin: true,
        start: "top top",
        end: "bottom bottom",
        endTrigger: ".last",
        scrub: 1   //animate along with scrolling
    },
    y: "-300%",
    ease: Power1,

})

let sections = document.querySelectorAll(".sec-elem");
Shery.imageEffect(".scroll-images", {
    style: 1,
    // debug: true,
    config: {"a":{"value":1.83,"range":[0,30]},"b":{"value":-1,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.657241100481329},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":3},"scrollLerp":{"value":0.07},"gooey":{"value":false},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    slideStyle: (setScroll) => {
        sections.forEach(function(section, idx){
            ScrollTrigger.create({
                trigger: section,
                start: "top 200px", 
                scrub: 1,
                onUpdate: function(sec){   //how much the elem was scrolled
                    setScroll(sec.progress+idx)
                }
            })
        })
    },
});



gsap.to('#videoPlayer',{
    scrollTrigger: {
        trigger: "#pictures",
        start: "top top",
        scrub: 2,
        pin: "#pictures"
    },
    width: "100%"
})

gsap.to('#img1',{
    scrollTrigger: {
        trigger: "#pictures",
        start: "top top",
        scrub: 2,
    },
    left: "-30%",
    opacity: 0
})

gsap.to('#imgSet1',{
    scrollTrigger: {
        trigger: "#pictures",
        start: "top top",
        scrub: 2,
    },
    left: "-15%",
    opacity: 0
})

gsap.to('#img6',{
    scrollTrigger: {
        trigger: "#pictures",
        start: "top top",
        scrub: 2,
    },
    right: "-30%",
    opacity: 0
})

gsap.to('#imgSet2',{
    scrollTrigger: {
        trigger: "#pictures",
        start: "top top",
        scrub: 2,
    },
    right: "-15%",
    opacity: 0
})


Shery.imageEffect("#videoPlayer", {
    style: 2, 
    // debug: true,
    config: {"resolutionXY":{"value":100},"distortion":{"value":false},"mode":{"value":-3},"mousemove":{"value":0},"modeA":{"value":1},"modeN":{"value":0},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.562874251497006},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":3.46,"range":[1,15]},"durationOut":{"value":0.4,"range":[0.1,5]},"durationIn":{"value":0.32,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":34}},"discard_threshold":{"value":0.47,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.18,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}}, 
    gooey: true
});

document.querySelector("#fourthText button").addEventListener("mouseover", function(){
    gsap.to("#fourth video", {
        opacity: 1, 
        duration: 1.5, 
        ease: Power4
    })
})

document.querySelector("#fourthText button").addEventListener("mouseleave", function(){
    gsap.to("#fourth video", {
        opacity: 0, 
        duration: 1.5, 
        ease: Power4
    })
})


