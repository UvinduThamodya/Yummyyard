import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Box,
  Chip,
  CircularProgress,
  Badge,
  Drawer,
  List,
  IconButton,
  Divider,
  TextField,
  Snackbar,
  Alert,
  Paper,
  createTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EggIcon from '@mui/icons-material/Egg';
import SetMealIcon from '@mui/icons-material/SetMeal';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import Sidebar from './Sidebar'; // Import Sidebar component

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3dcd83', // Updated primary color
    },
    secondary: {
      main: '#2196F3', // Blue for the secondary color
    },
    background: {
      default: '#FCFCFC', // Changed from '#ffffff' to '#FCFCFC'
      paper: '#ffffff',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
          },
        },
        outlined: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

// Styled components
const MenuCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const MenuCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '75%', // 4:3 aspect ratio
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
}));

const PopularBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: alpha(theme.palette.warning.main, 0.9),
  color: '#fff',
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  zIndex: 1,
}));

const NewBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: alpha(theme.palette.error.main, 0.9),
  color: '#fff',
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  zIndex: 1,
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: '1.25rem',
}));

const MenuPageTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(5, 0, 4),
  fontWeight: 'bold',
  position: 'relative',
  textAlign: 'center',
  '&:after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    margin: '12px auto',
    borderRadius: 2,
  },
}));

const CategoryTab = styled(Tab)(({ theme }) => ({
  minHeight: 72,
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const CartButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  zIndex: 1000,
  borderRadius: '50%',
  width: 64,
  height: 64,
  minWidth: 'unset',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  },
}));

const CartDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: 420,
    padding: theme.spacing(3),
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#FCFCFC', // Added to ensure drawer has the same background
  },
}));

const CartItemBox = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const BadgeStyled = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    fontWeight: 'bold',
    minWidth: 20,
    height: 20,
    padding: '0 6px',
  },
}));

// Custom styled wrapper to override any background images in the Sidebar
const StyledSidebarWrapper = styled('div')({
  backgroundColor: '#FCFCFC',
  backgroundImage: 'none !important',
  '& *': {
    backgroundImage: 'none !important',
  }
});

// Define category map with icons
const categoryConfig = {
  1: { name: 'Rice Dishes', icon: <LocalDiningIcon /> },
  2: { name: 'Egg Dishes', icon: <EggIcon /> },
  3: { name: 'Fish Dishes', icon: <SetMealIcon /> },
  4: { name: 'Pasta', icon: <RamenDiningIcon /> },
  6: { name: 'Specialties', icon: <EmojiFoodBeverageIcon /> },
  7: { name: 'Rotti', icon: <BakeryDiningIcon /> },
  9: { name: 'Fried Items', icon: <LocalFireDepartmentIcon /> },
  10: { name: 'Omelettes', icon: <EggIcon /> },
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0); // 0 means all categories
  const [categories, setCategories] = useState([]);

  // Cart state
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Set body and html background color
    document.body.style.backgroundColor = '#FCFCFC';
    document.documentElement.style.backgroundColor = '#FCFCFC';
    
    // Remove any background images that might be set
    document.body.style.backgroundImage = 'none';
    document.documentElement.style.backgroundImage = 'none';
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }

    // Fetch menu items from API
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/menu');

        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }

        const data = await response.json();
        setMenuItems(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category_id)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
    
    // Cleanup function to reset when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
      document.documentElement.style.backgroundImage = '';
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  // Cart functions
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      if (itemIndex >= 0) {
        // Item exists, increase quantity
        const newCart = [...prevCart];
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: newCart[itemIndex].quantity + 1,
        };
        return newCart;
      } else {
        // Item doesn't exist, add new item
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    setAlert({
      open: true,
      message: `${item.name} added to cart`,
      severity: 'success',
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === itemId);

      if (itemIndex >= 0) {
        const newCart = [...prevCart];
        if (newCart[itemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          newCart[itemIndex] = {
            ...newCart[itemIndex],
            quantity: newCart[itemIndex].quantity - 1,
          };
        } else {
          // Remove item if quantity is 1
          newCart.splice(itemIndex, 1);
        }
        return newCart;
      }
      return prevCart;
    });
  };

  const deleteFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    if (!deliveryAddress) {
      setAlert({
        open: true,
        message: 'Please enter your delivery address',
        severity: 'error',
      });
      return;
    }

    if (!phoneNumber) {
      setAlert({
        open: true,
        message: 'Please enter your phone number',
        severity: 'error',
      });
      return;
    }

    alert('Checkout is under development. Functionality will be added soon.')
    setCart([]);
    setCartOpen(false);
    setAlert({
      open: true,
      message: 'Thank you for your order!',
      severity: 'success',
    });
  };

  // Filter menu items by selected category
  const filteredMenuItems =
    selectedCategory === 0
      ? menuItems
      : menuItems.filter((item) => item.category_id === selectedCategory);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#FCFCFC',
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading our delicious menu...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 8, backgroundColor: '#FCFCFC' }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid #f0f0f0',
            maxWidth: 600,
            mx: 'auto',
            backgroundColor: '#FCFCFC',
          }}
        >
          <Typography color="error" variant="h5" gutterBottom>
            Oops! We couldn't load the menu.
          </Typography>
          <Typography color="text.secondary" paragraph>
            Error: {error}
          </Typography>
          <Typography mb={3}>
            Please check your database connection and try again.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <StyledSidebarWrapper>
      <Sidebar>
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 6, 
            bgcolor: '#FCFCFC', 
            backgroundImage: 'none',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FCFCFC',
              zIndex: -1,
            }
          }}
        >
          <MenuPageTitle variant="h3" component="h1">
            Our Menu
          </MenuPageTitle>

          {/* Category Tabs */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              mb: 5,
              position: 'sticky',
              top: 16,
              zIndex: 10,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              backgroundColor: '#FCFCFC',
            }}
          >
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="menu categories"
              sx={{
                minHeight: 72,
                '& .MuiTabs-indicator': {
                  height: 4,
                  borderRadius: 2,
                },
                backgroundColor: '#FCFCFC',
              }}
            >
              <CategoryTab
                icon={<RestaurantMenuIcon />}
                label="All Items"
                iconPosition="start"
                value={0}
              />
              {categories.map((categoryId) => {
                const category = categoryConfig[categoryId] || { 
                  name: `Category ${categoryId}`, 
                  icon: <RestaurantMenuIcon /> 
                };
                
                return (
                  <CategoryTab
                    key={categoryId}
                    icon={category.icon}
                    label={category.name}
                    iconPosition="start"
                    value={categoryId}
                  />
                );
              })}
            </Tabs>
          </Paper>

          {/* Menu Items Grid */}
          <Grid container spacing={4}>
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <MenuCard>
                    <Box sx={{ position: 'relative' }}>
                      <MenuCardMedia
                        image={item.image_url || '/api/placeholder/400/300'}
                        title={item.name}
                      />
                      {item.popular === 1 && (
                        <PopularBadge>
                          <StarIcon sx={{ fontSize: 16 }} /> Popular
                        </PopularBadge>
                      )}
                      {item.new === 1 && (
                        <NewBadge>
                          <NewReleasesIcon sx={{ fontSize: 16 }} /> New
                        </NewBadge>
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom
                        sx={{ fontWeight: 500, fontSize: '1.1rem' }}
                      >
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2, minHeight: 40 }}
                      >
                        {item.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 2,
                        }}
                      >
                        <PriceTypography variant="h6" component="p">
                          LKR {(item.price / 100).toFixed(2)}
                        </PriceTypography>
                        <Chip
                          label={
                            categoryConfig[item.category_id]?.name ||
                            `Category ${item.category_id}`
                          }
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => addToCart(item)}
                        startIcon={<AddIcon />}
                        size="large"
                        sx={{ py: 1 }}
                      >
                        Add to Order
                      </Button>
                    </CardActions>
                  </MenuCard>
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No items found in this category.
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => setSelectedCategory(0)}
                  sx={{ mt: 2 }}
                >
                  View All Items
                </Button>
              </Box>
            )}
          </Grid>

          {/* Floating Cart Button */}
          <CartButton
            variant="contained"
            color="primary"
            onClick={() => setCartOpen(true)}
            aria-label="Shopping Cart"
          >
            <BadgeStyled badgeContent={totalCartItems} color="error">
              <ShoppingCartIcon />
            </BadgeStyled>
          </CartButton>

          {/* Cart Drawer */}
          <CartDrawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                Your Order
              </Typography>
              <Chip 
                label={`${totalCartItems} ${totalCartItems === 1 ? 'item' : 'items'}`}
                color="primary"
                variant="outlined"
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {cart.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <ShoppingCartIcon 
                  sx={{ fontSize: 60, color: alpha('#000', 0.2), mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Add some delicious items to get started
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => setCartOpen(false)}
                >
                  Browse Menu
                </Button>
              </Box>
            ) : (
              <React.Fragment>
                <List sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
                  {cart.map((item) => (
                    <CartItemBox key={item.id}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={500}>
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          LKR {((item.price * item.quantity) / 100).toFixed(2)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => removeFromCart(item.id)}
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.2)
                            }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ mx: 2, fontWeight: 500 }}>
                          {item.quantity}
                        </Typography>

                        <IconButton 
                          size="small" 
                          onClick={() => addToCart(item)}
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.2)
                            }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>

                        <Box sx={{ flex: 1 }} />

                        <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                          LKR {(item.price / 100).toFixed(2)} each
                        </Typography>

                        <IconButton 
                          edge="end" 
                            size="small" 
                            onClick={() => deleteFromCart(item.id)}
                            sx={{ color: theme.palette.error.main }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </CartItemBox>
                    ))}
                  </List>

                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                      borderRadius: 3,
                      mb: 3
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Subtotal:</Typography>
                      <Typography variant="body1" fontWeight={500}>
                        LKR {(calculateTotal() / 100).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery Fee:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        LKR 2.99
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        LKR {((calculateTotal() / 100) + 2.99).toFixed(2)}
                      </Typography>
                    </Box>
                  </Paper>

                  <TextField
                    label="Delivery Address"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={handleDeliveryAddressChange}
                    InputProps={{
                      sx: { borderRadius: 2 }
                    }}
                  />

                  <TextField
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    InputProps={{
                      sx: { borderRadius: 2 }
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2 }}
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </React.Fragment>
              )}
            </CartDrawer>

            {/* Alert Snackbar */}
            <Snackbar
              open={alert.open}
              autoHideDuration={3000}
              onClose={handleCloseAlert}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert 
                onClose={handleCloseAlert} 
                severity={alert.severity} 
                sx={{ 
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </Container>
        </Sidebar>
      </StyledSidebarWrapper>
  );
};

export default Menu;