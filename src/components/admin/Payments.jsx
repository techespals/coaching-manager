import { useEffect, useState } from "react";
import api from "../../api";
import AdminPageLayout from "./AdminPageLayout";
import "./Payments.css";

export default function Payments() {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    amount: "",
    paymentMode: "UPI",
  });

  const fetchStudents = async () => {
    try {
      const res = await api.get("/owner/students");
      setStudents(res.data);
    } catch (err) {
      console.log("FETCH STUDENTS ERROR:", err.response?.data);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await api.get("/owner/payments");
      setPayments(res.data);
    } catch (err) {
      console.log("FETCH PAYMENTS ERROR:", err.response?.data);
    }
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

    try {
      await api.post("/owner/payments", {
        studentId: Number(form.studentId),
        amount: Number(form.amount),
        paymentMode: form.paymentMode,
      });

      setForm({
        studentId: "",
        amount: "",
        paymentMode: "UPI",
      });

      fetchStudents();
      fetchPayments();
    } catch (err) {
      console.log("ADD PAYMENT ERROR:", err.response?.data);
      alert("Payment add nahi hua");
    }
  };

  const totalCollected = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const totalPending = students.reduce(
    (sum, s) => sum + Number(s.remainingFees || 0),
    0
  );

  const pendingStudents = students.filter((s) => Number(s.remainingFees) > 0);

  return (
    <AdminPageLayout
      title="Fees & Payments"
      subtitle="Track fee collection, pending amount and complete payment history."
    >
      <div className="payment-stats-row">
        <div className="payment-stat-card collected">
          <p>Total Collected</p>
          <h2>₹{totalCollected}</h2>
        </div>

        <div className="payment-stat-card pending-card">
          <p>Total Pending</p>
          <h2>₹{totalPending}</h2>
        </div>

        <div className="payment-stat-card">
          <p>Pending Students</p>
          <h2>{pendingStudents.length}</h2>
        </div>

        <div className="payment-stat-card">
          <p>Total Payments</p>
          <h2>{payments.length}</h2>
        </div>
      </div>

      <div className="payment-form-card">
        <div className="section-title">
          <h2>Add Fee Payment</h2>
          <p>Select student and add received payment amount.</p>
        </div>

        <form onSubmit={addPayment}>
          <div className="payment-form-grid">
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
              type="number"
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

          <button type="submit" className="primary-action">
            Add Payment
          </button>
        </form>
      </div>

      <div className="payment-table-card">
        <div className="table-header">
          <div>
            <h2>Pending Fees Students</h2>
            <p>Students with remaining fee balance.</p>
          </div>
        </div>

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
                  <span className={`fee-status ${s.feeStatus?.toLowerCase()}`}>
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

      <div className="payment-table-card mt-28">
        <div className="table-header">
          <div>
            <h2>Payment History</h2>
            <p>All fee payments received by this institute.</p>
          </div>
        </div>

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
                <td>
                  <span className="payment-mode">{p.paymentMode}</span>
                </td>
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
    </AdminPageLayout>
  );
}