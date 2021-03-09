export const defaultConfig = {
  settings: {
    lowRAM: 4,
    lowCPU: 4,
    slowConnectionTypes: ['slow-2g', '2g', '3g'],
  },
  sessionStorageKey: 'progressiveUserSettings',
};

export const devConfig = {
  ...defaultConfig,
  sessionStorageDevKey: 'progressiveUserDevSettings',
  defaultDevSettings: {
    isDraggable: true,
    mode: 'closed',
    posTop: 20,
    posLeft: 20,
  },
};
