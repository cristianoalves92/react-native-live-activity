import Foundation
import ActivityKit

@objc(LiveActivity)
class LiveActivity: NSObject {

    @objc(startActivity:withDriverName:withExpectingDeliveryTime:withResolver:withRejecter:)
    func startActivity(status: String, driverName: String, expectingDeliveryTime: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            var activity: Activity<MyActivityAttributes>?
            let initialContentState = MyActivityAttributes
                .ContentState(status: status, driverName: driverName, expectedDeliveryTime: expectingDeliveryTime)
            let activityAttributes = MyActivityAttributes()
            
            do {
                activity = try Activity
                    .request(attributes: activityAttributes, contentState: initialContentState)
                
                resolve("Requested Live Activity \(String(describing: activity?.id)).")
            } catch (let error) {
                reject("Error requesting Live Activity \(error.localizedDescription).", "", error)
            }
        } else {
            reject("Not available", "", NSError())
        }
    }
    
    @objc(listAllActivities:withRejecter:)
    func listAllActivities(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            var activities = Activity<MyActivityAttributes>.activities
            activities.sort { $0.id > $1.id }
            
            return resolve(activities.map{["id": $0.id, "status": $0.contentState.status, "driverName": $0.contentState.driverName, "expectingDeliveryTime": $0.contentState.expectedDeliveryTime ]})
        } else {
            reject("Not available", "", NSError())
        }
    }
    
    @objc(endActivity:withResolver:withRejecter:)
    func endActivity(id: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            Task {
                await Activity<MyActivityAttributes>.activities.filter {$0.id == id}.first?.end(dismissalPolicy: .immediate)
            }
        } else {
            reject("Not available","", NSError())
        }
    }
    
    @objc(updateActivity:withStatus:withDriverName:withExpectingDeliveryTime:withResolver:withRejecter:)
    func updateActivity(id: String, status: String, driverName: String, expectingDeliveryTime: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            Task {
                let updatedStatus = MyActivityAttributes
                    .ContentState(status: status, driverName: driverName, expectedDeliveryTime: expectingDeliveryTime)
                let activities = Activity<MyActivityAttributes>.activities
                let activity = activities.filter {$0.id == id}.first
                await activity?.update(using: updatedStatus)
            }
        } else {
            reject("Not available", "", NSError())
        }
    }
}
