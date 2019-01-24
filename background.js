// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function onClicked(tab) {
  if (!tab.url.startsWith('http')) { return }

  chrome.tabs.executeScript(tab.id, {
    file: 'inject.js'
  }, () => {});
}
chrome.browserAction.onClicked.addListener(onClicked);
