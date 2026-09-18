import { setConsoleFunction } from "three";

// @react-three/fiber v9 still instantiates THREE.Clock, deprecated since three r183.
// Drop that single warning until R3F migrates to THREE.Timer; forward everything else.
const CLOCK_DEPRECATION = "THREE.Clock: This module has been deprecated";

setConsoleFunction((method, message, ...params) => {
  if (message.startsWith(CLOCK_DEPRECATION)) {
    return;
  }
  console[method](message, ...params);
});
