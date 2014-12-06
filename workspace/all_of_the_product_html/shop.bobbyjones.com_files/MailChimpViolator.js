
// Requires: https://github.com/ScottHamper/Cookies

app.directive('bobbyJonesMailChimpViolator', function ($log, $cookies) {
    return {
        restrict: 'A',
        link: function () {

            // Properties
            var cookieName = 'MailChimp_NextViolatorDate';
            var expirationDate = dateInNinetyDays();
            var domainName = getDomainName(window.location.hostname);

            // Driver
            angular.element(window).bind('load', function () {
                showViolatorWhenCookieIsMissingOrExpires();
            });

            // Driver logic
            function showViolatorWhenCookieIsMissingOrExpires() {
                if (!isTimeStampCookieFound() || isTimeToShowSignUpForm()) {
                    showMailChimpViolator();
                    setTimeStampCookie();
                }
                else {
                    // Pass
                }
            }
            function isTimeToShowSignUpForm() {
                return timeStampCookieInMilliseconds() <= nowInMilliseconds();
            }

            // Shadowbox logic
            function showMailChimpViolator() {
                Shadowbox.open({
                    content: '#MailChimpViolator', //content: '/Themes/BobbyJones/StaticHtml/MailChimpForm/MailChimpForm.html',
                    player: 'inline',
                    width: 390,
                    height: 305
                });
            }

            // Cookie functions
            function isTimeStampCookieFound() {
                return typeof $cookies[cookieName] !== 'undefined';
            }
            function setTimeStampCookie() {
                Cookies.set(cookieName, expirationDate.getTime(), {
                    expires: expirationDate,
                    domain: domainName
                });
            }
            function timeStampCookieInMilliseconds() {
                return parseInt($cookies[cookieName]);
            }
            function deleteTimeStampCookie() {
                Cookies.expire(cookieName);
                delete $cookies[cookieName];
            }

            // Date functions
            function dateInNinetyDays() {
                return dateAddMilliseconds(daysInMilliseconds(90));
            }
            function dateAddMilliseconds(milliseconds) {
                date = new Date();
                var ms = date.getTime() + milliseconds;
                date.setTime(ms);
                return date;
            }
            function now() {
                date = new Date();
                var ms = date.getTime();
                date.setTime(ms);
                return date;
            }
            function nowInMilliseconds() {
                return now().getTime();
            }

            // Scalars
            function daysInMilliseconds(days) {
                return days * 24 * 60 * 60 * 1000;
            }

            // Host functions
            function getDomainName(host) {
                var domainName = '';
                var dotCount = host.split('.').length - 1;
                if (dotCount > 1) {
                    var parts = host.split('.');
                    tld = parts.pop();
                    name = parts.pop();
                    domainName = name + '.' + tld;
                }
                else {
                    // One of these:
                    // Already main domain name
                    // Problem with host (e.g. dotCount <= 0)
                    // So, leave it alone
                    domainName = host;
                }
                return domainName;
            }

        }
    };
});
