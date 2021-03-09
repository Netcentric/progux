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

import { defaultConfig } from '../../frontend/js/config';

function findStorageValues(storageKey) {
  try {
    const hasSessionStorageEntry = sessionStorage.getItem(storageKey) !== null;
    return hasSessionStorageEntry ? JSON.parse(sessionStorage.getItem(storageKey)) : {};
  } catch (e) {
    console.log(e);
    return {};
  }
}

function addStatusToPage(storageKey) {
  const storageValues = findStorageValues(storageKey);
  const statusPanel = document.querySelector('.statusPanel');
  let content = '<table>';

  Object.entries(storageValues).forEach((pair) => {
    const [key, value] = pair;
    content += `<tr>
                      <td>
                          ${key}
                      </td>
                      <td>
                          ${value}
                      </td>
                  </tr>`;
  });

  content += '</table>';

  statusPanel.insertAdjacentHTML('afterbegin', content);
}

addStatusToPage(defaultConfig.sessionStorageKey);
