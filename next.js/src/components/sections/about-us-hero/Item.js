

const Item = ({ children, ...props }) => {
  

  return (
    <motion.p
      {...props}
      style={{
        x: position.x,
        y: position.y 
      }}
    >
      {children}
    </motion.p>
  );
};

export default Item;