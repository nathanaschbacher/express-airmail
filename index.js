// (The MIT License)

// Copyright (c) 2012 Coradine Aviation Systems
// Copyright (c) 2012 Nathan Aschbacher

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var nodemailer = require("nodemailer");
var deepmerge = require("deepmerge");

exports.init = function(transport, transport_opts, defaults) {
    var mailer = nodemailer.createTransport(transport, transport_opts);

    var send = function send(template, vars, message_opts, _return) {
        _return = _return || function(){};

        if(template) {
            mailer.app.render(template, vars, function(err, html) {
                if(err) _return(err, null);
                else {
                    message_opts.html = html;
                    mailer.sendMail(deepmerge(defaults || {}, message_opts || {}), function(err, res) {
                        _return(err, res);
                    });
                }
            });
        }
        else {
            mailer.sendMail(deepmerge(defaults || {}, message_opts || {}), function(err, res) {
                _return(err, res);
            });
        }
    };

    return function airmail(req, res, next) {
        mailer.app = res.app;
        res.airmail = { send: send };
        next();
    };
};