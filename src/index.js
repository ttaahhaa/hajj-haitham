import { createRoot } from 'react-dom/client';
import "./i18n"
import {BrowserRouter} from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<BrowserRouter>
    <ProtectedRoutes />
</BrowserRouter>
)
