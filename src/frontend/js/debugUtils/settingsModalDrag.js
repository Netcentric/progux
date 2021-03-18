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

import { writeValuesToStorage } from '../../utils/utilities/utils';

let cursorOffsetX;
let cursorOffsetY;

function onDragStart(e) {
  cursorOffsetX = e.offsetX;
  cursorOffsetY = e.offsetY;
  e.dataTransfer.setData('text/plain', e.target.id);
}

function onDragOver(e) {
  e.preventDefault();
}

function setCoordinates(el, xPos, yPos) {
  el.style.top = `${yPos}px`;
  el.style.left = `${xPos}px`;
}

function onDragEnd(e, devSettings, storageKey) {
  e.preventDefault();
  e.stopPropagation();

  const id = e.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const newX = e.pageX - cursorOffsetX;
  const newY = e.pageY - cursorOffsetY;

  setCoordinates(draggableElement, newX, newY);

  const newSettings = { ...devSettings };
  newSettings.posTop = newY;
  newSettings.posLeft = newX;
  writeValuesToStorage(newSettings, storageKey);

  e.dataTransfer.clearData();
}

export {
  onDragStart,
  onDragEnd,
  onDragOver,
};
