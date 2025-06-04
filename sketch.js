let farmer;
let fruits = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  farmer = new Farmer();
}

function draw() {
  background(135, 206, 235); // céu azul

  // Desenha a fazendeira
  farmer.show();
  farmer.move();

  // Adiciona novas frutas ocasionalmente
  if (frameCount % 60 === 0) { // uma fruta por segundo
    fruits.push(new Fruit());
  }

  // Atualiza e mostra as frutas
  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].fall();
    fruits[i].show();

    // Verifica colisão com a fazendeira
    if (fruits[i].y > height) {
      // fruta caiu no chão
      fruits.splice(i, 1);
    } else if (fruits[i].hits(farmer)) {
      // fruta colhida
      score++;
      fruits.splice(i, 1);
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(20);
  text('Pontuação: ' + score, 10, 30);
}

// Classe da fazendeira
class Farmer {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 60;
    this.height = 80;
  }

  show() {
    fill(139, 69, 19); // cor marrom
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    // cabeça
    fill(255, 224, 189);
    ellipse(this.x, this.y - this.height / 2 - 10, 40, 40);
    // braços
    stroke(0);
    line(this.x - this.width / 2, this.y - 20, this.x - this.width / 2 - 20, this.y + 20);
    line(this.x + this.width / 2, this.y - 20, this.x + this.width / 2 + 20, this.y + 20);
    noStroke();
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    // limitar o movimento às bordas
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }
}

// Classe da fruta
class Fruit {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 0;
    this.size = 20;
    this.speed = 3;
  }

  fall() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0); // vermelha
    ellipse(this.x, this.y, this.size);
  }

  hits(farmer) {
    // verifica se a fruta tocou a fazendeira
    let d = dist(this.x, this.y, farmer.x, farmer.y - farmer.height / 2);
    return (d < this.size / 2 + farmer.width / 2);
  }
}
