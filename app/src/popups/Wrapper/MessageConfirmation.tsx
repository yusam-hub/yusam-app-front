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
import {Icon28HelpCircleOutline, Icon28InfoCircle} from "@vkontakte/icons";
import {useTranslation} from "react-i18next";
import {MouseEventHandler} from "react";
import i18n from "../../i18n";

export interface MessageConfirmationPropsInterface extends BasePopoutWrapperPropsInterface {
    message: string,
    buttonPositiveText?: string,
    buttonNegativeText?: string,
    onClickPositive: MouseEventHandler
}
export const MessageConfirmation = (
  {
    message,
    buttonPositiveText = i18n.t('BUTTON_YES'),
    buttonNegativeText = i18n.t('BUTTON_NO'),
    onClickPositive,
    ...restProps
  }: MessageConfirmationPropsInterface) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE_HEADER_CONFIRMATION')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <Spacing size={10}/>
                  <SimpleCell
                    multiline={true}
                    disabled={true}
                    before={<Icon28HelpCircleOutline />}
                  >
                      {message}
                  </SimpleCell>
                  <Spacing size={10}/>
              </FormItem>
              <FormItem>
                  <ButtonGroup mode="horizontal" gap="s" stretched align="center">
                      <Button size="s" appearance="positive" onClick={onClickPositive}>
                          {buttonPositiveText}
                      </Button>
                      <Button size="s" appearance="accent" onClick={() => {
                          void routeNavigator.hidePopout();
                      }}>
                          {buttonNegativeText}
                      </Button>
                  </ButtonGroup>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}