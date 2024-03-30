export const DefaultFromDate = () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  
    const newNow = now.toISOString().slice(0, 16);
  
    return newNow;
  };
  