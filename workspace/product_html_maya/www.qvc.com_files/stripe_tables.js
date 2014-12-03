/* script: strip_tables.js - version: v2.0 */
var stripe = function (sTable) {
	sTable = ("string" === typeof sTable)?get.id(sTable):sTable;
	if (sTable == undefined) return;
	var tbody = sTable.getElementsByTagName("TBODY");
	if (!tbody || tbody.length == 0) return;
	var rows = tbody[0].rows, prev = null, vr = 0; // visible rows count
	for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        prev = (i == 0) ? row : rows[i - 1];
        if (isGroupRow(prev, row)) {
            if (vr == 0) vr = 1;
            row.className = prev.className;
        } else if (row.style.display !== "none") {
            vr++; // don't stripe invisible rows
            row.className = vr % 2 == 0 ? "even" : "odd";
        }
    }
}
// compare row IDs
var isGroupRow = function (prev, row) {
    if (prev.id.length == 0 || row.id.length == 0) return false;
    var hLocR = row.id.indexOf("-"), hLocP = prev.id.indexOf("-");
    return hLocR > -1 && hLocP > -1 && row.id.substring(0, hLocR) === prev.id.substring(0, hLocP);
}