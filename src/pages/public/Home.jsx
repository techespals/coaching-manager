import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
     <nav className="premium-navbar">
  <div className="brand">
    <div className="brand-logo">TP</div>

    <div>
      <h2>TechesPals</h2>
      <span>Coaching Institute</span>
    </div>
  </div>

  <div className="nav-links">
    <a href="#courses">Courses</a>
    <a href="#faculty">Faculty</a>
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
      <section className="hero">
        <div className="hero-left">
          <h1>Best Coaching Institute For School & Competitive Exams</h1>

          <p>
            Learn Maths, Science, Hindi, English, JEE preparation and Class 12th
            subjects with expert faculty at TechesPals.
          </p>

          <a href="#contact">
            <button className="join-btn">Join Now</button>
          </a>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Coaching students"
          />
        </div>
      </section>

      <section className="premium-courses" id="courses">
  <div className="section-header">
    <span>Our Programs</span>
    <h1>Courses Designed For Better Results</h1>
    <p>
      We currently offer selected high-demand courses. More courses will be
      added based on student demand and batch availability.
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
        Complete preparation for board exams with concept clarity, regular
        practice, doubt solving and test series.
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
        Strong foundation in Physics, Chemistry and Biology for school exams
        and future competitive preparation.
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
        Build strong mathematical concepts with daily problem solving,
        assignments and exam-oriented practice.
      </p>

      <div className="course-points">
        <span>Algebra</span>
        <span>Calculus</span>
        <span>Practice</span>
      </div>
    </div>
  </div>

  <div className="course-note">
    <p>
      Need another subject or custom batch? New courses are added according to
      student demand.
    </p>

    <a href="#contact">
      <button>Request Course</button>
    </a>
  </div>
</section>

      <section className="courses" id="faculty">
        <h1>Our Faculty</h1>

        <div className="course-grid">
          <div className="course-card">
            <h2>Rahul Sharma</h2>
            <p>Maths Faculty</p>
            <p>8+ years of teaching experience.</p>
          </div>

          <div className="course-card">
            <h2>Ravindra Singh</h2>
            <p>Science Faculty</p>
            <p>Expert in Physics, Chemistry and Biology.</p>
          </div>

          <div className="course-card">
            <h2>Amit Verma</h2>
            <p>English Faculty</p>
            <p>Specialist in grammar and communication skills.</p>
          </div>
        </div>
      </section>
      <section className="rank-section" id="rankers">
  <div className="section-header rank-header">
    <span>Success Stories</span>
    <h1>Our Proud Rank Holders</h1>
    <p>
      Students who trusted TechesPals and achieved excellent results with
      consistent guidance, practice and mentorship.
    </p>
  </div>

  <div className="rank-grid">
    <div className="rank-card topper-card">
      <div className="rank-badge">Rank #1</div>

      <div className="student-avatar">AS</div>

      <h2>Aditya Sharma</h2>
      <p className="rank-course">Class 12th Board</p>

      <div className="score-box">
        <h3>96.8%</h3>
        <span>Board Exam Score</span>
      </div>

      <p className="rank-desc">
        Achieved outstanding performance through regular tests, doubt sessions
        and focused revision planning.
      </p>
    </div>

    <div className="rank-card">
      <div className="rank-badge">Top Performer</div>

      <div className="student-avatar">PV</div>

      <h2>Priyanshi Verma</h2>
      <p className="rank-course">Science Foundation</p>

      <div className="score-box">
        <h3>94.2%</h3>
        <span>Academic Score</span>
      </div>

      <p className="rank-desc">
        Improved concepts in Physics, Chemistry and Biology with structured
        practice and mentor support.
      </p>
    </div>

    <div className="rank-card">
      <div className="rank-badge">Maths Star</div>

      <div className="student-avatar">RK</div>

      <h2>Rohit Kumar</h2>
      <p className="rank-course">Mathematics Mastery</p>

      <div className="score-box">
        <h3>98/100</h3>
        <span>Maths Score</span>
      </div>

      <p className="rank-desc">
        Scored excellent marks in Mathematics with problem-solving practice and
        weekly performance tracking.
      </p>
    </div>
  </div>
</section>

    <section className="premium-contact" id="contact">

  <div className="contact-heading">
    <h1>Get In Touch</h1>
    <p>
      Connect with TechesPals Coaching for admissions, counselling and course details.
    </p>
  </div>

  <div className="premium-contact-container">

    <div className="premium-contact-card">
      <div className="contact-icon">📍</div>

      <div>
        <h2>Location</h2>
        <p>SAHARANPUR , UTTAR PRADESH</p>
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

    <div className="premium-contact-card">
      <div className="contact-icon">⏰</div>

      <div>
        <h2>Timing</h2>
        <p>Mon - Sat | 8 AM - 8 PM</p>
      </div>
    </div>

  </div>

</section>
    </div>
  );
}