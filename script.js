document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('.circle');
  const curvePath = document.querySelector('.curve-path');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const circleObserver = new IntersectionObserver(revealOnScroll, observerOptions);
  circles.forEach(circle => {
    circleObserver.observe(circle);
  });

  // Scroll-based animation for the curve
  const animateCurveOnScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
    const maxDashOffset = 5000; // same as the stroke-dasharray
    curvePath.style.strokeDashoffset = maxDashOffset * (1 - scrollPercent);
  };

  window.addEventListener('scroll', animateCurveOnScroll);
});
