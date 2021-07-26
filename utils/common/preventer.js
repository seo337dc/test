const preventer = () => {
  const dev = process.env.NODE_ENV !== "production";
  if (dev) {
    return;
  }
  //뒤로가기 방지
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", (event) => {
    history.pushState(null, "", location.href);
  });
  //새로고침 막기 (맥)
  function doNotReload(event) {
    if (event.metaKey === true && event.keyCode === 82) {
      event.cancelBubble = true;
      event.returnValue = false;
    }
  }
  document.onkeydown = doNotReload;
  //우클릭 방지
  window.document.oncontextmenu = () => {
    return false;
  };
};

export default preventer;
