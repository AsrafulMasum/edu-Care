import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="max-w-screen-lg mx-4 xl:mx-auto">{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};
