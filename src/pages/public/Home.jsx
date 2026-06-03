import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      section {
  scroll-margin-top: 130px;
      }

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

    <h1>Our Top Rank Holders</h1>

    <p>
      Students who trusted TechesPals and achieved excellent
      results with proper guidance and mentorship.
    </p>
  </div>

  <div className="rank-grid">

    <div className="rank-card">

      <div className="rank-badge">
        AIR 12
      </div>

      <div className="student-avatar">
        AS
      </div>

      <h2>Aditya Sharma</h2>

      <p className="rank-course">
        JEE Advanced
      </p>

      <div className="score-box">
        <h3>99.2%</h3>
        <span>Performance Score</span>
      </div>

      <p className="rank-desc">
        Achieved outstanding performance in Mathematics
        and Physics with consistent practice.
      </p>

    </div>

    <div className="rank-card">

      <div className="rank-badge">
        Topper
      </div>

      <div className="student-avatar">
        PV
      </div>

      <h2>Priyanshi Verma</h2>

      <p className="rank-course">
        Class 12th Boards
      </p>

      <div className="score-box">
        <h3>96.8%</h3>
        <span>Board Percentage</span>
      </div>

      <p className="rank-desc">
        Excellent academic consistency with strong
        command over Science subjects.
      </p>

    </div>

    <div className="rank-card">

      <div className="rank-badge">
        Maths Star
      </div>

      <div className="student-avatar">
        RK
      </div>

      <h2>Rohit Kumar</h2>

      <p className="rank-course">
        Mathematics Mastery
      </p>

      <div className="score-box">
        <h3>98/100</h3>
        <span>Maths Score</span>
      </div>

      <p className="rank-desc">
        Solved 500+ advanced level questions and
        mastered problem solving techniques.
      </p>

    </div>

    <div className="rank-card">

      <div className="rank-badge">
        NEET Qualifier
      </div>

      <div className="student-avatar">
        AK
      </div>

      <h2>Anjali Kumari</h2>

      <p className="rank-course">
        NEET Foundation
      </p>

      <div className="score-box">
        <h3>685</h3>
        <span>NEET Score</span>
      </div>

      <p className="rank-desc">
        Strong Biology preparation with regular mock
        tests and doubt solving sessions.
      </p>

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