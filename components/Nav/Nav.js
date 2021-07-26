import Logo from "../Logo/Logo";
import UserMenu from "../UserMenu/UserMenu";
import Timer from "../Timer/Timer";
import Menu from "./Menu/Menu";
import styles from "./Nav.module.scss";

const Nav = ({}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.logo_user_wrap}>
          <Logo />
          <Timer />
          <UserMenu />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Nav;
