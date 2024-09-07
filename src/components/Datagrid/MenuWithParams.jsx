const MenuWithParams = (Component) => {
  return (props) => <Component {...props} />;
};

export default MenuWithParams;
