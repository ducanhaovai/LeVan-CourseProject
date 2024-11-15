import "../css/CourseDetail.css";

const CourseHeader = ({ course }) => {
  return (
    <>
      <div className="courses-details-thumb">
        <img src={course.thumbnail}></img>
      </div>
      <header className=" text-black py-8 px-4 rounded-lg mb-8">
        <div className="courses-details-content">
          <ul className="courses-item-meta list-wrap">
            <li className="courses-item-tag">
              <a>{course.category_name}</a>
            </li>
            <li className="avg-rating flex items-center">
              <i className="fas fa-star"></i>
              <p>({course.rating} Review)</p>
            </li>
          </ul>
        </div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <div className="courses-details-meta">
          <ul className="list-wrap">
            <li>{course.total_enrollments}</li>
            <li>{course.total_sections}</li>
            <li>{course.duration}</li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default CourseHeader;
