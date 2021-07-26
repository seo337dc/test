import { useState } from "react";
import { useSelector } from "react-redux";
import Scrollbar from "react-scrollbars-custom";
import MenuItem from "../MainCalendar/MenuItem/MenuItem";
import AngleBtn from "../../Buttons/AngleBtn/AngleBtn";
import styles from "./ProcessMenu.module.scss";

const ProcessMenu = ({ addrList, picked, setPicked, style }) => {
  const [isSlideSpread, setSlideSpread] = useState(true);
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div
      className={styles.wrap}
      style={{ ...style, width: isSlideSpread ? 300 : 0 }}
    >
      <div className={styles.container}>
        <AngleBtn
          onClick={() => setSlideSpread((prev) => !prev)}
          isOpen={isSlideSpread}
        />
        <div className={styles.ctx}>
          <Scrollbar
            noDefaultStyles
            disableTracksWidthCompensation
            style={{ display: isSlideSpread ? "" : "none" }}
          >
            <MenuItem
              title="내 캘린더"
              itemList={[
                {
                  addr_no: 0,
                  u_color: "#9272df",
                  u_engposition: "User",
                  u_name: `${userInfo.Tester_Name} `,
                  u_position: "사원",
                },
              ]}
              picked={picked}
              setPicked={setPicked}
              isMine
            />
            {addrList?.map((data, idx) => (
              <MenuItem
                title={data.team_name}
                itemList={data.addrListData}
                key={`calendar_addr_list_${idx}`}
                picked={picked}
                setPicked={setPicked}
              />
            ))}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default ProcessMenu;
