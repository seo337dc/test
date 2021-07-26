const getUserScreen = async (videoDom, setScreenState, screenText) => {
  try {
    const screen = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
      },
      audio: false,
    });
    videoDom.srcObject = screen;
    videoDom.addEventListener("loadedmetadata", () => {
      videoDom.play();
    });
    setScreenState({
      state: true,
      msg: screenText.check,
    });
    return true;
  } catch (err) {
    setScreenState({
      state: false,
      msg: `화면공유에 실패하였습니다.<br />${err}`,
    });
    return false;
  }
};

export default getUserScreen;
