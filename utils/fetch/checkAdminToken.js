import { parseCookies } from "nookies";

const goLogin = (ctx) => {
  const { res } = ctx;
  res.setHeader("location", "/admin");
  res.statusCode = 302;
  res.end();
  return { props: { token: false } };
};

const checkAdminToken = async (ctx) => {
  const token = parseCookies(ctx).token;
  if (token) {
    return { props: { token } };
  } else {
    return goLogin(ctx);
  }
};

export default checkAdminToken;
