import {blue500, blue700, pink500, green500} from 'material-ui/styles/colors'


export const setMobileChromeThemeColor = (hex="#1976D2") => {
  // to-do: integrate into folder changing
  document.querySelectorAll('[name="theme-color"]')[0].setAttribute("content",hex);
}

export const THEME1 = blue500
export const THEME2 = pink500
export const THEME3 = green500

export const changeChromeThemeColor = (color) => {
  if(!color) color = THEME1
  document.querySelectorAll('[name="theme-color"]')[0].setAttribute("content", color)
}

let originalBodyOverflow,
    body = document.getElementsByTagName('body')[0]
export const lockScrolling = (lock) => {
  lock = lock === undefined || lock === true ? true : false

  if(lock){
    originalBodyOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
  }else{
    body.style.overflow = '';
  }
}

export const getURLTitle = (externalUrl) => {
  let serverURl = process.env.NODE_ENV === 'production'
  ? "./api/getURLdetails.php?url="
  // xampp apache server
  : "http://localhost/api/getURLdetails.php?url=",
      proxyurl = serverURl + externalUrl,
      title
  var promise = new Promise(function(resolve, reject) {
    fetch(proxyurl)
    .then(function(response){
      return response.text()
    })
    .then((text) => {
      title = text
      resolve(title.trim())
    })
    .catch(function(err){
      reject(err)
    })
  });

  return promise
}

export const getPageHeight = () => {
  let body = document.body,
      html = document.documentElement

  return Math.max(body.scrollHeight, body.offsetHeight,
                  html.clientHeight, html.scrollHeight, html.offsetHeight )
}
//(http(s)?://)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
export const isValidURL = (string) => ( /^(https?:\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(string) )

export const multiInstanceLog = (comp) => {
  console.log(comp._reactInternalInstance._renderedComponent && comp._reactInternalInstance._renderedComponent._hostNode)
}
