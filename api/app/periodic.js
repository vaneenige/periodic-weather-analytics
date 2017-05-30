const analytics = {};

async function getLocations(db) {
  const collection = db.collection('locations');
  return collection.find().toArray();
}

async function getNotificationCount(db) {
  const collection = db.collection('messages');
  return collection.find({ state: false }).count();
}

async function getStatusById(db, id) {
  const collection = db.collection('status');
  return collection.findOne({ id });
}

async function onPeriodicInterval(db) {
  analytics.notificationCount = await getNotificationCount(db);
  analytics.locations = await getLocations(db);
  for (let i = 0; i < analytics.locations.length; i += 1) {
    const { id, name, lat, lon } = analytics.locations[i];
    const status = await getStatusById(db, id);
    const { temp, description, icon } = status;
    analytics.locations[i] = { id, name, lat, lon, temp, description, icon };
  }
  analytics.locations.sort((a, b) => a.name.localeCompare(b.name));
}

const initialize = (db) => {
  onPeriodicInterval(db);
  setInterval(() => {
    onPeriodicInterval(db);
  }, 60000);
};

const getCurrentAnalytics = () => analytics;

module.exports = { initialize, getCurrentAnalytics };
