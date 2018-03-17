import RPCHelper from "../../../src/core/rpc/RPCHelper";
import XiResponse from "../../../src/core/message/XiResponse";

test("constructs properly", () => {
  expect(new RPCHelper()).toBeDefined();
});

test(".getNextRequestId() returns an incrementing number when calling", () => {
  let instance = new RPCHelper();
  
  for(var i = 1; i <= 5; i++) {
    expect(instance.getNextRequestId()).toBe(i);
  }
});

test("handles single or multiple subscriptions fine", () => {
  const instance = new RPCHelper();
  instance.subscribe(0, () => {});
  instance.subscribe(1, () => {});
  instance.subscribe(1, () => {});
});

test("handles messages fine without subscribers", () => {
  const instance = new RPCHelper();
  instance.handle(new XiResponse(0, "a"));
  instance.handle(new XiResponse(22213, []));
});

test("subscribers are being called when relevant messages arrive", () => {
  const instance = new RPCHelper();
  
  const sub1 = jest.fn();
  const sub2 = jest.fn();
  const sub3 = jest.fn();
  instance.subscribe(0, sub1);
  instance.subscribe(0, sub2);
  instance.subscribe(1, sub2);
  instance.subscribe(1, sub3);
  
  const firstResponse = new XiResponse(0, "a");
  const secondResponse = new XiResponse(1, []);
  instance.handle(firstResponse);
  instance.handle(secondResponse);

  expect(sub1).toHaveBeenCalledTimes(1);
  expect(sub2).toHaveBeenCalledTimes(2);
  expect(sub1).toHaveBeenCalledTimes(1);

  expect(sub1).toHaveBeenCalledWith(firstResponse);
  expect(sub2).toHaveBeenCalledWith(firstResponse);
  expect(sub2).toHaveBeenLastCalledWith(secondResponse);
  expect(sub3).toHaveBeenCalledWith(secondResponse);
});