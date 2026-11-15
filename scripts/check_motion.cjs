const assert = require('node:assert/strict');
const M = require('../motion-models.js');
assert.deepEqual(M.summarizeLogs(M.sampleLogs), {read:4,write:2,login:2});
assert.deepEqual(M.parseLog(M.sampleLogs[0]), {timestamp:'08:00:01',host:'demo-01',event:'read',status:'ok'});
assert.equal((M.retail.subsequent/M.retail.cohort*100).toFixed(1), '42.7');
assert.equal(M.retail.invoices,18532);
for (const stage of [0,1,2]) {
  const points=M.grainPositions(stage);
  assert.equal(points.length,36);
  assert.equal(new Set(points.map(p=>`${p.x}:${p.y}`)).size,36);
  assert(points.every(p=>p.x>=15&&p.x<=485&&p.y>=15&&p.y<=235));
}
assert.equal((M.mae.yolo-M.mae.blaze).toFixed(1),'0.2');
console.log('PASS: log simulation, reported cohort/MAE values and bounded figure geometry');
