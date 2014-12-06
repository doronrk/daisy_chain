// Filename: validateemail.js
// Revision History:
// 01.04.2013 - ekw - created.
// 06.18.2013 - ekw - added check for matching email address on double opt-in.
//
function validateEmail (myform, errmsg) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(AC\.UK|ASIA|AX|CAT|CD|CO\.UK|DD|EU|FIRM|GOV\.UK|JE|JOBS|LTD\.UK|ME|ME\.UK|MOBI|MOD\.UK|NET\.UK|NHS\.UK|ORG\.UK|PLC\.UK|PS|SCH\.UK|STORE|TEL|TL|TRAVEL|WEB|XXX|COM|EDU|GOV|MIL|INT|NET|ORG|BIZ|INFO|NAME|PRO|AERO|COOP|MUSEUM|ARPA|NATO|AD|AE|AF|AG|AI|AL|AM|AN|AO|AQ|AR|AS|AT|AU|AW|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CS|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|FX|GA|GB|GD|GE|GF|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IN|IO|IQ|IR|IS|IT|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NT|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PT|PW|PY|QA|RE|RO|RU|RW|SA|Sb|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TM|TN|TO|TP|TR|TT|TV|TW|TZ|UA|UG|UK|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|YU|ZA|ZM|ZR|ZW|CW|GG|IM|RS|SX|UZ)$/i;  
  
  var email1 = myform.txtEmail.value.toLowerCase();
  var email2 = myform.txtEmail2.value.toLowerCase();
  
  if(!email1.match (mailformat)) {  
	errmsg.innerHTML="Please enter a valid email address.";
	myform.txtEmail.focus();  
	return false;  
  }
  else if (email1 !== email2) {
	errmsg.innerHTML="Email addresses do not match.";
	myform.txtEmail2.focus();  
	return false;  
  }
  return true;
}
// END validateemail.js
