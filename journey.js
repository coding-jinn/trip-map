const routes = document.querySelectorAll('.journey > .route');
const latestRoute = routes[routes.length - 1];

if (latestRoute && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const length = latestRoute.getTotalLength();
  const dashLength = 10;
  const dashSpacing = 25;
  const dashes = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  dashes.setAttribute('aria-hidden', 'true');

  for (let distance = 0, index = 0; distance < length; distance += dashSpacing, index++) {
    const dash = latestRoute.cloneNode(false);
    dash.classList.add('route-dash');
    // A gap longer than the whole path leaves only one dash on each copy.
    dash.style.strokeDasharray = `${dashLength} ${length + dashSpacing}`;
    dash.style.strokeDashoffset = `${-distance}`;
    dash.style.animationDelay = `${200 + index * 140}ms`;
    dashes.append(dash);
  }

  latestRoute.replaceWith(dashes);
}
