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

export function startActivity<T extends Record<string, any>>(data: T) {
  const dataString = JSON.stringify(data);
  return LiveActivity.startActivity(dataString);
}

export function listAllActivities() {
  return LiveActivity.listAllActivities();
}

export function endActivity(id: string) {
  return LiveActivity.endActivity(id);
}

export function updateActivity<T extends Record<string, any>>(
  id: string,
  data: T
) {
  const dataString = JSON.stringify(data);
  return LiveActivity.updateActivity(id, dataString);
}
