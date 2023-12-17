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
import {BasePopoutWrapper, BasePopoutWrapperProps} from "./BasePopoutWrapper";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n";
import {AnyFunction} from "@vkontakte/vkui/src/types";
import {IKeyStringValueStringObject} from "../../types";

export interface SelectRadioGroupItem {
    id: string,
    title: string,
    description?: string,
    defaultChecked?: boolean
}
export interface SelectRadioGroupProps extends BasePopoutWrapperProps {
    buttonPositiveText?: string,
    buttonNegativeText?: string,
    radioItems: SelectRadioGroupItem[],
    onSelectValue: AnyFunction
}
export const SelectRadioGroup = (
  {
    buttonPositiveText = i18n.t('BUTTON.OK'),
    buttonNegativeText = i18n.t('BUTTON.CANCEL'),
    onSelectValue,
    radioItems,
    ...restProps
  }: SelectRadioGroupProps) =>
{
    const routeNavigator = useRouteNavigator()
    const { t} = useTranslation();

    const radioClickHandler = (value: string) => {
        onSelectValue(value);
    }

    return (
      <BasePopoutWrapper
        {...restProps}
        header={t('MESSAGE.HEADER_SELECT')}
        useWrapperClick={false}
      >
          <FormLayout>
              <FormItem>
                  <Spacing size={10}/>

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
                  <Spacing size={10}/>
              </FormItem>
          </FormLayout>
      </BasePopoutWrapper>
    );
}