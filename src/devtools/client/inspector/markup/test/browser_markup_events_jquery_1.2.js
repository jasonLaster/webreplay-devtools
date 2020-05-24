/* Any copyright is dedicated to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/ */
/* import-globals-from helper_events_test_runner.js */
"use strict";

// Test that markup view event bubbles show the correct event info for jQuery
// and jQuery Live events (jQuery version 1.2).

const TEST_LIB = "lib_jquery_1.2_min.js";
const TEST_URL = URL_ROOT + "doc_markup_events_jquery.html?" + TEST_LIB;

loadHelperScript("helper_events_test_runner.js");

/*eslint-disable */
const TEST_DATA = [
  {
    selector: "html",
    expected: [
      {
        type: "load",
        filename: TEST_URL + ":29:38",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          () => {
            const handler1 = function liveDivDblClick() {
              alert(1);
            };
            const handler2 = function liveDivDragStart() {
              alert(2);
            };
            const handler3 = function liveDivDragLeave() {
              alert(3);
            };
            const handler4 = function liveDivDragEnd() {
              alert(4);
            };
            const handler5 = function liveDivDrop() {
              alert(5);
            };
            const handler6 = function liveDivDragOver() {
              alert(6);
            };
            const handler7 = function divClick1() {
              alert(7);
            };
            const handler8 = function divClick2() {
              alert(8);
            };
            const handler9 = function divKeyDown() {
              alert(9);
            };
            const handler10 = function divDragOut() {
              alert(10);
            };

            if ($("#livediv").live) {
              $("#livediv").live("dblclick", handler1);
              $("#livediv").live("dragstart", handler2);
            }

            if ($("#livediv").delegate) {
              $(document).delegate("#livediv", "dragleave", handler3);
              $(document).delegate("#livediv", "dragend", handler4);
            }

            if ($("#livediv").on) {
              $(document).on("drop", "#livediv", handler5);
              $(document).on("dragover", "#livediv", handler6);
              $(document).on("dragout", "#livediv:xxxxx", handler10);
            }

            const div = $("div")[0];
            $(div).click(handler7);
            $(div).click(handler8);
            $(div).keydown(handler9);
          }`
      },
    ]
  },
  {
    selector: "#testdiv",
    expected: [
      {
        type: "click",
        filename: TEST_URL + ":36:43",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick1() {
            alert(7);
          }`
      },
      {
        type: "click",
        filename: TEST_URL + ":37:43",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divClick2() {
            alert(8);
          }`
      },
      {
        type: "click",
        filename: URL_ROOT + TEST_LIB + ":24:10040",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function() {
            var val;
            if (typeof jQuery == "undefined" || jQuery.event.triggered) return val;
            val = jQuery.event.handle.apply(element, arguments);
            return val;
          }`
      },
      {
        type: "keydown",
        filename: TEST_URL + ":38:44",
        attributes: [
          "jQuery"
        ],
        handler: `
          function divKeyDown() {
            alert(9);
          }`
      },
      {
        type: "keydown",
        filename: URL_ROOT + TEST_LIB + ":24:10040",
        attributes: [
          "Bubbling",
          "DOM2"
        ],
        handler: `
          function() {
            var val;
            if (typeof jQuery == "undefined" || jQuery.event.triggered) return val;
            val = jQuery.event.handle.apply(element, arguments);
            return val;
          }`
      }
    ]
  },
];
/* eslint-enable */

add_task(async function() {
  await runEventPopupTests(TEST_URL, TEST_DATA);
});
