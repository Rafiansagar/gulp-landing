$(document).ready(function(){
    // Partical banner
    if ($('.particle-banner').length) {
        // Some random colors
        const colors = ["#fff", "#fff", "#fff", "#fff", "#fff"];

        const numBalls = 20;
        const balls = [];

        for (let i = 0; i < numBalls; i++) {
            let ball = document.createElement("div");
            ball.classList.add("ball");
            ball.style.background = colors[Math.floor(Math.random() * colors.length)];
            ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
            ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
            ball.style.transform = `scale(${Math.random()})`;
            ball.style.width = `${Math.random()}em`;
            ball.style.height = ball.style.width; 
            balls.push(ball);

            $('.particle-banner').append(ball);
        }

        // Keyframes
        balls.forEach((el, i, ra) => {
            let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 18
            };

            let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
            );
        });
    }
})(jQuery);
