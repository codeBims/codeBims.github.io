/* Small, deterministic models shared by the interactive figures and their checks. */
(() => {
  const sampleLogs = [
    '08:00:01 host=demo-01 event=read status=ok',
    '08:00:02 host=demo-02 event=write status=ok',
    '08:00:03 host=demo-01 event=read status=ok',
    '08:00:04 host=demo-03 event=login status=failed',
    '08:00:05 host=demo-01 event=read status=ok',
    '08:00:06 host=demo-02 event=write status=ok',
    '08:00:07 host=demo-03 event=login status=ok',
    '08:00:08 host=demo-01 event=read status=ok'
  ];
  function parseLog(line) {
    const [timestamp, ...fields] = line.split(' ');
    return Object.fromEntries([['timestamp', timestamp], ...fields.map(field => field.split('='))]);
  }
  function summarizeLogs(lines) {
    return lines.map(parseLog).reduce((counts, row) => { counts[row.event] = (counts[row.event] || 0) + 1; return counts; }, {});
  }
  function grainPositions(stage) {
    const heights = [3,5,8,6,9,5];
    return Array.from({ length: 36 }, (_, i) => {
      if (stage === 0) return { x: 40 + (i % 6) * 75 + ((i * 17) % 27 - 13), y: 43 + Math.floor(i / 6) * 29 + ((i * 11) % 17 - 8) };
      if (stage === 1) return { x: 57 + (i % 6) * 76, y: 48 + Math.floor(i / 6) * 30 };
      let column = 0, row = i;
      while (row >= heights[column]) row -= heights[column++];
      return { x: 57 + column * 76, y: 208 - row * 19 };
    });
  }
  const api = { sampleLogs, parseLog, summarizeLogs, grainPositions, retail: { rows:541909, invoices:18532, customers:4338, cohort:2075, subsequent:885 }, mae: { blaze:8.4, yolo:8.6 } };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.PortfolioModels = api;
})();
