import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-live-activity' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const LiveActivity_ = NativeModules.LiveActivity
  ? NativeModules.LiveActivity
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default class LiveActivity<T extends unknown> {
  startActivity(data: T): Promise<string | null> {
    const dataString = JSON.stringify(data);
    return LiveActivity_.startActivity(dataString);
  }

  async updateActivity(id: string, data: T) {
    const dataString = JSON.stringify(data);
    return LiveActivity_.updateActivity(id, dataString);
  }

  endActivity(id: string) {
    return LiveActivity_.endActivity(id);
  }

  async listAllActivities(): Promise<
    {
      id: string;
      data: T;
    }[]
  > {
    return LiveActivity_.listAllActivities()
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
}
