const baseModalClass = 'settingsModal';
const modalClasses = {
  settingsModalBaseClass: baseModalClass,
  settingsModalBaseOpenClass: `${baseModalClass}--open`,
  settingsModalBaseClosedClass: `${baseModalClass}--closed`,
  settingsModalBannerClass: `${baseModalClass}--banner`,
  settingsModalHeaderClass: `${baseModalClass}__header`,
  settingsModalTitleClass: `${baseModalClass}__title`,
  settingsModalFormClass: `${baseModalClass}__form`,
  settingsModalSubmitClass: `${baseModalClass}__submit`,
  settingsModalOptionsClass: `${baseModalClass}__options`,
  settingsModalOptionClass: `${baseModalClass}__option`,
  settingsModalControllerClass: `${baseModalClass}__controller`,
  settingsModalControllerToggleClass: `${baseModalClass}__controller--toggle`,
  settingsModalControllerOptionsClass: `${baseModalClass}__controller--options`,
  settingsModalControllerViewClass: `${baseModalClass}__controller--view`,
  settingsModalParameterClass: `${baseModalClass}__parameter`,
  settingsModalParameterValueClass: `${baseModalClass}__parameterValue`,
  settingsModalParameterInputClass: `${baseModalClass}__parameterInput`,
  settingsModalInputClass: `${baseModalClass}__input`,
  settingsModalLabelClass: `${baseModalClass}__label`,
  settingsModalToggleClass: `${baseModalClass}__toggle`,
  settingsModalSliderClass: `${baseModalClass}__slider`,
  settingsModalOverlayClass: `${baseModalClass}__overlay`,
  settingsModalOverlayOpenClass: `${baseModalClass}__overlay--open`,
  settingsModalOverlayClosedClass: `${baseModalClass}__overlay--closed`,
  settingsModalOverlayIconClass: `${baseModalClass}__icon`,
  settingsModalOverlayCloseIconClass: `${baseModalClass}__closeIcon`,
  settingsModalOverlayOpenIconClass: `${baseModalClass}__openIcon`,
};

const modalFormIds = {
  settingsModalSubmitId: `${baseModalClass}Submit`,
  settingsModalFormId: `${baseModalClass}Form`,
};

const memoryLevelConfig = {
  title: 'memory level',
  id: 'settingsModalMemoryLevel',
  valuePrefix: 'memory-level',
  options: [{
    type: 'radio',
    id: 'memory-level-low',
    name: 'memoryLevel',
    value: 'low',
    label: 'low',
  },
  {
    type: 'radio',
    id: 'memory-level-mid',
    name: 'memoryLevel',
    value: 'mid',
    label: 'mid',
  },
  {
    type: 'radio',
    id: 'memory-level-high',
    name: 'memoryLevel',
    value: 'high',
    label: 'high',
  },
  {
    type: 'radio',
    id: 'memory-level-unknown',
    name: 'memoryLevel',
    value: 'unknown',
    label: 'unknown',
  }],
};

const cpuLevelConfig = {
  title: 'CPU level',
  id: 'settingsModalCpuLevel',
  valuePrefix: 'cpu-level',
  options: [{
    type: 'radio',
    id: 'cpu-level-low',
    name: 'cpuLevel',
    value: 'low',
    label: 'low',
  },
  {
    type: 'radio',
    id: 'cpu-level-mid',
    name: 'cpuLevel',
    value: 'mid',
    label: 'mid',
  },
  {
    type: 'radio',
    id: 'cpu-level-high',
    name: 'cpuLevel',
    value: 'high',
    label: 'high',
  },
  {
    type: 'radio',
    id: 'cpu-level-unknown',
    name: 'cpuLevel',
    value: 'unknown',
    label: 'unknown',
  }],
};

const connectionSpeedConfig = {
  title: 'Connection speed',
  id: 'settingsModalConnectionSpeed',
  valuePrefix: 'connection-speed',
  options: [{
    type: 'radio',
    id: 'connection-speed-slow',
    name: 'connectionSpeed',
    value: 'slow',
    label: 'slow',
  },
  {
    type: 'radio',
    id: 'connection-speed-fast',
    name: 'connectionSpeed',
    value: 'fast',
    label: 'fast',
  },
  {
    type: 'radio',
    id: 'connection-speed-unknown',
    name: 'connectionSpeed',
    value: 'unknown',
    label: 'unknown',
  }],
};

const saveDataConfig = {
  title: 'Save data',
  id: 'saveData',
  name: 'saveData',
  value: 'true',
  checkedValue: 'true',
  uncheckedValue: 'false',
};

const reducedMotionConfig = {
  title: 'Reduced motion',
  id: 'reducedMotion',
  name: 'reducedMotion',
  value: 'true',
  checkedValue: 'true',
  uncheckedValue: 'false',
};

const trackingConfig = {
  title: 'Do not track',
  id: 'doNotTrack',
  name: 'doNotTrack',
  value: 'true',
  checkedValue: 'true',
  uncheckedValue: 'false',
};

const selects = {
  memoryLevel: memoryLevelConfig,
  cpuLevel: cpuLevelConfig,
  connectionSpeed: connectionSpeedConfig,
};

const toggles = {
  saveData: saveDataConfig,
  reducedMotion: reducedMotionConfig,
  doNotTrack: trackingConfig,
};

const viewSwitchConfig = {
  title: 'Banner view',
  id: 'view',
  name: 'view',
  value: 'disabled',
  checkedValue: 'enabled',
  uncheckedValue: 'disabled',
};

export {
  memoryLevelConfig,
  cpuLevelConfig,
  connectionSpeedConfig,
  saveDataConfig,
  reducedMotionConfig,
  trackingConfig,
  selects,
  toggles,
  viewSwitchConfig,
  baseModalClass,
  modalClasses,
  modalFormIds,
};
