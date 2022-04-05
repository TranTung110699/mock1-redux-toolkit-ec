import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";

import QuestionComponent from "./question/Question";

const UserPageComponent = () => {
  return (
    <div>
      <QuestionComponent />
    </div>
  );
};

export default UserPageComponent;
