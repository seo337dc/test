import { Fragment, useState } from "react";
import { mailWriteFomatter } from "../../../../utils/common/fomatter";
import PlusBtn from "../../../Buttons/PlusBtn/PlusBtn";
import AddresBook from "../AddressBook/AddressBook";
import styles from "./MailWriteUserBox.module.scss";

const MailWriteUserBox = ({ viewData, setViewData }) => {
  const [isAddresBookOpen, setAddresBookOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>보내는 사람</div>
        <div className={styles.sender}>
          {mailWriteFomatter(viewData.to_name)}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>받는 사람</div>
        <div className={styles.to}>{mailWriteFomatter(viewData.from_name)}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          참조
          <PlusBtn onClick={() => setAddresBookOpen(true)} />
        </div>
        <div className={styles.cc}>
          {viewData.replyCC.length > 0 &&
            viewData.replyCC.map((cc, index) => {
              return (
                <Fragment key={index}>
                  <span>{cc.u_name.replace(" ", "")}</span>
                  <span>{cc.u_position};</span>
                </Fragment>
              );
            })}
        </div>
      </div>
      {viewData.hideCc_name && (
        <div className={styles.container}>
          <div className={styles.title}>
            숨은 참조 <PlusBtn onClick={() => setAddresBookOpen(true)} />
          </div>
          <div className={styles.to}>
            {mailWriteFomatter(viewData.hideCc_name)}
          </div>
        </div>
      )}

      {isAddresBookOpen && (
        <AddresBook
          setModalOpen={setAddresBookOpen}
          viewData={viewData}
          setViewData={setViewData}
        />
      )}
    </div>
  );
};

export default MailWriteUserBox;
