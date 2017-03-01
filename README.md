# react-native-asset-resize-to-base64
This react-native module allows you to get an asset image with CameraRoll (returns an url like this : "assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG"), to resize and transform it to base64 string with NativeModules.RNAssetResizeToBase64.assetToResizedBase64 and then, to upload it with fetch. You can find an example to test it.

The function takes 3 arguments:   
1. The assetUrl
2. The new width
3. The new Height
The function return 1 callback with 2 arguments:   
1. err for errors
2. base64, the base64 string of the resized image

##Installation (auto)
1. npm i react-native-asset-resize-to-base64 --save
2. react-native link react-native-asset-resize-to-base64
3. Import in your file
```
import NativeModules from 'NativeModules'
```
4. Use it
```
NativeModules.RNAssetResizeToBase64.assetToResizedBase64(url, 500, 500, (err, base64) => console.log(base64))
```

###IOS (manual)
- Open XCode
- In the XCode's "Project navigator", right click on your project's Libraries folder ➜ Add Files to <...>
- Go to node_modules/react-native-asset-resize-to-base64/ios/ and add RNAssetResizeToBase64.xcodeproj
- In the XCode's "Project navigator", select click on your project's name and add libRNAssetResizeToBase64.a under 'Link Binary with Libraries' in your project's 'Build Phases'

###ANDROID (manual)
- In <Your Project>/android/settings.gradle, add this :
```
include ':react-native-asset-resize-to-base64'
project(':react-native-asset-resize-to-base64').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-asset-resize-to-base64/android')
```
- In <Your Project>/android/app/src/main/java/com/<Your Project>/MainApplication.java, add this :
```
import RNAssetResizeToBase64.RNAssetResizeToBase64Package;
[...]
@Override
	protected List<ReactPackage> getPackages() {
		return Arrays.<ReactPackage>asList(
			new MainReactPackage(),
            new RNAssetResizeToBase64Package(),
            [...]
		);
	}
```

##Example from scratch with access to the user gallery
1. react-native init example
2. cd example
3. npm i react-native-asset-resize-to-base64 --save
4. react-native link react-native-asset-resize-to-base64
5. add <You_app>/node_modules/react-native/Libraries/CameraRoll/RCTCameraRoll.xcodeproj to your project (in Xcode, <Your_app> in Libraries)
7. add libRCTCameraRoll.a (Xcode > Libraries > RCTCameraRoll.xcodeproj > Products > libRCTCameraRoll.a) to your project's Build Phases under "Link Binary With Libraries"
6. add, in Info.plist, the NSPhotoLibraryUsageDescription key with a string (why do you want to access the user gallery)
