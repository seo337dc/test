import { useState } from "react";
import CheckBtn from "../../../Buttons/CheckBtn/CheckBtn";
import styles from "./MenuItem.module.scss";

const MenuItem = ({ title = "", itemList = [], picked, setPicked, isMine }) => {
  const [isItemOpen, setItemOpen] = useState(true);

  const checkTeamPicked = () => {
    let pickedCount = 0;
    itemList.forEach((f) => {
      if (picked.includes(`${f.u_name} ${f.u_position}`)) {
        pickedCount++;
      }
    });
    if (pickedCount === itemList.length) {
      return true;
    } else {
      false;
    }
  };

  const clickAllPick = () => {
    if (checkTeamPicked()) {
      itemList.forEach((f) =>
        setPicked((prev) =>
          prev.filter((ff) => `${f.u_name} ${f.u_position}` !== ff)
        )
      );
    } else {
      itemList.forEach((f) => {
        if (!picked.includes(`${f.u_name} ${f.u_position}`)) {
          setPicked((prev) => [...prev, `${f.u_name} ${f.u_position}`]);
        }
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.container}
        onClick={() => setItemOpen((prev) => !prev)}
      >
        <div className={styles.title_wrap}>
          <CheckBtn
            color="#303030"
            onChange={(e) => {
              e.stopPropagation();
              clickAllPick();
            }}
            value={checkTeamPicked()}
          />
          <div className={styles.title}>{title}</div>
        </div>
        <i className={isItemOpen ? "xi-angle-up" : "xi-angle-down"} />
      </div>
      <div className={styles.list} style={{ height: isItemOpen ? "" : 0 }}>
        {itemList?.map((data, idx) => (
          <div
            className={styles.item}
            key={`addr_detail_list_${idx}`}
            onClick={() =>
              picked.includes(`${data.u_name} ${data.u_position}`)
                ? setPicked((prev) =>
                    prev.filter(
                      (f) => f !== `${data.u_name} ${data.u_position}`
                    )
                  )
                : setPicked((prev) => [
                    ...prev,
                    `${data.u_name} ${data.u_position}`,
                  ])
            }
          >
            <CheckBtn
              color={data.u_color}
              value={picked.includes(`${data.u_name} ${data.u_position}`)}
            />
            <div className={styles.sub_title}>
              {isMine ? "내 일정" : `${data.u_name} ${data.u_position}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItem;
