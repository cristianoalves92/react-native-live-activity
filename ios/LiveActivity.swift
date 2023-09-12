import Foundation
import ActivityKit

@objc(LiveActivity)
class LiveActivity: NSObject {

    @objc(startActivity:withResolver:withRejecter:)
    func startActivity(data: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            var activity: Activity<MyActivityAttributes>?
            let initialContentState = MyActivityAttributes
                .ContentState(data: data)
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
            
            return resolve(activities.map{["id": $0.id, "data": $0.contentState.data ]})
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
    
    @objc(updateActivity:withData:withResolver:withRejecter:)
    func updateActivity(id: String, data: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if #available(iOS 16.1, *) {
            Task {
                let updatedStatus = MyActivityAttributes
                    .ContentState(data: data)
                let activities = Activity<MyActivityAttributes>.activities
                let activity = activities.filter {$0.id == id}.first
                await activity?.update(using: updatedStatus)
            }
        } else {
            reject("Not available", "", NSError())
        }
    }
}
