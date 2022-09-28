# react-native-live-activity

This is an example of a Native Module to control the iOS Live Activities.

## Installation

```sh

npm install react-native-live-activity

```

## Usage

```js
import {
startActivity,
listAllActivities,
endActivity,
updateActivity,
} from 'react-native-live-activity';


await startActivity("Packing", "Jhon", "12 PM")
await updateActivity(activity.id, "Driving", "Jhon", "12 PM");
await endActivity(activity.id);

const [activities, setActivities] = React.useState<any[]>([]);
listAllActivities().then(setActivities);

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

<!-- Add video -->

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
