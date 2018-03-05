var RESET_TEMPLATE = [
  '<style>',
  'body {',
  '  counter-reset: RESET;',
  '}',
  '</style>'
].join('\n') + '\n';

module.exports = {
  website: {
    assets: './assets',
    css: [
      'numbered-headings-website.css'
    ]
  },
  ebook: {
    assets: './assets',
    css: [
      'numbered-headings.css'
    ]
  },
  hooks: {
    'page:before': function(page) {
      var resetString = "none";
      if(page.hasOwnProperty("level")) {
        var levels = page.level.split(".");
        resetString = "";
        for(var i = 0; i < 7; i++) {
          if(i === 0) {
            resetString += "chapter " + levels[i];
          } else {
            resetString += " h" + i + " " + ((levels[i] - 1) || 0);
          }
        }
      }
      var counterReset = RESET_TEMPLATE.replace(/RESET/, resetString);
      page.content = counterReset + page.content;

      return page;
    }
  }
};
