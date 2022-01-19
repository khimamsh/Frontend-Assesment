import { Dropdown } from "semantic-ui-react";

import "semantic-ui-css/components/dropdown.css";
import "semantic-ui-css/components/transition.css";
import "semantic-ui-css/components/reset.css";
import styles from "./ListItem.module.scss";

const ListItem = ({ locsinfo }) => {
  return (
    <div className={styles["list-container"]}>
      {console.log("locsinfo", locsinfo)}
      {locsinfo[0] ? (
        <div className={styles["list-item"]}>{locsinfo[0]?.locationInfo}</div>
      ) : (
        <div />
      )}
      {locsinfo[1] ? (
        <div className={styles["list-item"]}>{locsinfo[1]?.locationInfo}</div>
      ) : (
        <div />
      )}
      {locsinfo.length > 2 ? (
        <Dropdown text="See All">
          <Dropdown.Menu>
            {locsinfo.slice(2).map((items) => (
              <Dropdown.Item text={items.locationInfo} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ListItem;
