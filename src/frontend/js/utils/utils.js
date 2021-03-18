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

import findMemoryLevel from './evaluateMemory';
import findCpuLevel from './evaluateCpu';
import findConnectionSpeed from './evaluateConnectionSpeed';
import evaluateDataSaving from './evaluateDataSaving';
import evaluateTracking from './evaluateTracking';
import evaluateReducedMotion from './evaluateReducedMotion';

export const findQueryStringParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const entries = urlParams.entries();
  const returnObj = {};

  [...entries].forEach((pair) => {
    const [attribute, value] = pair;
    returnObj[attribute] = value;
  });

  return returnObj;
};

export const hasStorageValues = (storageKey) => sessionStorage.getItem(storageKey) !== null;

export const findStorageValues = (storageKey) => {
  try {
    return hasStorageValues(storageKey) ? JSON.parse(sessionStorage.getItem(storageKey)) : {};
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const writeValuesToStorage = (dataObject, storageKey) => {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(dataObject));
  } catch (e) {
    console.log(e);
  }
};

function addClassesToHtml(storageKey) {
  const storageValues = findStorageValues(storageKey);
  const html = document.getElementsByTagName('html')[0];

  Object.entries(storageValues).forEach((pair) => {
    const [key, value] = pair;
    const className = `${key}-${value}`;

    html.classList.add(className);
  });
}

export const updateSettings = (dataObject, storageKey) => {
  writeValuesToStorage(dataObject, storageKey);
  addClassesToHtml(storageKey);
};

export const runAllChecks = (settings) => {
  const { lowRAM, lowCPU, slowConnectionTypes } = settings;
  const memoryLevel = findMemoryLevel(lowRAM);
  const cpuLevel = findCpuLevel(lowCPU);
  const connectionSpeed = findConnectionSpeed(slowConnectionTypes);
  const saveData = evaluateDataSaving();
  const reducedMotion = evaluateReducedMotion();
  const doNotTrack = evaluateTracking();

  return {
    memoryLevel,
    cpuLevel,
    connectionSpeed,
    saveData,
    reducedMotion,
    doNotTrack,
  };
};

export const runNonPersistentChecks = (settings) => {
  const { slowConnectionTypes } = settings;
  const connectionSpeed = findConnectionSpeed(slowConnectionTypes);

  return {
    connectionSpeed,
  };
};
