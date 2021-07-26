import { useRouter } from "next/router";
import Logo from "../Logo/Logo";
import SubTimer from "../Timer/SubTimer";
import FAQ from "../FAQ/FAQ";
import Exit from "../Exit/Exit";
import UserName from "../Layout/UserName/UserName";
import styles from "./SubNav.module.scss";

const SubNav = ({ time, isTest }) => {
  const router = useRouter();

  const isShowingUserName =
    router.pathname === "/info" || router.pathname === "/ready";

  const isShowingStep =
    router.query.mod !== "test" &&
    (router.pathname === "/device" ||
      router.pathname === "/info" ||
      router.pathname === "/ready");

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <Logo />
        {router.pathname !== "/cheat" && (
          <SubTimer time={time} isTest={isTest} />
        )}
      </div>
      {isShowingStep && (
        <div className={styles.item_container}>
          <div
            className={`${styles.item} ${
              router.pathname === "/device" ? styles.now : ""
            }`}
          >
            <div>1</div>
            <span>시스템 점검</span>
          </div>
          <div className={styles.dot} />
          <div
            className={`${styles.item} ${
              router.pathname === "/info" ? styles.now : ""
            }`}
          >
            <div>2</div>
            <span>진단 준비</span>
          </div>
          <div className={styles.dot} />
          <div
            className={`${styles.item} ${
              router.pathname === "/ready" ? styles.now : ""
            }`}
          >
            <div>3</div>
            <span>진단 대기</span>
          </div>
        </div>
      )}
      <div className={styles.right}>
        <FAQ reverse disableContact={isShowingUserName} />
        {isShowingUserName && <UserName />}
        <Exit black />
      </div>
    </div>
  );
};

export default SubNav;
