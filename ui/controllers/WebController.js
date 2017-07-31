"use strict";

class WebController {
  constructor() {}

  index(req, res) {

    return res.render('index');
  }
}

module.exports = WebController;