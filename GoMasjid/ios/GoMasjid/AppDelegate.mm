#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>

// Add the Facebook SDK import
// #import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
// #import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  [FIRApp configure]; // Initialize Firebase

  self.moduleName = @"GoMasjid";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // Add Facebook SDK initialization
  // [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];

  [[FBSDKApplicationDelegate sharedInstance] application:application didFinishLaunchingWithOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }
  return NO;
}

// Add this method for Facebook URL scheme handling
// - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
//     return YES;
//   }
  
//   // Add any other URL handlers here if needed
  
//   return NO;
// }

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
                                                    fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for local notification tapped event.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       didReceiveNotificationResponse:(UNNotificationResponse *)response
                withCompletionHandler:(void(^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  completionHandler();
}

@end