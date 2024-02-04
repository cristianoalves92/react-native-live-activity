# react-native-live-activity

This is an example of a Native Module to control the iOS Live Activities.

## Installation

```sh

npm install react-native-live-activity

```

## Build your Swift module

Take inspiration from the [example](./example/ios/LiveActivityDynamicIsland/LiveActivityDynamicIsland.swift) to build your own Swift module.

## Usage

```js
import LiveActivity from 'react-native-live-activity';

// Please be careful to use the same type as the one you defined in your Swift module.
type LiveActivityParams = {
  status: string;
  driverName: string;
  expectedDeliveryTime: string;
}

const liveActivity = new LiveActivity<LiveActivityParams>()

const activity = await liveActivity.startActivity({
  status: "Packing",
  driveName: "John",
  expectedDeliveryTime: "12 PM"
})

await liveActivity.updateActivity(activity.id, {
  status: "Driving",
  driveName: "John",
  expectedDeliveryTime: "12 PM"
})

await liveActivity.endActivity(activity.id)

const [activities, setActivities] = React.useState<any[]>([])
liveActivity.listAllActivities().then(setActivities)

```

## Example

Run

```bash
$ yarn install
```

Then

```bash
$ open ./example/ios/LiveActivityExample.xcworkspace
```

After that build the xCode project.

https://user-images.githubusercontent.com/3778297/192741742-9d3a9bc5-e26a-4197-b152-5f60796736eb.mp4

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
