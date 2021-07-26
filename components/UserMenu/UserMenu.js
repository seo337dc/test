import { useState } from "react";
import RoundedBtn from "../Buttons/RoundedBtn/RoundedBtn";
import ToDo from "../ToDo/ToDo";
import EndTest from "../EndTest/EndTest";
import InfoSlide from "../InfoSlide/InfoSlide";
import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  const [isToDoOpen, setToDoOpen] = useState(false);
  const [isEndTestModalOpen, setEndTestModalOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <RoundedBtn
        innerText="할 일"
        reverse
        onClick={() => setToDoOpen((prev) => !prev)}
      />
      <RoundedBtn innerText="종료" onClick={() => setEndTestModalOpen(true)} />
      <RoundedBtn innerText="도움말" onClick={() => setHelpModalOpen(true)} />
      {isHelpModalOpen && <InfoSlide setModalOpen={setHelpModalOpen} />}
      {isToDoOpen && (
        <ToDo
          setModalOpen={setToDoOpen}
          style={{ position: "absolute", left: 0, top: 50 }}
        />
      )}
      {isEndTestModalOpen && <EndTest setModalOpen={setEndTestModalOpen} />}
    </div>
  );
};

export default UserMenu;
