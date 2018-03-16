import Serializer from "../../../src/core/mapper/Serializer";
import NewViewRequest from "../../../src/core/message/request/NewViewRequest";
import ClientStartedEvent from "../../../src/core/message/event/ClientStartedEvent";


test("should throw when something unserializable is passed", () => {
  expect(() => Serializer.serialize({})).toThrow();
});

test(`should serialize ${NewViewRequest.name} correctly`, () => {
  let instance = new NewViewRequest(0, "/tmp/cats");
  let serialized = JSON.parse(Serializer.serialize(instance));

  expect(serialized).toHaveProperty("id", 0);
  expect(serialized).toHaveProperty("method", "new_view");
  expect(serialized).toHaveProperty("params.file_path", instance.filePath);

  instance = new NewViewRequest(0);
  serialized = JSON.parse(Serializer.serialize(instance));

  expect(serialized).toHaveProperty("id", 0);
  expect(serialized).toHaveProperty("method", "new_view");
  expect(serialized).toHaveProperty("params.file_path", undefined);
});

test(`should serialize ${ClientStartedEvent.name} correctly`, () => {
  let instance = new ClientStartedEvent("~/woo", "~/hoo");
  let serialized = JSON.parse(Serializer.serialize(instance));

  expect(serialized).toHaveProperty("id", undefined);
  expect(serialized).toHaveProperty("method", "client_started");
  expect(serialized).toHaveProperty("params.config_dir", instance.configDir);
  expect(serialized).toHaveProperty("params.client_extras_dir", instance.clientExtrasDir);

  instance = new ClientStartedEvent();
  serialized = JSON.parse(Serializer.serialize(instance));

  expect(serialized).toHaveProperty("id", undefined);
  expect(serialized).toHaveProperty("method", "client_started");
  expect(serialized).toHaveProperty("params.config_dir", undefined);
  expect(serialized).toHaveProperty("params.client_extras_dir", undefined);
});