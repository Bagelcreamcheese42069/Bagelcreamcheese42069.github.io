import kaboom from "./kaboom.mjs";

export const scale = 2
export const k = kaboom({
  width: 320 * scale,
  height: 320 * scale,
  scale,
  letterbox: true,
  global: true,
});

k.loadSprite("player", "./plaa.png")
