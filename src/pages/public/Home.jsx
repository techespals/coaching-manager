import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

    
    
      {/* NAVBAR */}

      <nav className="premium-navbar">

        <div className="brand">
          <img
            src="/log.png"
            alt="TechesPals Logo"
            className="brand-img"
          />

          <div>
            <h2>TechesPals</h2>
            <span>MAKE IT REAL</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#courses">Courses</a>
          <a href="#faculty">Faculty</a>
          <a href="#rankers">Rankers</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <Link to="/student-login">
            <button className="premium-login student-login-btn">
              Student Login
            </button>
          </Link>

          <Link to="/admin-login">
            <button className="premium-login admin-login-btn">
              Admin Login
            </button>
          </Link>
        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <h1>
            Best Coaching Institute For School & Competitive Exams
          </h1>

          <p>
            Learn Maths, Science, Hindi, English, JEE preparation and
            Class 12th subjects with expert faculty at TechesPals.
          </p>

          <a href="#contact">
            <button className="join-btn">
              Join Now
            </button>
          </a>

        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Coaching students"
          />
        </div>

      </section>

      {/* COURSES */}

      <section className="premium-courses" id="courses">

        <div className="section-header">
          <span>Our Programs</span>

          <h1>Courses Designed For Better Results</h1>

          <p>
            We currently offer selected high-demand courses.
            More courses will be added based on student demand.
          </p>
        </div>

        <div className="premium-course-grid">

          <div className="premium-course-card featured-course">

            <div className="course-top">
              <div className="course-icon">📘</div>
              <span className="course-badge">Most Popular</span>
            </div>

            <h2>Class 12th Board Preparation</h2>

            <p>
              Complete preparation for board exams with
              concept clarity and test series.
            </p>

            <div className="course-points">
              <span>Maths</span>
              <span>Science</span>
              <span>English</span>
            </div>

          </div>

          <div className="premium-course-card">

            <div className="course-top">
              <div className="course-icon">🧪</div>
              <span className="course-badge">Foundation</span>
            </div>

            <h2>Science Foundation</h2>

            <p>
              Physics, Chemistry and Biology foundation
              for school and competitive exams.
            </p>

            <div className="course-points">
              <span>Physics</span>
              <span>Chemistry</span>
              <span>Biology</span>
            </div>

          </div>

          <div className="premium-course-card">

            <div className="course-top">
              <div className="course-icon">📐</div>
              <span className="course-badge">Concept Based</span>
            </div>

            <h2>Mathematics Mastery</h2>

            <p>
              Strong mathematical concepts with
              daily problem solving practice.
            </p>

            <div className="course-points">
              <span>Algebra</span>
              <span>Calculus</span>
              <span>Practice</span>
            </div>

          </div>

        </div>

      </section>
   
{/* TOPPERS SECTION */}

<section className="rank-section" id="rankers">
  <div className="section-header">
    <span>Success Stories</span>
    <h1>Our Top Performers</h1>
    <p>Small glimpse of our achievers from different batches.</p>
  </div>

  <div className="topper-block">
    <h2>JEE Toppers</h2>

    <div className="topper-grid">
      {[
        ["Aditya Sharma", "AIR 12", "99.2%", "/students/student1.jpeg"],
        ["Rohit Kumar", "AIR 48", "98.7%", "/students/student2.jpeg"],
        ["Aman Gupta", "AIR 92", "97.8%", "/students/student3.jpeg"],
        ["Vikas Singh", "AIR 135", "96.9%", "/students/student4.jpeg"],
      ].map((student, index) => (
        <div className="topper-mini-card" key={index}>
          <img src={student[3]} alt={student[0]} />

          <div className="topper-score">
            <strong>{student[2]}</strong>
            <span>{student[1]}</span>
          </div>

          <h3>{student[0]}</h3>
        </div>
      ))}
    </div>
  </div>

  <div className="topper-block">
    <h2>NEET Toppers</h2>

    <div className="topper-grid">
      {[
        ["Anjali Kumari", "NEET", "685", "/students/student5.jpg"],
        ["Priya Singh", "NEET", "672", "/students/student6.jpg"],
        ["Sakshi Verma", "NEET", "668", "/students/student7.jpg"],
        ["Rahul Yadav", "NEET", "660", "/students/student8.jpg"],
      ].map((student, index) => (
        <div className="topper-mini-card" key={index}>
          <img src={student[3]} alt={student[0]} />

          <div className="topper-score">
            <strong>{student[2]}</strong>
            <span>{student[1]}</span>
          </div>

          <h3>{student[0]}</h3>
        </div>
      ))}
    </div>
  </div>

  <div className="topper-block">
    <h2>Board Toppers</h2>

    <div className="topper-grid">
      {[
        ["Priyanshi Verma", "Class 12", "96.8%", "/students/student9.jpg"],
        ["Ekta Singh", "Class 10", "95.6%", "/students/student10.jpg"],
        ["Nisha Patel", "Class 12", "94.9%", "/students/student11.jpg"],
        ["Mohit Kumar", "Class 10", "94.2%", "/students/student12.jpg"],
      ].map((student, index) => (
        <div className="topper-mini-card" key={index}>
          <img src={student[3]} alt={student[0]} />

          <div className="topper-score">
            <strong>{student[2]}</strong>
            <span>{student[1]}</span>
          </div>

          <h3>{student[0]}</h3>
        </div>
      ))}
    </div>
  </div>
</section>

{/* FACULTY */}

<section className="courses" id="faculty">
  <h1>Our Faculty</h1>

  <div className="course-grid">
    <div className="course-card">
      <h2>Rahul Sharma</h2>
      <p>Maths Faculty</p>
    </div>

    <div className="course-card">
      <h2>Ravindra Singh</h2>
      <p>Science Faculty</p>
    </div>

    <div className="course-card">
      <h2>Amit Verma</h2>
      <p>English Faculty</p>
    </div>
  </div>
</section>

      {/* CONTACT */}

      <section className="premium-contact" id="contact">

        <div className="contact-heading">
          <h1>Get In Touch</h1>

          <p>
            Connect with TechesPals Coaching
            for admissions and counselling.
          </p>
        </div>

        <div className="premium-contact-container">

          <div className="premium-contact-card">
            <div className="contact-icon">📍</div>

            <div>
              <h2>Location</h2>
              <p>Saharanpur, Uttar Pradesh</p>
            </div>
          </div>

          <div className="premium-contact-card">
            <div className="contact-icon">📞</div>

            <div>
              <h2>Call Us</h2>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="premium-contact-card">
            <div className="contact-icon">📧</div>

            <div>
              <h2>Email</h2>
              <p>contact@techespals.com</p>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}