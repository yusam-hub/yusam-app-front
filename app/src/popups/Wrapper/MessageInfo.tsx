import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {
    Button,
    ButtonGroup,
    Card,
    CardGrid,
    FormItem,
    FormLayout,
    Group,
    Header,
    PopoutWrapper,
    SimpleCell,
    Spacing
} from "@vkontakte/vkui";
import {BasePopoutWrapper, BasePopoutWrapperPropsInterface} from "./BasePopoutWrapper";
import {Icon28InfoCircle} from "@vkontakte/icons";
import {useTranslation} from "react-i18next";

export interface MessageInfoPropsInterface extends BasePopoutWrapperPropsInterface {
    message: string
}
export const MessageInfo = (
  {
      message,
      ...restProps
  }: MessageInfoPropsInterface) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE_HEADER_INFORMATION')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <Spacing size={10}/>
                  <SimpleCell
                    multiline={true}
                    disabled={true}
                    before={<Icon28InfoCircle />}
                  >
                      {message}
                  </SimpleCell>
                  <Spacing size={10}/>
              </FormItem>
              <FormItem>
                  <ButtonGroup mode="horizontal" gap="s" stretched align="center">
                      <Button size="s" appearance="accent" onClick={() => {
                          void routeNavigator.hidePopout();
                      }}>
                          {t('BUTTON_OK')}
                      </Button>
                  </ButtonGroup>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}