function FadeCascade({ children }) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    const cascadeClass = `cascade-anim cascade-${Math.min(index + 1, 5)}`;
    return React.cloneElement(child, {
      className: child.props.className ? `${child.props.className} ${cascadeClass}` : cascadeClass
    });
  });
}

Object.assign(window, { FadeCascade });
