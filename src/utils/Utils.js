const Utils = {}

Utils.setMobileChromeThemeColor = (hex="#1976D2") => {
  // to-do: integrate into folder changing
  document.querySelectorAll('[name="theme-color"]')[0].setAttribute("content",hex);
}

Utils.getURLTitle = (externalUrl) => {
  // to-do: get back to this when server is up so we can use php
  let serverURl = "serverURl",
      proxyurl = serverURl + "/getURLdetails.php?url=" + externalUrl,
      title

  fetch(proxyurl)
  .then(function(response){
    title = response.text()
  })
  .catch(function(err){
    title = undefined
  })

  return title
}

export default Utils
