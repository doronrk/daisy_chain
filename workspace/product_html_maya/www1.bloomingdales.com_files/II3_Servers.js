// Copyright (C) 2004-2008 InstantService, Inc.  All rights reserved.
ii_deployment = 2;
function checkTS(){
var ii_testservers = [ 'www1.qa10codebloomingdales.fds.com','tstage2.macys.com','www1.qa16codemacys.fds.com' ];
for (var ii_idx = 0; ii_idx < ii_testservers.length; ii_idx++) 
{ if (ii_testservers[ii_idx] == document.location.host) { ii_deployment = 1; break; } } }
checkTS();
    
