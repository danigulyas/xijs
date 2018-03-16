import Deserializer from "../../../src/core/mapper/Deserializer";
import DefStyleEvent from "../../../src/core/message/event/DefStyleEvent";
import ScrollToEvent from "../../../src/core/message/event/ScrollToEvent";
import PluginStartedEvent from "../../../src/core/message/event/PluginStartedEvent";
import AvailableThemesEvent from "../../../src/core/message/event/AvailableThemesEvent";
import AvailablePluginsEvent from "../../../src/core/message/event/AvailablePluginsEvent";


test("should correctly guess a response", () => {
  expect(Deserializer.isResponse({})).toEqual(false);
  expect(Deserializer.isResponse({"method": "whatev", "params": {"a": 1}})).toEqual(false);
  expect(Deserializer.isResponse({"id": 0})).toEqual(false);
  expect(Deserializer.isResponse({"id": 0, "result": {"a": 1}})).toEqual(true);
});

test("should throw an error when encountered an unrecognizeable message", () => {
  expect(() => Deserializer.deserializeEvent({"method": "🏄🏿"})).toThrow();
  expect(() => Deserializer.deserializeEvent({"method": "🏄🏿", "params": {"hehe": "haha"}})).toThrow();
  expect(() => Deserializer.deserializeResponse({"id": 2})).toThrow();
});

test("should deserialize the def_style event correctly", () => {
  const message = {
    method: "def_style",
    params: {
      "id": 2,
      "fg_color": 4289142109,
      "weight": 700
    }
  };

  const deserialized: DefStyleEvent = Deserializer.deserializeEvent(message);

  expect(deserialized).toBeInstanceOf(DefStyleEvent);
  expect(deserialized.style).toHaveProperty("id", message.params.id);
  expect(deserialized.style).toHaveProperty("foregroundColor", message.params.fg_color);
  expect(deserialized.style).toHaveProperty("weight", message.params.weight);
});

test("should deserialize the scroll_to event correctly", () => {
  const message = {
    method: "scroll_to",
    params: {
      "col": 33,
      "line": 0,
      "view_id": "view-3"
    }
  };

  const deserialized: ScrollToEvent = Deserializer.deserializeEvent(message);

  expect(deserialized).toBeInstanceOf(ScrollToEvent);
  expect(deserialized).toHaveProperty("viewId", message.params.view_id);
  expect(deserialized).toHaveProperty("column", message.params.col);
  expect(deserialized).toHaveProperty("line", message.params.line);
});

test("should deserialize the plugin_started event correctly", () => {
  const message = {
    method: "plugin_started",
    params: {
      "plugin": "syntect",
      "view_id": "view-3"
    }
  };

  const deserialized: PluginStartedEvent = Deserializer.deserializeEvent(message);

  expect(deserialized).toBeInstanceOf(PluginStartedEvent);
  expect(deserialized).toHaveProperty("viewId", message.params.view_id);
  expect(deserialized).toHaveProperty("name", message.params.plugin);
});

test("should deserialize the available_themes event correctly", () => {
  const message = {
    method: "available_themes",
    params: {
      "themes": ["Solarized", "GitHub"]
    }
  };

  const deserialized: AvailableThemesEvent = Deserializer.deserializeEvent(message);

  expect(deserialized).toBeInstanceOf(AvailableThemesEvent);
  expect(deserialized).toHaveProperty("themes", message.params.themes);
});

test("should deserialize the available_plugins event correctly", () => {
  const message = {
    method: "available_plugins",
    params: {
      "plugins": [{"name": "syntect", "running": false}],
      "view_id": "view-5"
    }
  };

  const deserialized: AvailablePluginsEvent = Deserializer.deserializeEvent(message);

  expect(deserialized).toBeInstanceOf(AvailablePluginsEvent);
  expect(deserialized).toHaveProperty("viewId", message.params.view_id);
  expect(deserialized).toHaveProperty("plugins", message.params.plugins);
});


