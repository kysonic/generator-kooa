var mongoose = require('../libs/mongoose');

var <%=name%>Schema = new mongoose.Schema({

});

<%=name%>Schema.methods = {

};

var <%=name%> = mongoose.model('<%=name%>', <%=name%>Schema);

exports.<%=name%> = <%=name%>;

