import { Box, Typography, Paper, Avatar, Button, TextField, Select, MenuItem, Chip, Grid, Divider, IconButton } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useState } from "react";
import '../layouts/profile.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Banda',
    email: 'johnbanda@example.com',
    phone: '+265 888 123 456',
    address: 'Mkango Street, Area 49/55',
    city: 'Lilongwe',
    region: 'Central Region',
    zipCode: '10001',
    deliveryPreferences: 'Leave at door'
  });

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box className="profile-container">
      {/* Header */}
      <Box className="profile-header">
        <Typography variant="h4" className="profile-title">
          My Profile
        </Typography>
        <Button
          variant={isEditing ? "outlined" : "contained"}
          startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
          onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
          className="edit-toggle-btn"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Box>

      {/* Main Profile Card */}
      <Paper elevation={3} className="profile-card">
        {/* Avatar Section */}
        <Box className="profile-avatar-section">
          <Avatar className="profile-avatar">
            {getInitials(userData.name)}
          </Avatar>
          {!isEditing && (
            <Chip 
              label="Active" 
              color="success" 
              size="small" 
              className="status-badge"
            />
          )}
        </Box>

        {/* Profile Details */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider className="section-divider" />
          </Grid>

          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                👤 Full Name
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.name}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                📧 Email
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.email}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                📱 Phone
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.phone}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                📍 Address
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.address}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={4}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                🏙️ City
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.city}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Region */}
          <Grid item xs={12} sm={4}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                📮 Region
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.region}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* ZIP Code */}
          <Grid item xs={12} sm={4}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                〽️ ZIP Code
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  size="small"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <Typography variant="body1" className="detail-value">
                  {userData.zipCode}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Delivery Preference */}
          <Grid item xs={12}>
            <Box className="detail-field">
              <Typography variant="caption" className="detail-label">
                🚚 Delivery Preference
              </Typography>
              {isEditing ? (
                <Select
                  fullWidth
                  size="small"
                  name="deliveryPreferences"
                  value={formData.deliveryPreferences}
                  onChange={handleInputChange}
                  className="edit-select"
                >
                  <MenuItem value="Leave at door">Leave at door</MenuItem>
                  <MenuItem value="Hand to me">Hand to me</MenuItem>
                  <MenuItem value="Leave with concierge">Leave with concierge</MenuItem>
                  <MenuItem value="Leave in mailroom">Leave in mailroom</MenuItem>
                </Select>
              ) : (
                <Chip 
                  label={userData.deliveryPreferences} 
                  color="primary" 
                  variant="outlined"
                  className="preference-chip"
                />
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        {isEditing && (
          <Box className="profile-actions">
            <Button 
              variant="outlined" 
              onClick={handleCancel}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSave}
              startIcon={<SaveIcon />}
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={3} className="stats-grid">
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} className="stat-card">
            <Typography variant="h4" className="stat-number">
              24
            </Typography>
            <Typography variant="caption" className="stat-label">
              Total Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} className="stat-card">
            <Typography variant="h4" className="stat-number">
              K35000
            </Typography>
            <Typography variant="caption" className="stat-label">
              Total Spent
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} className="stat-card">
            <Typography variant="h4" className="stat-number">
              4.8
            </Typography>
            <Typography variant="caption" className="stat-label">
              Rating
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} className="stat-card">
            <Typography variant="h4" className="stat-number">
              2
            </Typography>
            <Typography variant="caption" className="stat-label">
              Pending Orders
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
