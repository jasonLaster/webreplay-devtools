// Test hitting breakpoints when using tricky control flow constructs:
// catch, finally, generators, and async/await.
(async function() {
  await rewindToBreakpoint(10);
  await resumeToBreakpoint(12);
  await resumeToBreakpoint(18);
  await resumeToBreakpoint(20);
  await resumeToBreakpoint(32);
  await resumeToBreakpoint(27);
  await Test.resumeToLine(32);
  await Test.resumeToLine(27);
  await resumeToBreakpoint(42);
  await resumeToBreakpoint(44);
  await resumeToBreakpoint(50);
  await resumeToBreakpoint(54);

  Test.finish();

  async function rewindToBreakpoint(line) {
    await Test.addBreakpoint("doc_control_flow.html", line);
    await Test.rewindToLine(line);
  }

  async function resumeToBreakpoint(line) {
    await Test.addBreakpoint("doc_control_flow.html", line);
    await Test.resumeToLine(line);
  }
})();
