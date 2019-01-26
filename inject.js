function openTweetWindow(url){
  n = window.screen.height,
  r = window.screen.width,
  i = Math.round(r / 2 - 275),
  o = 0,
  n > 420 && (o = Math.round(n / 2 - 210)),
  window.open(url, null, "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + i + ",top=" + o)
}

{
  const nodeQuery = [
    'iframe.twitter-share-button-rendered[src^="http"]',
    'a[href^="https://twitter.com/intent/tweet"]',
    'a[href^="http://twitter.com/share"]'
  ]
  const node = document.querySelector(nodeQuery.join(','));
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  const url = ogUrl && ogUrl.content || location.href;
  const title = ogTitle && ogTitle.content || document.title;

  let tweet;
  if (node && node.nodeName === 'IFRAME') {
    const src = new URL(node.src);
    tweet = 'https://twitter.com/intent/tweet?' + src.hash.substr(1);
  } else if (node) {
    tweet = node.href;
  } else {
    tweet = 'https://twitter.com/intent/tweet?text=' + encodeURI(title + ' ' + url)
  };

  openTweetWindow(tweet);
}
