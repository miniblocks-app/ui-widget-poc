export const getItemProperties = (itemId, refs) => {
    if (itemId === "button1" && refs.buttonRef.current) {
      return {
        color: refs.buttonRef.current.style.backgroundColor,
      };
    }
    if (itemId === "textbox1" && refs.textBoxRef.current) {
      return {
        color: refs.textBoxRef.current.style.backgroundColor,
      };
    }
    return {};
  };
  