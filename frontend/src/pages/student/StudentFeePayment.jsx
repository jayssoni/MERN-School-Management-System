import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCardIcon from "@mui/icons-material/AddCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { GreenButton } from "../../components/buttonStyles";
import PageContainer from "../../components/PageContainer";
import SpeedDialTemplate from "../../components/SpeedDialTemplate";

const StudentFeePayment = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?._id) fetchStudentFees();
  }, [currentUser?._id]);

  const fetchStudentFees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/Student/fees/${currentUser._id}`
      );
      setFees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching fees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (feeId) => {
    const confirmPay = window.confirm("Proceed to pay this fee?");
    if (!confirmPay) return;
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/FeePay/${feeId}`, {
        amountPaid: 3000,
        paymentMethod: "Online",
        transactionId: "TXN-" + Date.now(),
      });
      alert("✅ Payment successful!");
      fetchStudentFees();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const handleDelete = async (feeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/Fee/${feeId}`);
      alert("Deleted successfully");
      fetchStudentFees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Overdue":
        return "error";
      case "Partial":
        return "info";
      default:
        return "warning";
    }
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Pay All Fees",
      action: () => alert("Bulk payment feature coming soon!"),
    },
    {
      icon: <ReceiptIcon color="secondary" />,
      name: "View Receipts",
      action: () => navigate("/Admin/fees/receipts"),
    },
  ];

  return (
    <PageContainer title="Student Fee Payment">
      {loading ? (
        <Box textAlign="center" py={6}>
          <CircularProgress />
          <Typography color="text.secondary" mt={2}>
            Loading fees...
          </Typography>
        </Box>
      ) : fees.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            🎉 All Fees Are Paid!
          </Typography>
          <GreenButton
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/Admin/dashboard")}
          >
            Go to Dashboard
          </GreenButton>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Student</b></TableCell>
                <TableCell><b>Class</b></TableCell>
                <TableCell><b>Fee Type</b></TableCell>
                <TableCell><b>Total (₹)</b></TableCell>
                <TableCell><b>Paid (₹)</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee._id} hover>
                  <TableCell>{fee.student?.name || "Student"}</TableCell>
                  <TableCell>{fee.sclassName?.sclassName || "N/A"}</TableCell>
                  <TableCell>{fee.feeType}</TableCell>
                  <TableCell>{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{fee.amountPaid.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(fee.dueDate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={fee.paymentStatus}
                      color={getStatusColor(fee.paymentStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {fee.paymentStatus !== "Paid" && (
                      <Tooltip title="Pay Fee">
                        <IconButton
                          color="success"
                          onClick={() => handlePayment(fee._id)}
                        >
                          <PaymentIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete Record">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(fee._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <SpeedDialTemplate actions={actions} />
    </PageContainer>
  );
};

export default StudentFeePayment;
