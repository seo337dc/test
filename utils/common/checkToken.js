import axios from "axios";
import { CONFIRM } from "../fetch/apiConfig";
import { parseCookies } from "nookies";

const dev = process.env.NODE_ENV !== "production";

const goLogin = (ctx) => {
  if (dev) {
    return { props: { confirmData: {}, uprismState: {} } };
  } else {
    const { res } = ctx;
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: { confirmData: {}, uprismState: {} } };
  }
};

/*
  config
    isCheatPage : 부정행위 페이지 식별
*/

const checkToken = async (ctx, config = {}) => {
  const token = parseCookies(ctx).token;
  if (token) {
    try {
      const res = await axios.post(CONFIRM, null, {
        headers: {
          token,
        },
      });
      if (res.data.atTime[0]) {
        return {
          props: {
            token,
            confirmData: res.data.atTime[0],
            uprismState: {
              External_Code: res.data.atTime[0].External_Code,
              Room_ID: res.data.atTime[0].Room_ID,
            },
            now: Date.now(),
          },
        };
      } else {
        return goLogin(ctx);
      }
    } catch (error) {
      console.error(error);
      return goLogin(ctx);
    }
  } else {
    if (config.isCheatPage) {
      return { props: { token: false } };
    } else {
      return goLogin(ctx);
    }
  }
};

export default checkToken;
