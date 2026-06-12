import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

      toast.success("Payment added successfully");

      setForm({
        studentId: "",
        amount: "",
        paymentMode: "UPI",
      });

      fetchStudents();
      fetchPayments();
    } catch (err) {
      console.log("ADD PAYMENT ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Payment add nahi hua");
    }
  };

  const exportPaymentsExcel = async () => {
    try {
      const response = await api.get("/owner/payments/export", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "payments.xlsx";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Payments Excel downloaded");
    } catch (err) {
      console.log("EXPORT PAYMENTS ERROR:", err.response?.data || err.message);
      toast.error("Payments export failed");
    }
  };

  const printReceipt = (payment) => {
    const student = payment.student;
    const institute = payment.institute;

    const receiptHtml = `
      <html>
        <head>
          <title>Fee Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f7fb;
              padding: 30px;
              color: #111827;
            }

            .receipt {
              max-width: 760px;
              margin: auto;
              background: #ffffff;
              border-radius: 18px;
              padding: 34px;
              border: 1px solid #e5e7eb;
            }

            .header {
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #00bcd4;
              padding-bottom: 18px;
              margin-bottom: 26px;
            }

            .brand h1 {
              margin: 0;
              color: #00a8c8;
              font-size: 28px;
            }

            .brand p {
              margin: 6px 0 0;
              color: #6b7280;
            }

            .receipt-no {
              text-align: right;
            }

            .receipt-no h3 {
              margin: 0;
              color: #111827;
            }

            .receipt-no p {
              margin: 6px 0 0;
              color: #6b7280;
            }

            .section {
              margin-bottom: 24px;
            }

            .section h2 {
              font-size: 18px;
              margin-bottom: 12px;
              color: #111827;
            }

            .grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 14px;
            }

            .item {
              background: #f9fafb;
              padding: 14px;
              border-radius: 12px;
              border: 1px solid #e5e7eb;
            }

            .item span {
              display: block;
              color: #6b7280;
              font-size: 13px;
              margin-bottom: 5px;
            }

            .item strong {
              color: #111827;
              font-size: 15px;
            }

            .amount-box {
              margin-top: 24px;
              padding: 22px;
              border-radius: 14px;
              background: linear-gradient(135deg, #00bcd4, #2563eb);
              color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .amount-box span {
              font-size: 14px;
              opacity: 0.9;
            }

            .amount-box h2 {
              margin: 0;
              font-size: 32px;
            }

            .footer {
              margin-top: 34px;
              display: flex;
              justify-content: space-between;
              align-items: end;
              color: #6b7280;
              font-size: 13px;
            }

            .sign {
              text-align: center;
              color: #111827;
            }

            .line {
              margin-top: 45px;
              width: 180px;
              border-top: 1px solid #111827;
              padding-top: 8px;
            }

            @media print {
              body {
                background: white;
              }

              .receipt {
                border: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="receipt">
            <div class="header">
              <div class="brand">
                <h1>${institute?.instituteName || "Coaching Institute"}</h1>
                <p>${institute?.email || ""} ${institute?.phone ? " | " + institute.phone : ""}</p>
              </div>

              <div class="receipt-no">
                <h3>Fee Receipt</h3>
                <p>${payment.receiptNumber || "RCPT-" + payment.id}</p>
              </div>
            </div>

            <div class="section">
              <h2>Student Details</h2>
              <div class="grid">
                <div class="item">
                  <span>Student Name</span>
                  <strong>${student?.name || "N/A"}</strong>
                </div>

                <div class="item">
                  <span>Phone</span>
                  <strong>${student?.phone || "N/A"}</strong>
                </div>

                <div class="item">
                  <span>Course</span>
                  <strong>${student?.course?.courseName || "N/A"}</strong>
                </div>

                <div class="item">
                  <span>Batch</span>
                  <strong>${student?.batch?.batchName || "N/A"}</strong>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Payment Details</h2>
              <div class="grid">
                <div class="item">
                  <span>Payment Date</span>
                  <strong>${payment.paymentDate}</strong>
                </div>

                <div class="item">
                  <span>Payment Mode</span>
                  <strong>${payment.paymentMode}</strong>
                </div>

                <div class="item">
                  <span>Total Fees</span>
                  <strong>₹${student?.totalFees || 0}</strong>
                </div>

                <div class="item">
                  <span>Pending After Payment</span>
                  <strong>₹${student?.remainingFees || 0}</strong>
                </div>
              </div>
            </div>

            <div class="amount-box">
              <div>
                <span>Amount Received</span>
                <h2>₹${payment.amount}</h2>
              </div>

              <div>
                <span>Status</span>
                <h2>PAID</h2>
              </div>
            </div>

            <div class="footer">
              <p>This is a computer-generated receipt.</p>

              <div class="sign">
                <div class="line">Authorized Signature</div>
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(receiptHtml);
    receiptWindow.document.close();
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

          <button
            type="button"
            className="primary-action"
            onClick={exportPaymentsExcel}
          >
            Export Excel
          </button>
        </div>

        <table className="premium-table">
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Download</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.receiptNumber || `RCPT-${p.id}`}</td>
                <td>{p.student?.name}</td>
                <td>₹{p.amount}</td>
                <td>
                  <span className="payment-mode">{p.paymentMode}</span>
                </td>
                <td>{p.paymentDate}</td>
                <td>
                  <button
                    type="button"
                    className="receipt-btn"
                    onClick={() => printReceipt(p)}
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6">No payment history found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPageLayout>
  );
}