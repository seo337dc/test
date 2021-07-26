import { useDispatch } from "react-redux";
import { setCheckAddressList } from "../../../../../../utils/store/actions/mailActions";
import Scrollbar from "react-scrollbars-custom";
import Slider from "../../../../../Slider/Slider";
import SliderItem from "./SliderItem/SliderItem";
import styles from "./AddressSlider.module.scss";

const AddressSlider = ({ input, addressList, type }) => {
  const dispatch = useDispatch();
  const onClick = (innerData, data) => {
    dispatch(setCheckAddressList({ teamData: data, selectData: innerData }));
  };

  return (
    <div className={styles.wrap}>
      <Scrollbar noDefaultStyles disableTracksWidthCompensation>
        {input
          ? addressList
              .filter((data) => data.team_type === type)
              .map((data) =>
                data.addrListData
                  .filter((item) => item.u_name.includes(input))
                  .map((innerData, idx) => (
                    <SliderItem
                      key={`slider_item_${idx}`}
                      innerData={innerData}
                      data={data}
                      idx={idx}
                      onClick={onClick}
                    />
                  ))
              )
          : addressList
              .filter((data) => data.team_type === type)
              .map((data, idx) => (
                <Slider
                  title={data.team_name}
                  key={`${type}_${idx}`}
                  list={data.addrListData}
                >
                  {data.addrListData.map((innerData, idx) => (
                    <SliderItem
                      key={`slider_item_${idx}`}
                      innerData={innerData}
                      data={data}
                      idx={idx}
                      onClick={onClick}
                    />
                  ))}
                </Slider>
              ))}
      </Scrollbar>
    </div>
  );
};

export default AddressSlider;
