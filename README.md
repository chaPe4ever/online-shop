# Online Shop

### Makes use of fake store api

#### Folder Structure Template

```
my-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── robots.txt
├── src/
│
│   ├── assets/                    # Static files
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── banner.jpg
│   │   │   └── icons/
│   │   │       ├── user.svg
│   │   │       └── settings.svg
│   │   ├── fonts/
│   │   │   └── CustomFont.ttf
│   │   └── videos/
│   │       └── intro.mp4
│
│   ├── components/                # All reusable components
│   │
│   │   ├── common/                # Generic UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.test.js
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Input.test.js
│   │   │   ├── Card/
│   │   │   │   └── Card.jsx
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── ModalHeader.jsx
│   │   │   ├── Spinner/
│   │   │   │   └── Spinner.jsx
│   │   │   ├── Badge/
│   │   │   │   └── Badge.jsx
│   │   │   ├── Alert/
│   │   │   │   └── Alert.jsx
│   │   │   ├── Dropdown/
│   │   │   │   └── Dropdown.jsx
│   │   │   ├── Tooltip/
│   │   │   │   └── Tooltip.jsx
│   │   │   ├── Pagination/
│   │   │   │   └── Pagination.jsx
│   │   │   ├── Table/
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── TableHeader.jsx
│   │   │   │   └── TableRow.jsx
│   │   │   └── index.js           # Export all common components
│   │
│   │   ├── forms/                 # Form-specific components
│   │   │   ├── FormInput.jsx
│   │   │   ├── FormSelect.jsx
│   │   │   ├── FormCheckbox.jsx
│   │   │   ├── FormRadio.jsx
│   │   │   ├── FormTextarea.jsx
│   │   │   ├── FormDatePicker.jsx
│   │   │   └── FormError.jsx
│   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   └── NavMenu.jsx
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── SidebarItem.jsx
│   │   │   │   └── SidebarMenu.jsx
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx
│   │   │   └── Container/
│   │   │       └── Container.jsx
│   │
│   │   ├── auth/                  # Auth-related components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPasswordForm.jsx
│   │   │   ├── ResetPasswordForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │
│   │   ├── users/                 # User-related components
│   │   │   ├── UserCard.jsx
│   │   │   ├── UserList.jsx
│   │   │   ├── UserDetail.jsx
│   │   │   ├── UserForm.jsx
│   │   │   ├── UserAvatar.jsx
│   │   │   └── UserProfile.jsx
│   │
│   │   ├── products/              # Product-related components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductFilter.jsx
│   │   │   └── ProductGallery.jsx
│   │
│   │   ├── cart/                  # Shopping cart components
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CheckoutForm.jsx
│   │
│   │   └── dashboard/             # Dashboard components
│   │       ├── DashboardCard.jsx
│   │       ├── StatsWidget.jsx
│   │       ├── Chart.jsx
│   │       └── RecentActivity.jsx
│
│   ├── hooks/                     # Custom React hooks
│   │   ├── auth/
│   │   │   ├── useAuth.js
│   │   │   ├── useLogin.js
│   │   │   └── useRegister.js
│   │   ├── users/
│   │   │   ├── useUsers.js
│   │   │   ├── useUser.js
│   │   │   ├── useCreateUser.js
│   │   │   ├── useUpdateUser.js
│   │   │   └── useDeleteUser.js
│   │   ├── products/
│   │   │   ├── useProducts.js
│   │   │   ├── useProduct.js
│   │   │   └── useProductFilters.js
│   │   ├── cart/
│   │   │   └── useCart.js
│   │   └── shared/                # Shared utility hooks
│   │       ├── useDebounce.js
│   │       ├── useLocalStorage.js
│   │       ├── useMediaQuery.js
│   │       ├── useClickOutside.js
│   │       ├── useToggle.js
│   │       ├── useFetch.js
│   │       ├── useForm.js
│   │       ├── useIntersectionObserver.js
│   │       └── usePagination.js
│
│   ├── layouts/                   # Page layout wrappers
│   │   ├── MainLayout.jsx         # Default layout with header/footer
│   │   ├── AuthLayout.jsx         # Layout for login/register pages
│   │   ├── DashboardLayout.jsx    # Layout for dashboard pages
│   │   ├── EmptyLayout.jsx        # No header/footer
│   │   └── ProfileLayout.jsx       # User profile layout
│
│   ├── pages/                     # Page components (Routes)
│   │   ├── Home/
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   │       ├── Hero.jsx
│   │   │       ├── Features.jsx
│   │   │       └── Testimonials.jsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   ├── Users/
│   │   │   ├── UsersPage.jsx
│   │   │   ├── UserDetailPage.jsx
│   │   │   └── UserEditPage.jsx
│   │   ├── Products/
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── ProductCreatePage.jsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── Cart/
│   │   │   ├── CartPage.jsx
│   │   │   └── CheckoutPage.jsx
│   │   ├── Profile/
│   │   │   ├── ProfilePage.jsx
│   │   │   └── ProfileEditPage.jsx
│   │   ├── NotFound/
│   │   │   └── NotFoundPage.jsx
│   │   └── Errors/
│   │       ├── Error404.jsx
│   │       ├── Error500.jsx
│   │       └── Unauthorized.jsx
│
│   ├── routes/                    # Routing configuration
│   │   ├── index.jsx              # Main routes configuration
│   │   ├── ProtectedRoute.jsx     # HOC for protected routes
│   │   ├── PublicRoute.jsx        # HOC for public routes
│   │   └── routes.config.js        # Route constants
│
│   ├── services/                  # API service layer
│   │   ├── api/
│   │   │   ├── axios.js           # Axios instance configuration
│   │   │   ├── endpoints.js       # API endpoint constants
│   │   │   └── interceptors.js    # Request/Response interceptors
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── orderService.js
│   │   └── uploadService.js
│
│   ├── store/                     # Redux store
│   │   ├── store.js               # Store configuration
│   │   ├── slices/                # Redux slices
│   │   │   ├── authSlice.js
│   │   │   ├── userSlice.js
│   │   │   ├── productSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── themeSlice.js
│   │   │   ├── notificationSlice.js
│   │   │   └── uiSlice.js         # UI state (modals, sidebars)
│   │   ├── middlewares/           # Custom middlewares
│   │   │   ├── logger.js
│   │   │   └── errorHandler.js
│   │   └── selectors/             # Reselect selectors (optional)
│   │       ├── authSelectors.js
│   │       └── userSelectors.js
│
│   ├── utils/                     # Utility functions
│   │   ├── constants/
│   │   │   ├── api.constants.js
│   │   │   ├── app.constants.js
│   │   │   ├── routes.constants.js
│   │   │   └── validation.constants.js
│   │   ├── helpers/
│   │   │   ├── formatters.js      # Date, currency, text formatters
│   │   │   ├── validators.js      # Form validation helpers
│   │   │   ├── storage.js         # localStorage/sessionStorage helpers
│   │   │   ├── array.js           # Array manipulation helpers
│   │   │   ├── string.js          # String manipulation helpers
│   │   │   └── date.js            # Date manipulation helpers
│   │   ├── api.utils.js
│   │   ├── auth.utils.js
│   │   └── error.utils.js
│
│   ├── config/                    # App configuration
│   │   ├── env.js                # Environment variables
│   │   ├── app.config.js          # App settings
│   │   ├── theme.config.js        # Theme configuration
│   │   └── api.config.js          # API configuration
│
│   ├── styles/                    # Global styles
│   │   ├── index.css              # Main CSS (Tailwind imports)
│   │   ├── tailwind.css           # Tailwind directives
│   │   ├── variables.css          # CSS variables
│   │   └── animations.css         # Custom animations
│
│   ├── types/                     # PropTypes definitions
│   │   ├── propTypes.js
│   │   ├── user.types.js
│   │   └── product.types.js
│
│   ├── context/                   # React Context (if not using Redux everywhere)
│   │   ├── ThemeContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│
│   ├── App.jsx                    # Main App component
│   ├── main.jsx                   # Entry point
│   └── setupTests.js              # Test configuration
├── .env                           # Environment variables
├── .env.development
├── .env.production
├── .env.example
├── .eslintrc.cjs                  # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .gitignore
├── index.html                     # HTML entry (Vite)
├── jsconfig.json                   # Path aliases for VSCode
├── package.json
├── package-lock.json
├── postcss.config.js               # PostCSS config (for Tailwind)
├── tailwind.config.js              # Tailwind configuration
├── vite.config.js                  # Vite configuration
└── README.md
```
