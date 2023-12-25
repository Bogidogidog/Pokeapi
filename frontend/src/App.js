import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PageHome from "./pages/PageHome";
import PageLogin from "./pages/PageLogin";
import PageRegistration from "./pages/PageRegistration";

const route = createBrowserRouter([
	{
		path: "/home",
		element: <PageHome />,
	},
	{
		path: "/",
		element: <PageLogin />,
	},
	{
		path: "/register",
		element: <PageRegistration />,
	},
]);

function App() {
	//const [isLogged, setIsLogged] = useState(false);
	return <RouterProvider router={route} />;
}

export default App;
