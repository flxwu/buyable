export const sidebarPages = [
  { name: 'Timeline', url: '/' },
  { name: 'Groups', url: '/groups' },
  { name: 'Items', url: '/items' }
];

export const checkForRestrictedPage = (routePage, fallback, condition) =>
  condition ? routePage : fallback;
