import AuthGuards from "../Guards/AuthGuards";
import MainLayput from "../Layout/MainLayput";
import About from "../Pages/About";
import AddProduct from "../Pages/AddProduct";
import Cart from "../Pages/Cart";
import CategoryList from "../Pages/CategoryList";
import Contact from "../Pages/Contact";
import EditProduct from "../Pages/EditProduct";
import Home from "../Pages/Home";
import PaymentSuccess from "../Pages/PaymentSuccess";
import ProductDetails from "../Pages/ProductDetails";
import ProductList from "../Pages/ProductList";
import SellerOrderDetails from "../Pages/SellerOrderDetails";

const mainRoutes = [
  {
    path: "/",
    element: <AuthGuards>
      <MainLayput />
    </AuthGuards>,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment/khalti/success",
        element: <PaymentSuccess />,
      },
      {
        path: "seller/order/details",
        element: <SellerOrderDetails />,
      },
      {
        path: "category/list/:id",
        element: <CategoryList/>,
      },

    ],
  },
];

export default mainRoutes;
