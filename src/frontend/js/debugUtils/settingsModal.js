/**
 * Copyright (c) 2021 Netcentric, a Cognizant Digital Business
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  memoryLevelConfig,
  cpuLevelConfig,
  connectionSpeedConfig,
  saveDataConfig,
  reducedMotionConfig,
  trackingConfig,
  footerConfig,
  modalClasses,
  modalFormIds,
  modalLogoConfig,
  modalSettingsIconConfig,
} from './settingsModal.config';
import closeIcon from './icons/closeIcon';

function buildModalBaseOpen(devSettings) {
  const {
    mode,
    posTop,
    posLeft,
    isDraggable,
  } = devSettings;
  const style = `top: ${posTop}px; left: ${posLeft}px;`;
  let modeClass = mode === 'closed' ? `${modalClasses.settingsModalBaseClass}--closed` : `${modalClasses.settingsModalBaseClass}--open`;
  if (mode === 'banner') {
    modeClass += ` ${modalClasses.settingsModalBaseClass}--banner`;
  }

  return `<div class="${modalClasses.settingsModalBaseClass} ${modeClass}"
               style="${style}"
               id="${modalClasses.settingsModalBaseClass}" 
               draggable="${isDraggable ? 'true' : 'false'}">`;
}

function buildModalHeader() {
  return `<div class="${modalClasses.settingsModalHeaderClass}">
    <img class="${modalClasses.settingsModalLogoClass}" src="${modalLogoConfig.src}" alt="${modalLogoConfig.alt}" title="${modalLogoConfig.title}" width="40" height="40">
    <p class="${modalClasses.settingsModalTitleClass}">Simulator</p>
    <span class="${modalClasses.settingsModalOverlayIconClass} ${modalClasses.settingsModalOverlayCloseIconClass}">
      ${closeIcon}
    </span>
    <span class="${modalClasses.settingsModalOverlayIconClass} ${modalClasses.settingsModalOverlayOpenIconClass}">
      <img src="${modalSettingsIconConfig.src}" alt="${modalSettingsIconConfig.alt}" title="${modalSettingsIconConfig.title}" width="30" height="30">
    </span>
  </div>`;
}

function buildModalBaseEnd() {
  return '</div>';
}

function buildFormStart() {
  return `<form class="${modalClasses.settingsModalFormClass}" id="${modalFormIds.settingsModalFormId}">`;
}

function buildSubmitButton() {
  return `<button type="submit" class="${modalClasses.settingsModalSubmitClass}" id="${modalFormIds.settingsModalSubmitId}" value="Submit">Update</button>`;
}

function buildModalFooter(config, devSettings) {
  return `<div class="${modalClasses.settingsModalFooterClass} ${modalClasses.settingsModalControllerToggleClass} ${modalClasses.settingsModalControllerViewClass}">
      <a class="${modalClasses.settingsModalFooterLink}" href="${config.websiteUrl}" target="_blank">${config.websiteLabel}</a>
      <label class="${modalClasses.settingsModalToggleClass} ${modalClasses.settingsModalToggleViewClass}">
        <input type="checkbox" 
                id="${config.id}" 
                class="${modalClasses.settingsModalInputClass}"
                name="${config.name}" 
                value="${devSettings.mode === 'banner' ? config.checkedValue : config.uncheckedValue}"
                data-checked-value="${config.checkedValue}"
                data-unchecked-value="${config.uncheckedValue}"
                ${devSettings.mode === 'banner' ? 'checked' : ''}>
                ${devSettings.mode === 'banner' ? config.simulator : config.banner}
      </label>
  </div>`;
}

function buildFormEnd() {
  return '</form>';
}

function buildOptions(options) {
  let allOptions = '';

  options.forEach((option) => {
    allOptions += `<li class="${modalClasses.settingsModalOptionClass}">
        <input type="${option.type}" id="${option.id}" class="${modalClasses.settingsModalInputClass}" name="${option.name}" value="${option.value}">
        <label for="${option.id}" class="${modalClasses.settingsModalLabelClass}">${option.label}</label>
    </li>`;
  });

  return allOptions;
}

function buildController(config) {
  const options = buildOptions(config.options);

  return `<div class="${modalClasses.settingsModalControllerClass} ${modalClasses.settingsModalControllerOptionsClass}">
    <p class="${modalClasses.settingsModalParameterClass}">${config.title}</p>
    <p class="${modalClasses.settingsModalParameterValueClass}"></p>
    <ul class="${modalClasses.settingsModalOptionsClass} ${modalClasses.settingsModalParameterInputClass}" id="${config.id}">
        ${options}
    </ul>
  </div>`;
}

function buildToggleController(config) {
  return `<div class="${modalClasses.settingsModalControllerClass} ${modalClasses.settingsModalControllerToggleClass}">
    <p class="${modalClasses.settingsModalParameterClass}">${config.title}</p>
    <p class="${modalClasses.settingsModalParameterValueClass}">${config.value}</p>
    <label class="${modalClasses.settingsModalToggleClass} ${modalClasses.settingsModalParameterInputClass}">
      <input type="checkbox" 
              id="${config.id}" 
              class="${modalClasses.settingsModalInputClass}"
              name="${config.name}" 
              value="${config.value}"
              data-checked-value="${config.checkedValue}"
              data-unchecked-value="${config.uncheckedValue}">
      <span class="${modalClasses.settingsModalSliderClass}"></span>
    </label>
  </div>`;
}

const buildModal = (devSettings) => {
  const modalBaseStart = buildModalBaseOpen(devSettings);
  const modalBaseEnd = buildModalBaseEnd();
  const modalHeader = buildModalHeader();
  const formStart = buildFormStart();
  const submitButton = buildSubmitButton();
  const formEnd = buildFormEnd();

  const memoryLevelController = buildController(memoryLevelConfig);
  const cpuLevelController = buildController(cpuLevelConfig);
  const connectionSpeedController = buildController(connectionSpeedConfig);
  const saveDataController = buildToggleController(saveDataConfig);
  const reducedMotionController = buildToggleController(reducedMotionConfig);
  const trackingController = buildToggleController(trackingConfig);
  const viewController = buildModalFooter(footerConfig, devSettings);

  return `${modalBaseStart}
    ${modalHeader}
    ${formStart}
    ${memoryLevelController}
    ${cpuLevelController}
    ${connectionSpeedController}
    ${saveDataController}
    ${reducedMotionController}
    ${trackingController}
    ${submitButton}
    ${formEnd}
    ${viewController}
    ${modalBaseEnd}`;
};

export default buildModal;
