import React from "react";
import { Button, Image } from "react-bootstrap";
import "../styles.css";

const Follow = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <div className="d-flex">
        <Image
          src="https://miro.medium.com/v2/resize:fill:32:32/1*NdgmToqlP3Fk5_1Bpi5zhg.png"
          className="follow-image me-2 rounded-circle object-fit-fill"
        />
        <div>
          <p className="fw-bolder">Lessig</p>
          <p>law professor</p>
        </div>
      </div>
      <div>
        <Button className="follow-button">Follow</Button>
      </div>
    </div>
  );
};

export default Follow;
