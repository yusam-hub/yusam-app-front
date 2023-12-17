import bridge, {parseURLSearchParamsForGetLaunchParams} from "@vkontakte/vk-bridge";
import {Platform, PlatformType, usePlatform} from "@vkontakte/vkui";

enum VkPlatformEnum {
  desktop_app_messenger = 'desktop_app_messenger',
  desktop_web = 'desktop_web',
  desktop_web_messenger = 'desktop_web_messenger',
  mobile_android = 'mobile_android',
  mobile_android_messenger = 'mobile_android_messenger',
  mobile_ipad = 'mobile_ipad',
  mobile_iphone = 'mobile_iphone',
  mobile_iphone_messenger = 'mobile_iphone_messenger',
  mobile_web = 'mobile_web',
}

export const glob_app_is_vk = (platform: PlatformType): boolean =>
{
  const {
    vk_platform,
    vk_app_id ,
    vk_user_id
  } = parseURLSearchParamsForGetLaunchParams(window.location.search);

  const searchChecked =
    (<any>Object).values(VkPlatformEnum).includes(vk_platform?.toString())
    &&
    vk_app_id !== undefined
    &&
    vk_user_id !== undefined
  ;

  /*console.log("searchChecked", searchChecked);
  console.log("isIframe", bridge.isIframe());
  console.log("isEmbedded", bridge.isEmbedded());
  console.log("isStandalone", bridge.isStandalone());
  console.log("isWebView", bridge.isWebView());
  console.log("platform", platform);*/
  return (
      bridge.isIframe()
      && bridge.isEmbedded()
      && platform === Platform.VKCOM
      && !bridge.isStandalone()
      && !bridge.isWebView()
      && searchChecked
    )
    ||
    (
      bridge.isWebView()
      && bridge.isEmbedded()
      && (platform === Platform.ANDROID || platform === Platform.IOS)
      && !bridge.isStandalone()
      && !bridge.isIframe()
      && searchChecked
    );
}