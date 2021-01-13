// import React, { lazy, useCallback, useEffect, Suspense } from "react";

// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// // import profileAct from "@zef/pages/profile/actions";
// const routes = [
//     {
//         path: "/",
//         component: lazy(() => import("../src/components/authentication/login")),
//         exact: true
//     },
//     {
//         path: "/home",
//         component:lazy(() => import("../src/components/pages/home/homepage")),
//         exact: true
//     },
//     {
//         path: "/find-near-you",
//         component:lazy(() => import("../src/components/pages/home/homepage")),
//         exact: true
//     },
//     {
//         path: "/matches",
//         component:lazy(() => import("../src/components/pages/match/match")),
//         exact: true
//     },
//     {
//         path: "/feeds",
//         component:lazy(() => import("../src/components/common/createFeed/createFeed")),
//         exact: true
//     },
//     {
//         path: "/chats",
//         component:lazy(() => import("../src/components/pages/chat/chat")),
//         exact: true
//     }

// ];

// const AppRouter = () => {
//     // const dispatch = useDispatch();
//     const firstCall = useSelector((state) => state.profile.firstCall);
  
//     if (firstCall) {
//       return 0;
//     } else {
//       return (
//         <Suspense>
//           <Router>
//             <Switch>
//               {routes.map((route, i) => (
//                 <RouteWithSubRoutes key={i} {...route} />
//               ))}
//             </Switch>
//           </Router>
//         </Suspense>
//       );
//     }
//   };
  
//   function RouteWithSubRoutes(route) {
//     const isAuth = useSelector((state) => state.profile.isAuth);
//     const renderComponent = useCallback(
//       (props) => {
//         if (isAuth && ["/home"].indexOf(route.path) > -1) {
//           return <Redirect to="/feeds" />;
//         }
//         if (route.private && !isAuth) {
//           return <Redirect to="/" />;
//         }
//         return <route.component {...props} routes={route.routes} />;
//       },
//       [route.path, isAuth, route.private, route.routes]
//     );
//     return <Route path={route.path} render={renderComponent} />;
//   }

// export default AppRouter;