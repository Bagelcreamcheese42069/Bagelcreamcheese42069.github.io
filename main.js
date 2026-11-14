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
var lastgame = "none"
k.scene("menu", () => {
  k.setBackground(135, 62, 132)
  const instructions = add([
    k.text("Silly Cat Game!!!", {
      transform: (idx, ch) => ({
			color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
			pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
			scale: wave(1, 1.2, time() * 3 + idx),
			angle: wave(-9, 9, time() * 3 + idx),
		  }),
		}),
    k.pos(k.width()/2 - 180, k.height()/2 - 160),
  ])
  const btn1 = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(center()),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn1.add([
		k.text("Catch Game"),
		k.anchor("center"),
		k.color(0, 0, 0),
	])
	btn1.onHoverUpdate(() => {
		const t = time() * 10
		btn1.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn1.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn1.onHoverEnd(() => {
		btn1.scale = vec2(1)
		btn1.color = rgb()
	})
	const btn2 = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(k.width()/2, k.height()/2 + 120),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn2.add([
		k.text("Flight Game"),
		k.anchor("center"),
		k.color(0, 0, 0),
	])
	btn2.onHoverUpdate(() => {
		const t = time() * 10
		btn2.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn2.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn2.onHoverEnd(() => {
		btn2.scale = vec2(1)
		btn2.color = rgb()
	})
	btn1.onClick(() => go("catchgame"))
	btn2.onClick(() => go("flightgame"))
})
k.scene("menu and score", () => {
  k.setBackground(135, 62, 132)
  const btn2 = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(k.width()/2, k.height()/2 - 180),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn2.add([
		k.text("Menu"),
		k.anchor("center"),
		k.color(0, 0, 0),
	])
	btn2.onHoverUpdate(() => {
		const t = time() * 10
		btn2.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn2.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn2.onHoverEnd(() => {
		btn2.scale = vec2(1)
		btn2.color = rgb()
	})
  const btn1 = add([
    k.rect(240, 80, { radius: 8 }),
    k.pos(k.width()/2, k.height()/2 - 60),
    k.area(),
    k.scale(1),
    k.anchor("center"),
    k.outline(4),
  ])
  btn1.add([
		k.text("Retry"),
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
	btn1.onHoverUpdate(() => {
		const t = time() * 10
		btn1.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
		btn1.scale = vec2(1.2)
		k.setCursor("pointer")
	})
	btn1.onHoverEnd(() => {
		btn1.scale = vec2(1)
		btn1.color = rgb()
	})
	btn1.onClick(() => {
	  if (lastgame == "catch") {
	    k.go("catchgame")
	  }
	  if (lastgame == "flight") {
	    k.go("flightgame")
	  }
	})
	btn2.onClick(() => go("menu"))
})
k.go("menu")
k.scene("catchgame", () => {
  lastgame = "catch"
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
      music.stop()
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
		music.stop()
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
k.scene("flightgame", () => {
  lastgame = "flight"
  k.setBackground(135, 206, 235)
  const player = add([
    k.sprite("player"),
    k.scale(0.3),
    k.area(),
    k.pos(k.width()/2 - 180, k.height()/2),
    k.rotate(90),
    k.body(),
    k.anchor("bot"),
    k.scale(0.3),
  ])
  k.setGravity(2000);
  var speed = 550
  k.onKeyPress("space", () => {
    player.jump(500)
  })
  	onClick(() => {
		player.jump(500)
	})
  player.onUpdate(() => {
		if (player.pos.y >= k.height() || player.pos.y <= -60) {
			go("menu and score")
		}
	})
	player.onCollide("evil", (food) => {
    score = 0
		k.shake(12)
		k.play("ow")
		k.go("menu and score")
	})
  	function spawnPipe() {
    const PIPE_MIN = 60
    const PIPE_OPEN = 240
		// calculate pipe positions
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1 - 20),
			color(0, 255, 122),
			outline(4),
			area(),
			move(LEFT, 320),
			"evil",
		]) 

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2 + 20),
			color(0, 255, 122),
			outline(4),
			area(),
			move(LEFT, 320),
			"evil",
			{ passed: false },
		])

	}
	onUpdate("evil", (p) => {
		// check if bean passed the pipe
		if (p.pos.x <= player.pos.x && p.passed == false) {
			score += 1
			k.play("meow", { detune: rand(-500, 500) })
			score_temp = score
			p.passed = true
		}
		if (p.pos.x <= -50) {
		  k.destroy(p)
		}
	})
	loop(1.5, () => {
		spawnPipe()
	})
})
