# iSPEAK Admin Access Guide

## How to Access the Admin Dashboard

### Method 1: Direct URL
Navigate to: **https://your-domain.com/admin/login**

### Method 2: Quick Access Link
You can bookmark this link for quick access to the admin portal.

## Login Credentials

### Development/Testing Access
- **Email**: `admin@ispeaklanguages.com`
- **Password**: `iSPEAK2024!`

### Production Access (To be configured)
Please change these credentials when deploying to production for security.

## Admin Dashboard Features

Once logged in, you have access to:

### 1. **Dashboard** (`/admin/dashboard`)
- Overview of site statistics
- Quick access to all admin functions

### 2. **Donations Management** (`/admin/donations`)
- View all donations
- Track donation progress
- Export donation reports (CSV)
- Update donation status
- View donor information

### 3. **Blog Management** (`/admin/blog`)
- Create new blog posts
- Edit existing posts
- Manage post categories
- Schedule posts

### 4. **Product Management** (`/admin/products`)
- Add new products to the shop
- Edit product details
- Manage inventory
- Upload product images

## Security Features

- **Session Management**: Admin sessions expire after 24 hours
- **Protected Routes**: All admin pages require authentication
- **Automatic Logout**: Sessions are cleared on browser close
- **Secure Storage**: Credentials are never stored in plain text

## Logout

To logout, click the **Logout** button in the bottom-left corner of the admin sidebar.

## Troubleshooting

### Can't Login?
1. Check that you're using the correct email and password
2. Clear your browser cache
3. Try using an incognito/private browser window

### Session Expired?
If you see "Session expired", simply log in again with your credentials.

### Forgot Password?
Contact your system administrator to reset your password.

## Mobile Access

The admin dashboard is fully responsive and can be accessed from:
- Desktop computers
- Tablets
- Mobile phones

## Browser Requirements

The admin dashboard works best on:
- Chrome (version 90+)
- Firefox (version 88+)
- Safari (version 14+)
- Edge (version 90+)

## Support

For technical support or questions about the admin dashboard:
- Email: tech@ispeaklanguages.com
- Phone: (478) 390-4040

---

## Quick Links

After logging in, you can directly access:
- [Admin Dashboard](/admin/dashboard)
- [Donations](/admin/donations)
- [Blog Posts](/admin/blog)
- [Products](/admin/products)

## Notes for Development

The admin system includes:
1. **Authentication System**: Simple localStorage-based auth (upgrade to JWT tokens for production)
2. **Protected Routes**: All admin pages wrapped with `AdminAuthCheck` component
3. **Responsive Design**: Works on all screen sizes
4. **User-Friendly Interface**: Clean, modern design with intuitive navigation

Remember to implement proper backend authentication before deploying to production!