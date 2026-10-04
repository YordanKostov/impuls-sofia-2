const Container = ({ children, className = "" }) => (
  <div className={`max-w-6xl mx-auto px-5 md:px-8 lg:px-12 ${className}`}>
    {children}
  </div>
);

export default Container;
