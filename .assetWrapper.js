const header = `
/* ==UserStyle==
@name         hackernews theme
@namespace    github.com/gpmcadam/hn-theme
@version      1.0.0
@license      unlicense
@preprocessor default
==/UserStyle== */

@-moz-document domain("news.ycombinator.com") {

`;

const footer = `
}
`;

module.exports = async ({name, bundler}) => {
  if (name.includes('.user.css') || bundler.options.development) {
    return {
      header,
      footer
    }
  }
}
