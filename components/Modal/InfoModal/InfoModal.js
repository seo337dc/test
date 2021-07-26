import ModalCommon from "../ModalCommon/ModalCommon";
import Scrollbar from "react-scrollbars-custom";

import styles from "./InfoModal.module.scss";

const infoImg = [
  "info_img0.JPG",
  "info_img1.JPG",
  "info_img2.JPG",
  "info_img3.JPG",
  "info_img4.JPG",
  "info_img5.JPG",
  "info_img6.JPG",
  "info_img7.JPG",
  "info_img8.JPG",
  "info_img9.JPG",
  "info_img10.JPG",
  "info_img11.JPG",
  "info_img12.JPG",
  "info_img13.JPG",
  "info_img14.JPG",
];

const InfoModal = ({ setModalOpen }) => {
  return (
    <ModalCommon setModalOpen={setModalOpen}>
      <div className={styles.wrap}>
        <Scrollbar noDefaultStyles disableTracksWidthCompensation>
          {infoImg.map((src) => (
            <img src={`img/${src}`} alt="info" />
          ))}
        </Scrollbar>
      </div>
    </ModalCommon>
  );
};

export default InfoModal;
