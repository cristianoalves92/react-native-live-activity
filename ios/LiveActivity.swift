import ActivityKit
import Foundation

struct MyActivityAttributes: ActivityAttributes {
    
    public struct ContentState: Codable, Hashable {
        var status: String
        var driverName: String
        var expectedDeliveryTime: String
    }
}

@objc(LiveActivity)
class LiveActivity: NSObject {

    @objc(startActivity:withDriverName:withExpectingDeliveryTime:withResolver:withRejecter:)
    func startActivity(status: String, driverName: String, expectingDeliveryTime: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            var activity: Activity<MyActivityAttributes>?
            var activityExpanded = true

           let initialContentState = MyActivityAttributes
               .ContentState(status: status, driverName: driverName, expectedDeliveryTime: expectingDeliveryTime)
            
           let activityAttributes = MyActivityAttributes()

            do {
               activity = try Activity
                   .request(attributes: activityAttributes, contentState: initialContentState)
                
                resolve("Requested Live Activity \(String(describing: activity?.id)).")
                activityExpanded.toggle()
           } catch (let error) {
               resolve("Error requesting Live Activity \(error.localizedDescription).")
           }
        }
    }
    
    @objc(listAllActivities:withRejecter:)
    func listAllActivities(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            var activities = Activity<MyActivityAttributes>.activities
            activities.sort { $0.id > $1.id }
            resolve(activities.map{["id": $0.id, "status": $0.contentState.status, "driverName": $0.contentState.driverName, "expectingDeliveryTime": $0.contentState.expectedDeliveryTime ]})
        }
    }
    
    @objc(endActivity:withResolver:withRejecter:)
    func endActivity(id: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            Task {
                var activities = Activity<MyActivityAttributes>.activities
                await activities.filter {$0.id == id}.first?.end(dismissalPolicy: .immediate)
            }
        }
    }
    
    @objc(updateActivity:withStatus:withDriverName:withExpectingDeliveryTime:withResolver:withRejecter:)
    func updateActivity(id: String, status: String, driverName: String, expectingDeliveryTime: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            Task {
                let updatedStatus = MyActivityAttributes
                    .ContentState(status: status, driverName: driverName, expectedDeliveryTime: expectingDeliveryTime)
                var activities = Activity<MyActivityAttributes>.activities
                var activity = activities.filter {$0.id == id}.first
                await activity?.update(using: updatedStatus)
                
               

            }
        }
    }
}
