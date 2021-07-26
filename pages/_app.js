import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import storeWrapper from "../utils/store/storeWrapper";
import preventer from "../utils/common/preventer";
import uprismInit from "../utils/common/uprismInit";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "../styles/global.scss";
import "../styles/calendar.scss";
import "../styles/editor.scss";
import "../styles/messenger.scss";
import "../styles/datePicker.scss";
import "../styles/uprism.scss";

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const uprismState = useSelector((state) => state.uprismState);
  const adminDom = useRef(null);
  const camDom = useRef(null);
  const screenDom = useRef(null);
  const mixingDom = useRef(null);

  useEffect(() => {
    uprismInit({
      uprismState,
      dispatch,
      adminDom,
      camDom,
      screenDom,
      mixingDom,
      router,
    });
  }, [uprismState]);

  useEffect(() => {
    preventer();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <div className="display_none" ref={adminDom} />
      <div className="display_none" ref={camDom} />
      <div
        ref={screenDom}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -9999,
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <div className="display_none" ref={mixingDom} />
    </>
  );
};

export default storeWrapper.withRedux(App);
