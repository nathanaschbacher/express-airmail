## Overview

Express Airmail is an [Express](https://github.com/visionmedia/express)/[Connect](https://github.com/senchalabs/connect) middleware for [nodemailer](https://github.com/andris9/Nodemailer).  

This middleware was developed to make it easy to use your app's existing view engine to render your templates (jade, ejs, hbs, etc.) to HTML and send them as plain-text backed HTML emails from within your express/connect app.

## Installation

    $ npm install express-airmail

## Usage
####app.use( airmail.init( *transport, options, [defaults]* ) )

Register the middleware with your application.

```javascript
var airmail = require('express-airmail');
var app = require('express')();

var transport = "SMTP";

var options = {
    host: "nomail.nothere.org",
    port: 25,
    auth: {
        user: "whyme",
        pass: "12345123"
    }
}

var defaults = {
    from: "no-reply@nothere.org",
    cc: "admin@nothere.org",
    subect: "Is this even a good idea?"
}

app.configure(function(){
  app.use(airmail.init(transport, options, defaults));
});
```

The arguments to the `.init()` method are similar to those accepted by [nodemailer](https://github.com/andris9/Nodemailer#setting-up-a-transport-method).  The only difference is the addition of the `defaults` argument which takes an `Object` w/ properties matching those of the nodemailer [E-mail message fields](https://github.com/andris9/Nodemailer#e-mail-message-fields).  This is provided as a convenience, the message options can also be overridden at the time you send the mail message.

####res.airmail.send( *template, vars, message_opts, [callback]* )

express-airmail attaches itself to the express response object.  The `.send()` method is very similar to the `res.send()` method provided by express itself.

The first argument is the template you want to render to HTML. The second is the object containing local variables you want to pass to the template rendering enging.  The third is a set of message options for the email you want to send ([see here for field details](https://github.com/andris9/Nodemailer#e-mail-message-fields)).  The last is the optional callback that returns the `.sendMail()` results from nodemailer.

```javascript
app.get('/testmail', function(req, res) {
    res.airmail.send('index', {title: 'My Express App'}, {to: "someuser@there.com", subject: "Override the default"}, function(err, mail) {
       if(err) throw err;
       else res.end(); 
    });
});

```

## Tests

The test suite can be run by simply:

    $ cd /path/to/express-mail
    $ npm install -d
    $ npm test

## License

(The MIT License)

Copyright (c) 2012 Coradine Aviation Systems

Copyright (c) 2012 Nathan Aschbacher

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.