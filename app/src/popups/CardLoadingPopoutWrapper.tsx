import * as React from "react";
import {PopoutWrapper} from "@vkontakte/vkui";
import {CardLoading} from "../components/Common/CardLoading/CardLoading";

export const CardLoadingPopoutWrapper = () => {
  return (
    <PopoutWrapper>
      <CardLoading/>
    </PopoutWrapper>
  );
};