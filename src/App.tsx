import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Spinner from './pages/game/Spinner';
import Trivia from './pages/game/Trivia';
import { Provider } from 'react-redux';
import store from './store';
import { TimeLimitScreen } from './pages/game/TimeLimitScreen';
import Puzzle from './pages/game/Puzzle';
import { MinSwapsScreen } from './pages/game/MinSwapScreen';
import Welcome from './pages/game/Welcome';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Provider store={store}>
      <Routes>
        {/* SignIn and SignUp routes outside DefaultLayout */}

        <Route
          path="/spinner"
          element={
            <>
              <PageTitle title="Dashen Beer - Spinner Wheel" />
              <Spinner />
            </>
          }
        />
        <Route
          path="/puzzle"
          element={
            <>
              <PageTitle title="Dashen Beer - Choose a Challenge " />
              <Puzzle />
            </>
          }
        />
        <Route
          path="/time-puzzle"
          element={
            <>
              <PageTitle title="Dashen Beer - Time Puzzle" />
              <TimeLimitScreen />
            </>
          }
        />
        <Route
          path="/min-puzzle"
          element={
            <>
              <PageTitle title="Dashen Beer - Minimum Swap Puzzle" />
              <MinSwapsScreen />
            </>
          }
        />
        <Route
          path="/trivia"
          element={
            <>
              <PageTitle title="Dashen Beer - Trivia " />
              <Trivia />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Dashen Beer - Welcome " />
              <Welcome />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        {/* Routes with DefaultLayout */}
        {/* <Route path="/" element={<DefaultLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
        </Route> */}
      </Routes>
    </Provider>
  );
}

export default App;
