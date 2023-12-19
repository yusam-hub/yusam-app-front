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
    PopoutWrapper, Radio, RadioGroup, RadioProps,
    SimpleCell,
    Spacing
} from "@vkontakte/vkui";
import {BasePopoutWrapper, BasePopoutWrapperPropsInterface} from "./BasePopoutWrapper";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n";
import {AnyFunction} from "@vkontakte/vkui/src/types";
import {KeyStringValueStringObjectInterface} from "../../types";

export interface SelectRadioGroupItemInterface {
    id: string,
    title: string,
    description?: string,
    defaultChecked?: boolean
}
export interface SelectRadioGroupPropsInterface extends BasePopoutWrapperPropsInterface {
    buttonPositiveText?: string,
    buttonNegativeText?: string,
    radioItems: SelectRadioGroupItemInterface[],
    onSelectValue: AnyFunction
}
export const SelectRadioGroup = (
  {
    buttonPositiveText = i18n.t('BUTTON.OK'),
    buttonNegativeText = i18n.t('BUTTON.CANCEL'),
    onSelectValue,
    radioItems,
    ...restProps
  }: SelectRadioGroupPropsInterface) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    const radioClickHandler = (value: string) => {
        onSelectValue(value);
    }

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE_HEADER_SELECT')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <RadioGroup>
                      {
                          radioItems.map((item, i) => {
                              return (
                                <Radio
                                  key={item.id}
                                  name="selectRadio"
                                  value={item.id}
                                  disabled={false}
                                  defaultChecked={item?.defaultChecked}
                                  description={item?.description}
                                  onClick={(event) => {
                                      radioClickHandler(event.currentTarget.value);
                                  }}
                                >
                                    {item.title}
                                </Radio>
                              )
                          })
                      }
                  </RadioGroup>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}