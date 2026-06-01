import { useNavigate } from "react-router-dom";
import CreateWorkoutForm from "../components/CreateWorkoutForm";

const CreateWorkoutPage = () => {
  const navigate = useNavigate();

  /**
   * Runs only after the API confirms that a workout was created successfully.
   *
   * Best practice:
   * - Keep form submission logic inside CreateWorkoutForm.
   * - Keep navigation/page-flow decisions inside this page component.
   */
  const handleWorkoutCreated = () => {
    navigate("/dashboard");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Page heading gives users clear context and improves accessibility. */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Workout
      </h1>

      {/* 
        CreateWorkoutForm handles the input fields and API request.
        This page only decides what happens after successful creation.
      */}
      <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
    </main>
  );
};

export default CreateWorkoutPage;