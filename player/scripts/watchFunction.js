const watchFunction = async (func, listener) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  var f, f_, event;
  class FunctionEvent {
    constructor(type, new_value, old_value) {
      this.type = type;
      this.new_value = new_value;
      this.old_value = old_value;
    }
  }
  while (true) {
    f = f_ = await func();
    while (f == f_) {
      await delay(125);
      f_ = await func();
    }
    event = new FunctionEvent("change", f_, f);
    listener(event);
  }
};
