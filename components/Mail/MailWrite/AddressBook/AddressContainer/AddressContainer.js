import { useState } from "react";
import SearchBox from "../../../../InputBox/SearchBox/SearchBox";
import AddressSlider from "./AddressSlider/AddressSlider";
import styles from "./AddressContainer.module.scss";

const AddresContainer = ({ type, addressList }) => {
  const [input, setInput] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className={styles.wrap}>
      <SearchBox
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="이름으로 검색"
        onClick={onClick}
      />
      <AddressSlider input={input} addressList={addressList} type={type} />
    </div>
  );
};

export default AddresContainer;
