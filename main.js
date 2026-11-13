import { k } from "./kaboomloader.js";
k.loadSound("meow", "./meow.mp3")
k.loadSprite("banana", "./banana.webp")
k.loadSprite("apple", "./apple.webp")
k.loadSprite("badshoe", "./badshoe.webp")
k.loadSprite("pineapple", "./pineapple.webp")
k.loadSprite("melon", "./melon.webp")
k.loadSound("ow", "./ow.mp3")
k.loadSound("kevin1", "./kevin1.mp3")
k.loadSound("kevin2", "./kevin2.mp3")
var score = 0
var score_temp = 0
k.scene("menu", () => {
  const music = k.play("kevin1", {loop: true})
  k.setBackground(135, 62, 132)
  const btn = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(center()),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn.add([
		k.text("start"),
		k.anchor("center"),
		k.color(0, 0, 0),
	])
	btn.onHoverUpdate(() => {
		const t = time() * 10
		btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn.onHoverEnd(() => {
		btn.scale = vec2(1)
		btn.color = rgb()
	})
	btn.onClick(() => go("game"))
})
k.scene("menu and score", () => {
  music.stop()
  const music = k.play("kevin1", {loop: true})
  k.setBackground(135, 62, 132)
  const btn = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(k.width()/2, k.height()/2 - 60),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn.add([
		k.text("start"),
		k.anchor("center"),
		k.color(0, 0, 0),
	])
	const scoree = add([
	  k.rect(240, 80, { radius: 8 }),
	  k.pos(k.width()/2, k.height()/2 + 60),
	  k.anchor("center"),
	  k.outline(4),
	])
	scoree.add([
	  k.text("score:" + score_temp),
	  k.color(0,0,0),
	  k.anchor("center"),
	])
	btn.onHoverUpdate(() => {
		const t = time() * 10
		btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn.onHoverEnd(() => {
		btn.scale = vec2(1)
		btn.color = rgb()
	})
	btn.onClick(() => go("game"))
})
k.go("menu")
k.scene("game", () => {
  music.stop()
  const music = k.play("kevin2", {loop: true})
  const player = add([
    k.sprite("player"),
    k.area(),
    k.pos(k.width()/2, k.height() - 50),
    k.rotate(0),
    k.anchor("center"),
    k.scale(0.5),
  ])
  var speed = 550
  k.setBackground(135, 206, 235)
  k.onKeyDown("left", () => {
    player.move(-speed, 0)
  })
  k.onKeyDown("right", () => {
    player.move(speed, 0)
  })
  k.onUpdate("food", (food) => {
    food.move(0, speed/1.7)
    if (food.pos.y > k.height() - 80) {
      score = 0
      k.play("ow")
      go("menu and score")
    }
  })
  k.onUpdate("evil", (evil) => {
    evil.move(0, speed/1.7)
    if (evil.pos.y > k.height() - 80) {
      destroy(evil)
    }
  })
  player.onCollide("food", (food) => {
    k.play("meow", { detune: rand(-500, 500) })
    speed += 5
    score += 1
    score_temp = score
		k.destroy(food)
		k.shake(12)
	})
	player.onCollide("evil", (food) => {
    score = 0
		k.shake(12)
		k.play("ow")
		k.go("menu and score")
	})
	player.onUpdate(() => {
	  if (player.pos.x > k.width()) {
	    player.pos.x = k.width()
	  }
	  if (player.pos.x < 0) {
	    player.pos.x = 0
	  }
	})
  k.loop(0.6, () => {
    const x = rand(0, k.width())
    const y = (k.height() + 24) * -1
    const sprite = randi(1, 6)
    if (sprite == 1) {
      add([
        k.pos(x, y),
        k.sprite("apple", { width: 80, height: 80 }),
        k.anchor("center"),
        "food",
        k.area(),
      ])
    }
    if (sprite == 2) {
      add([
        k.pos(x, y),
        k.sprite("banana", { width: 80, height: 80 }),
        k.anchor("center"),
        "food",
        k.area(),
      ])
    }
    if (sprite == 3) {
      add([
        k.pos(x, y),
        k.sprite("pineapple", { width: 80, height: 80 }),
        k.anchor("center"),
        "food",
        k.area(),
      ])
    }
    if (sprite == 4) {
      add([
        k.pos(x, y),
        k.sprite("badshoe", { width: 80, height: 80 }),
        k.anchor("center"),
        "evil",
        k.area(),
      ])
    }
    if (sprite == 5) {
      add([
        k.pos(x, y),
        k.sprite("melon", { width: 80, height: 80 }),
        k.anchor("center"),
        "food",
        k.area(),
      ])
    }
  })
})
