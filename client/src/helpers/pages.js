export const checkForRestrictedPage = (routePage, fallback, condition) =>
  condition === false ? fallback : routePage;
