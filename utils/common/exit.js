const exit = (router) => {
  console.log(router);
  if (router.asPath !== "/?mode=out") {
    router.push(router.asPath, "/?mode=out", {
      shallow: true,
    });
  }
};

export default exit;
