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
import {BasePopoutWrapper, BasePopoutWrapperProps} from "./BasePopoutWrapper";
import {Icon28DismissSubstract, Icon28InfoCircle} from "@vkontakte/icons";
import {useTranslation} from "react-i18next";

export interface MessageErrorPopoutWrapperProps extends BasePopoutWrapperProps {
    message: string
}
export const MessageErrorPopoutWrapper = (
  {
      message,
      ...restProps
  }: MessageErrorPopoutWrapperProps) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE.HEADER_ERROR')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <Spacing size={10}/>
                  <SimpleCell
                    multiline={true}
                    disabled={true}
                    before={<Icon28DismissSubstract />}
                  >
                      {message}
                  </SimpleCell>
                  <Spacing size={10}/>
              </FormItem>
              <FormItem>
                  <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                      <Button size="l" appearance="negative" onClick={() => {
                          void routeNavigator.hidePopout();
                      }}>
                          {t('BUTTON.OK')}
                      </Button>
                  </ButtonGroup>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}