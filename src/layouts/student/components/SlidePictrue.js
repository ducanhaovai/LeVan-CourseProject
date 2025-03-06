import "../css/slide.css";

import logo from "../../../assets/images/logos/logoLevan.png";
import slide1 from "../../../assets/images/slide/silde1.jpg";
import slide2 from "../../../assets/images/slide/silde2.jpg";
import slide3 from "../../../assets/images/slide/silde3.jpg";
import slide4 from "../../../assets/images/slide/silde4.jpg";
import slide5 from "../../../assets/images/slide/silde5.jpg";
import slide6 from "../../../assets/images/slide/silde6.jpg";
import slide7 from "../../../assets/images/slide/silde7.jpg";
import slide8 from "../../../assets/images/slide/silde8.jpg";
import slide9 from "../../../assets/images/slide/silde9.jpg";
import slide10 from "../../../assets/images/slide/silde10.jpg";
import slide11 from "../../../assets/images/slide/silde11.jpg";
import slide12 from "../../../assets/images/slide/silde12.jpg";
import slide14 from "../../../assets/images/slide/silde14.jpg";
import slide15 from "../../../assets/images/slide/silde15.jpg";

export default function SlidePicture() {
  const slides = [
    slide1, slide2, slide3, slide4, slide5,
    slide6, slide7, slide8, slide9, slide10,
    slide11, slide12, slide14, slide15
  ];

  return (
    <>
      <div className="header-content mt-5">
        <div className="gallery-header">
          <div className="w-full">
            <h2>THE MOMENT</h2>
          </div>
          <img
            src={logo}
            className="ml-9 mr-16 h-24 w-24 max-w-[105px] max-h-[105px]"
            alt="Logo"
          />
          <p className="hesitate">
            Dont hesitate to pick up your backpack and go. When you reach your destination and see all the beautiful things in sight, you will know that your efforts were worth it.
          </p>
        </div>
        <div className="slides">
          <div className="slide-1">
            {slides.map((img, index) => (
              <img key={index} src={img} alt={`Slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}