import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-live-activity' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const LiveActivity = NativeModules.LiveActivity
  ? NativeModules.LiveActivity
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startActivity(
  status: string,
  driverName: string,
  expectingDeliveryTime: string
) {
  return LiveActivity.startActivity(status, driverName, expectingDeliveryTime);
}

export function listAllActivities() {
  return LiveActivity.listAllActivities();
}

export function endActivity(id: string) {
  return LiveActivity.endActivity(id);
}

export function updateActivity(
  id: string,
  status: string,
  driverName: string,
  expectingDeliveryTime: string
) {
  return LiveActivity.updateActivity(
    id,
    status,
    driverName,
    expectingDeliveryTime
  );
}
