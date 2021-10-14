const express = require('express');
const router = express.Router();

const TestRoutes = require('./test');

const AlertsRoutes = require('./alerts');
const AreasRoutes = require('./areas');
const BeaconsRoutes = require('./beacons');
const FacilitiesRoutes = require('./facilities');
const GatewaysRoutes = require('./gateways');
const OrganizationsRoutes = require('./organizations');
const PersonsRoutes = require('./persons');
const PositionsRoutes = require('./positions');
const UsersRoutes = require('./users');
const CasesRoutes = require('./cases');

module.exports = (base_url, app) => {
  router.use('/test', TestRoutes);
  router.use('/alerts', AlertsRoutes);
  router.use('/areas', AreasRoutes);
  router.use('/beacons', BeaconsRoutes);
  router.use('/facilities', FacilitiesRoutes);
  router.use('/gateways', GatewaysRoutes);
  router.use('/organizations', OrganizationsRoutes);
  router.use('/persons', PersonsRoutes);
  router.use('/positions', PositionsRoutes);
  router.use('/users', UsersRoutes);
  router.use('/cases', CasesRoutes);

  app.get('/', (req, res) => {
    res.send('<h1> NODE API Working 0.1 </h1>');
  });  
  app.use(base_url, router);
};