/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   index.ios.js                                                             */
/*                                                                            */
/*   By:    Thomas Bouder <tbouder@student.42.fr>                             */
/*                                                                            */
/*   Created: 2017/02/17 16:58:24 by Thomas                                   */
/*   Updated: 2017/02/17 17:52:15 by Thomas Bouder                            */
/*                                                                            */
/* ************************************************************************** */

import React, {Component}       from 'React'
import {AppRegistry, Image, CameraRoll,
        TouchableHighlight, ScrollView} from 'react-native'
import NativeModules          from 'NativeModules'


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
    **  The componentWillMount() function will get the 10 first picture of the user gallery
    **  and set the onPress touchable for each image
    */
    componentWillMount()
    {
        var arr = [];
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

export default class AssetResizeExample extends Component
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

AppRegistry.registerComponent('AssetResizeExample', () => AssetResizeExample);
