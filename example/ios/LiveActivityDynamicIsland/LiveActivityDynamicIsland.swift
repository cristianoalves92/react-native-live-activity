//
//  LiveActivityDynamicIsland.swift
//  LiveActivityDynamicIsland
//
//  Created by Cristiano Alves on 19/09/2022.
//

import WidgetKit
import SwiftUI
import ActivityKit

struct MyActivityAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var data: String
  }
}

struct Information: Codable {
  let status: String
  let driverName: String
  let expectedDeliveryTime: String
}

// Data are sent as a string, so we need to convert it to a struct
func toJson(dataString: String) -> Information {
  let decoder = JSONDecoder()
  let stateData = Data(dataString.utf8);
  let data = try? decoder.decode(Information.self, from: stateData)
  if (data == nil) {
    NSLog("Error: %@ %@", "Data is null");
    return Information(status: "No status", driverName: "No Driver Name", expectedDeliveryTime: "00:00")
  }
  return data ?? Information(status: "No status", driverName: "No Driver Name", expectedDeliveryTime: "00:00");
}

@main
@available(iOS 16.1, *)
struct LiveActivityDynamicIsland: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: MyActivityAttributes.self) { context in
      let data = toJson(dataString: context.state.data)
      return HStack {
        Image(systemName: "bicycle")
          .foregroundColor(.blue)
          .padding(8)
        VStack(alignment: .leading) {
          Text(data.status)
            .font(.body)
          Text(data.driverName)
        }
        Spacer()
        VStack(alignment: .trailing) {
          Text("Deliver at")
            .font(.body)
          Text(data.expectedDeliveryTime)
            .font(.footnote)
        }
        .padding(8)
      }
      .padding(8)
    } dynamicIsland: { context in
      let data = toJson(dataString: context.state.data)
      return DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          Image(systemName: "bicycle")
            .foregroundColor(.blue)
            .padding(8)
        }
        DynamicIslandExpandedRegion(.trailing) {
          VStack(alignment: .leading) {
            Text("Deliver at")
              .font(.body)
            Text(data.expectedDeliveryTime)
              .font(.footnote)
          }
        }
        DynamicIslandExpandedRegion(.center) {
          Text(data.status)
            .font(.body)
        }
        DynamicIslandExpandedRegion(.bottom) {
          Text(data.driverName)
        }
      } compactLeading: {
        Image(systemName: "bicycle")
          .foregroundColor(.blue)
      } compactTrailing: {
        Text(data.expectedDeliveryTime)
      } minimal: {
        Text(data.expectedDeliveryTime)
      }
      .keylineTint(.yellow)
    }
  }
}

