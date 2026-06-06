import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    amount: "",
    paymentMode: "UPI",
  });

  const fetchStudents = async () => {
    const res = await api.get("/owner/students");
    setStudents(res.data);
  };

  const fetchPayments = async () => {
    const res = await api.get("/owner/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPayment = async (e) => {
    e.preventDefault();

    await api.post("/owner/payments", {
      studentId: Number(form.studentId),
      amount: Number(form.amount),
      paymentMode: form.paymentMode,
    });

    alert("Payment Added Successfully");

    setForm({
      studentId: "",
      amount: "",
      paymentMode: "UPI",
    });

    fetchStudents();
    fetchPayments();
  };

  const totalCollected = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const totalPending = students.reduce(
    (sum, s) => sum + Number(s.remainingFees || 0),
    0
  );

  const pendingStudents = students.filter(
    (s) => s.remainingFees > 0
  );

  return (
    <div className="admin-page">
      <div className="page-top">
        <div>
          <h1>Fees & Payments</h1>
          <p>Track fee collection, pending amount and payment history.</p>
        </div>

        <button onClick={() => navigate("/admin/dashboard")}>
          Back Dashboard
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Collected</h3>
          <h2>₹{totalCollected}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Pending</h3>
          <h2>₹{totalPending}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Students</h3>
          <h2>{pendingStudents.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Payments</h3>
          <h2>{payments.length}</h2>
        </div>
      </div>

      <form className="student-form" onSubmit={addPayment}>
        <h2>Add Fee Payment</h2>

        <div className="form-grid">
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - Pending ₹{s.remainingFees}
              </option>
            ))}
          </select>

          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
          >
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button className="main-action">Add Payment</button>
      </form>

      <div className="table-card">
        <h2>Pending Fees Students</h2>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {pendingStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.phone}</td>
                <td>₹{s.totalFees}</td>
                <td>₹{s.paidFees}</td>
                <td className="pending">₹{s.remainingFees}</td>
                <td>
                  <span className={`status ${s.feeStatus?.toLowerCase()}`}>
                    {s.feeStatus}
                  </span>
                </td>
              </tr>
            ))}

            {pendingStudents.length === 0 && (
              <tr>
                <td colSpan="6">No pending fees</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-card" style={{ marginTop: "35px" }}>
        <h2>Payment History</h2>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.student?.name}</td>
                <td>₹{p.amount}</td>
                <td>{p.paymentMode}</td>
                <td>{p.paymentDate}</td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="4">No payment history found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}