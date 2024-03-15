import MainLayput from "../Layout/MainLayput";
import About from "../Pages/About";
import AddProduct from "../Pages/AddProduct";
import Cart from "../Pages/Cart";
import Contact from "../Pages/Contact";
import EditProduct from "../Pages/EditProduct";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import ProductList from "../Pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayput/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"products",
        element:<ProductList/>
      },
      {
        path: "contact",
        element:<Contact/>
      },
     
      {
        path:"add-product",
        element:<AddProduct/>
      },
      {
        path: "product-details/:id",
        element:<ProductDetails />
      },
      {
        path:"product/edit/:id",
        element:<EditProduct/>
      },
      {
        path:"cart",
        element:<Cart/>
      }

    ]
  },
];

export default mainRoutes;
