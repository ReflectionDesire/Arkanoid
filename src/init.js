const win = nw.Window.get();


const LANGS = ['en', 'ua'];
let LANG = 0;
const RESOLUTIONS = [[640, 480], [800, 600]];
let RESOLUTION = 1;
Crafty.init(win.width, win.height);
Crafty.background('black');

const DIFFS = [
  {'en': 'Novice', 'ua': 'Новачок'},
  {'en': 'Medium', 'ua': 'Середній'},
  {'en': 'Hard', 'ua': 'Профі'}
];
let DIFF = 0;

const COLORS = [
  {'en': 'Toxic', 'ua': 'Токсік'},
  {'en': 'Ukraine', 'ua': 'Україна'},
  {'en': 'default', 'ua': 'Стандарт'}
];
const DIFF_TIME = [
  {'en' : '10 seconds', 'ua' : '10 секунд'},
  {'en' : '15 seconds', 'ua' : '15 секунд'},
  {'en' : '20 seconds', 'ua' : '20 секунд'},
  {'en' : '25 seconds', 'ua' : '25 секунд'},
  {'en' : '30 seconds', 'ua' : '30 секунд'},
  {'en' : '35 seconds', 'ua' : '35 секунд'},
  {'en' : '40 seconds', 'ua' : '40 секунд'},
  {'en' : '45 seconds', 'ua' : '45 секунд'},
  {'en' : '50 seconds', 'ua' : '50 секунд'},
  {'en' : '55 seconds', 'ua' : '55 секунд'},
  {'en' : '60 seconds', 'ua' : '60 секунд'},
];
const diffTime = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
let TIME = 6;
let COLOR = 2;

const boardColors = ['#e509e1', '#0223fc', '#393a42'];
const ballColors = ['#50f404', '#ecf404', '#e0423a'];
const gameBackgrounds = ['#e4ef0b', '#0b97e8', '#2b2b27'];

const brickDX = 2;

const HPSize = 30;
const boardHeight = 10;
const boardSpeed = 300;
const bottomMargin = 520;
const HPMargin = 570;
const scoreX = 750;
const timerX = 620;
const scoreY = 580;
const wallSize = 2;
const startHP = 2;
const ballW = 400;
const ballH = 500;
const ballRadius = 20;
const fieldWidth = 8;
const fieldHeight = 6;

const brickMargin = 300;

let brickColors = ['#74cc4b', '#ccc94b', '#bf4bcc', '#4bc5cc', '#cc4b5a'];
let boardWidht = [200, 150, 70];
let ballSpeed = [300, 400, 600];
let boardX = win.width / 2, boardY = 30;

let iFeditor = false;
let score = 0;
let bricksAmount;
let hp;
let field = [];
let lvlField = [];
let startTimer = 5;
let timeLeft = 0;
let timerON = false;


for (let i = 0; i < fieldHeight; ++i) {
  lvlField[i] = [];
  for (let j = 0; j < fieldWidth; ++j) {
    lvlField[i][j] = 1;
  }
}

let lvl;
let t;

