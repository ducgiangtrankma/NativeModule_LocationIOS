//
//  MyLocationDataManager.m
//  NativeModule_LocationIOS
//
//  Created by Duc Giang Tran on 3/3/21.
//

#import "MyLocationDataManager.h"
#import <CoreLocation/CLError.h>
#import <CoreLocation/CLLocationManager.h>
#import <CoreLocation/CLLocationManagerDelegate.h>
#import "React/RCTLog.h"

@implementation MyLocationDataManager
{
    CLLocationManager * locationManager;
    NSDictionary<NSString *, id> * lastLocationEvent;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"significantLocationChange"];
}

RCT_EXPORT_METHOD(start) {
    if (!locationManager)
        locationManager = [[CLLocationManager alloc] init];
    
    locationManager.delegate = self;
    
    if ([locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
        [locationManager requestAlwaysAuthorization];
    } else if ([locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]) {
        [locationManager requestWhenInUseAuthorization];
    }
    
    [locationManager startMonitoringSignificantLocationChanges];
}

RCT_EXPORT_METHOD(stop) {
    if (!locationManager)
        return;
    
    [locationManager stopMonitoringSignificantLocationChanges];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations {
    CLLocation* location = [locations lastObject];
    
    lastLocationEvent = @{
                          @"coords": @{
                                  @"latitude": @(location.coordinate.latitude),
                                  @"longitude": @(location.coordinate.longitude),
                                  @"altitude": @(location.altitude),
                                  @"accuracy": @(location.horizontalAccuracy),
                                  @"altitudeAccuracy": @(location.verticalAccuracy),
                                  @"heading": @(location.course),
                                  @"speed": @(location.speed),
                                  },
                          @"timestamp": @([location.timestamp timeIntervalSince1970] * 1000) // in ms
                          };
    
    [self sendEventWithName:@"significantLocationChange" body:lastLocationEvent];
    RCTLogInfo(@"significantLocationChange : %@", lastLocationEvent);
}

@end
