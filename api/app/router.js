const periodic = require('./periodic');
const page = require('./page');

const router = (app) => {
  app.get('/analytics', (req, res) => {
    res.send(periodic.getCurrentAnalytics());
  });

  app.get('/:id?', (req, res) => {
    if (req.params.id === 'favicon.ico') return;
    const offset = typeof req.params.id !== 'undefined' ? parseInt(req.params.id, 10) - 1 : 0;
    const analytics = periodic.getCurrentAnalytics();
    const { locations } = analytics;
    const total = locations.length;
    const slice = locations.slice(offset * 20, (offset + 1) * 20);
    res.send(page(offset, total, slice, false));
  });

  app.post('/', (req, res) => {
    const analytics = periodic.getCurrentAnalytics();
    const { locations } = analytics;
    const slice = locations.filter(i => i.name.toLowerCase().indexOf(req.body.search.toLowerCase()) !== -1);
    res.send(page(0, slice.length, slice, req.body.search));
  });
};

module.exports = router;
