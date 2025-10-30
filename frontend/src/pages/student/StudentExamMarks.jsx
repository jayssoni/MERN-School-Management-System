import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { GreenButton } from "../../components/buttonStyles";
import PageContainer from "../../components/PageContainer";
import SpeedDialTemplate from "../../components/SpeedDialTemplate";

const ExamMarks = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [marksList, setMarksList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExamMarks();
  }, [currentUser._id]);

  const fetchExamMarks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ExamMarks/${currentUser._id}`
      );
      setMarksList(res.data || []);
    } catch (err) {
      console.error("Error fetching exam marks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/ExamMark/${id}`);
        fetchExamMarks();
      } catch (err) {
        console.error("Error deleting record:", err);
      }
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "success";
      case "B":
        return "info";
      case "C":
        return "warning";
      case "D":
        return "error";
      default:
        return "default";
    }
  };

  const calculatePercentage = (marks, total) => {
    return ((marks / total) * 100).toFixed(1);
  };

  const actions = [
    {
      icon: <AddIcon color="primary" />,
      name: "Add Exam Marks",
      action: () => navigate("/Admin/exams/add"),
    },
    {
      icon: <VisibilityIcon color="secondary" />,
      name: "View Result Sheet",
      action: () => navigate("/Admin/exams/results"),
    },
  ];

  return (
    <PageContainer title="Exam Marks">
      {loading ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography color="text.secondary">Loading exam marks...</Typography>
        </Box>
      ) : marksList.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            📚 No Exam Marks Found
          </Typography>
          <GreenButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/Admin/exams/add")}
          >
            Add Marks
          </GreenButton>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {marksList.map((exam) => {
            const percentage = calculatePercentage(exam.marksObtained, exam.totalMarks);
            const isPass = percentage >= 40;

            return (
              <Grid item xs={12} sm={6} md={4} key={exam._id}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <SchoolIcon color="primary" />
                      <Typography variant="h6" fontWeight="bold">
                        {exam.examName || "Exam Name"}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Subject: {exam.subjectName || "N/A"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Class: {exam.className || "N/A"}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body1" color="text.primary">
                      Marks:{" "}
                      <strong>
                        {exam.marksObtained}/{exam.totalMarks}
                      </strong>
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        color={isPass ? "success" : "error"}
                        sx={{ height: 8, borderRadius: 2 }}
                      />
                      <Typography
                        variant="caption"
                        color={isPass ? "success.main" : "error.main"}
                      >
                        {percentage}% {isPass ? "(Pass)" : "(Fail)"}
                      </Typography>
                    </Box>

                    <Chip
                      label={`Grade: ${exam.grade || "N/A"}`}
                      color={getGradeColor(exam.grade)}
                      size="small"
                      sx={{ mt: 1 }}
                    />

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Exam Date:{" "}
                      {new Date(exam.examDate).toLocaleDateString("en-IN")}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        color="info"
                        onClick={() =>
                          navigate("/Admin/exams/view/" + exam._id)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Record">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(exam._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <SpeedDialTemplate actions={actions} />
    </PageContainer>
  );
};

export default ExamMarks;
