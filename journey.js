const journey = document.querySelector('.journey');
const portrait = window.matchMedia('(max-width: 600px) and (orientation: portrait)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const originalMap = journey.innerHTML;
const mobileStops = [[110, 660], [310, 480], [110, 300], [300, 120]];
const mobileRoutes = [
  'M110 660 C110 550 310 590 310 480',
  'M310 480 C310 370 110 410 110 300',
  'M110 300 C110 190 300 230 300 120',
];

function renderJourney() {
  journey.innerHTML = originalMap;
  journey.setAttribute('viewBox', portrait.matches ? '0 0 420 760' : '0 0 900 650');
  const routes = journey.querySelectorAll(':scope > .route');

  if (portrait.matches) {
    journey.querySelectorAll('.stop').forEach((stop, index) => {
      const [x, y] = mobileStops[index];
      stop.setAttribute('transform', `translate(${x} ${y})`);
    });
    routes.forEach((route, index) => route.setAttribute('d', mobileRoutes[index]));
  }

  const latestRoute = routes[routes.length - 1];
  if (!latestRoute || reducedMotion.matches) return;

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

renderJourney();
portrait.addEventListener('change', renderJourney);
reducedMotion.addEventListener('change', renderJourney);
