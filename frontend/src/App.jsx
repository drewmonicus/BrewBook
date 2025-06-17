import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipePage from "./components/RecipePage";
import RecipeView from "./components/RecipeView";
import MainBanner from "./components/MainBanner";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateRecipe from "./components/CreateRecipe";
import Register from "./components/Register";
import Login from "./components/Login";
import { RecipeContextProvider } from "./context/RecipeContext";
import "./styles/App.css";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <AuthProvider>
      <RecipeContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainBanner />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/recipes/:id" element={<RecipeView />} />
            <Route
              path="/recipes/create"
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/recipes/:id/edit"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </RecipeContextProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
