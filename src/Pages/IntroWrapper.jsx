import { useState } from "react";
import IntroMask from "../Components/IntroMask";
import GettingStarted from "../Pages/GettingStarted";

const IntroWrapper = () => {
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return <IntroMask onFinish={() => setIntroDone(true)} />;
  }

  return <GettingStarted />;
};

export default IntroWrapper;
