import "../css/slide.css";

import logo from "../../../assets/images/logos/logoLevan.png";
import silde1 from "../../../assets/images/slide/silde1.png";
import silde2 from "../../../assets/images/slide/silde2.png";
import silde3 from "../../../assets/images/slide/silde3.png";
import silde4 from "../../../assets/images/slide/silde4.png";
import silde5 from "../../../assets/images/slide/sidle5.png";
import silde6 from "../../../assets/images/slide/silde6.png";

export default function SlidePicture() {
  return (
    <>
        <div className="header-content  mt-5">
          <div className="gallery-header">
            <div className="w-full">
              <h2>THE MOMENT</h2>
            </div>
            <img
              src={logo}
              className=" ml-9 mr-16 h-24 w-24 max-w-[105px] max-h-[105px]"
            />
            <p className="hesitate">
              Dont hesitate to pick up your backpack and go. When you reach
              your destination and see all the beautiful things in sight, you
              will know that your efforts were worth it.
            </p>
          </div>
          <div className="slides ">
            <div className="slide-1 ">
              {[silde1, silde2, silde3, silde4, silde5, silde6].map(
                (img, index) => (
                  <img key={index} src={img} alt={`Slide ${index + 1}`} />
                )
              )}
               {[silde1, silde2, silde3, silde4, silde5, silde6].map(
                (img, index) => (
                  <img key={index} src={img} alt={`Slide ${index + 1}`} />
                )
              )}
            </div>
          </div>
        </div>
    </>
  );
}