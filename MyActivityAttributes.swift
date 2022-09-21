//
//  MyActivityAttributes.swift
//  react-native-live-activity
//
//  Created by Cristiano Alves on 21/09/2022.
//

import Foundation
import ActivityKit

struct MyActivityAttributes: ActivityAttributes {
    
    public struct ContentState: Codable, Hashable {
        var status: String
        var driverName: String
        var expectedDeliveryTime: String
    }
}
