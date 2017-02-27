#import <AssetsLibrary/AssetsLibrary.h>
#import <UIKit/UIKit.h>
#import "RNAssetResizeToBase64.h"
#include "ImageHelpers.h"

@implementation RNAssetResizeToBase64

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(
	assetToResizedBase64:(NSString *)imageUrl
					width:(float)width
					height:(float)height
					callback:(RCTResponseSenderBlock)callback)
{

    CGSize				newSize = CGSizeMake(width, height);
	NSURL				*url = [[NSURL alloc] initWithString:imageUrl];
	ALAssetsLibrary		*library = [[ALAssetsLibrary alloc] init];

	[library assetForURL:url resultBlock:^(ALAsset *asset)
	{
		/*Get the image Representation*/
		ALAssetRepresentation *representation = [asset defaultRepresentation];
		CGImageRef imageRef		= [representation fullScreenImage];

		/*Get the image data and scale it according to Width and Height*/
		NSData *imagePngRep		= UIImagePNGRepresentation([UIImage imageWithCGImage:imageRef]);
		UIImage *imageUI		= [UIImage imageWithData:imagePngRep];
		UIImage *scaledImage	= [imageUI scaleToSize:newSize];

		/*Et the newImageData and transform it to base64*/
		NSData *ImageData	= UIImagePNGRepresentation(scaledImage);
		NSString *base64Encoded	= [ImageData base64EncodedStringWithOptions:0];

		callback(@[[NSNull null], base64Encoded]);
	}
	failureBlock:^(NSError *error)
	{
		NSLog(@"that didn't work %@", error);
		callback(@[error]);
	}];
}

@end

