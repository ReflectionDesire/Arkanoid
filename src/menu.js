Crafty.scene('menu', () => {
});
Crafty.bind('SceneChange', ({newScene}) => {
  switch(newScene) {
    case 'menu':
      Menu.load('main');
      break;
    default:
      Menu.hide();
      Menu.load(newScene);
  }
});

Menu.add('main', [
  Menu.element.Text({
    'default': _ => '<div id="menu-header-main">ARKANOID</div>',
    'ua': _ => '<div id="menu-header-main">ARKANOID</div>'
  }),
 Menu.element.Button('btnPlay', {
    'default': _ => 'Play',
    'ua': _ => 'Грати'
  }, {
    'click': _ => Menu.load('play')
  }),

  Menu.element.Button('btnSettings', {
    'default': _ => 'Settings',
    'ua': _ => 'Налаштування'
  }, {
    'click': _ => Menu.load('settings')
  }),
  Menu.element.Button('btnAbout', {
    'default': _ => 'About',
    'ua': _ => 'Інфо'
  }, {
    'click': _ => Menu.load('about')
  }),
  Menu.element.Button('btnQuit', {
    'default': _ => 'Quit',
    'ua': _ => 'Вийти'
  }, {
    'click': _ => Menu.load('quit')
  }),
  Menu.element.BUTTON('btnSound', {
    'default': _ => `<img src="assets/${Crafty.settings.get('soundMuted')
      ? 'mute2'
      : 'unmute2'}.png"/>`,
  }, {
    'click': _ => {
      Crafty.settings.modify('soundMuted',
        !Crafty.settings.get('soundMuted')
      );
      Menu.reload();
    }
  }),
  Menu.element.BUTTON('btnLang', {
    'default': _ => '<img src="assets/lang-en.png"/>',
    'ua': _ => '<img src="assets/lang-ua.png"/>'
  }, {
    'click': _ => {
      ++LANG;
      LANG %= LANGS.length;
      Menu.language = LANGS[LANG];
      Menu.reload();
    }
  })
]);

Menu.add('play', [
  Menu.element.Text({
    'default': _ => 'Play',
    'ua': _ => 'Грати'
  }),
  Menu.element.text({
    'default': _ => 'Choose game mode',
    'ua': _ => 'Оберіть режим гри'
  }),
  Menu.element.button('btnPlayNoTimer', {
    'default': _ => 'Without timer',
    'ua': _ => 'Без таймеру'
  }, {
    'click': _ => {
      Crafty.scene('game');
    }
  }),
  Menu.element.button('btnPlayTimer', {
    'default': _ => 'With timer',
    'ua': _ => 'З таймером'
  }, {
    'click': _ => {
      timerON = true;
      Crafty.scene('game');
    }
  }),
  Menu.element.button('btnPlayEditor', {
    'default': _ => 'Level Editor',
    'ua': _ => 'Редактор рівнів'
  }, {
    'click': _ => Crafty.scene('editor')
  }),
  Menu.element.BUTTON('btnSettingsBack', {
    'default': _ => '<img src="assets/arrow.png"/>'
  }, {
    'click': _ => Menu.load('main')
  })
]);


Menu.add('settings', [
  Menu.element.Text({
    'default': _ => 'Settings',
    'ua': _ => 'Налаштування'
  }),
  Menu.element.button('btnSettingsSize', {
    'default': _ => `Сolor theme: ${COLORS[COLOR][Menu.language]}`,
    'ua': _ => `Кольорова тема: ${COLORS[COLOR][Menu.language]}`
  }, {
    'click': _ => {
      ++COLOR;
      COLOR %= COLORS.length;
      Menu.reload();
    }
  }),
  Menu.element.button('btnSettingsTimer', {
    'default': _ => `Time (timer mode): ${DIFF_TIME[TIME][Menu.language]}`,
    'ua': _ => `Час (режим з таймером): ${DIFF_TIME[TIME][Menu.language]}`
  }, {
    'click': _ => {
      ++TIME;
      TIME %= DIFF_TIME.length;
      startTimer = diffTime[TIME];
      Menu.reload();
    }
  }),
  Menu.element.button('btnSettingsAIDiff', {
    'default': _ => `Difficulty: ${DIFFS[DIFF][Menu.language]}`,
    'ua': _ => `Складність: ${DIFFS[DIFF][Menu.language]}`
  }, {
    'click': _ => {
      ++DIFF;
      DIFF %= DIFFS.length;
      Menu.reload();
    }
  }),
  Menu.element.BUTTON('btnSettingsBack', {
    'default': _ => '<img src="assets/arrow.png"/>'
  }, {
    'click': _ => Menu.load('main')
  })
]);

Menu.add('about', [
  Menu.element.Text({
    'default': _ => 'About & Help',
    'ua': _ => 'Інформація'
  }),
  Menu.element.Text({
    'default': _ => `The game was made by us.`,
    'ua': _ => `Арканоїд - гра для бидла`
  }),
  Menu.element.BUTTON('btnSettingsBack', {
    'default': _ => '<img src="assets/arrow.png"/>'
  }, {
    'click': _ => Menu.load('main')
  })
]);

Menu.add('quit', [
  Menu.element.Text({
    'default': _ => 'Are you sure you want to quit?',
    'ua': _ => 'Чи ви впевнені, що хочете вийти?'
  }),
  Menu.element.button('btnQuitConfirm', {
    'default': _ => 'Yes, I am!',
    'ua': _ => 'Так, я вже вирішив!'
  }, {
    'click': _ => win.close()
  }),
  Menu.element.button('btnQuitDecline', {
    'default': _ => 'Return to Menu',
    'ua': _ => 'Повернутися в меню'
  }, {
    'click': _ => Menu.load('main')
  })
]);

Menu.add('gameOver', [
  Menu.element.Text({
    'default': _ => 'Game Over',
    'ua': _ => 'Кінець гри'
  }),
  Menu.element.text({
    'default': _ => `Ur score ${score} pts`,
    'ua': _ => `Ваш рахунок ${score} pts`
  }),
  Menu.element.button('btnGameOverAgain', {
    'default': _ => 'Play Again',
    'ua': _ => 'Грати знову'
  }, {
    'click': _ => Crafty.scene('game')
  }),
  Menu.element.button('btnGameOverMenu', {
    'default': _ => 'Back to Menu',
    'ua': _ => 'Вийти в меню'
  }, {
    'click': _ => Crafty.scene('menu')
  })
]);

Menu.add('gameFinished', [
  Menu.element.Text({
    'default': _ => 'Victory!',
    'ua': _ => 'Перемога!'
  }),
  Menu.element.text({
    'default': _ => `Ur score ${score} pts`,
    'ua': _ => `Ваш рахунок ${score} pts`
  }),
  Menu.element.button('btnGameOverAgain', {
    'default': _ => 'Play Again',
    'ua': _ => 'Грати знову'
  }, {
    'click': _ => Crafty.scene('game')
  }),
  Menu.element.button('btnGameOverMenu', {
    'default': _ => 'Back to Menu',
    'ua': _ => 'Вийти в меню'
  }, {
    'click': _ => Crafty.scene('menu')
  })
]);

Menu.add('editor', [
]);

Menu.add('game', [
]);

Menu.add('pause', [
]);

Menu.load('main');

