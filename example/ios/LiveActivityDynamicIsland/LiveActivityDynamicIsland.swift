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
    var status: String
    var driverName: String
    var expectedDeliveryTime: String
  }
}


@main
@available(iOS 16.1, *)
struct LiveActivityDynamicIsland: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: MyActivityAttributes.self) { context in
      HStack {
        Image(systemName: "bicycle")
          .foregroundColor(.blue)
          .padding(8)
        VStack(alignment: .leading) {
          Text(context.state.status)
            .font(.body)
          Text(context.state.driverName)
        }
        Spacer()
        VStack(alignment: .trailing) {
          Text("Deliver at")
            .font(.body)
          Text(context.state.expectedDeliveryTime)
            .font(.footnote)
        }
        .padding(8)
      }
      .padding(8)
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading) {
          Image(systemName: "bicycle")
            .foregroundColor(.blue)
            .padding(8)
        }
        DynamicIslandExpandedRegion(.trailing) {
          VStack(alignment: .leading) {
            Text("Deliver at")
              .font(.body)
            Text(context.state.expectedDeliveryTime)
              .font(.footnote)
          }
        }
        DynamicIslandExpandedRegion(.center) {
          Text(context.state.status)
            .font(.body)
        }
        DynamicIslandExpandedRegion(.bottom) {
          Text(context.state.driverName)
        }
      } compactLeading: {
        Image(systemName: "bicycle")
          .foregroundColor(.blue)
      } compactTrailing: {
        Text(context.state.expectedDeliveryTime)
      } minimal: {
        Text(context.state.expectedDeliveryTime)
      }
      .keylineTint(.yellow)
    }
  }
}

