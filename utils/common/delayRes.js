const delayRes = (t) =>
  new Promise((s) => {
    setTimeout(() => {
      return s("solved");
    }, t);
  });
export default delayRes;
