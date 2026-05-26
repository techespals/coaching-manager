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

      <section className="courses" id="courses">
        <h1>Our Courses</h1>

        <div className="course-grid">
          <div className="course-card">
            <h2>Mathematics</h2>
            <p>Strong concepts, practice sheets and regular tests.</p>
          </div>

          <div className="course-card">
            <h2>Science</h2>
            <p>Physics, Chemistry and Biology with practical understanding.</p>
          </div>

          <div className="course-card">
            <h2>Hindi</h2>
            <p>Grammar, literature and board exam focused preparation.</p>
          </div>

          <div className="course-card">
            <h2>English</h2>
            <p>Grammar, writing skills, speaking and literature support.</p>
          </div>

          <div className="course-card">
            <h2>JEE Foundation</h2>
            <p>Focused preparation for engineering entrance exams.</p>
          </div>

          <div className="course-card">
            <h2>Class 12th</h2>
            <p>Complete board exam preparation with doubt sessions.</p>
          </div>
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