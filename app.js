import Usbmux from 'appium-ios-device';
const utilities = Usbmux.utilities;

const AMSTERDAM = { lat: 52.379184, lon: 4.900437 };
let firstDeviceId = '';

async function getDevices() {
  try {
    const connectedDevices = await utilities.getConnectedDevices();
    if(connectedDevices && connectedDevices.length > 0) {
      firstDeviceId = connectedDevices[0];
    }  
  } catch (error) {
    console.log(`on getDevices: ${error}`);
  }
}

async function getDeviceInfo(id) {
  try {
    const deviceInfo = await Usbmux.utilities.getDeviceInfo(id);
    console.log(`deviceInfo: ${JSON.stringify(deviceInfo, null, '    ')}`);
  } catch (error) {
    console.log(`on getDeviceInfo: ${error}`);
  }
}

async function setGeoLocation(id, lat, lon) {
  try {
    const locationService = await Usbmux.services.startSimulateLocationService(id);
    locationService.setLocation(lat, lon);
  } catch (error) {
    console.log(`on setGeoLocation: ${error}`);
  }
}

async function resetGeoLocation(id) {
  try {
    const locationService =  await Usbmux.services.startSimulateLocationService(id);
  locationService.resetLocation();
  } catch (error) {
    console.log(`on resetGeoLocation: ${error}`);
  }
}

async function simulate() {
  await getDevices();
  await getDeviceInfo(firstDeviceId);
  console.log(` ------------------------------------- sending you to Amsterdam ------------------------------------- `);
  await setGeoLocation(firstDeviceId, AMSTERDAM.lat, AMSTERDAM.lon);
  setTimeout(async() => {
    console.log(` ------------------------------------- now back home ------------------------------------- `);
    await resetGeoLocation(firstDeviceId);
  }, 5000);
}

simulate();