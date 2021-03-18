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

// Dev modal stylesheet import for rollup
import '../css/dev-styles';

import {
  findQueryStringParameters,
  hasStorageValues, updateSettings,
  runNonPersistentChecks,
  runAllChecks,
  findStorageValues,
} from '../utils/utilities/utils';
import buildModal from './debugUtils/settingsModal';
import { initModalControls } from './debugUtils/settingsModalControls';
import { devConfig } from './config';

const progUXdev = (params) => {
  const config = { ...devConfig, ...params };
  const { sessionStorageKey, sessionStorageDevKey, defaultDevSettings } = config;
  const userOverrides = findQueryStringParameters();
  const currentSettings = findStorageValues(sessionStorageKey);
  const devSettings = findStorageValues(sessionStorageDevKey);
  const valuesToUpdate = hasStorageValues(sessionStorageKey)
    ? runNonPersistentChecks(config.settings) : runAllChecks(config.settings);
  const state = Object.assign(currentSettings, valuesToUpdate, userOverrides);

  updateSettings(state, sessionStorageKey);

  window.addEventListener('load', () => {
    const settings = Object.keys(devSettings).length ? devSettings : defaultDevSettings;
    document.body.insertAdjacentHTML('afterbegin', buildModal(settings));

    initModalControls(config);
  });
};

export default progUXdev;
window.progUXdev = progUXdev;
