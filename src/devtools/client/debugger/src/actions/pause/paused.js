/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

//
import {
  getHiddenBreakpoint,
  isEvaluatingExpression,
  getSelectedFrame,
  getThreadContext,
} from "../../selectors";

import { fetchFrames } from ".";
import { removeBreakpoint } from "../breakpoints";
import { evaluateExpressions, markEvaluatedExpressionsAsLoading } from "../expressions";
import { selectLocation } from "../sources";
import assert from "../../utils/assert";

import { fetchScopes } from "./fetchScopes";
import { setFramePositions } from "./setFramePositions";

/**
 * Debugger has just paused
 *
 * @param {object} pauseInfo
 * @memberof actions/pause
 * @static
 */
export function paused({ executionPoint }) {
  return async function ({ dispatch, getState }) {
    dispatch({ type: "PAUSED", executionPoint });

    // Get a context capturing the newly paused and selected thread.
    const cx = getThreadContext(getState());

    await dispatch(markEvaluatedExpressionsAsLoading(cx));

    await dispatch(fetchFrames(cx));

    const frame = getSelectedFrame(getState());
    if (frame) {
      dispatch(selectLocation(cx, frame.location, { remap: true }));
    }

    const hiddenBreakpoint = getHiddenBreakpoint(getState());
    if (hiddenBreakpoint) {
      dispatch(removeBreakpoint(cx, hiddenBreakpoint));
    }

    const promises = [];
    promises.push(
      (async () => {
        dispatch(setFramePositions());
      })()
    );

    promises.push(
      (async () => {
        await dispatch(fetchScopes(cx));

        // Run after fetching scoping data so that it may make use of the sourcemap
        // expression mappings for local variables.
        await dispatch(evaluateExpressions(cx));
      })()
    );

    await Promise.all(promises);
  };
}
