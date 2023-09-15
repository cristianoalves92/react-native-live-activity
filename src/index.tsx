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

export async function startActivity<T extends Record<string, any>>(
  data: T
): Promise<string> {
  const dataString = JSON.stringify(data);
  return LiveActivity.startActivity(dataString);
}

export async function listAllActivities<
  T extends Record<string, any>
>(): Promise<{
  id: string;
  data: T;
}> {
  return LiveActivity.listAllActivities()
    .then((activities: { id: string; data: string }[]) => {
      return activities?.map((activity) => {
        return {
          id: activity.id,
          data: JSON.parse(activity.data) as T,
        };
      });
    })
    .catch((err: Error) => {
      console.error(err);
    });
}

export function endActivity(id: string) {
  return LiveActivity.endActivity(id);
}

export async function updateActivity<T extends Record<string, any>>(
  id: string,
  data: T
) {
  const dataString = JSON.stringify(data);
  return LiveActivity.updateActivity(id, dataString);
}
