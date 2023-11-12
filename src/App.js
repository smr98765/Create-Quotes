import {
  Routes,
 
  Route,

  Navigate,
  Link,
} from "react-router-dom";
import AllQuote from "./pages/AllQuote";
import Layout from "./components/Layout/Layout";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Comments from "./components/comments/Comments";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" replace />} />

          <Route path="/quotes" element={<AllQuote />} />

          <Route path="/quotes/:quotesId" element={<QuoteDetail />}>
            <Route
              path="/quotes/:quotesId"
              element={
                <div>
                  <Link className="centered" to='comments'>Load comments</Link>
                </div>
              }
            />
			<Route path="comments" element={<Comments/>}/>
          </Route>

          <Route path="/new-quote" element={<NewQuote />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
