/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";
const { openDocLink } = require("devtools/client/shared/link");

export function highlightDomElement(grip) {
  return ({ toolbox }) => {
    const highlighter = toolbox.getHighlighter();
    if (highlighter) {
      highlighter.highlight(grip);
    }
  };
}

export function unHighlightDomElement(grip) {
  return ({ toolbox }) => {
    const highlighter = toolbox.getHighlighter();
    if (highlighter) {
      highlighter.unhighlight(grip);
    }
  };
}

// NOTE these methods are proxied currently because the
// service container is passed down the tree. These methods should eventually
// be moved to redux actions.
export function openLink(url, e) {
  return () => {
    openDocLink(url, {
      relatedToCurrent: true,
      inBackground: isMacOS ? e.metaKey : e.ctrlKey,
    });
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
  };
}

export function openNodeInInspector(valueFront) {
  return async ({ toolbox }) => {
    const onSelectInspector = toolbox.selectTool("inspector", "inspect_dom");

    const onNodeFront = valueFront
      .getPause()
      .ensureDOMFrontAndParents(valueFront._object.objectId)
      .then(async nf => {
        await nf.ensureParentsLoaded();
        return nf;
      });

    const [nodeFront] = await Promise.all([onNodeFront, onSelectInspector]);

    await toolbox.selection.setNodeFront(nodeFront, {
      reason: "console",
    });
  };
}

export function focusInput() {
  return ({ hud }) => {
    hud.focusInput();
  };
}

export function onMessageHover(type, message) {
  return ({ hud }) => {
    hud.emit("message-hover", type, message);
  };
}

export function getJsTermTooltipAnchor() {
  return ({ hud }) => {
    hud.getJsTermTooltipAnchor();
  };
}

export function jumpToExecutionPoint(point, time, hasFrames) {
  return ({ toolbox }) => {
    toolbox.threadFront.timeWarp(point, time, hasFrames);
  };
}

export function onViewSourceInDebugger(frame) {
  return ({ toolbox }) => {
    toolbox.viewSourceInDebugger(frame.url, frame.line, frame.column, frame.scriptId);
  };
}

export function closeSplitConsole() {
  return ({ toolbox }) => {
    toolbox.toggleSplitConsole(false);
  };
}
