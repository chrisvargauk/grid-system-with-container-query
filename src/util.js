export function getWidthDesktop() {
  const widthDesktop = Math.max(document.documentElement.clientWidth, window.innerWidth);
}

export function getWidth() {
  if (typeof window.screen.availWidth !== 'undefined') {
    return window.screen.availWidth;
  }

  const widthDesktop = Math.max(document.documentElement.clientWidth, window.innerWidth);

  return widthDesktop / window.devicePixelRatio;
}

export function getWidthDomElement( dElement ) {
  if (typeof dElement === 'undefined' ||
      dElement === null ||
      !(dElement instanceof HTMLElement)
  ) {
    throw 'ERROR: provided value has to be a DOM Element.';
  }

  const widthDesktop = Math.max(dElement.clientWidth, dElement.offsetWidth);

  return widthDesktop / window.devicePixelRatio;
}

export const screen = {
  getWidth, getWidthDesktop, getWidthDomElement
};

export default {
  screen
};