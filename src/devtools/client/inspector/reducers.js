/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

// This file exposes the Redux reducers of the box model, grid and grid highlighter
// settings.

exports.boxModel = require("devtools/client/inspector/boxmodel/reducers/box-model");
exports.changes = require("devtools/client/inspector/changes/reducers/changes");
exports.classList = require("devtools/client/inspector/rules/reducers/class-list");
exports.markup = require("devtools/client/inspector/markup/reducers/markup");
exports.pseudoClasses = require("devtools/client/inspector/rules/reducers/pseudo-classes");
exports.rules = require("devtools/client/inspector/rules/reducers/rules");

// This ObjectInspector reducer is needed for the Extension Sidebar.
const {
  default: objectInspector,
} = require("devtools/client/debugger/packages/devtools-reps/src/object-inspector/reducer");
exports.objectInspector = objectInspector;
