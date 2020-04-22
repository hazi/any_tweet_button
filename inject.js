function openTweetWindow(url) {
  n = window.screen.height,
  r = window.screen.width,
  i = Math.round(r / 2 - 275),
  o = 0,
  n > 420 && (o = Math.round(n / 2 - 210)),
  window.open(url, null, "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + i + ",top=" + o)
}

function urlOptimize(url){
  let resultURL = url;

  if(url.match(/^\/\//)) { resultURL = document.location.protocol + resultURL }

  amazon = resultURL.match(/^(https?:\/\/)(www.)?(amazon.co.jp\/)(?:.+?\/)(dp\/.+$)/);
  if(amazon) {
    let arr = amazon.filter(Boolean)
    arr.splice(0,1)
    resultURL = arr.join('')
  }

  return resultURL
}

function getURL() {
  let ogURL = document.querySelector('meta[property="og:url"]');
  ogURL = ogURL && ogURL.content;

  let linkURL = document.querySelector('link[rel="canonical"]');
  linkURL = linkURL && linkURL.href;

  return [ogURL, linkURL, location.href].filter(Boolean)[0]
}

function getTitle() {
  const ogTitle = document.querySelector('meta[property="og:title"]');
  return ogTitle && ogTitle.content || document.title;
}

{
  const nodeQuery = [
    'iframe.twitter-share-button-rendered[src^="http"]',
    'a[href^="https://twitter.com/intent/tweet"]',
    'a[href^="http://twitter.com/intent/tweet"]',
    'a[href^="http://twitter.com/share"]'
  ]
  const node = document.querySelector(nodeQuery.join(','));

  let tweet;
  if (node && node.nodeName === 'IFRAME') {
    const src = new URL(node.src);
    tweet = 'https://twitter.com/intent/tweet?' + src.hash.substr(1);
  } else if (node) {
    tweet = node.href;
  } else {
    const url = urlOptimize(getURL());
    const title = getTitle();
    tweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url)
  };

  openTweetWindow(tweet);
}
