
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (ClubmcLoginInfoWrapper == null) var ClubmcLoginInfoWrapper = {};
ClubmcLoginInfoWrapper._path = '/dwrShpg';
ClubmcLoginInfoWrapper.getCurrentSalesAssociate = function(callback) {
  dwr.engine._execute(ClubmcLoginInfoWrapper._path, 'ClubmcLoginInfoWrapper', 'getCurrentSalesAssociate', callback);
}
ClubmcLoginInfoWrapper.getUserNamesEmail = function(callback) {
  dwr.engine._execute(ClubmcLoginInfoWrapper._path, 'ClubmcLoginInfoWrapper', 'getUserNamesEmail', callback);
}
