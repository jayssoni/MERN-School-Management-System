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
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import KingBedIcon from "@mui/icons-material/KingBed";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { GreenButton } from "../../components/buttonStyles";
import PageContainer from "../../components/PageContainer";
import SpeedDialTemplate from "../../components/SpeedDialTemplate";

const HostelAllocation = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostelData();
  }, [currentUser._id]);

  const fetchHostelData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/HostelAllocations/${currentUser._id}`
      );
      setAllocations(res.data || []);
    } catch (err) {
      console.error("Error fetching hostel data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (allocationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this hostel allocation?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/HostelAllocation/${allocationId}`
        );
        fetchHostelData();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Occupied":
        return "success";
      case "Pending":
        return "warning";
      case "Vacated":
        return "default";
      default:
        return "info";
    }
  };

  const actions = [
    {
      icon: <AddHomeIcon color="primary" />,
      name: "Request Hostel",
      action: () => navigate("/Admin/hostel/request"),
    },
    {
      icon: <VisibilityIcon color="secondary" />,
      name: "View Allotments",
      action: () => navigate("/Admin/hostel/allotments"),
    },
  ];

  return (
    <PageContainer title="Hostel & Room Allocation">
      {loading ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography color="text.secondary">Loading allocations...</Typography>
        </Box>
      ) : allocations.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            🏠 No Hostel Allocation Found
          </Typography>
          <GreenButton
            variant="contained"
            startIcon={<AddHomeIcon />}
            onClick={() => navigate("/Admin/hostel/request")}
          >
            Request Hostel
          </GreenButton>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {allocations.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <HomeIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {item.hostelName || "Hostel Name"}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Room No:{" "}
                    <strong style={{ color: "#2e7d32" }}>
                      {item.roomNumber || "N/A"}
                    </strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Room Type: {item.roomType || "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Capacity: {item.capacity || "N/A"}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2" color="text.secondary">
                    Allocation Date:{" "}
                    {new Date(item.allocationDate).toLocaleDateString("en-IN")}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Duration: {item.duration || "N/A"} months
                  </Typography>

                  <Chip
                    label={item.status || "Pending"}
                    color={getStatusColor(item.status)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Tooltip title="View Details">
                    <IconButton
                      color="info"
                      onClick={() =>
                        navigate("/Admin/hostel/allocation/" + item._id)
                      }
                    >
                      <KingBedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Remove Allocation">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <SpeedDialTemplate actions={actions} />
    </PageContainer>
  );
};

export default HostelAllocation;
