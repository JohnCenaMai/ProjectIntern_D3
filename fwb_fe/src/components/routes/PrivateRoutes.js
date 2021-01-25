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
          <Spin size="large" />
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
