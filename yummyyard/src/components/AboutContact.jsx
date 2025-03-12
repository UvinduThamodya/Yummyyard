import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar'; // Import the Sidebar component

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
  }
}));

const ContactCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#3dcd83', // Changed to the requested color #3dcd83
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  borderRadius: theme.spacing(0, 0, 4, 4),
  marginBottom: theme.spacing(6),
  textAlign: 'center', // Added to center the text content
}));

const AboutContact = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Poppins, sans-serif' }}>
      <Sidebar isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${isDesktop ? 240 : 0}px)` },
          ml: { md: `${isDesktop ? -10 : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Added to center content
        }}
      >
        {!isDesktop && (
          <Box sx={{ p: 2, alignSelf: 'flex-start' }}> {/* Modified to maintain menu button at the left */}
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="start" 
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <HeroSection sx={{ width: '100%' }}> {/* Added width 100% to ensure the hero section spans full width */}
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to Yummy Yard
            </Typography>
            <Typography variant="h6" align="center" sx={{ maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
              Where every meal tells a story and every flavor creates a memory
            </Typography>
          </Container>
        </HeroSection>

        <Container maxWidth="lg" sx={{ textAlign: 'center' }}> {/* Added textAlign center for all container content */}
          {/* Contact Section */}
          <Box sx={{ mb: 8 }}>
            <SectionTitle variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
              Contact Us
            </SectionTitle>
            
            <Grid container spacing={4} justifyContent="center"> {/* Added justifyContent center */}
              <Grid item xs={12} md={5}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#3dcd83', mb: 3 }}>
                    Get In Touch
                  </Typography>
                  
                  <ContactCard>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton sx={{ backgroundColor: '#3dcd83', color: 'white', mr: 2 }}> {/* Changed to match header color */}
                        <LocationIcon />
                      </IconButton>
                      <Box sx={{ textAlign: 'left' }}> {/* Added to ensure contact info is left-aligned */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Our Location
                        </Typography>
                        <Typography variant="body2">
                          123 Yummy Street, Flavor Town
                        </Typography>
                        <Typography variant="body2">
                          Colombo, Sri Lanka
                        </Typography>
                      </Box>
                    </CardContent>
                  </ContactCard>
                  
                  <ContactCard>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton sx={{ backgroundColor: '#3dcd83', color: 'white', mr: 2 }}> {/* Changed to match header color */}
                        <PhoneIcon />
                      </IconButton>
                      <Box sx={{ textAlign: 'left' }}> {/* Added to ensure contact info is left-aligned */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Phone Number
                        </Typography>
                        <Typography variant="body2">
                          Reservations: +94 76 718 1695
                        </Typography>
                        <Typography variant="body2">
                          Customer Service: +94 76 123 4567
                        </Typography>
                      </Box>
                    </CardContent>
                  </ContactCard>
                  
                  <ContactCard>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton sx={{ backgroundColor: '#3dcd83', color: 'white', mr: 2 }}> {/* Changed to match header color */}
                        <EmailIcon />
                      </IconButton>
                      <Box sx={{ textAlign: 'left' }}> {/* Added to ensure contact info is left-aligned */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Email Address
                        </Typography>
                        <Typography variant="body2">
                          Reservations: bookings@yummyyard.com
                        </Typography>
                        <Typography variant="body2">
                          General Inquiries: info@yummyyard.com
                        </Typography>
                      </Box>
                    </CardContent>
                  </ContactCard>
                </StyledPaper>
              </Grid>
              
              <Grid item xs={12} md={7}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#3dcd83', mb: 3 }}> {/* Changed to match header color */}
                    Send us a Message
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          variant="outlined"
                          required
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          variant="outlined"
                          type="email"
                          required
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          variant="outlined"
                          multiline
                          rows={6}
                          required
                          sx={{ mb: 3 }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: 'center' }}> {/* Centered the button */}
                        <Button 
                          type="submit"
                          variant="contained" 
                          sx={{ 
                            py: 1.5, 
                            px: 4, 
                            borderRadius: 2,
                            fontWeight: 600,
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                            backgroundColor: '#3dcd83', // Changed to match header color
                            '&:hover': {
                              backgroundColor: '#32b873', // Slightly darker shade for hover state
                              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                            }
                          }}
                          endIcon={<SendIcon />}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </StyledPaper>
              </Grid>
            </Grid>
          </Box>
          
          {/* Footer */}
          <Box 
            component="footer" 
            sx={{ 
              py: 4, 
              textAlign: 'center',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              mt: 4,
              width: '100%'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Yummy Yard. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutContact;