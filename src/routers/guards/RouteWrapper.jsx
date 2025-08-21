import PropTypes from 'prop-types';

export const RouteWrapper = ({ element: Element, guard: Guard }) => {
  const content = <Element />;
  if (!Guard) {
    return content;
  }
  return <Guard>{content}</Guard>;
};

RouteWrapper.propTypes = {
  element: PropTypes.elementType.isRequired,
  guard: PropTypes.elementType,
};
