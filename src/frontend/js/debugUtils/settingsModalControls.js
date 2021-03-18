/* eslint-disable consistent-return */
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
  selects,
  toggles,
  modalClasses,
  modalFormIds,
  footerConfig,
} from './settingsModal.config';
import { onDragStart, onDragEnd, onDragOver } from './settingsModalDrag';
import { writeValuesToStorage } from './utils/utils';

function configureRadioButtonSettings(inputSelector, currentValue) {
  const settingsModalForm = document.querySelector(`.${modalClasses.settingsModalFormClass}`);
  const settingsModalInputs = [...settingsModalForm.querySelectorAll(inputSelector)];

  const currentValueNode = settingsModalInputs.find((input) => input.id === currentValue);
  if (!currentValueNode) { return; }
  currentValueNode.setAttribute('checked', '');
  const { value } = currentValueNode;
  const valueField = currentValueNode.closest(`.${modalClasses.settingsModalControllerClass}`).querySelector(`.${modalClasses.settingsModalParameterValueClass}`);
  if (!valueField) { return; }
  valueField.innerHTML = value;
}

function configureToggleSwitch(inputId, dataKey, sessionStorageKey) {
  try {
    const currentValues = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    const settingsModalForm = document.querySelector(`.${modalClasses.settingsModalFormClass}`);
    const settingsModalInput = settingsModalForm.querySelector(`#${inputId}`);

    const currentToggleValue = currentValues[dataKey];
    if (currentToggleValue === 'false') { return; }
    settingsModalInput.setAttribute('checked', 'checked');
  } catch (e) {
    console.log('Unable to parse modal settings', e);
  }
}

function configureSettingsModal(sessionStorageKey) {
  try {
    const currentValues = JSON.parse(sessionStorage.getItem(sessionStorageKey));

    Object.keys(selects).forEach((setting) => {
      const settingData = selects[setting];
      configureRadioButtonSettings(`#${settingData.id} input`, `${settingData.valuePrefix}-${currentValues[setting]}`);
    });
    Object.keys(toggles).forEach((setting) => {
      const toggleId = toggles[setting].id;
      configureToggleSwitch(toggleId, setting, sessionStorageKey);
    });
  } catch (e) {
    console.log('Unable to parse modal settings', e);
  }
}

function displaySettings(modalBase, devSettings, sessionStorageDevKey) {
  modalBase.classList.remove(`${modalClasses.settingsModalBaseClosedClass}`);
  modalBase.classList.add(`${modalClasses.settingsModalBaseOpenClass}`);

  const newSettings = { ...devSettings };
  newSettings.mode = 'open';
  writeValuesToStorage(newSettings, sessionStorageDevKey);
}

function closeSettings(modalBase, devSettings, sessionStorageDevKey) {
  modalBase.classList.remove(`${modalClasses.settingsModalBaseOpenClass}`);
  modalBase.classList.remove(`${modalClasses.settingsModalBannerClass}`);
  modalBase.classList.add(`${modalClasses.settingsModalBaseClosedClass}`);

  const newSettings = { ...devSettings };
  newSettings.mode = 'closed';
  writeValuesToStorage(newSettings, sessionStorageDevKey);
}

function toggleInput(inputElement) {
  const isChecked = inputElement.getAttribute('checked') === 'checked';

  if (isChecked) {
    inputElement.removeAttribute('checked', 'false');
  } else {
    inputElement.setAttribute('checked', 'checked');
  }
}

function handleSliderClick(event) {
  event.stopPropagation();
  event.preventDefault();

  const element = event.target.parentElement;
  const inputElement = element.querySelector('input');

  toggleInput(inputElement);
}

function collectFormValues() {
  return new FormData(document.getElementById(modalFormIds.settingsModalFormId));
}

function findNonSettingsQueryStringValues(settingsKeys) {
  const queryString = window.location.search;
  if (!queryString) { return; }

  const queryStringValues = queryString.replace('?', '').split('&');
  const queryStringKeyValues = queryStringValues.map((value) => value.split('='));
  const filteredValues = queryStringKeyValues.filter((value) => !settingsKeys.includes(value[0]));

  return filteredValues;
}

function formatQueryString(queryStringValues) {
  const querySubstrings = queryStringValues.map((setting) => `${setting[0]}=${setting[1]}`);
  const queryString = querySubstrings.join('&');

  return queryString;
}

function buildQueryString(formValues) {
  const entries = [...formValues];
  const settingsKeys = [...Object.keys(selects), ...Object.keys(toggles)];
  const nonSettingQueryStringValues = findNonSettingsQueryStringValues(settingsKeys) || [];

  const newSettingsQueryStringValues = settingsKeys.map((setting) => {
    const newValue = entries.find((entry) => entry[0] === setting);
    return newValue || [setting, toggles[setting].uncheckedValue];
  });

  return formatQueryString([...nonSettingQueryStringValues, ...newSettingsQueryStringValues]);
}

function reloadPage(queryString) {
  const url = window.location.href.split('?')[0];
  const reloadUrl = `${url}?${queryString}`;

  window.location.href = reloadUrl;
}

function handleSubmit(event) {
  event.preventDefault();

  const formValues = collectFormValues();
  const queryString = buildQueryString(formValues);

  reloadPage(queryString);
}

function updateViewLabel(isBannerView) {
  const viewLabel = document.querySelector(`.${modalClasses.settingsModalToggleViewClass}`);
  const newLabel = isBannerView ? footerConfig.banner : footerConfig.simulator;

  viewLabel.textContent = newLabel;
}

function changeView(event, modalBase, devSettings, sessionStorageDevKey) {
  event.stopPropagation();
  event.preventDefault();

  const toggleElement = event.target.parentElement;
  const inputElement = toggleElement.querySelector('input');

  const isChecked = inputElement.getAttribute('checked') === 'checked';
  if (isChecked) {
    modalBase.classList.add(`${modalClasses.settingsModalBannerClass}`);

    const newSettings = { ...devSettings };
    newSettings.mode = 'banner';
    writeValuesToStorage(newSettings, sessionStorageDevKey);
    updateViewLabel(true);
    return;
  }
  modalBase.classList.remove(`${modalClasses.settingsModalBannerClass}`);
  const newSettings = { ...devSettings };
  newSettings.mode = 'open';
  writeValuesToStorage(newSettings, sessionStorageDevKey);
  updateViewLabel(false);
}

function addFormEventListeners() {
  const toggleControls = document.querySelectorAll(`.${modalClasses.settingsModalToggleClass}`);
  const settingsModalSubmit = document.getElementById(modalFormIds.settingsModalSubmitId);

  toggleControls.forEach((control) => {
    control.addEventListener('click', handleSliderClick);
  });

  settingsModalSubmit.addEventListener('click', handleSubmit);
}

function addModeSwitchEvents(modalBase, devSettings, sessionStorageDevKey) {
  const settingsOpenIcon = modalBase.querySelector(`.${modalClasses.settingsModalOverlayOpenIconClass}`);
  const settingsCloseIcon = modalBase.querySelector(`.${modalClasses.settingsModalOverlayCloseIconClass}`);
  const viewSwitch = modalBase.querySelector(`.${modalClasses.settingsModalControllerViewClass} .${modalClasses.settingsModalToggleClass}`);

  settingsOpenIcon.addEventListener('click', () => displaySettings(modalBase, devSettings, sessionStorageDevKey));
  settingsCloseIcon.addEventListener('click', () => closeSettings(modalBase, devSettings, sessionStorageDevKey));
  viewSwitch.addEventListener('click', (e) => changeView(e, modalBase, devSettings, sessionStorageDevKey));
}

function addModalDragEvents(modalBase, devSettings, sessionStorageDevKey) {
  modalBase.addEventListener('dragstart', onDragStart, false);
  document.body.addEventListener('dragover', onDragOver, false);
  document.body.addEventListener('drop', (e) => onDragEnd(e, devSettings, sessionStorageDevKey), false);
}

export const initModalControls = (config) => {
  const { defaultDevSettings, sessionStorageKey, sessionStorageDevKey } = config;

  configureSettingsModal(sessionStorageKey);
  addFormEventListeners();

  const modalBase = document.querySelector(`.${modalClasses.settingsModalBaseClass}`);

  addModeSwitchEvents(modalBase, defaultDevSettings, sessionStorageDevKey);
  if (defaultDevSettings.isDraggable) {
    addModalDragEvents(modalBase, defaultDevSettings, sessionStorageDevKey);
  }
};

export default initModalControls;
