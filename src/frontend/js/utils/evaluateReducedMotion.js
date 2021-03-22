/**
 * Identifies if user selected prefers-reduced-motion option
 *
 * @returns {boolean}
 */
const evaluateReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default evaluateReducedMotion;
