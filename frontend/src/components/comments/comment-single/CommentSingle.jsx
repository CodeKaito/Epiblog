import React from "react";
import { Image } from "react-bootstrap";

const CommentSingle = () => {
  return (
    <div className="comment-single-container mb-4">
      <div className="d-flex">
        <div className=" d-flex align-items-center">
          <Image
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
            width={30}
            height={30}
            className="rounded-circle object-fit-cover me-3"
          />
        </div>

        <div className="d-flex flex-column">
          <span className="comment-author">Hannah Backer</span>
          <span className="comment-createdat">2 days ago</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="comment-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim
          magna at nunc varius, sit amet rhoncus nulla lacinia. Sed auctor
          vestibulum mauris, sed interdum ipsum suscipit nec. Phasellus a tortor
          nec justo porta consequat. Integer nec dui quis felis fermentum
          placerat vel ut sem. Aliquam erat volutpat. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Nam laoreet magna at nulla eleifend, sit amet consequat odio
          rutrum. Ut hendrerit feugiat massa, nec tempor dui. Phasellus lobortis
          libero eget mi suscipit, sit amet suscipit nulla tempor. Vivamus
          dignissim mauris felis, id dapibus ex consequat id. Vivamus fermentum
          mi in urna aliquet, vel lacinia justo lacinia. Integer ultrices semper
          quam vel tincidunt. Sed posuere arcu nec erat lobortis tempor.
        </p>
      </div>
    </div>
  );
};

export default CommentSingle;
