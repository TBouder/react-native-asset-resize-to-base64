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
```
import React, {Component}				from 'React'
import {Image, CameraRoll,
		TouchableHighlight, ScrollView}	from 'react-native'
import NativeModules					from 'NativeModules'


function uniqueId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for( var i=0; i < 128; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class Gallery extends Component
{
	state = {images: []}

	/*
	**	The componentWillMount() function will get the 10 first picture of the user gallery
	**	and set the onPress touchable for each image
	*/
	componentWillMount()
	{
		var	arr = [];
		var params: Object = {first: 10, assetType: 'All'};

		CameraRoll.getPhotos(params).then((data) =>
		{
			data.edges.forEach((snap, localIndex) =>
			{
				arr.push(
					<TouchableHighlight
						key={localIndex}
						onPress={() => this.props.getImage(snap.node.image.uri)}>

						<Image
							source={{uri: snap.node.image.uri}}
							style={{width: 300, height: 300}}
							resizeMode='cover'/>

					</TouchableHighlight>
				);
			});
			this.setState({images: arr});
		});
	};

	render()
	{
		return (
			<ScrollView scrollEnabled={true}>
				{this.state.images}
			</ScrollView>
		);
	};
}

export default class UserManagement extends Component
{
	uploadIt = (base64) =>
	{
		let uniqueid = uniqueId();
		fetch('http://testurl.xyz/scriptphpwithPost.php',
		{
			method: 'POST',
			headers: {'Content-Type' : 'multipart/form-data'},
			body: JSON.stringify({
				name: uniqueid,
				base64: "data:image/png;base64," + base64,
			})
		})
		.then((response) =>
		{
			console.log(response)
			console.log("image uploaded")
		}).catch(err =>
		{
			console.log(err)
		})
	}

	getImage = (url) =>
	{
		NativeModules.RNAssetResizeToBase64.assetToResizedBase64(url, 300, 300, (err, base64) =>
		{
			if (base64)
				this.uploadIt(base64)
		})
	}

	render()
	{
		return (<Gallery getImage={this.getImage}/>);
	};
};

```



