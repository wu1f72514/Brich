// json version

let promiseVersion = new Promise(function (myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open('GET', './datas/version.json');
  req.onload = function () {
    if (req.status == 200) {
      myResolve(JSON.parse(req.response));
    } else {
      myReject('File not Found');
    }
  };
  req.send();
});
