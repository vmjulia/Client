import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";


/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      <Header height="100"/>
      <AppRouter/>
    </div>
  );
};

export default App;
// TO DO: handle error messages and proper redirections.
// TO DO: force user to type birthday in the correct format
// TO DO: write tests for new APIs in backend