import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spin, Space } from "antd";

function PrivateRoutes({
  component: Component,
  auth: { isAuthenticated = false, loading },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoutes);
