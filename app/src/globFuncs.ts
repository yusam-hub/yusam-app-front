import bridge from "@vkontakte/vk-bridge";
import {Platform, PlatformType, usePlatform} from "@vkontakte/vkui";

export const glob_app_is_vk = (platform: PlatformType): boolean =>
{
  /*console.log("isIframe", bridge.isIframe());
  console.log("isEmbedded", bridge.isEmbedded());
  console.log("isStandalone", bridge.isStandalone());
  console.log("isWebView", bridge.isWebView());
  console.log("platform", platform);*/
  return (
    bridge.isIframe() && bridge.isEmbedded() && platform === Platform.VKCOM && !bridge.isStandalone() && !bridge.isWebView()
    )
    ||
    (
      bridge.isWebView() && bridge.isEmbedded() && (platform === Platform.ANDROID || platform === Platform.IOS) && !bridge.isStandalone() && !bridge.isIframe()
    );
}