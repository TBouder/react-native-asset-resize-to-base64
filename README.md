# react-native-asset-resize-to-base64
Module for React Native to resize and tranform to base64 an asset image

##Installation
- npm i react-native-asset-resize-to-base64
- Import it -> [import NativeModules from 'NativeModules']
- Use it -> [NativeModules.RNAssetResizeToBase64.assetToResizedBase64(url, 500, 500, (err, base64) => console.log(base64))]

###IOS
- Open XCode
- In the XCode's "Project navigator", right click on your project's Libraries folder ➜ Add Files to <...>
- Go to node_modules/react-native-asset-resize-to-base64/ios/ and add RNAssetResizeToBase64.xcodeproj
- In the XCode's "Project navigator", select click on your project's name and add libRNAssetResizeToBase64.a under 'Link Binary with Libraries' in your project's 'Build Phases'

###ANDROID
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

##Usage
Install from scratch :
1. react-native init example
2. cd example
3. npm i react-native-asset-resize-to-base64 --save
4. react-native link react-native-asset-resize-to-base64

(optionnal to get the gallery working)
5. add <You_app>/node_modules/react-native/Libraries/CameraRoll/RCTCameraRoll.xcodeproj to your project (in Xcode, <Your_app> in Libraries)
6. add, in Info.plist, the NSPhotoLibraryUsageDescription key with a string (why do you want to access the user gallery)
7. add libRCTCameraRoll.a (Xcode > Libraries > RCTCameraRoll.xcodeproj > Products > libRCTCameraRoll.a) to your project's Build Phases under "Link Binary With Libraries"