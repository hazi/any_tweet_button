function openTweetWindow(url) {
  let height = window.screen.height;
  let width = window.screen.width;
  let left = Math.round(width / 2 - 275);
  let top = 0;
  if(height > 420) { top = Math.round(height / 2 - 210) };

  window.open(url, null, "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left=" + left + ",top=" + top)
}

function urlOptimize(url){
  let resultURL = url;

  if(resultURL.match(/^\/\//)) { resultURL = document.location.protocol + resultURL }
  if(resultURL.match(/^\//)) { resultURL = document.location.origin + resultURL }

  // optimize amazon.co.jp URL
  amazon = resultURL.match(/^(https?:\/\/)(www.)?(amazon.co.jp\/)(?:.+?\/)(dp\/.+$)/);
  if(amazon) {
    let arr = amazon.filter(Boolean)
    arr.splice(0,1)
    resultURL = arr.join('')
  }

  return resultURL
}

function getLocationURL() {
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

function getTweetButtonURL(){
  const nodeQuery = [
    'iframe.twitter-share-button-rendered[src^="http"]',
    'a[href^="https://twitter.com/intent/tweet"]',
    'a[href^="http://twitter.com/intent/tweet"]',
    'a[href^="https://twitter.com/share"]',
    'a[href^="http://twitter.com/share"]'
  ]
  const node = document.querySelector(nodeQuery.join(','));

  let url;
  if (node && node.nodeName === 'IFRAME') {
    const src = new URL(node.src);
    url = 'https://twitter.com/intent/tweet?' + src.hash.substr(1);
  } else if (node) {
    url = node.href;
  }

  return url;
}

{
  let resultURL;

  const tweetButtonURL = getTweetButtonURL();
  if (tweetButtonURL) {
    resultURL = tweetButtonURL
  } else {
    const url = urlOptimize(getLocationURL());
    const title = getTitle();
    resultURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url)
  };

  openTweetWindow(resultURL);
}
