var hpeuck_locales = ['en-emea_africa','fr-emea_africa','sq-al','ar-dz','fr-dz','pt-ao','es-ar','hy-am','en-au','de-at','az-az','bn-bd','ru-by','nl-be','fr-be','es-bo','bs-ba','en-bw','pt-br','bg-bg','en-ca','fr-ca','en-lamerica_nsc_carib','es-lamerica_nsc_cnt_amer','es-cl','zh-cn','es-co','fr-cg','hr-hr','el-cy','cs-cz','da-dk','es-ec','et-ee','en-et','fe-fg','fi-fi','fr-fr','ge-ge','de-de','en-gh','el-gr','en-hk','zh-hk','hu-hu','is-is','en-in','en-id','en-ie','en-il','he-il','it-it','ja-jp','ru-kz','en-ke','ko-kr','sq-ks','lv-lv','lt-lt','fr-lu','mk-mk','en-my','en-mt','en-mu','es-mx','ar-emea_middle_east','en-emea_middle_east','ro-md','sr-me','ar-ma','fr-ma','pt-mz','nl-nl','en-nz','en-ng','no-no','en-pk','es-py','es-pe','en-ph','pl-pl','pt-pt','es-pr','ro-ro','ru-ru','ar-sa','en-sa','fr-sn','sr-rs','en-sg','sk-sk','sl-si','en-za','es-es','si-lk','sv-se','fr-ch','de-ch','zh-tw','en-tz','sw-tz','en-th','th-th','ar-tn','fr-tn','tr-tr','ru-tm','en-ug','sw-ug','ru-ua','uk-ua','en-ae','en-uk','en-us','es-us','es-uy','es-ve','en-vn'];
var hpeuck_allowedLL = ['de','nl','fr','bg','hr','el','cs','da','et','fi','fr','de','el','hu','en','it','lv','lt','es','nl','pl','pt','ro','sk','sl','es','sv','en'];
var hpeuck_allowedCC = ['at','be','be','bg','hr','cy','cz','dk','ee','fi','fr','de','gr','hu','ie','it','lv','lt','mx','nl','pl','pt','ro','sk','si','es','se','uk'];
var privacyText = new Array();
privacyText[0] = new Array('1110','Unbedingt erforderlicher Cookie','Cookie zur Performance','Cookie zur Funktionalität','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Ja','Nein','Weiter','Erfahren Sie, wie wir Cookies verwenden und welche Vorteile es hat, wenn Sie "Ja" auswählen.','<p class="rtxt"><small class="small"><strong>Auf HP Websites werden Cookies für die folgenden Funktionen verwendet:</strong><br />- "Remember me" (Anmeldedaten speichern). Diese Funktion beschleunigt Ihre Anmeldung bei wiederholten Besuchen.<br />- Auf der Basis Ihrer vorherigen Angaben, die gespeichert wurden, erhalten Sie Empfehlungen für HP Produkte und Services, die auf Ihre Interessen abgestimmt sind.<br />- "Recently viewed" (Vor Kurzem angezeigt). Diese Funktion listet Ihren Browserverlauf auf und beschleunigt Ihre Suche auf dieser Site.</small></p><p class="rtxt"><small class="small"><strong>Auf anderen Websites werden Cookies von HP und den HP Partnern für die folgenden Funktionen verwendet:</strong><br />- HP und die HP Partner zeigen Werbung entsprechend Ihren Interessen an. Diese kann Angebote für die Produkte und Services von HP und den HP Partnern umfassen.</small></p>','Auf HP Websites werden Datenerfassungstools wie Cookies verwendet. Bitte teilen Sie uns mit, wie HP diese Tools einsetzen darf:','Es werden auch anonyme statistische Informationen erfasst, um die Funktionalität und Leistung der Site zu verbessern.','<small class="small">Sie können diese Einstellungen jederzeit ändern, wenn Sie unsere <a href="http://www8.hp.com/at/de/privacy/privacy.html"><small class="small">Datenschutzerklärung</small></a> aufrufen.</small><small class="small"><br />Wenn Sie auf \'WEITER\' klicken, bestätigen Sie, dass Sie die auf der linken Seite angegebenen Einstellungen für Cookies verstanden haben und mit ihnen einverstanden sind.</small>','Yes','Meine Datenschutzeinstellungen','SPEICHERN','SPEICHERN OK','','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies. Bitte geben Sie an, wie HP diese Tools verwenden soll:','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/at/de/privacy/privacy.html">Datenschutzerklärung</a> auf.','<strong>Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies.</strong><br />Sie werden verwendet, um Ihr Onlineerlebnis zu personalisieren, um HP Partnern die Anzeige von HP Werbemaßnahmen zu Ihren Interessensgebieten auf anderen Websites zu ermöglichen und um anonyme statistische Informationen zu sammeln, mit denen die Funktionalität und die Leistung der Website verbessert werden kann.','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/at/de/m/privacy/preferences.do">Datenschutzerklärung</a> auf.');

privacyText[1] = new Array('1111','Strikt noodzakelijke cookies','Prestatiecookies','Functionele cookies','Mag HP anonieme statistische informatie verzamelen om de functionaliteit en prestatie van haar website te verbeteren?','Mag HP uw ervaring op HP websites personaliseren?','Mogen HP en haar partners u aanbiedingen op andere websites tonen die u mogelijk interesseren?','Ja','Nee','Doorgaan','Leer hoe HP cookies gebruikt en ontdek hier de voordelen van.','<p class="rtxt"><small class="small"><strong>De HP-website gebruikt cookies ter ondersteuning van:</strong><br />- "Onthoud mij", waardoor u snel kunt aanmelden bij uw volgende bezoek.<br />- Het opslaan van uw interesses, zodat HP u gerichte aanbiedingen kan doen die hierop aansluiten.<br />- "Recent bekeken", dat een lijst geeft van uw navigatiegeschiedenis en het zoeken op deze website versnelt.</small></p><p class="rtxt"><small class="small"><strong>HP en haar partners gebruiken cookies op andere websites om het mogelijk te maken dat:</strong><br />- HP en onze partners reclame aanbieden die relevant is voor uw interesse. Deze kunnen populaire aanbiedingen voor producten en diensten van HP en partner.</small></p>','HP websites gebruiken tools voor gegevensverzameling zoals cookies. Laat ons weten hoe HP van deze tools gebruik mag maken:','We verzamelen ook anonieme statistische informatie om de functionaliteit en prestaties van de website te verbeteren.','<small class="small">U kunt deze instellingen te allen tijde veranderen door naar onze <a href="http://www8.hp.com/be/nl/privacy/privacy.html"><small class="small">privacyverklaring te navigeren</small></a>.</small><small class="small"><br />Door op \'DOORGAAN\' te klikken, bevestigt u dat u de instellingen voor cookies begrijpt en hiermee akkoord gaat zoals aangegeven aan de linkerzijde.</small>','Yes','Mijn Privacyvoorkeuren','OPSLAAN','OPSLAAN OK','Cookies die we vastleggen op HP.com','Mag HP anonieme statistische informatie verzamelen om de functionaliteit en prestatie van haar website te verbeteren?','Mag HP uw ervaring op HP websites personaliseren?','Mogen HP en haar partners u aanbiedingen op andere websites tonen die u mogelijk interesseren?','HP websites gebruiken programma\'s zoals cookies voor het verzamelen van data. Geef aan hoe HP deze mag gebruiken:','Klik op Doorgaan om het gebruik van cookies door HP te accepteren. U kunt uw voorkeursinstellingen wijzigen of cookies weigeren door naar onze <a href="http://www8.hp.com/be/nl/privacy/privacy.html">Privacyverklaring</a> te gaan.','<strong>HP websites gebruiken programma\'s voor het verzamelen van data, zoals cookies,</strong><br />om uw gebruikservaring specifiek op u af te stemmen, HP partners in staat te stellen op andere websites HP advertenties te tonen die aansluiten bij uw interesses en om anonieme statistische gegevens te verzamelen waarmee wij de functionaliteit en de prestaties van de website kunnen verbeteren.','Klik op Doorgaan om het gebruik van cookies door HP te accepteren. U kunt uw voorkeursinstellingen wijzigen of cookies weigeren door naar onze <a href="http://www8.hp.com/be/nl/m/privacy/preferences.do">Privacyverklaring</a> te gaan.');

privacyText[2] = new Array('1111','Cookie strictement nécessaire','Cookie de performances','Cookie de fonctionnalité','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Oui','Non','Continuer','Découvrez de quelle manière nous utilisons les cookies, ainsi que les avantages de sélectionner Oui.','<p class="rtxt"><small class="small"><strong>Les sites Web HP utilisent les cookies pour la prise en charge des fonctionnalités suivantes :</strong><br />- La fonctionnalité « Memoriser mes informations » qui vous permet de vous connecter rapidement dans le cas de visites répétées.<br />- La fonctionnalité d\'enregistrement des choix précédents permettant des recommandations pour des produits et services HP basés sur vos centres d\'intérêt.<br />- La fonctionnalité « Récemment affiché » qui répertorie votre historique de navigation et accélère vos recherches sur ce site.</small></p><p class="rtxt"><small class="small"><strong>HP et ses partenaires utilisent des cookies sur d\'autres sites afin que :</strong><br />- HP et ses partenaires puissent fournir des publicités correspondant à vos centres d\'intérêt. Ces publicités peuvent être des offres pour des produits et des services de HP et de ses partenaires.</small></p>','Les sites HP utilisent des outils de collecte de données tels que des cookies. Dites-nous de quelle manière HP peut utiliser ces outils :','Des informations de statistiques anonymes sont également collectées pour améliorer les fonctionnalités et les performances du site.','<small>Vous pouvez modifier ces paramètres à tout moment en accédant à la page de notre <a href="http://www8.hp.com/be/fr/privacy/privacy.html"><small>Déclaration de protection de la vie privée</small></a>.</small><small><br />En cliquant sur CONTINUER, vous confirmez que vous comprenez les fonctionnalités des paramètres de cookies et êtes d\'accord avec leur utilisation comme indiqué à gauche.</small>','Yes','Mes préférences de confidentialité ','ENREGISTRER','ENREGISTRER OK','Cookies que nous avons collectés sur HP.com','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Les sites Web HP utilise des outils de collecte de données comme les cookies. Veuillez nous indiquer la façon dont HP peut utiliser ces outils:','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/be/fr/privacy/privacy.html">Déclaration de confidentialité</a>.','<strong>Les sites Web HP utilise des outils de collecte de données comme les cookies</strong><br />pour personnaliser votre expérience, autoriser les partenaires HP à afficher des publicités correspondant à vos intérêts sur d\'autres sites Web et collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site.','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/be/fr/m/privacy/preferences.do">Déclaration de confidentialité</a>.');

privacyText[3] = new Array('1111','Строго задължителна бисквитка','Бисквитка за производителност','Бисквитка за функционалност','Можем ли да събираме анонимна статистическа информация, за да подобрим функционалността и производителността на сайта?','Може ли НР да персонализира вашия опит в уеб сайтовете на НР?','Може ли НР и партньорите да показват реклами, отговарящи на интересите ви, в други уеб сайтове?','Да','Не ','Продължаване','Научете как използваме бисквитките и ползите при избор на "Да".','<p class="rtxt"><small class="small"><strong>Уеб сайтовете на НР използват бисквитки за поддръжка:</strong><br />- "Запомни ме", което позволява да влизате бързо при нови посещения.<br />- Записване на предишни избори и предоставяне на препоръки за продукти и услуги на НР на базата на вашите интереси.<br />- "Наскоро прегледани", което показват списък с хронологията на браузъра и ускорява търсенето ви в този сайт.</small></p><p class="rtxt"><small class="small"><strong>НР и партньорите използват бисквитки в други уеб сайтове, за да позволят на:</strong><br />- НР и нашите партньори да предоставят реклами, свързани с вашите интереси. Това може да включва популярни оферти за продукти и услуги на НР и партньорите.</small></p>','Сайтовете на HP използват инструменти за събиране на данни като бисквитки. Кажете ни как НР може да използва тези инструменти:','Анонимна статистическа информация също така се събира, за да се подобри функционалността и производителността на сайта.','<small>Можете да промените тези настройки по всяко време, като отидете в нашата <a href="http://www8.hp.com/bg/bg/privacy/privacy.html"><small>декларация за поверителност</small></a>.</small><small><br />Щраквайки върху "ПРОДЪЛЖАВАНЕ", вие потвърждавате, че разбирате и се съгласявате с настройките за бисквитки, както е указано вляво.</small>','Yes','Моите предпочитания за поверителност','ЗАПИС','ЗАПИС OK','','Можем ли да събираме анонимна статистическа информация, за да подобрим функционалността и производителността на сайта?','Може ли НР да персонализира вашия опит в уеб сайтовете на НР?','Може ли НР и партньорите да показват реклами, отговарящи на интересите ви, в други уеб сайтове?','Уеб сайтовете на HP използват инструменти за събиране на данни, като например бисквитки. Кажете ни как НР може да използва тези инструменти:','Щракнете върху "Продължаване", за да се съгласите с използването на бисквитки от страна на НР. За да промените предпочитанията си или за да се отпишете, отидете към нашата <a href="http://www8.hp.com/bg/bg/privacy/privacy.html">Декларация за поверителност</a>.','<strong>Уеб сайтовете на HP използват инструменти за събиране на данни, като например бисквитки,</strong><br />за да персонализират начина ви на използване, за да позволят на партньорите на НР да показват реклами на НР, отговарящи на вашите интереси, в други сайтове, както и за да събират анонимна статистическа информация с цел да се подобри производителността и функционалността на сайта.','Щракнете върху "Продължаване", за да се съгласите с използването на бисквитки от страна на НР. За да промените предпочитанията си или за да се отпишете, отидете към нашата <a href="http://www8.hp.com/bg/bg/m/privacy/preferences.do">Декларация за поверителност</a>.');

privacyText[4] = new Array('1110','Nužan kolačić','Kolačić za bolje performanse','Kolačić za omogućivanje funkcija','Možemo li prikupljati anonimne statističke podatke radi poboljšanja funkcionalnosti i performansi web-mjesta?','Može li HP personalizirati vaše iskustvo na svojim web-mjestima?','Smiju li HP i partneri prikazivati oglase koji odgovaraju vašim interesima na drugim web-mjestima?','Da','Ne','Nastavi','Saznajte kako koristimo kolačiće i prednosti odabira mogućnosti Da.','<p class="rtxt"><small class="small"><strong>HP-ova web-mjesta koriste kolačiće kao podršku za sljedeće:</strong><br />- "Zapamti me", što omogućuje brzu prijavu prilikom ponovljenih posjeta<br />- Spremanje prethodnih izbora i preporučivanje HP-ovih proizvoda i usluga na temelju vaših interesa<br />- "Nedavno prikazano", što omogućuje prikaz popisa povijesti pregledavanja i ubrzava pretraživanje web-mjesta</small></p><p class="rtxt"><small class="small"><strong>HP i partneri koriste kolačiće na drugim web-mjestima da bi omogućili sljedeće:</strong> <br />- plasman reklamnih oglasa HP-a i njegovih partnera koji odgovaraju vašim interesima; to može uključivati posebne ponude HP-ovih proizvoda i servisa ili proizvoda i servisa HP-ovih partnera.</small></p>','HP-ova web-mjesta koriste alate za prikupljanje podataka, npr. kolačiće. Recite nam kako HP smije koristiti te alate:','Prikupljaju se i anonimni statistički podaci radi poboljšanja funkcionalnosti i performansi web-mjesta.','<small class="small">Te postavke možete promijeniti u bilo kojem trenutku putem Izjave o <a href="http://www8.hp.com/hr/hr/privacy/privacy.html"><small class="small">zaštiti privatnosti</small></a>.</small><small class="small"><br />Kad kliknete "NASTAVI", potvrđujete da razumijete postavke za kolačiće kako su navedene lijevo i pristajete na njih.</small>','Yes','Moje preference za zaštitu privatnosti','SPREMI','SPREMI OK','Kolačići prikupljeni na web-mjestu HP.com','Možemo li prikupljati anonimne statističke podatke radi poboljšanja funkcionalnosti i performansi web-mjesta?','Može li HP personalizirati vaše iskustvo na svojim web-mjestima?','Smiju li HP i partneri prikazivati oglase koji odgovaraju vašim interesima na drugim web-mjestima?','HP-ova web-mjesta koriste alate za prikupljanje podataka, npr. kolačiće. Recite nam kako HP smije koristiti te alate:','Kliknite Nastavi da biste pristali na HP-ovo korištenje kolačića. Da biste u promijenili preference ili otkazali uslugu, pročitajte našu izjavu o <a href="http://www8.hp.com/hr/hr/privacy/privacy.html">zaštiti privatnosti</a>.','<strong>HP-ova web-mjesta koriste alate za prikupljanje podataka, npr. kolačiće,</strong><br />za prilagodbu okruženja, omogućivanje HP-ovim partnerima prikaza HP-ovih oglasa na drugim web-mjestima u skladu s vašim interesima te prikupljanje anonimnih statističkih podataka radi poboljšavanja funkcija i performansi web-mjesta.','Kliknite Nastavi da biste pristali na HP-ovo korištenje kolačića. Da biste u promijenili preference ili otkazali uslugu, pročitajte našu izjavu o <a href="http://www8.hp.com/hr/hr/m/privacy/preferences.do">zaštiti privatnosti</a>.');

privacyText[5] = new Array('1110','Αυστηρά απαραίτητο cookie','Cookie απόδοσης','Cookie λειτουργίας','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Ναι','Όχι','Συνέχεια','Μάθετε πώς χρησιμοποιούμε τα cookie και τα πλεονεκτήματα που έχετε επιλέγοντας "Ναι".','<p class="rtxt"><small class="small"><strong>Οι τοποθεσίες web της HP χρησιμοποιούν τα cookie για να υποστηρίξουν τις παρακάτω λειτουργίες:</strong><br />- "Απομνημόνευση", για γρήγορη σύνδεση σε τοποθεσίες που επισκέπτεστε συχνά.<br />- Αποθήκευση των προηγούμενων επιλογών σας και προτάσεις για προϊόντα και υπηρεσίες HP σύμφωνα με τα ενδιαφέροντά σας.<br />- "Πρόσφατες προβολές", για τη δημιουργία λίστας του ιστορικού αναζήτησης και γρηγορότερη αναζήτηση στη συγκεκριμένη τοποθεσία.</small></p><p class="rtxt"><small class="small"><strong>Η HP και οι συνεργάτες της χρησιμοποιούν τα cookie σε άλλες τοποθεσίες web προκειμένου:</strong><br />- Η HP και οι συνεργάτες της να προβάλουν διαφημίσεις βάσει των ενδιαφερόντων σας. Σε αυτές μπορούν να περιλαμβάνονται δημοφιλείς προσφορές προϊόντων και υπηρεσιών της HP και των συνεργατών της.</small></p>','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie. Πείτε μας με ποιον τρόπο μπορεί η HP να χρησιμοποιεί αυτά τα εργαλεία:','Γίνεται επίσης συλλογή ανώνυμων στατιστικών δεδομένων για τη βελτίωση της λειτουργικότητας και της απόδοσης των τοποθεσιών.','<small>Μπορείτε να αλλάξετε αυτές τις ρυθμίσεις οποιαδήποτε στιγμή μεταβαίνοντας στη <a href="http://www8.hp.com/cy/el/privacy/privacy.html"><small>Δήλωση απορρήτου</small></a>.</small><small><br />Επιλέγοντας "ΣΥΝΕΧΕΙΑ" επιβεβαιώνετε ότι κατανοείτε και συμφωνείτε με τις ρυθμίσεις cookie όπως εμφανίζονται αριστερά.</small>','Yes','Προτιμήσεις ιδιωτικού απορρήτου','ΑΠΟΘΗΚΕΥΣΗ','ΑΠΟΘΗΚΕΥΣΗ OK','Cookie που συλλέγουμε στην τοποθεσία HP.com','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie. Πείτε μας πώς μπορεί η HP να χρησιμοποιήσει αυτά τα εργαλεία:','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/cy/el/privacy/privacy.html">Δήλωση απορρήτου</a>.','<strong>Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie,</strong><br />για εξατομίκευση της εμπειρίας σας, για να μπορούν οι συνεργάτες της HP να προβάλλουν διαφημίσεις της HP που ταιριάζουν στα ενδιαφέροντά σας σε άλλες τοποθεσίες web και για να συλλέγουν ανώνυμες στατιστικές πληροφορίες που βελτιώνουν της λειτουργικότητα και την απόδοση της τοποθεσίας.','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/cy/el/m/privacy/preferences.do">Δήλωση απορρήτου</a>.');

privacyText[6] = new Array('1111','Jednoznačně nezbytný soubor cookie','Soubor cookie pro výkon','Soubor cookie pro funkčnost','Můžeme shromažďovat anonymní statistické údaje, které zlepšují funkce a výkon webových stránek?','Může společnost HP přizpůsobovat své stránky vašim potřebám?','Mohou vám společnost HP a její partneři zobrazovat na jiných webových stránkách reklamy přizpůsobené vašim zájmům?','Ano','Ne','Pokračovat','Zjistěte, jak používáme soubory cookie a jaké jsou výhody zvolení možnosti Ano.','<p class="rtxt"><small class="small"><strong>Webové stránky společnosti HP používají soubory cookie k podpoře následujících funkcí:</strong><br />- „Zapamatovat“ – funkce sloužící k rychlému přihlášení při opakovaných návštěvách,<br />- ukládání předchozích voleb a doporučování produktů či služeb společnosti HP na základě vašich zájmů,<br />- „Nedávno zobrazené“ – funkce zobrazující historii procházení, která urychluje vaše hledání na těchto stránkách.</small></p><p class="rtxt"><small class="small"><strong>Společnost HP a její partneři používají soubory cookie, aby</strong><br />- mohli poskytovat reklamy související s vašimi zájmy. Mezi tyto reklamy mohou patřit populární nabídky produktů a služeb společnosti HP nebo jejích partnerů.</small></p>','Webové stránky společnosti HP používají nástroje pro shromažďování dat, jako jsou soubory cookie. Sdělte nám, jak může společnost HP tyto nástroje používat:','Shromažďování anonymních statistických údajů také umožňuje zlepšovat funkce a výkon webových stránek.','<small>Tato nastavení můžete kdykoli změnit v našem <a href="http://www8.hp.com/cz/cs/privacy/privacy.html"><small>Prohlášení o ochraně soukromí</small></a>.</small><small><br />Klepnutím na tlačítko „POKRAČOVAT“ potvrdíte, že jste srozuměni s nastaveními souborů cookie uvedenými nalevo a že s nimi souhlasíte.</small>','Yes','Moje předvolby ochrany soukromí','ULOŽIT','ULOŽIT OK','Soubory cookie, které shromažďujeme na stránkách HP.com','Můžeme shromažďovat anonymní statistické údaje, které zlepšují funkce a výkon webových stránek?','Může společnost HP přizpůsobovat své stránky vašim potřebám?','Mohou vám společnost HP a její partneři zobrazovat na jiných webových stránkách reklamy přizpůsobené vašim zájmům?','Webové stránky společnosti HP používají nástroje pro shromažďování dat, jako jsou soubory cookie. Sdělte nám, jak může společnost HP tyto nástroje používat:','Kliknutím na možnost Pokračovat vyjádříte svůj souhlas s použitím souborů cookie společností Google. Pokud budete chtít změnit související předvolby, nebo se rozhodnete zrušit svůj souhlas, přejděte k části <a href="http://www8.hp.com/cz/cs/privacy/privacy.html">Prohlášení o ochraně soukromí</a>.','<strong>Webové stránky společnosti HP používají nástroje pro shromažďování dat, jako jsou soubory cookie.</strong><br />S jejich pomocí se vám přizpůsobují, umožňují partnerům společnosti HP zobrazovat na jiných webových stránkách reklamy na produkty společnosti HP a shromažďují anonymní statistické informace, které slouží ke zlepšování jejich funkcí a výkonu.','Kliknutím na možnost Pokračovat vyjádříte svůj souhlas s použitím souborů cookie společností Google. Pokud budete chtít změnit související předvolby, nebo se rozhodnete zrušit svůj souhlas, přejděte k části <a href="http://www8.hp.com/cz/cs/m/privacy/preferences.do">Prohlášení o ochraně soukromí</a>.');

privacyText[7] = new Array('1111','Strengt nødvendig cookie','Ydeevne-cookie','Funktionalitets-cookie','Må vi indsamle anonyme statistiske oplysninger for at forbedre websitets funktionalitet og ydeevne?','Må HP personalisere din oplevelse på HP\'s websites?','Må HP og partnere vise reklamer, som du kunne have interesse i, på andre websites?','Ja','Nej','Fortsæt','Få mere at vide om, hvordan vi bruger cookies og fordelene ved at vælge Ja.','<p class="rtxt"><small class="small"><strong>HP\'s websites bruger cookies for at understøtte:</strong><br />- "Husk mig", som giver dig mulighed for hurtigt at logge på ved efterfølgende besøg.<br />- Lagring af dine tidligere valg og levering af anbefalinger til HP produkter og services, som du har vist interesse for.<br />- "Set for nylig", som viser din browserhistorik og gør søgninger på dette website hurtigere.</small></p><p class="rtxt"><small class="small"><strong>HP og partnere bruger cookies på andre websites for at tillade, at:</strong><br />- HP og vores partnere kan levere reklamer, du kan vaere interesseret i. De kan indeholde populære tilbud på produkter og services fra HP og partnere.</small></p>','HP\'s websites bruger dataindsamlingsværktøjer som cookies. Fortæl os, hvordan HP må bruge disse værktøjer:','Anonyme statistiske oplysninger indsamles også for at forbedre websitets funktionalitet og ydeevne.','<small>Du kan ændre disse indstillinger på et hvilket som helst tidspunkt ved at gå til vores <a href="http://www8.hp.com/dk/da/privacy/privacy.html"><small>Fortrolighedserklæring</small></a>.</small><small><br />Når du klikker på "FORTSÆT", bekræfter du, at du har forstået og accepterer den cookieindstillinger, der er angivet til venstre.</small>','Yes','Mine fortrolighedspræferencer','GEM','GEM OK','Cookies, som vi indhenter på HP.com','Må vi indsamle anonyme statistiske oplysninger for at forbedre websitets funktionalitet og ydeevne?','Må HP personalisere din oplevelse på HP\'s websites?','Må HP og partnere vise reklamer, som du kunne have interesse i, på andre websites?','HP\'s hjemmesider bruger dataindsamlingsværktøjer såsom cookies. Fortæl os venligt, hvordan HP må bruge disse værktøjer:','Klik på fortsæt for at give HP lov til at bruge cookies. Se vores <a href="http://www8.hp.com/dk/da/privacy/privacy.html">fortrolighedserklæring</a> for at ændre indstillinger eller melde fra.','<strong>HP\'s hjemmesider bruger dataindsamlingsværktøjer såsom cookies,</strong><br />Lad HP\'s partnere vise reklamer, der er i overensstemmelse med dine interesser på andre websteder for at gøre oplevelsen mere personlig og for at indsamle anonym statistik til at forbedre sidens funktionalitet.','Klik på fortsæt for at give HP lov til at bruge cookies. Se vores <a href="http://www8.hp.com/dk/da/m/privacy/preferences.do">fortrolighedserklæring</a> for at ændre indstillinger eller melde fra.');

privacyText[8] = new Array('1111','Hädavajalik küpsis','Sooritusega seotud küpsis','Funktsioonidega seotud küpsis','Kas me võime koguda anonüümseid statistilisti andmeid, et tõhustada lehe funktsionaalsust ja paremat toimimist?','Kas HP võib teie jaoks veebilehti personaliseerida?','Kas HP ja partnerid võivad edastada teile huvipakkuvaid reklaame teistelt veebilehtedelt?','Jah','Ei','Jätka','Lugege, kuidas me kasutame küpsiseid (cookies) ja mis eeliseid annab nendega nõustumine.','<p class="rtxt"><small class="small"><strong>HP veebilehtedel kasutatakse küpsiseid (cookies) selleks, et toetada:</strong><br />- funktsiooni "Mäleta mind", mis võimaldab korduval sisenemisel kiiremini sisse logida;<br />- eelmiste valikute salvestamist ning soovitada HP tooteid ja teenuseid vastavalt teie huvidele;<br />- funktsiooni "Hiljuti vaadatud", mis salvestab teie sirvimisajaloo ja kiirendab otsingut sellel lehel.</small></p><p class="rtxt"><small class="small"><strong>HP ja partnerid kasutavad küpsiseid (cookies) muudel veebilehtedel selleks, et:</strong><br />- HP ja partnerid saaks edastada teie huvidele kohandatud reklaami. Need võivad hõlmata populaarseid pakkumisi HP ja partnerite toodetele ja teenustele.</small></p>','HP lehtedel kasutatakse andmekogumistööriistu nagu küpsised (cookies). Kirjeldage, kuidas HP võib neid tööriistu kasutada:','Veebilehe funktsionaalsuse ja parema toimimise täiustamiseks kogutakse anonüümselt statistilisi andmeid.','<small>Te võite neid seadistusi igal ajal muuta - selleks minge meie <a href="http://www8.hp.com/ee/et/privacy/privacy.html"><small>privaatsuspoliitika</small></a> lehele.</small><small><br />Kui mõistate küpsiste (cookies) olemust ja nõustute nende seadistusega nagu vasakul näidatud, klõpsake "JÄTKA".</small>','Yes','Minu privaatsuseelistused','SALVESTA','SALVESTA OK','Küpsised (cookies), mida kasutatakse veebilehel HP.com','Kas me võime koguda anonüümseid statistilisti andmeid, et tõhustada lehe funktsionaalsust ja paremat toimimist?','Kas HP võib teie jaoks veebilehti personaliseerida?','Kas HP ja partnerid võivad edastada teile huvipakkuvaid reklaame teistelt veebilehtedelt?','HP veebisaidis kasutavad andmekogumisriistu, nagu küpsised. Palun öelge meile, kuidas HP tohiks neid tööriistu kasutada:','Klõpsake jätka, et nõustuda HP küpsisekasutusega. Eelsituste muutmiseks või nendest lahti ütlemiseks minge meie <a href="http://www8.hp.com/ee/et/privacy/privacy.html">Privaatsuspoliitika lehele</a>.','<strong>HP veebisaidis kasutavad andmekogumisriistu, nagu küpsised.</strong><br />Lubage oma kogemuse isikupärastamiseks HP partneritel näidata teie huvidele vastavaid reklaame teistel veebisaitidel ja koguda anonüümset statistilist teavet saidi funktsionaalsuse ning jõudluse parandamiseks.','Klõpsake jätka, et nõustuda HP küpsisekasutusega. Eelsituste muutmiseks või nendest lahti ütlemiseks minge meie <a href="http://www8.hp.com/ee/et/m/privacy/preferences.do">Privaatsuspoliitika lehele</a>.');

privacyText[9] = new Array('1111','Ehdottoman tarpeellinen eväste','Suorituskykyyn liittyvä eväste','Toiminnallisuuteen liittyvä eväste','Saako HP kumppaneineen kerätä nimettömiä tilastotietoja ja näin parantaa sivuston toiminnallisuutta ja tehokkuutta?','Saako HP muokata HP-verkkosivujen käyttökokemustasi?','Saako HP kumppaneineen näyttää mainoksia, jotka vastaavat kiinnostuksenkohteitasi muilla web-sivustoilla?','Kyllä','Ei','Jatka','Tutustu tapaan, jolla HP käyttää evästeitä, ja miksi kannattaa valita Kyllä.','<p class="rtxt"><small class="small"><strong>HP:n sivustoilla käytetään evästeitä seuraavien tukemiseksi:</strong><br />- Muista käyttäjätiedot, jonka avulla voit kirjautua nopeasti käydessäsi uudelleen.<br />- Käyttäjän aiempien valintojen tallentaminen ja HP:n tuotteita koskevien suositusten antaminen käyttäjän kiinnostuksenkohteiden perusteella.<br />- Viimeksi näytetyt, mikä näyttää selaushistorian ja nopeuttaa hakuja tällä sivustolla.</small></p><p class="rtxt"><small class="small"><strong>HP kumppaneineen käyttävät evästeitä muilla sivustoilla, jotta:</strong><br />- HP ja sen kumppanit voivat näyttää mainoksia, jotka vastaavat käyttäjän kiinnostuksen kohteita. Näitä voivat olla mm. suositut HP:n ja sen kumppaneiden tuotteita ja palveluita koskevat tarjoukset.</small></p>','HP-sivustot käyttävät tietojen keräämiseen mm. evästeitä. Ilmoita, miten annat HP:n käyttää näitä työkaluja:','Myös tilastotietoja kerätään nimettömästi, millä pyritään sivuston toiminnallisuuden ja tehokkuuden parantamiseen.','<small>Voit muuttaa näitä asetuksia milloin tahansa valitsemalla <a href="http://www8.hp.com/fi/fi/privacy/privacy.html"><small>HP:n tietosuojaselosteen</small></a>.</small><small><br />Valitsemalla JATKA käyttäjä vahvistaa ymmärtäneensä ja hyväksyvänsä evästeiden käytön tavoin, jotka on määritelty vasemmalla.</small>','Yes','Omat yksityisyysasetukset','TALLENNA','TALLENNUS OK','HP.com-sivustolla käytettävät evästeet','Saako HP kumppaneineen kerätä nimettömiä tilastotietoja ja näin parantaa sivuston toiminnallisuutta ja tehokkuutta?','Saako HP muokata HP-verkkosivujen käyttökokemustasi?','Saako HP kumppaneineen näyttää mainoksia, jotka vastaavat kiinnostuksenkohteitasi muilla web-sivustoilla?','HP:n verkkosivustoilla käytetään tiedonkeruutyökaluja, kuten evästeitä. Tietoa siitä, kuinka HP voi käyttää näitä työkaluja:','Hyväksy HP:n evästeet valitsemalla Jatka. <a href="http://www8.hp.com/fi/fi/privacy/privacy.html">Tietosuojailmoitus-sivulla</a> voit muuttaa asetuksia tai kieltää evästeiden käytön.','<strong>HP:n verkkosivustoilla käytetään tiedonkeruutyökaluja, kuten evästeitä,</strong><br />joilla mukautetaan sivuston käyttökokemusta, annetaan HP:n kumppaneille mahdollisuus tuoda näkyviin kiinnostavia HP:n mainoksia ja kerätään anonyymejä tilastotietoja sivuston toimintojen ja toimivuuden parantamiseksi.','Hyväksy HP:n evästeet valitsemalla Jatka. <a href="http://www8.hp.com/fi/fi/m/privacy/preferences.do">Tietosuojailmoitus-sivulla</a> voit muuttaa asetuksia tai kieltää evästeiden käytön.');

privacyText[10] = new Array('1111','Cookie strictement nécessaire','Cookie de performances','Cookie de fonctionnalité','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Oui','Non','Continuer','Découvrez de quelle manière nous utilisons les cookies, ainsi que les avantages de sélectionner Oui.','<p class="rtxt"><small class="small"><strong>Les sites Web HP utilisent les cookies pour la prise en charge des fonctionnalités suivantes :</strong><br />- La fonctionnalité « Memoriser mes informations » qui vous permet de vous connecter rapidement dans le cas de visites répétées.<br />- La fonctionnalité d\'enregistrement des choix précédents permettant des recommandations pour des produits et services HP basés sur vos centres d\'intérêt.<br />- La fonctionnalité « Récemment affiché » qui répertorie votre historique de navigation et accélère vos recherches sur ce site.</small></p><p class="rtxt"><small class="small"><strong>HP et ses partenaires utilisent des cookies sur d\'autres sites afin que :</strong><br />- HP et ses partenaires puissent fournir des publicités correspondant à vos centres d\'intérêt. Ces publicités peuvent être des offres pour des produits et des services de HP et de ses partenaires.</small></p>','Les sites HP utilisent des outils de collecte de données tels que des cookies. Dites-nous de quelle manière HP peut utiliser ces outils :','Des informations de statistiques anonymes sont également collectées pour améliorer les fonctionnalités et les performances du site.','<small>Vous pouvez modifier ces paramètres à tout moment en accédant à la page de notre <a href="http://www8.hp.com/fr/fr/privacy/privacy.html"><small>Déclaration de protection de la vie privée</small></a>.</small><small><br />En cliquant sur CONTINUER, vous confirmez que vous comprenez les fonctionnalités des paramètres de cookies et êtes d\'accord avec leur utilisation comme indiqué à gauche.</small>','Yes','Mes préférences de confidentialité ','ENREGISTRER','ENREGISTRER OK','Cookies que nous avons collectés sur HP.com','Pouvons-nous collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site ?','Est-ce que HP peut personnaliser votre expérience sur les sites Web HP ?','Est-ce que HP et ses partenaires peuvent afficher des publicités correspondant à vos centres d\'intérêt sur d\'autres sites Web ?','Les sites Web HP utilise des outils de collecte de données comme les cookies. Veuillez nous indiquer la façon dont HP peut utiliser ces outils:','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/fr/fr/privacy/privacy.html">Déclaration de confidentialité</a>.','<strong>Les sites Web HP utilise des outils de collecte de données comme les cookies</strong><br />pour personnaliser votre expérience, autoriser les partenaires HP à afficher des publicités correspondant à vos intérêts sur d\'autres sites Web et collecter des informations statistiques anonymes pour améliorer les fonctionnalités et les performances du site.','Cliquez sur Continuer pour accepter l\'utilisation des cookies par HP. Pour modifier vos paramètres ou vous désengager, accédez à notre <a href="http://www8.hp.com/fr/fr/m/privacy/preferences.do">Déclaration de confidentialité</a>.');

privacyText[11] = new Array('1110','Unbedingt erforderlicher Cookie','Cookie zur Performance','Cookie zur Funktionalität','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Ja','Nein','Weiter','Erfahren Sie, wie wir Cookies verwenden und welche Vorteile es hat, wenn Sie "Ja" auswählen.','<p class="rtxt"><small class="small"><strong>Auf HP Websites werden Cookies für die folgenden Funktionen verwendet:</strong><br />- "Remember me" (Anmeldedaten speichern). Diese Funktion beschleunigt Ihre Anmeldung bei wiederholten Besuchen.<br />- Auf der Basis Ihrer vorherigen Angaben, die gespeichert wurden, erhalten Sie Empfehlungen für HP Produkte und Services, die auf Ihre Interessen abgestimmt sind.<br />- "Recently viewed" (Vor Kurzem angezeigt). Diese Funktion listet Ihren Browserverlauf auf und beschleunigt Ihre Suche auf dieser Site.</small></p><p class="rtxt"><small class="small"><strong>Auf anderen Websites werden Cookies von HP und den HP Partnern für die folgenden Funktionen verwendet:</strong><br />- HP und die HP Partner zeigen Werbung entsprechend Ihren Interessen an. Diese kann Angebote für die Produkte und Services von HP und den HP Partnern umfassen.</small></p>','Auf HP Websites werden Datenerfassungstools wie Cookies verwendet. Bitte teilen Sie uns mit, wie HP diese Tools einsetzen darf:','Es werden auch anonyme statistische Informationen erfasst, um die Funktionalität und Leistung der Site zu verbessern.','<small>Sie können diese Einstellungen jederzeit ändern, wenn Sie unsere <a href="http://www8.hp.com/de/de/privacy/privacy.html"><small>Datenschutzerklärung</small></a> aufrufen.</small><small><br />Wenn Sie auf \'WEITER\' klicken, bestätigen Sie, dass Sie die auf der linken Seite angegebenen Einstellungen für Cookies verstanden haben und mit ihnen einverstanden sind.</small>','Yes','Meine Datenschutzeinstellungen','SPEICHERN','SPEICHERN OK','','Dürfen wir anonyme statistische Informationen erfassen, um die Funktionalität und Leistung der Site zu verbessern?','Darf HP Ihr Weberlebnis auf HP Websites personalisieren?','Dürfen HP und die HP Partner Ihnen auf anderen Websites auf Ihre Interessen abgestimmte Werbung anzeigen?','Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies. Bitte geben Sie an, wie HP diese Tools verwenden soll:','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/de/de/privacy/privacy.html">Datenschutzerklärung</a> auf.','<strong>Auf HP Websites werden Tools für Datensammlungen verwendet, z. B. Cookies.</strong><br />Sie werden verwendet, um Ihr Onlineerlebnis zu personalisieren, um HP Partnern die Anzeige von HP Werbemaßnahmen zu Ihren Interessensgebieten auf anderen Websites zu ermöglichen und um anonyme statistische Informationen zu sammeln, mit denen die Funktionalität und die Leistung der Website verbessert werden kann.','Klicken Sie auf "Weiter", wenn Sie der Verwendung von Cookies durch HP zustimmen. Wenn Sie Ihre bevorzugten Einstellungen ändern oder die Genehmigung rückgängig machen möchten, rufen Sie unsere <a href="http://www8.hp.com/de/de/m/privacy/preferences.do">Datenschutzerklärung</a> auf.');

privacyText[12] = new Array('1111','Αυστηρά απαραίτητο cookie','Cookie απόδοσης','Cookie λειτουργίας','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Ναι','Όχι','Συνέχεια','Μάθετε πώς χρησιμοποιούμε τα cookies, καθώς και τα πλεονεκτήματα που έχετε επιλέγοντας "Ναι".','<p class="rtxt"><small class="small"><strong>Οι τοποθεσίες web της HP χρησιμοποιούν cookies για να υποστηρίξουν τις παρακάτω λειτουργίες:</strong><br />- "Απομνημόνευση", για γρήγορη σύνδεση σε τοποθεσίες που επισκέπτεστε συχνά.<br />- Αποθήκευση των προηγούμενων επιλογών σας και προτάσεις για προϊόντα και υπηρεσίες HP σύμφωνα με τα ενδιαφέροντά σας.<br />- "Πρόσφατες προβολές", για τη δημιουργία λίστας του ιστορικού αναζήτησης και γρηγορότερη αναζήτηση στη συγκεκριμένη τοποθεσία.</small></p><p class="rtxt"><small class="small"><strong>Η HP και οι συνεργάτες της χρησιμοποιούν τα cookies σε άλλες τοποθεσίες web προκειμένου:</strong><br />- Η HP και οι συνεργάτες της να προβάλουν διαφημίσεις βάσει των ενδιαφερόντων σας. Σε αυτές μπορούν να περιλαμβάνονται δημοφιλείς προσφορές προϊόντων και υπηρεσιών της HP και των συνεργατών της.</small></p>','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookies. Πείτε μας με ποιον τρόπο μπορεί η HP να χρησιμοποιεί αυτά τα εργαλεία:','Γίνεται επίσης συλλογή ανώνυμων στατιστικών δεδομένων για τη βελτίωση της λειτουργικότητας και της απόδοσης των τοποθεσιών.','<small>Μπορείτε να αλλάξετε αυτές τις ρυθμίσεις οποιαδήποτε στιγμή μεταβαίνοντας στη <a href="http://www8.hp.com/gr/el/privacy/privacy.html"><small>Δήλωση απορρήτου</small></a>.</small><small><br />Επιλέγοντας "ΣΥΝΕΧΕΙΑ" επιβεβαιώνετε ότι κατανοείτε και συμφωνείτε με τις ρυθμίσεις cookies όπως εμφανίζονται αριστερά.</small>','Yes','Προτιμήσεις ιδιωτικού απορρήτου','ΑΠΟΘΗΚΕΥΣΗ','ΑΠΟΘΗΚΕΥΣΗ OK','Cookies που συλλέγουμε στην τοποθεσία HP.com','Μπορούμε να συλλέγουμε ανώνυμα στατιστικά δεδομένα για τη βελτίωση της λειτουργικότητας και της απόδοσης της τοποθεσίας;','Μπορεί η HP να εξατομικεύσει την εμπειρία σας στις τοποθεσίες web της HP;','Μπορούν η HP και οι συνεργάτες της να προβάλουν διαφημίσεις σύμφωνα με τα ενδιαφέροντά σας σε άλλες τοποθεσίες web;','Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie. Πείτε μας πώς μπορεί η HP να χρησιμοποιήσει αυτά τα εργαλεία:','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/gr/el/privacy/privacy.html">Δήλωση απορρήτου</a>.','<strong>Οι τοποθεσίες web της HP χρησιμοποιούν εργαλεία συλλογής δεδομένων, όπως cookie,</strong><br />για εξατομίκευση της εμπειρίας σας, για να μπορούν οι συνεργάτες της HP να προβάλλουν διαφημίσεις της HP που ταιριάζουν στα ενδιαφέροντά σας σε άλλες τοποθεσίες web και για να συλλέγουν ανώνυμες στατιστικές πληροφορίες που βελτιώνουν της λειτουργικότητα και την απόδοση της τοποθεσίας.','Κάντε κλικ στο κουμπί "Συνέχεια" για να συναινέσετε στη χρήση των cookie από την HP. Για να αλλάξετε τις προτιμήσεις σας ή να αναιρέσετε τη συγκατάθεσή σας, μεταβείτε στη <a href="http://www8.hp.com/gr/el/m/privacy/preferences.do">Δήλωση απορρήτου</a>.');

privacyText[13] = new Array('1111','Feltétlenül szükséges cookie','Teljesítménnyel kapcsolatos cookie','Funkcióval kapcsolatos cookie','Gyűjthetünk névtelen statisztikai információkat a weboldal funktionalitásának és teljesítményének növelése érdekében?','Személyre szabhatja a HP az Ön élményét a HP weboldalakon?','Megjeleníthet a HP és partnerei Önt érdeklő hirdetéseket más weboldalakon?','Igen','Nem','Tovább','Ismerje meg, hogyan használjuk a cookie-kat, és mik az előnyei, ha az Igen lehetőséget választja.','<p class="rtxt"><small class="small"><strong>A HP webhelyek cookie-kat használnak a következő funkciók támogatására:</strong><br />- „Emlékezz rám", amely lehetővé teszi a gyors bejelentkezést az ismételt látogatások során.<br />- Korábbi választások mentése és ajánlások nyújtása HP termékekre és szolgáltatásokra az Ön érdeklődése alapján.<br />- „Utoljára megtekintett", amelyik kilistázza keresési előzményeit és felgyorsítja a kereséseket az oldalon.</small></p><p class="rtxt"><small class="small"><strong>A HP és partnerei cookie-kat használnak más weboldalakon, hogy:</strong><br />- A HP és partnereink Önt érdeklő hirdetéseket juttathassanak el Önhöz. Előfordulhat, hogy ezek népszerű ajánlatokat tartalmaznak a HP és partnerei által kínált termékekre és szolgáltatásokra.</small></p>','HP weboldalak adatgyűjtő eszközöket használnak, például cookie-kat. Mondja el véleményét, hogyan használhatja a HP ezeket az eszközöket:','Névtelen statisztikai információkat is gyűjtünk a weboldal funktionalitásának és teljesítményének növelése érdekében.','<small><a href="http://www8.hp.com/hu/hu/privacy/privacy.html"><small>Az Adatvédelmi Nyilatkozat</small></a> pontban ezeket a beállításokat bármikor megváltoztathatja.</small><small><br />A \'CONTINUE\' gombra kattintással megerősíti, hogy megértette és elfogadja a bal oldalon látható cookie-beállításokat.</small>','Yes','Személyes adatvédelmi beállítások','MENTÉS','MENTÉS OK','A HP.com weboldalon gyűjtött cookie-k','Gyűjthetünk névtelen statisztikai információkat a weboldal funktionalitásának és teljesítményének növelése érdekében?','Személyre szabhatja a HP az Ön élményét a HP weboldalakon?','Megjeleníthet a HP és partnerei Önt érdeklő hirdetéseket más weboldalakon?','A HP weboldalai adatgyűjtő eszközöket, például cookie-kat használnak. Tájékoztasson bennünket, hogyan használhatja a HP ezeket az eszközöket:','A Tovább gombra kattintva elfogadja a HP cookie-használati módszereit. Preferált beállításai módosításához vagy a cookie-k letiltásához lépjen az <a href="http://www8.hp.com/hu/hu/privacy/privacy.html">Adatvédelmi nyilatkozatra</a>.','<strong>A HP weboldalai adatgyűjtő eszközöket, például cookie-kat használnak,</strong><br />hogy személyre szabják internetezését, lehetővé tegyék a HP partnerek számára az Ön érdeklődési körének megfelelő hirdetések megjelenítését, és anonim statisztikai adatokkal tökéletesíthessék az oldal funkcionalitását és teljesítményét.','A Tovább gombra kattintva elfogadja a HP cookie-használati módszereit. Preferált beállításai módosításához vagy a cookie-k letiltásához lépjen az <a href="http://www8.hp.com/hu/hu/m/privacy/preferences.do">Adatvédelmi nyilatkozatra</a>.');

privacyText[14] = new Array('1111','Strictly necessary cookie','Performance cookie','Functionality cookie','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','Yes','No','Continue','Learn how we use cookies and the benefits of choosing Yes.','<p class="rtxt"><small class="small"><strong>HP websites use cookies to support:</strong><br />- "Remember me", which lets you log in quickly on repeat visits<br />- Saving your previous choices and providing recommendations for HP products &amp; services based on your interests<br />- "Recently viewed", which lists your browsing history and will speed up you search on this site.</small></p><p class="rtxt"><small class="small"><strong>HP &amp; Partners use cookies on other websites to allow:</strong><br />- HP and our partners to deliver advertisements relevant to your interests. These may include popular offers for HP and partner products and services.</small></p>','HP sites use data collection tools like cookies. Please tell us how HP may use these tools:','Anonymous statistical information is also collected to enhance site functionality and performance.','<small class="small">You can change these settings at any time by going to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html"><small class="small">Privacy Statement</small></a>.</small><small class="small"><br />By clicking continue you confirm your understanding and agreement for cookies settings as indicated on left.</small>','Yes','My privacy preferences','SAVE','Your preferences have been saved','Cookies that we capture on HP.com','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','HP websites use data collections tools, such as cookies. Please tell us how HP may use these tools:','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/privacy/privacy.html">Privacy Statement</a>.','<strong>HP websites use date collection tools, such as cookies,</strong> <br />to personalise your experience, allow HP partners to show HP ads meeting your interests on other websites, and to collect anonymous statistical information to enhance site functionality and performance.','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/ie/en/m/privacy/preferences.do">Privacy Statement</a>.');

privacyText[15] = new Array('1110','Cookie rigorosamente necessario','Cookie per le prestazioni','Cookie per le funzionalità','Accetta che HP raccolga informazioni statistiche anonime per migliorare la funzionalità e le prestazioni dei siti?','Accetta che HP personalizzi la vostra esperienza sui siti Web HP?','Accetta che HP e i suoi partner mostrino avvisi pubblicitari di vostro interesse su altri siti Web?','Sì','No','Continua','Ulteriori informazioni sull\'uso dei cookie e sui vantaggi della conferma del loro utilizzo.','<p class="rtxt"><small class="small"><strong>I siti Web HP utilizzano i cookie per consentire:</strong><br />- L\'opzione di memorizzazione dei dati di accesso, per poter accedere rapidamente alle successive visite.<br />- Il salvataggio delle precedenti scelte e la possibilità di consigliare prodotti e servizi HP in base agli interessi dell\'utente.<br />- L\'opzione di memorizzazione dei siti visualizzati di recente, che elenca la cronologia di navigazione e velocizza le ricerche su questo sito.</small></p><p class="rtxt"><small class="small"><strong>HP e i suoi partner utilizzano i cookie su altri siti Web per consentire:</strong><br />- Ad HP e ai suoi partner di pubblicare avvisi pubblicitari di interesse per l\'utente. Possono essere incluse offerte relative a prodotti e servizi di HP e dei suoi partner.</small></p>','I siti HP utilizzano strumenti di raccolta dei dati, come i cookie. Specificare il modo in cui si desidera che HP utilizzi questi strumenti:','Per migliorare la funzionalità e le prestazioni dei siti, vengono inoltre raccolte informazioni statistiche anonime.','<small>È possibile modificare queste impostazioni in qualsiasi momento, accedendo all\'informativa sulla <a href="http://www8.hp.com/it/it/privacy/privacy.html"><small>privacy di HP</small></a>.</small><small><br />Facendo clic su "CONTINUA", l\'utente conferma di avere compreso le impostazioni dei cookie indicate a sinistra e di concordare con esse.</small>','Yes','Preferenze personali sulla privacy','SALVA','SALVA OK','Cookie acquisiti su HP.com','Accetta che HP raccolga informazioni statistiche anonime per migliorare la funzionalità e le prestazioni dei siti?','Accetta che HP personalizzi la vostra esperienza sui siti Web HP?','Accetta che HP e i suoi partner mostrino avvisi pubblicitari di vostro interesse su altri siti Web?','I siti Web HP utilizzano strumenti di raccolta dei dati, come i cookie. Specificare il modo in cui si desidera che HP utilizzi questi strumenti:','Fare clic su Continua per consentire ad HP di utilizzare i cookie. Per cambiare le impostazioni o per ritirare il consenso, fare riferimento all\'<a href="http://www8.hp.com/it/it/privacy/privacy.html">Informativa sulla privacy</a>.','<strong>I siti Web HP utilizzano strumenti di raccolta dei dati, come i cookie,</strong><br />per personalizzare la vostra esperienza, consentite ai partner HP di mostrare avvisi pubblicitari HP di vostro interesse su altri siti Web e di raccogliere informazioni statistiche anonime per migliorare la funzionalità e le prestazioni dei siti.','Fare clic su Continua per consentire ad HP di utilizzare i cookie. Per cambiare le impostazioni o per ritirare il consenso, fare riferimento all\'<a href="http://www8.hp.com/it/it/m/privacy/preferences.do">Informativa sulla privacy</a>.');

privacyText[16] = new Array('1110','Noteikti nepieciešami sīkfaili','Veiktspējas sīkfaili','Funkcionalitātes sīkfaili','Vai mēs drīkstam ievākt anonīmu statistisko informāciju, lai uzlabotu vietnes funkcionalitāti un sniegumu?','Vai HP var personalizēt jūsu pieredzi HP tīmekļa vietnēs?','Vai HP un partneri var rādīt reklāmas, kas atbilst jūsu interesēm, citās tīmekļa vietnēs?','Jā','Nē','Turpināt','Uzziniet, kā mēs izmantojam sīkfailus un kādas ir priekšrocības, izvēloties Jā.','<p class="rtxt"><small class="small"><strong>HP tīmekļa vietnes izmanto sīkfailus, lai atbalstītu:</strong><br />- “Atcerēties mani”, kas ļauj ātri pieteikties atkārtotiem apmeklējumiem;<br />- jūsu iepriekšējo izvēļu saglabāšanu un ieteikumu sniegšanu par HP produktiem un pakalpojumiem, balstoties uz jūsu interesēm;<br />- “Nesen skatītie”, kas parāda jūsu pārlūkošanas vēsturi un paātrina jūsu meklēšanu šajā vietnē.</small></p><p class="rtxt"><small class="small"><strong>HP un partneri izmanto sīkfailus citās tīmekļa vietnēs, lai atļautu:</strong><br />- HP un mūsu partneriem sniegt reklāmas atbilstoši jūsu interesēm. Tās var ietvert populārus piedāvājumus par HP un partneru produktiem un pakalpojumiem.</small></p>','HP vietnes izmanto datu ievākšanas rīkus, piemēram, sīkfailus. Lūdzu, pastāstiet mums, kā HP var izmantot šos rīkus:','Tiek ievākta arī anonīma statistiskā informācija, lai uzlabotu vietnes funkcionalitāti un sniegumu.','<small>Šos iestatījumus jūs varat mainīt jebkurā laikā, apmeklējot mūsu sadaļu <a href="http://www8.hp.com/lv/lv/privacy/privacy.html"><small>Konfidencialitātes paziņojums</small></a> .</small><small><br />Noklikšķinot uz TURPINĀT, jūs apstiprināt, ka izprotat kreisajā pusē norādītos sīkfailu iestatījumus un tiem piekrītat.</small>','Yes','Manas konfidencialitātes preferences','SAGLABĀT','SAGLABĀT OK','Sīkfaili, kurus mēs tveram HP.com','Vai mēs drīkstam ievākt anonīmu statistisko informāciju, lai uzlabotu vietnes funkcionalitāti un sniegumu?','Vai HP var personalizēt jūsu pieredzi HP tīmekļa vietnēs?','Vai HP un partneri var rādīt reklāmas, kas atbilst jūsu interesēm, citās tīmekļa vietnēs?','HP tīmekļa vietnes izmanto datu apkopošanas rīkus, piemēram, sīkfailus. Lūdzu, pastāstiet mums, kā HP var izmantot šos rīkus:','Noklikšķiniet uz Turpināt, lai ļautu HP izmantot sīkfailus. Lai mainītu savus iestatījumus vai atteiktos no sīkfailu izmantošanas, atveriet sadaļu <a href="http://www8.hp.com/lv/lv/privacy/privacy.html">Paziņojums par konfidencialitāti</a>.','<strong>HP tīmekļa vietnes izmanto datu apkopošanas rīkus, piemēram, sīkfailus,</strong><br />lai personalizētu jūsu iespējas, ļautu HP partneriem parādīt citās vietnēs jūsu interesēm atbilstošas HP reklāmas, kā arī apkopot anonīmu statistikas informāciju, lai uzlabotu vietnes funkcionalitāti un veiktspēju.','Noklikšķiniet uz Turpināt, lai ļautu HP izmantot sīkfailus. Lai mainītu savus iestatījumus vai atteiktos no sīkfailu izmantošanas, atveriet sadaļu <a href="http://www8.hp.com/lv/lv/m/privacy/preferences.do">Paziņojums par konfidencialitāti</a>.');

privacyText[17] = new Array('1110','Privalomas slapukas','Našumo slapukas','Veikimo slapukas','Ar galime rinkti anoniminę statistinę informaciją, kad pagerintume svetainės funkcionalumą ir veikimą?','Ar HP gali pritaikyti HP svetaines Jums?','Ar HP ir partneriai gali svetainėse rodyti reklamas, atitinkančias Jūsų interesus?','Taip','Ne','Tęsti','Sužinokite, kaip naudojame slapukus ir „Taip“ pasirinkimo naudą.','<p class="rtxt"><small class="small"><strong>HP svetainėse slapukai naudojami šioms funkcijoms:</strong><br />- „Atsiminti“ – tai leidžia greičiau prisijungti pakartotinai kartą apsilankius.<br />- Ankstesnių pasirinkimų išsaugojimas ir rekomendacijų dėl HP produktų ir paslaugų teikimas pagal Jūsų interesus.<br />- „Paskutinė peržiūra“ – pateikiama Jūsų naršymo istorija ir pagreitinama paieška svetainėje.</small></p><p class="rtxt"><small class="small"><strong>HP ir partneriai naudoja slapukus kitose svetainėse, kad leistų:</strong><br />- HP ir mūsų partneriams pateikti reklamų, atitinkančių Jūsų interesus. Tai gali būti populiarūs HP ir partnerių produktų ir paslaugų pasiūlymai.</small></p>','HP svetainės naudoja duomenų rinkimo įrankius, pvz., slapukus. Prašom paaiškinti, kaip HP gali naudoti šiuos įrankius:','Svetainės funkcionalumo ir veiklos pagerinimo tikslais renkama ir anoniminė statistinė informacija.','<small>Šias nuostatas galite bet kada pakeisti mūsų <a href="http://www8.hp.com/lt/lt/privacy/privacy.html"><small>Privatumo pareiškime</small></a>.</small><small><br />Paspausdami „CONTINUE“ (TĘSTI) patvirtinate, kad suprantate ir sutinkate su kairėje pateiktomis slapukų nuostatomis.</small>','Yes','Mano privatumo nuostatos','„SAVE“ (IRAŠYTI)','„SAVE“ (IRAŠYTI) OK','Slapukai, kuriuos fiksuojame svetainėje HP.com','Ar galime rinkti anoniminę statistinę informaciją, kad pagerintume svetainės funkcionalumą ir veikimą?','Ar HP gali pritaikyti HP svetaines Jums?','Ar HP ir partneriai gali svetainėse rodyti reklamas, atitinkančias Jūsų interesus?','HP svetainės naudoja duomenų rinkimo įrankius, pvz., slapukus. Praneškite, kaip HP galėtų naudoti šiuos įrankius:','Spustelėkite "Toliau", kad suteiktumėte HP leidimą naudoti slapukus. Norėdami bet kada pakeisti nuostatas arba panaikinti leidimą, apsilankykite <a href="http://www8.hp.com/lt/lt/privacy/privacy.html">"Privatumo nuostatose"</a>.','<strong>HP svetainės naudoja duomenų rinkimo įrankius, pvz., slapukus,</strong><br />kad galėtų pritaikyti svetainę pagal jūsų pomėgius, leistų HP partneriams rodyti skelbimus, atitinkančius jūsų poreikius kitose svetainėse, ir rinktų anoniminę statistinę informaciją, siekiant patobulinti svetainės funkcionalumą ir našumą.','Spustelėkite "Toliau", kad suteiktumėte HP leidimą naudoti slapukus. Norėdami bet kada pakeisti nuostatas arba panaikinti leidimą, apsilankykite <a href="http://www8.hp.com/lt/lt/m/privacy/preferences.do">"Privatumo nuostatose"</a>.');

privacyText[18] = new Array('1111','Strictly necessary cookie','Rendimiento -','» Galleta de la suerte','May we collect anonymous statistical information to enhance site functionality and performance?','También se recopila información anónima de estadísticas para ampliar la funcionalidad y el rendimiento del sitio.','May HP & Partners show ads meeting your interests on other websites?','Yes','No','Cerrar','Ver más / Ver menos','<p class="rtxt"><small class="small"><strong>Más información sobre el uso de cookies.<br />Las páginas de HP utilizan cookies para dar soporte a:</strong><br />- "Recordarme", que le permite iniciar sesión con mayor rapidez cuando realiza visitas repetidas<br />- Guarda sus elecciones anteriores y proporciona recomendaciones sobre productos y servicios de HP, en base a sus intereses<br />- "Visto recientemente", que muestra una lista con el historial de visitas y acelera la búsqueda del sitio</small></p><p class="rtxt"><small class="small"><strong>HP y sus socios comerciales utilizan cookies en otras páginas web para permitir que:</strong><br />- HP y nuestros socios comerciales ofrezcan anuncios relevantes de su interés. Estos pueden incluir ofertas populares para productos y servicios de HP y de sus otros socios de negocios.</small></p>','Los sitios HP utilizan herramientas para la recopilación de datos como las cookies.','HP uses cookies to personalise our website and provide you with the best experience. Click Continue to allow cookies on HP websites on this device.','<span style="display: block" id="rtxt">Puede encontrar más información sobre éstas herramientas y cómo manejar el uso de cookies, ahora o en cualquier momento, en nuestra <a href="http://www8.hp.com/mx/es/privacy/privacy.html">Declaración de Privacidad</a>.</span>','No','Mas información sobre el uso de cookies ','Save','Your preferences have been saved','Cookies que hemos recopilado en HP.com','','','','Los sitios web de HP usan herramientas de recopilación de datos, como cookies. Díganos cómo puede HP usar estas herramientas:','Puede encontrar más información sobre éstas herramientas y cómo manejar el uso de cookies, ahora o en cualquier momento, en nuestra <a href="http://www8.hp.com/mx/es/privacy/privacy.html">Declaración de privacidad</a>.','<strong>Los sitios HP utilizan herramientas para la recopilación de datos como las cookies.</strong><br /><br />También se recopila información anónima de estadísticas para ampliar la funcionalidad y el rendimiento del sitio.','Puede encontrar más información sobre éstas herramientas y cómo manejar el uso de cookies, ahora o en cualquier momento, en nuestra <a href="http://www8.hp.com/mx/es/privacy/privacy.html">Declaración de privacidad</a>.');

privacyText[19] = new Array('1110','Strikt noodzakelijke cookies','Prestatiecookies','Functionele cookies','Mag HP anonieme statistische informatie verzamelen om de functionaliteit en prestatie van haar website te verbeteren?','Mag HP uw ervaring op HP websites personaliseren?','Mogen HP en haar partners u aanbiedingen op andere websites tonen die u mogelijk interesseren?','Ja','Nee','Doorgaan','Leer hoe HP cookies gebruikt en ontdek hier de voordelen van.','<p class="rtxt"><small class="small"><strong>De HP-website gebruikt cookies ter ondersteuning van:</strong><br />- "Onthoud mij", waardoor u snel kunt aanmelden bij uw volgende bezoek.<br />- Het opslaan van uw interesses, zodat HP u gerichte aanbiedingen kan doen die hierop aansluiten.<br />- "Recent bekeken", dat een lijst geeft van uw navigatiegeschiedenis en het zoeken op deze website versnelt.</small></p><p class="rtxt"><small class="small"><strong>HP en haar partners gebruiken cookies op andere websites om het mogelijk te maken dat:</strong><br />- HP en onze partners reclame aanbieden die relevant is voor uw interesse. Deze kunnen populaire aanbiedingen voor producten en diensten van HP en partner.</small></p>','HP websites gebruiken tools voor gegevensverzameling zoals cookies. Laat ons weten hoe HP van deze tools gebruik mag maken:','We verzamelen ook anonieme statistische informatie om de functionaliteit en prestaties van de website te verbeteren.','<small>U kunt deze instellingen te allen tijde veranderen door naar onze <a href="http://www8.hp.com/nl/nl/privacy/privacy.html"><small>privacyverklaring te navigeren</small></a>.</small><small><br />Door op \'DOORGAAN\' te klikken, bevestigt u dat u de instellingen voor cookies begrijpt en hiermee akkoord gaat zoals aangegeven aan de linkerzijde.</small>','Yes',' Mijn Privacyvoorkeuren','OPSLAAN','OPSLAAN OK','Cookies die we vastleggen op HP.com','Mag HP anonieme statistische informatie verzamelen om de functionaliteit en prestatie van haar website te verbeteren?','Mag HP uw ervaring op HP websites personaliseren?','Mogen HP en haar partners u aanbiedingen op andere websites tonen die u mogelijk interesseren?','HP websites gebruiken programma\'s zoals cookies voor het verzamelen van data. Geef aan hoe HP deze mag gebruiken:','Klik op Doorgaan om het gebruik van cookies door HP te accepteren. U kunt uw voorkeursinstellingen wijzigen of cookies weigeren door naar onze <a href="http://www8.hp.com/nl/nl/privacy/privacy.html">Privacyverklaring</a> te gaan.','<strong>HP websites gebruiken programma\'s voor het verzamelen van data, zoals cookies,</strong><br />om uw gebruikservaring specifiek op u af te stemmen, HP partners in staat te stellen op andere websites HP advertenties te tonen die aansluiten bij uw interesses en om anonieme statistische gegevens te verzamelen waarmee wij de functionaliteit en de prestaties van de website kunnen verbeteren.','Klik op Doorgaan om het gebruik van cookies door HP te accepteren. U kunt uw voorkeursinstellingen wijzigen of cookies weigeren door naar onze <a href="http://www8.hp.com/nl/nl/m/privacy/preferences.do">Privacyverklaring</a> te gaan.');

privacyText[20] = new Array('1111','Bezwzględnie konieczny plik cookie','Plik cookie związany z wydajnością','Plik cookie związany z funkcjonalnością','Czy mozemy zbierac anonimowe informacje statystyczne w celu zwiekszenia funkcjonalnosci i wydajnosci witryny?','Czy firma HP moze spersonalizowac dzialanie stron HP?','Czy firma HP i jej partnerzy moga wyswietlac na innych stronach reklamy zwiazane z Twoimi zainteresowaniami?','Tak','Nie','Kontynuuj','Dowiedz się, w jaki sposób wykorzystujemy pliki cookie i jakie korzyści wynikają z wybrania odpowiedzi Tak.','<p class="rtxt"><small class="small"><strong>Na stronach HP pliki cookie są używanie do następujących celów:</strong><br />- opcja „Pamiętaj mnie”, która umożliwia szybkie logowanie przy kolejnych wizytach;<br />- zapisywanie Twoich poprzednich wyborów i przedstawianie zaleceń dotyczących produktów i usług HP na podstawie Twoich zainteresowań;<br />- opcja „Ostatnio oglądane”, która wyświetla historię przeglądania i przyspiesza wyszukiwanie na stronie.</small></p><p class="rtxt"><small class="small"><strong>Firma HP i jej partnerzy wykorzystują pliki cookie w innych witrynach w celu:</strong><br />- umożliwienia firmie HP i jej partnerom wyświetlania reklam związanych z Twoimi zainteresowaniami. Mogą one obejmować popularne oferty dotyczące produktów i usług firmy HP i jej partnerów.</small></p>','Na stronach HP wykorzystywane są narzędzia do zbierania danych, np. pliki cookie. Powiedz nam, w jakim zakresie firma HP może korzystać z tych narzędzi:','Zbierane są również anonimowe informacje statystyczne w celu zwiększenia funkcjonalności i wydajności witryny.','<small>Możesz w dowolnym momencie zmienić te ustawienia na stronie <a href="http://www8.hp.com/pl/pl/privacy/privacy.html"><small>Ochrona danych osobowych</small></a>.</small><small><br />Kliknięcie przycisku „KONTYNUUJ” oznacza zrozumienie i akceptację ustawień dotyczących plików cookie zgodnie z odpowiedziami po lewej stronie.</small>','Yes','Moje preferencje dotyczace poufnosci','ZAPISZ','ZAPISZ OK','Pliki cookie, które zapisujemy na stronie HP.com','Czy mozemy zbierac anonimowe informacje statystyczne w celu zwiekszenia funkcjonalnosci i wydajnosci witryny?','Czy firma HP moze spersonalizowac dzialanie stron HP?','Czy firma HP i jej partnerzy moga wyswietlac na innych stronach reklamy zwiazane z Twoimi zainteresowaniami?','Na stronach HP są używane narzędzia do zbierania danych, np. pliki cookie. Powiedz nam, w jakim zakresie firma HP może korzystać z tych narzędzi:','Kliknij przycisk Kontynuuj, aby wyrazić zgodę na używanie plików cookie przez HP. Aby zmienić preferencje lub wycofać swoją zgodę, przejdź na stronę <a href="http://www8.hp.com/pl/pl/privacy/privacy.html">Oświadczenie o ochronie prywatności</a>.','<strong>Na stronach HP są używane narzędzia do zbierania danych, np. pliki cookie,</strong><br />służące do personalizowania działania stron HP, umożliwiające partnerom HP wyświetlanie na innych stronach reklam związanych z Twoimi zainteresowaniami oraz do zbierania anonimowych informacji statystycznych w celu zwiększenia funkcjonalności i wydajności witryny.','Kliknij przycisk Kontynuuj, aby wyrazić zgodę na używanie plików cookie przez HP. Aby zmienić preferencje lub wycofać swoją zgodę, przejdź na stronę <a href="http://www8.hp.com/pl/pl/m/privacy/preferences.do">Oświadczenie o ochronie prywatności</a>.');

privacyText[21] = new Array('1110','Cookie estritamente necessário','Cookie de desempenho','Cookie de funcionalidade','Podemos recolher informações estatísticas anónimas para melhorar a funcionalidade e o desempenho do site?','A HP pode personalizar a sua experiência em Web sites da HP?','A HP e os seus parceiros podem mostrar anúncios relacionados com os seus interesses noutros Web sites?','Sim','Não','Continuar','Saiba como utilizamos cookies e as vantagens de escolher Sim.','<p class="rtxt"><small class="small"><strong>Os Web sites da HP utilizam cookies para suportar:</strong><br />- "Lembrar-me", que lhe permite iniciar sessão rapidamente em visitas repetidas.<br />- Guardar as suas escolhas anteriores e apresentar recomendações de produtos e serviços HP com base nos seus interesses.<br />- "Vistos recentemente", que lista o seu histórico de pesquisas e acelera a sua pesquisa neste site.</small></p><p class="rtxt"><small class="small"><strong>A HP e os seus Parceiros utilizam cookies noutros Web sites para permitir:</strong><br />- À HP e aos seus parceiros apresentar anúncios relevantes para os seus interesses. Esses anúncios podem incluir ofertas populares de produtos e serviços da HP e dos seus parceiros.</small></p>','Os sites da HP utilizam ferramentas de recolha de dados, tais como cookies. Indique-nos como a HP pode utilizar essas ferramentas:','Também são recolhidas informações estatísticas anónimas para melhorar a funcionalidade e o desempenho do site.','<small>Pode alterar estas definições em qualquer momento acedendo à nossa <a href="http://www8.hp.com/pt/pt/privacy/privacy.html"><small>Declaração de Privacidade</small></a>.</small><small><br />Ao clicar em \'CONTINUAR\' confirma que compreende e aceita as definições de cookies conforme indicado à esquerda.</small>','Yes','As minhas preferências de privacidade','GUARDAR','GUARDAR OK','Cookies que capturamos em HP.com','Podemos recolher informações estatísticas anónimas para melhorar a funcionalidade e o desempenho do site?','A HP pode personalizar a sua experiência em Web sites da HP?','A HP e os seus parceiros podem mostrar anúncios relacionados com os seus interesses noutros Web sites?','Os websites da HP utilizam ferramentas de recolha de dados, como os cookies. Indique-nos como a HP pode utilizar essas ferramentas:','Clique para continuar e permitir a utilização de cookies por parte da HP. Para alterar as suas preferências ou para deixar de permitir cookies, consulte a nossa <a href="http://www8.hp.com/pt/pt/privacy/privacy.html">Declaração de Privacidade</a>.','<strong>Os websites da HP utilizam ferramentas de recolha de dados, como os cookies,</strong><br />para personalizar a sua experiência, permitir que os parceiros HP apresentem anúncios HP que vão de encontro aos seus interesses noutros websites e recolher informações anónimas com fins estatísticos para melhorar a funcionalidade e o desempenho desses websites.','Clique para continuar e permitir a utilização de cookies por parte da HP. Para alterar as suas preferências ou para deixar de permitir cookies, consulte a nossa <a href="http://www8.hp.com/pt/pt/m/privacy/preferences.do">Declaração de Privacidade</a>.');

privacyText[22] = new Array('1111','Modul cookie strict necesar','Modul cookie pentru performanţă','Modul cookie pentru funcţionalitate','Permiteţi să colectăm informaţii statistice anonime pentru a îmbunătăţi funcţionalitatea şi performanţele site-ului?','Permiteţi ca HP să vă personalizeze experienţa cu site-urile Web HP?','Permiteţi ca HP şi partenerii săi să afişeze pe alte site-uri Web reclame care vă corespund intereselor?','Da','Nu','Continuare','Aflaţi cum utilizăm modulele cookie şi beneficiile pe care le aveţi dacă selectaţi Da.','<p class="rtxt"><small class="small"><strong>Site-urile Web HP utilizează module cookie pentru a facilita următoarele caracteristici:</strong><br />- Opţiunea „Reţine-mă”, care vă permite să vă conectaţi rapid în cazul vizitelor repetate.<br />- Salvarea opţiunilor dvs. anterioare şi furnizarea de recomandări pentru produse şi servicii HP pe baza intereselor pe care le aveţi.<br />- Opţiunea „Vizualizate recent”, care vă listează istoricul de navigare şi vă va accelera căutările pe acest site.</small></p><p class="rtxt"><small class="small"><strong>HP şi partenerii săi utilizează module cookie pe alte site-uri Web pentru a permite ca:</strong><br />- HP şi partenerii săi să furnizeze reclame relevante pentru interesele dvs. Acestea pot să includă oferte populare pentru produse şi servicii ale HP şi ale partenerilor.</small></p>','Site-urile HP utilizează instrumente de colectare a datelor, precum module cookie. Spuneţi-ne cum permiteţi ca HP să utilizeze aceste instrumente:','De asemenea, sunt colectate informaţii statistice anonime pentru a îmbunătăţi funcţionalitatea şi performanţele site-ului.','<small>Puteţi în orice moment să modificaţi aceste setări, mergând la <a href="http://www8.hp.com/ro/ro/privacy/privacy.html"><small>Declaraţia noastră de confidenţialitate</small></a>.</small><small><br />Făcând clic pe „CONTINUARE”, confirmaţi că aţi înţeles şi că sunteţi de acord cu setările pentru module cookie, aşa cum este indicat în stânga.</small>','Yes','Preferinţele mele de confidenţialitate','SALVARE','SALVARE OK','Module cookie pe care le preluăm pe HP.com','Permiteţi să colectăm informaţii statistice anonime pentru a îmbunătăţi funcţionalitatea şi performanţele site-ului?','Permiteţi ca HP să vă personalizeze experienţa cu site-urile Web HP?','Permiteţi ca HP şi partenerii săi să afişeze pe alte site-uri Web reclame care vă corespund intereselor?','Site-urile Web HP utilizează instrumente de colectare a datelor, precum cookie-urile. Spuneţi-ne în ce mod poate utiliza compania HP aceste instrumente:','Faceţi clic pe opţiunea de continuare pentru a permite utilizarea cookie-urilor de către HP. Pentru a vă modifica preferinţele sau a vă exprima dezacordul, mergeţi la <a href="http://www8.hp.com/ro/ro/privacy/privacy.html">Declaraţia noastră de confidenţialitate</a>.','<strong>Site-urile Web HP utilizează instrumente de colectare a datelor, precum cookie-urile,</strong><br />pentru a personaliza experienţa dumneavoastră, pentru a afişa reclame HP pe alte site-uri Web, conform intereselor dumneavoastră şi pentru a colecta informaţii statistice anonime în vederea îmbunătăţirii funcţionalităţii şi performanţei site-ului.','Faceţi clic pe opţiunea de continuare pentru a permite utilizarea cookie-urilor de către HP. Pentru a vă modifica preferinţele sau a vă exprima dezacordul, mergeţi la <a href="http://www8.hp.com/ro/ro/m/privacy/preferences.do">Declaraţia noastră de confidenţialitate</a>.');

privacyText[23] = new Array('1111','Bezpodmienečne potrebné súbory cookie','Výkonnostné súbory cookie','Súbory cookie funkcií','Môžeme zbierať anonymné štatistické informácie na podporu funkcie a výkonu stránky?','Môže spoločnosť HP upraviť vaše skúsenosti na webovej stránke HP?','Môže spoločnosť HP a jej partneri uvádzať reklamy s vašimi záujmami na iných webových stránkach?','Áno','Nie','Pokračovať','Zistite ako používame súbory cookies a zistite výhody výberu možnosti Áno.','<p class="rtxt"><small class="small"><strong>Webové stránky spoločnosti HP používajú súbory cookies na podporu:</strong><br />- Súboru typu „Remember me“ (Zapamätaj si ma), ktorý vám umožní rýchlo sa prihlásiť pri opakovanej návšteve.<br />- Ukladania vašich predchádzajúcich výberov a poskytovania odporúčaní ohľadom produktov a služieb HP na základe vašich záujmov.<br />- Súboru typu „Recently viewed“ (Nedávno prezerané), ktorý ukladá vašu históriu prezerania webu a týmto urýchli vaše hľadanie na tejto stránke.</small></p><p class="rtxt"><small class="small"><strong>Spoločnosť HP a jej partneri používajú súbory typu cookies na iných webových stránkach, aby umožnili:</strong><br />- Spoločnosti HP a našim partnerom uvádzať reklamy vzťahujúce sa na vaše záujmy. Sem môžu patriť populárne ponuky ohľadom produktov a služieb spoločnosti HP a jej partnerov.</small></p>','Stránky HP používajú nástroje na zber dát ako sú súbory cookies. Povedzte nám, prosím, ako môže spoločnosť HP využiť tieto nástroje:','Anonymné štatistické informácie sa zbierajú aj na podporu funkcie a výkonu stránky.','<small>Tieto nastavenia môžete zmeniť kedykoľvek tak, že prejdete na svoje <a href="http://www8.hp.com/sk/sk/privacy/privacy.html"><small>Prehlásenie o súkromí</small></a> .</small><small><br />Kliknutím na možnosť „POKRAČOVAŤ“ potvrdzujete, že ste pochopili a súhlasíte s nastaveniami súborov cookies tak ako je to uvedené vľavo.</small>','Yes','Moje osobné preferencie','ULOŽIŤ','ULOŽIŤ OK','Súbory cookies, ktoré zachytíme na HP.com','Môžeme zbierať anonymné štatistické informácie na podporu funkcie a výkonu stránky?','Môže spoločnosť HP upraviť vaše skúsenosti na webovej stránke HP?','Môže spoločnosť HP a jej partneri uvádzať reklamy s vašimi záujmami na iných webových stránkach?','Webové stránky spoločnosti HP využívajú nástroje na zhromažďovanie údajov, napríklad súbory "cookie". Povedzte nám, akým spôsobom môže spoločnosť HP tieto nástroje používať:','Pokračujte kliknutím a vyjadrite súhlas s tým, že spoločnosť HP používa súbory "cookie". Ak chcete svoje predvoľby zmeniť alebo zrušiť prihlásenie na odber, prejdite na stránku <a href="http://www8.hp.com/sk/sk/privacy/privacy.html">Vyhlásenie o ochrane osobných údajov</a>.','<strong>Webové stránky spoločnosti HP využívajú nástroje na zhromažďovanie údajov, napríklad súbory "cookie",</strong><br />na prispôsobovanie funkcií, umožňovanie partnerom spoločnosti HP sledovať reklamy spoločnosti HP podľa položiek, o ktoré sa zaujímali na iných webových stránkach, a na zhromažďovanie anonymných štatistických údajov s cieľom zlepšiť funkcie a výkon stránok.','Pokračujte kliknutím a vyjadrite súhlas s tým, že spoločnosť HP používa súbory "cookie". Ak chcete svoje predvoľby zmeniť alebo zrušiť prihlásenie na odber, prejdite na stránku <a href="http://www8.hp.com/sk/sk/m/privacy/preferences.do">Vyhlásenie o ochrane osobných údajov</a>.');

privacyText[24] = new Array('1111','Nepogrešljiv piškotek','Piškotek, ki omogoča delovanje','Piškotek, ki omogoča uporabo funkcij','Ali lahko zberemo anonimne statisticne podatke, ki izboljšujejo funkcije in delovanje spletnega mesta?','Ali lahko HP prilagodi vašo izkušnjo na HP-jevih spletnih mestih?','Ali lahko HP in partnerji na drugih spletnih mestih prikažejo oglase, ki izpolnjujejo vaša zanimanja?','Da','Ne','Nadaljuj','Več o tem, kako uporabljamo piškotke in kakšne so prednosti, če izberete »Da«','<p class="rtxt"><small class="small"><strong>HP-jeva spletna mesta uporabljajo piškotke kot podporo za:</strong><br />- Možnost »Zapomni si me«, ki vam omogoča hitro prijavo ob ponovljenih obiskih.<br />- Shranjevanje vaših izbranih možnosti in zagotavljanje priporočil za HP-jeve izdelke in storitve na podlagi vaših zanimanj.<br />- Možnost »Nedavno obiskano«, ki prikaže zgodovino brskanja in pospeši iskanje na tem spletnem mestu.</small></p><p class="rtxt"><small class="small"><strong>HP in partnerji uporabljajo piškotke na drugih spletnih mestih, da omogočijo:</strong><br />- HP-ju in njegovim partnerjem dostavo oglasov, ki ustrezajo vašim zanimanjem. Mednje lahko spadajo priljubljene ponudbe HP-jevih izdelkov in storitev ter izdelkov in storitev partnerjev.</small></p>','HP-jeva spletna mesta uporabljajo orodja za zbiranje podatkov tako kot piškotki Sporočite nam, kako lahko HP uporablja ta orodja:','Zbrani so tudi anonimni statistični podatki, ki izboljšujejo funkcije in delovanje spletnega mesta.','<small>Te nastavitve lahko kadar koli spremenite tako, da odprete našo <a href="http://www8.hp.com/si/sl/privacy/privacy.html"><small>izjavo o zasebnosti</small></a>.</small><small><br />Če kliknete »NADALJUJ«, potrjujete in soglašate, da lahko uporabimo nastavitve piškotkov, ki so prikazane na levi strani.</small>','Yes','Moje nastavitve zasebnosti','SHRANI','SHRANI OK','Piškotki, ki jih zberemo na spletnem mestu HP.com','Ali lahko zberemo anonimne statisticne podatke, ki izboljšujejo funkcije in delovanje spletnega mesta?','Ali lahko HP prilagodi vašo izkušnjo na HP-jevih spletnih mestih?','Ali lahko HP in partnerji na drugih spletnih mestih prikažejo oglase, ki izpolnjujejo vaša zanimanja?','Spletna mesta HP uporabljajo orodja za zbiranje podatkov, kot so piškotki. Prosimo, obvestite nas, kako lahko HP uporablja ta orodja:','Kliknite "Nadaljuj", če se strinjate, da HP uporablja piškotke. Če želite spremeniti nastavitve ali piškotke onemogočiti, to lahko naredite v <a href="http://www8.hp.com/si/sl/privacy/privacy.html">izjavi o zasebnosti.</a>','<strong>Spletna mesta HP uporabljajo orodja za zbiranje podatkov, kot so piškotki,</strong><br />s katerimi prilagajamo vašo izkušnjo, dovolimo HP-jevim partnerjem, da na drugih spletnih mestih prikazujejo HP-jeve oglase, ki ustrezajo vašim zanimanjem, in zbiramo anonimne statistične podatke, s pomočjo katerih izboljšujemo delovanje in učinkovitost spletnega mesta.','Kliknite "Nadaljuj", če se strinjate, da HP uporablja piškotke. Če želite spremeniti nastavitve ali piškotke onemogočiti, to lahko naredite v <a href="http://www8.hp.com/si/sl/m/privacy/preferences.do">izjavi o zasebnosti.</a>');

privacyText[25] = new Array('1111','Bezpodmienečne potrebné súbory cookie','Výkonnostné súbory cookie','Súbory cookie funkcií','¿Podemos recopilar información anónima de estadísticas para ampliar la funcionalidad y el rendimiento de la página?','¿Puede HP personalizar su experiencia con las páginas web de HP?','¿Pueden HP y partners mostrar anuncios que sean de su interés en otras páginas web?','Sí','No','Continuar','Más información sobre el uso de cookies y las ventajas de elegir Sí.','<p class="rtxt"><small class="small"><strong>Las páginas de HP utilizan cookies para dar soporte a:</strong><br />- "Recordarme", que le permite iniciar sesión con mayor rapidez cuando realiza visitas repetidas.<br />- Guarda sus elecciones anteriores y proporciona recomendaciones sobre productos y servicios de HP, en base a sus intereses.<br />- "Visto recientemente", que muestra una lista con el historial de visitas y acelera la búsqueda del sitio.</small></p><p class="rtxt"><small class="small"><strong>HP y sus partners utilizan cookies en otras páginas web para permitir que:</strong><br />- HP y sus partners ofrezcan anuncios relevantes de su interés. Estos pueden incluir ofertas populares para productos y servicios de HP y sus partners.</small></p>','Los sitios HP utilizan herramientas para la recopilación de datos como las cookies. Díganos como puede HP utilizar estas herramientas:','También se recopila información anónima de estadísticas para ampliar la funcionalidad y el rendimiento del sitio.','<small>Puede cambiar estos ajustes en cualquier momento, en nuestra <a href="http://www8.hp.com/es/es/privacy/privacy.html"><small>Declaración de privacidad</small></a>.</small><small><br />Si hace clic en \'CONTINUAR\' confirma su entendimiento y conformidad con los ajustes de los cookies, como se indica a la izquierda.</small>','Yes','Mis preferencias de privacidad','GUARDAR','GUARDAR OK','Cookies que hemos recopilado en HP.com','¿Podemos recopilar información anónima de estadísticas para ampliar la funcionalidad y el rendimiento de la página?','¿Puede HP personalizar su experiencia con las páginas web de HP?','¿Pueden HP y partners mostrar anuncios que sean de su interés en otras páginas web?','Los sitios web de HP utilizan herramientas de recopilación de datos, como cookies. Díganos cómo HP puede utilizar estas herramientas:','Haga clic en Continuar para permitir que HP utilice las cookies. Para cambiar sus preferencias o dejar de participar, vaya a nuestra <a href="http://www8.hp.com/es/es/privacy/privacy.html">Declaración de privacidad</a>.','<strong>Los sitios web de HP utilizan herramientas de recopilación de datos, como cookies,</strong><br />para personalizar su experiencia, permitiendo a los partners de HP mostrar anuncios de HP que satisfagan sus intereses en otros sitios web y recopilar de forma anónima información estadística para mejorar la funcionalidad y el rendimiento del sitio.','Haga clic en Continuar para permitir que HP utilice las cookies. Para cambiar sus preferencias o dejar de participar, vaya a nuestra <a href="http://www8.hp.com/es/es/m/privacy/preferences.do">Declaración de privacidad</a>.');

privacyText[26] = new Array('1110','Helt nödvändig cookie','Prestandacookie','Funktionalitetscookie','Får vi samla in anonym statistisk information för att förbättra webbplatsens funktion och kapacitet?','Får HP anpassa din upplevelse på HPs webbplatser?','Får HP och våra partner visa annonser som är relevanta för dina intressen på andra webbplatser?','Ja','Nej','Fortsätt','Läs om hur vi använder cookies och fördelarna med att välja Ja.','<p class="rtxt"><small class="small"><strong>HPs webbplatser använder cookies för följande ändamål:</strong><br />- "Kom ihåg mig" så att du snabbt kan logga in när du besöker webbplatsen igen.<br />- Spara dina tidigare inställningar och visa rekommendationer om HPs produkter och tjänster baserat på dina intressen.<br />- "Nyligen visat" som visar vilka sidor du har besökt tidigare och påskyndar din sökning på webbplatsen.</small></p><p class="rtxt"><small class="small"><strong>HP och våra partner använder cookies på andra webbplatser för följande ändamål:</strong><br />- För att HP och våra partner ska kunna visa annonser som är relevanta för dina intressen. Det kan bland annat gälla populära erbjudanden på produkter och tjänster från HP och våra partner.</small></p>','HPs webbplatser använder verktyg för datainsamling, till exempel cookies. Ange hur HP får använda sådana verktyg:','Dessutom samlar vi in anonym statistisk information för att förbättra webbplatsens funktion och kapacitet.','<small>Du kan ändra inställningarna när som helst i avsnittet med vårt <a href="http://www8.hp.com/se/sv/privacy/privacy.html"><small>sekretessmeddelande</small></a>.</small><small><br />Genom att klicka på FORTSÄTT bekräftar du att du förstår och samtycker till inställningarna för cookies till vänster.</small>','Yes','Mina sekretessinställningar','SPARA','SPARA OK','Cookies som vi registrerar på HP.se','Får vi samla in anonym statistisk information för att förbättra webbplatsens funktion och kapacitet?','Får HP anpassa din upplevelse på HPs webbplatser?','Får HP och våra partner visa annonser som är relevanta för dina intressen på andra webbplatser?','På HP:s webbplatser använder vi verktyg för datainsamling, som t.ex. cookies. Tala om hur HP får använda dessa verktyg:','Klicka på Fortsätt om du samtycker till att HP får använda cookies. Om du vill ändra dina inställningar eller ta bort dem helt går du till vår <a href="http://www8.hp.com/se/sv/privacy/privacy.html">integritetspolicy</a>.','<strong>På HP:s webbplatser använder vi verktyg för datainsamling, som t.ex. cookies,</strong><br />för att ge dig en personlig upplevelse, låta våra partner visa HP-annonser som stämmer med dina intressen på andra webbplatser och samla in anonyma statistiska uppgifter i syfte att förbättra webbplatsens funktion och kapacitet.','Klicka på Fortsätt om du samtycker till att HP får använda cookies. Om du vill ändra dina inställningar eller ta bort dem helt går du till vår <a href="http://www8.hp.com/se/sv/m/privacy/preferences.do">integritetspolicy</a>.');

privacyText[27] = new Array('1111','Strictly necessary cookie','Performance cookie','Functionality cookie','May we collect anonymous statistical information to enhance site functionality and performance?','Personalise your experience on HP websites','Allow HP, using partners, to show HP ads meeting your interests on other websites','Yes','No','Continue','Learn the benefits of choosing Yes','<p class="rtxt"><small class="small"><strong>HP websites use cookies to support:</strong><br />- "Remember me", which lets you log in quickly on repeat visits<br />- Saving your previous choices and providing recommendations for HP products &amp; services based on your interests<br />- "Recently viewed", which lists your browsing history and will speed up you search on this site.</small></p><p class="rtxt"><small class="small"><strong>HP &amp; Partners use cookies on other websites to allow:</strong><br />- HP and our partners to deliver HP advertisements for products and services relevant to your interests.</small></p>','HP sites use data collection tools such as cookies. HP uses these tools to:','Collect anonymous statistical information to enhance site functionality and performance','You can change these settings at any time by going to our <a href="http://www8.hp.com/uk/en/privacy/privacy.html">Privacy Statement</a> .<br />By clicking continue you confirm your understanding and agreement for cookies settings as indicated on left.','Yes','My privacy preferences','SAVE','Your preferences have been saved','Cookies that we capture on HP.com','May we collect anonymous statistical information to enhance site functionality and performance?','May HP personalise your experience on HP web sites?','May HP & Partners show ads meeting your interests on other websites?','HP websites use data collection tools, such as cookies. Please tell us how HP may use these tools:','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/uk/en/privacy/privacy.html">Privacy Statement</a>.','<strong>HP websites use data collection tools, such as cookies,</strong> <br />to personalise your experience, allow HP partners to show HP ads meeting your interests on other websites, and to collect anonymous statistical information to enhance site functionality and performance.','Click continue to consent to HP\'s use of cookies. To change your preferences or opt out, go to our <a href="http://www8.hp.com/uk/en/m/privacy/preferences.do">Privacy Statement</a>.');
var technical_cookies = ['.ISCS[]','023492_pdf_registration','15mntwarning','3Po','5mntwarning','AFCore','AFFILIATE','AFFILIATEAGENTAUTHID','AGENTSELECTION','AS','ASP.NET_SessionId','ASP.Net','ASPFIXATION','ASPSESSIONID','ASPSESSIONIDQATRSCCB','AWSELB','AccountID','ActiveXCleanUP','AdminContactType','AppID','ArcFlagCookie','AuthenticationStateToken-sessionID','B2BP_CHECKBOX','BEID','BIGipServerp-dc20-c3-GT-HP','BSCDisclosureAgreed','BUSENTITYID','Bookmark','BusPhone','CAMPAIGN','CA%5FESD ','CCcookie','CISOPID','CL_Cookie','CP','CSMcaseId','CSR','CallType','CartFootersize','CartLevelDiscount','ClientKey','CntyCD_Orig','CntyName_Orig','Commerce2002_TestPersistentCookie','Commerce2002_TestSessionCookie','ContactID','ContainerCookie','Cookie','Cookie_eSCPD','tridion_siteedit','CountryCD','CountryCode','CountryName','CurrLangCode','CurrLangId','DCCDEV%5FGEM%5FSHOPPER%5F1127%5F90898','DCCDEV%5FGEM%5FSHOPPER%5F70%5F90898','DCCITG%5FGEM%5FSHOPPER%5F1127%5F90898','DCCITG%5FGEM%5FSHOPPER%5F70%5F90898','DCCPRO','DCCPRO3174779','DCCPRO4211548','DCCPRO%5FGEM%5F','DCCPRO%5FGEM%5FSHOPPER%5F1127%5F90898','DCCPRO%5FGEM%5FSHOPPER%5F150%5F90898','DCCPRO%5FGEM%5FSHOPPER%5F70%5F90898','DCCPRO%5FUSERINFO%5F','DCCPRO%5FUSERINFO%5F1600003','DEPOT_KIOSK_ID','DSS%5FTICKET','DSS%5FTOKEN','DWF-HF-ROUTE','DataCenter','DataReady','DefLangCode','DefLangId','DefaultAcctId','DeliveryAddress','DiscBUSEntityId','DiscountReasonCode','DisplayCEIOnOff','DisplayDetailsOnOff','DisplayName','DisplaySkuOnOff','EEEJSESSIONID','EMEAINFO','EMailID','ESC','ES_status','ETR_OPT_IN','EmailLink','Equispeed cookie ','ExemptPromo','ExternalUser','FORMCRED','File[]','firstname','FooterURL','Force_View','FromSelfHelp','German Virtualisation navigator','HPPFEDIDENTITY','HPPFEDSESSION','HPPIDENTITY','HPPSESSION','HPPTRYNO','HPPUserID','HPSource','HPVC:AuthPartner:','HP_ContinueID','HP_EBUS','HP_EBUS_FORUM','HP_EBUS_HP_CLICKS','HP_EBUS_INTERNAL','HP_EBUS_ISPE','HP_EBUS_ITRC','HP_ELP','HP_EMEA_COOKIE','HP_LB','HP_SPF_HOST','HP_SPF_LOCALE','HP_SPF_SID','HP_SPF_SITE','HP_SURVEY','HeaderURL','HomeOrder','HomePO','HomeShipment','HpOcsCountry','HpOcsLanguage','Hpdia_Optin','ICLocation','INDIGO_REG','IPAQModel','IPGConsumer','IPLocale','IRLJSESSIONID','ITGINT%5FDPLUS%5F19701%5F90898','ITGINT%5FDPLUS%5FSHOPPER%5F19701%5F90898','ITGINT%5FDPLUS%5FSHOPPER%5F19701%5F90898%5FEmail','ITGINT%5FGEM%5FSHOPPER%5F1127%5F90898','IsAgent','IsSpoofed','IsTester','IsTyping','JSESSIONID','KM','LAJSESSIONID','LGSESSION','LOGINPAGE','LandingPageRead','LastOrderSource','lastURL','lastname','LegacySessionID','LiSessionID','LithiumSecureUser','LithiumUserInfo','Logged','LoggedInDeployment','Login','LoginStatus','LoginURL','Login_auth','MAX%5FRECORD%5FCOUNT','MSCSAuth','MSCSProfile','ManageStandardID','MerchCompareData','MerchFacetsSelected','MerchListData','MgrApproval','NEWS','NEWSLETTER_SUBSCRIPTION_[]','NTLPREFS','NTLoginID','NewUser','NumberDiscountLineItems','OP_LoginStatus','ORDBusEntityID','ORDPriceLevelID','ORDUserType','OfficeHours ','OmSiteIdBEId','OmnitureLoggedIn','OperLogin','OperatorId','OrderAdminPage','OrderDebug','OutletId','PA','PHPSESSID','PQRData ','PR_Cookie','Page','Parent_Quote_Id','Passcode','PassedCreditCheck','PhoneNumber','Poetic: AUL','Poetic: JSESSIONID','PortalSessionID','PreferredLanguageCode','PriceLevelID','ProdImageURL','ProdSeriesOid','ProdTypeOid','Product','ProductBigseriesSnf','ProductInfo','ProductTypeValue','QSI_HistorySession','QSI_SI_[]_intercept','Redirect','RegID','RegID_Orig','RegName','RegName_Orig','Response_Repair_Time ','Response_Repair_Time_Clicked','RoleID','RoleID_Orig','RoleName','RoleName_Orig','SDASM_OF_ActiveWindows','SDP-HPP-Header','SDPPortalCache','SESSfb8b0b4d32066efd9cbade33e07c6e3b','SFmlyID','SIEBEL_TRANS_TYPE','SIEBEL_WEB_REF_ID','SI_[]_intercept','SI_ai2DPVK1I1MVhFG','SI_baq09Z0lnwnAFA8','SMBDealerID_CCBL','SMIDENTITY','SMSESSION','SM_UNIVERSALID','SM_USER','SPlineID','SQLAuthCookie','SSID','Salesrep_AccountType','SavedContactID','SavedLNManageEmailFlag','SavedLogin','SavedSessionID','SecTime','SendLinkHistory','Serial','SessionManager','SessionSID','SessionToken','SetSearchReset','ShopperId','Siebel_AccountID','Siebel_Acct_Loc','Siebel_Acct_Name','Siebel_Acnt_FaxNum','Siebel_Acnt_MainNum','Siebel_Action_Type','Siebel_Activity_OwnedBy','Siebel_Camp_Name','Siebel_ContactHomePhone','Siebel_Contact_Acct_City','Siebel_Contact_Acct_Ctry','Siebel_Contact_Acct_State','Siebel_Contact_Acct_Zip','Siebel_Contact_Email_Addr','Siebel_Contact_First_Name','Siebel_Contact_Last_Name','Siebel_Contact_Mid_Name','Siebel_Contact_Ph','Siebel_Contact_Row_Id','Siebel_Contact_St_Addr','Siebel_Login','Siebel_Oppty_Ref_Id','Siebel_Oppty_Status','Siebel_Prim_Acct_City','Siebel_Prim_Acct_State','Siebel_Prim_Acct_Zip','Site','SiteID','SiteName','SiteSecured','SolutionsDemoPortal','SourceCode','Source_Code','Standards','StartDefaultPage','Suk_en_hho_psc[]','Suk_en_smb_psc[]','SupApproval','Sysid','TIS_COOKIE','TIS_ERROR','TIS_LOGON_ID','TMC Cookie.txt','TNSCollected','TOSSBidRef','TOSSBidRefApprover','Test','TossCallNeeded','USER_LOCALE_COOKIE','UnderAgeCustomer','UnmatchedSearch','UserEmail','UserExperience','UserID','UserName','UserType','VDNMCC','VISITORID','Valid','VignettePortal-NavTreeState-admin','VignettePortal-NavTreeState-dspp','WC_ACTIVEPOINTER','WC_AUTHENTICATION_[]','WC_CartOrderId_10151','WC_GENERIC_ACTIVITYDATA','WC_PERSISTENT','WC_SESSION_ESTABLISHED','WC_USERACTIVITY_-1002','WC_USERACTIVITY_[]','WebUserID','X-release','[]authUser','_SM_USERID','_rmc','_rmebus','_spark_session','abIcons','ad','affHomecookie','affHomecookieoper','agencyID','akaau','alreadyRegisterd_rfg','area','aunoticepoppedup','auth_cookie','auth_token','bCILead','basicCookie','basicSearch','bigdealsSite','bizaddrcity','bizaddrline1','bizcountry','bld_lvl_name','bsc_cc','bsc_lang','bsdSearchCode','building_name','c_lang','c_u','cae_browser','cc','cc%5Ftype','check','ckApp','ckBusinessGroup','ckBusinessUnit','ckCountry','ckCountryHierarchy','ckEmployeeInfo','ckFiscalPeriod','ckFiscalYear','ckQuestReport','ckRole','ckUserAccess','ckUserSelection','clickHistoryExt ','clickHistoryInt ','com_hp_hope','com_hp_jumpid','companyname','connectionType','country','ctoURL','ddj','default%5Ffirsttime','destination','dev-exp','downloadFromCart','downloadsw_SOFTWARE','dspp_c_u cookie','ePRIME_Session_Cookie[]','eSupportCookie','elAppHost','eloquaPdfSubmitted','eloquaSoftwareSubmitted','eloquaTouchpdfSubmitted','eloquaTouchsoftwareSubmitted','EMAIL','enssid','eprime_sid','errMsgTxt','externalLogin','externalLoginCookie','extractFunctionality','fQuotesOnly','fShowLease','fStateSelectionLink','fix_cc_err','fromQuickSpecs','fullharvest_[]','gss.api.gsid','hf_cookie_cart_id','hf_cookie_language','hf_cookie_password','hf_cookie_username','hf_use_pers_login','hf_vat_show_value','hp_cidww','hpdtmstatus','hpeuck_answ','hpeuck_cktst','hpeuck_lc','hpeuck_locale_ar','hpeuck_prefs','hpiscssid_[]','hpparts_cc','hpparts_lang','hppcf/','hppprofileid','hpstore_##cc##_##ll##_##segment##','hpstore_uk_en_hho','hpstore_uk_en_smb','iCareNumber','inBaseURL','isRegistered','iscs_rem_me','iscscart_[]','jscr','lang','languagePre_cookie','lastSearch','lib/pb_server.py.session_id','lithium.anonymous.usersetting.[]','locale','members','merchUserType','merch_NLOI','metricsKeys','mobile','modelNum','new_user_email','opselect','optrackMetrics','order%5Fid','origin','osb_itemNo_cookie_[]','ovrd_last_page','ovrdtarget','password','pdfSubmitted','pdf_authorized','pdf_track_metric','pdlogin','planer_portal','plloginOccured','pm%5Ftype','poSession','price%5Fmatrix','privacy','privacy_browser_locale','productNum','productdescription','promocontact','pwebsessionid','queueId','queueName','rbArchiveOrCurrentCookie','resultCookie','routingName','rtversion','sCISRCCode','s_ss_ses','s_u','scmrc','sdc','secSID','serialNum','serviceParam','sessState','session','SessionID','site_name','snfversion','softwareSubmitted','State','stepStack','store-emea-test','strKey','sw_authorized','sw_track_metric','sweetspot','tag_cartCookie','timeOffset','txtSearchCookie','tzoffset','uid','usbport_itemNo_cookie_[]','userAgentCookie','vmp_desktop_site','wc_locale','www8-prd-ecom-ck'];
var tracking_cookies = ['.HPMYROOM','ASPSESSIONIDAAQASRBR','ASPSESSIONIDAATCRTBR','ASPSESSIONIDAQADTSTT','ASPSESSIONIDASBBRRRQ','ASPSESSIONIDASSDCACA','ASPSESSIONIDCAAQBCRT','ASPSESSIONIDCATDQQBT','ASPSESSIONIDCSSDCACA','ASPSESSIONIDQQAARQSQ','ASPSESSIONIDQQADQTRQ','ASPSESSIONIDSADCSSSS','ASPSESSIONIDSQRACDRT','ASPSESSIONID[]','ATHP_COOKIE','CL%5FCookie','CL%5FHeader','CM_view','CPQ1Time','CRDTCSearchTerm','CSNBenchmark','CatalogCategoryID','Culture','DCCPRO%5FDPLUS%5F19701%5F90898','DCCPRO%5FDPLUS%5FSHOPPER%5F19701%5F90898','DCCPRO%5FDPLUS%5FSHOPPER%5F19701%5F90898','EkAnalytics','EktGUID','HHOJSID2','HPVC:AttendName:','HP_EBUS_SVCP','HP_EBUS_TIME','HP_TSUSB_SVCP','HumanClickACTIVE','IN_Company','IN_Country','IN_Email','IN_Name','IN_Phone','IN_Serial','LivePersonID','MMAppLog','MMAppLogStore','NSC_iq-efm_qppm_iuuq','NSC_iq-efm_qppm_ttm','OAX','Omniture','Pixel_Adwords_Snapfish','ProdListUrl','ProductLineCode','ProductRefID','QSI_S_ZN_37VeCQSvFMO7aWF','SDASM_Orderformation_ActiveWindows','SMTRYNO','SPF_DC_SID','Suk_en_smb_psc1222','Survey','TRADEDOUBLER','TakenTheSurvey','Technical','Tracking cookie','Typed/Bookmarked','UPS_ProductBrowse','UserID','Y4gQ7hab2NAAAAEzHhV9czuo','[]@bluekai.com','[]@hp.com','__g_c','__g_u','__utma','__utmb','__utmc','__utmz','_ezb_o','_ga','_gat_UA-53409747-[]','_rmc_n','axState[]','bk','bk0','bkc','bkdc','bklc','bko','bkou','bkp1','bkst','bku','bkw5','c%5Flang','c%5Fu','com_hp_gc','conCookie','ecm','gpv_pN','guest_id','h_cm2','hho_omni_usen','hpcompc_usen','hpjidc','hpshopping2','mbox','metrics[]','migrated','mmcore.pd','mmcore.srv','mmcore.tst','mmid','op1666topnav2gum','op1666topnav2liid','pgid','productCookie','prop12','regionCookie','s_cc','s_cpmscm','s_depth','s_dfa','s_invisit','s_pn','s_ppn','s_ppv','s_prevPage','s_re','s_sq','s_sv_sid','s_vi','s_vnum','sid','smbRMcookie','startTime','strCPQTestingCookiesValue','use_hitbox','userid-[]','vcportal'];
var personalization_cookies = ['AdReady Retargeting Pixel','B2BP_ACCT_LOGO','CPQ_CA','Converter','Criteo retargeting cookie','EMID','GUID','HP-BCO-PRODMEM-TRANSFER','HP-BCO-PRODMEMID','HPELOQUA','HPMYROOM','HPMyRoom.Language','HPMyRoomWeb.Country','HPMyRoomWeb.Language','HPOrg','HPVC:AttendName','HP_EBUS_HP_CLICKS','IsPartnerAdmin','LNG_257269261260253260230233252254252246233257260258264224251260200254206262','LastSite','PartnerProIdHQ','PhysCountry','SlmAccount','SlmLanguage','UPS_AnonymousID','UserGroups','UserPhone','UserRights','addr_1','addr_2','addr_3','bigdealsLogin','bizaddrarea','bizaddrline2','bizfax','bizfaxcityareacode','bizfaxextn','bizphone','bizphonecitycode','bizphonextn','bizpostalcode','bizstate','byside_webcare_tuid','city_name','clang','com_hp_jumpid','contact_contact_first_name','contact_contact_last_name','cpccountry','email','heleni.rememberMe','hp_cust_seg_sel','hp_last_segment','hp_rv_lc_lang','hpjumpidv2','postal_code','sdpRatingCookie_[]','sm_provider','smlang','sppSearchString','tabcookie','tz','userAgentCookie','user_locale','vcportal','wc_prods'];
var exDomains = ["X",'h10139.www1.hp.com','m.staples.pt','www.staples.pt','www.dustin.se','www.dustinhome.se','store.hp.com/SwitzerlandStore','ezbuy.houston.hp.com','ebuyer.com','orders.ebuyer.com','h40059.www4.hp.com','cat-ext-0.emea.hp.com','cat-ext5.atlanta.hp.com','cat-ext6.atlanta.hp.com','cat-ext.emea.hp.com','h41201.www4.hp.com'];
var aunotice_exDomains = ["X",'auth-h41225-pro-sitebuilder.houston.hp.com','h22166.www2.hp.com/Register/RegisterForm.aspx?cc=au&lang=en&eventid=NAA3ADMANQA4AA==','h22166.www2.hp.com/Register/RegisterForm.aspx?cc=au&lang=en&eventid=NAA3ADgAMwA1AA==','h22166.www2.hp.com/Register/RegisterForm.aspx?cc=au&lang=en&eventid=NAA3ADcAMgA2AA==','www8.hp.com/au/en/events/hp-taw2013/survey.html','www8.hp.com/au/en/events/hp-taw2013/survey-thankyou.html','www8.hp.com/au/en/events/hp-taw2013/register.html','www8.hp.com/au/en/events/hp-taw2013/register-thankyou.html','ssl.www8.hp.com/au/en/events/hp-taw2013/bigdata.html','ssl.www8.hp.com/au/en/events/hp-taw2013/bigdata-thankyou.html','ssl.www8.hp.com/au/en/events/hp-taw2013/mobility.html','ssl.www8.hp.com/au/en/events/hp-taw2013/mobility-thankyou.html','www8.hp.com/au/en/products/data-storage/index.html','www8.hp.com/au/en/products/data-storage/data-storage-solutions.html','www8.hp.com/au/en/products/data-storage/data-storage-products.html','www8.hp.com/au/en/products/data-storage/data-storage-partners.html','www8.hp.com/au/en/products/data-storage/data-storage-technology.html','www8.hp.com/au/en/business-solutions/solution.html','www8.hp.com/au/en/business-services/index.html','www8.hp.com/au/en/business-services/it-services.html','www8.hp.com/au/en/software/enterprise-software.html','www8.hp.com/au/en/software-solutions/software.html','www8.hp.com/au/en/industries/index.html','www8.hp.com/au/en/industries/communications-media-entertainment.html','www8.hp.com/au/en/industries/energy-distribution.html','www8.hp.com/au/en/industries/financial-services.html','www8.hp.com/au/en/industries/healthcare-life-sciences.html','www8.hp.com/au/en/industries/manufacturing.html','www8.hp.com/au/en/industries/public-sector.html','www8.hp.com/au/en/industries/retail-consumer-goods.html','www8.hp.com/au/en/industries/travel-transportation.html','sf-qa.com','sf-stg-qa.com','sf-beta-qa.com','snapfish.com','snapfish.co.uk','snapfish.de','snapfish.fr','snapfish.it','snapfish.at','snapfish.ch','snapfish.ca','snapfish.com.au','snapfish.co.nz','kachayu.com','truprint.co.uk','bootsphoto.com','spectra.ie','myphotos.virginmedia.com','photos.virginmedia.com','order.myprinting.de'];
var aunotice_exWebsections = ["X",'X'];if(typeof hpeuck_loaded === 'undefined') {
	var hpeuck_loaded = false;
}
if(!hpeuck_loaded) {
	//<IE9 fix
	Date.now = Date.now || function() { return +new Date; };
	
	//start the timer
	var hpeuck_timerStart = Date.now();
	
	//set the hpeuck_loaded loaded flag to true
	hpeuck_loaded = true;
	
	var page_domain = window.location.href.split('/');
	var page_domain = page_domain[0]+"//"+page_domain[2];
	
	var hpeuck_server = "http://";
	if (location.protocol === 'https:') {
		var hpeuck_server = "https://ssl.";
	}
	//interface css
	var hpeuck_css = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookie_privacy_popup td.q3{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 10px 0 0}\
		#cookie_privacy_popup td.q4{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 15px}\
		#cookie_privacy_popup td.notice{width: 350px; border: 0px; border-right: 1px solid #5A5A5A;padding: 0 15px}\
		#cookie_privacy_popup td.formsubmit{width: 70px; border: 0px; padding: 0 0 0 15px; vertical-align: middle;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; text-transform: uppercase; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.banner_popup { visibility: hidden; background-color: #252525; border-color: #626262; border-style: solid; border-width: 20px 10px 10px; height: 175px; left: 40%; position: absolute; top: 425px; width: 245px; } \
		.privacy_banner_close { height: 17px; width: 17px; background-image: url("'+hpeuck_server+'www8.hp.com/uk/en/images/i/header-footer/s-hf-hpe_462697.gif"); background-position: -368px -9px; float:right} \
		.small {line-height: 15px; font-size: 10px;}';

	//interface css for UK/EN
	var hpeuck_css_uk = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.small {line-height: 15px; font-size: 10px;}';
		
	//interface css for MX/ES
	var hpeuck_css_mx = '#cookie_privacy_holder {/*padding-top: 120px;*/ font-size: 12px; line-height: 15px; direction: ltr;}\
		#cookie_privacy_holder form table {margin: 0px; padding: 5px 0; border: 0px; border-collapse: separate;}\
		#cookie_privacy_holder form table td {margin: 0px; padding: 0px; border: 0px;}\
		.rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px; margin: 0px; margin-top: 5px;}\
		.rtxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif;font-size: 12px;}\
		#rptxt {color: #000; width: 200px; font-family: "HPSimplified", Arial,sans-serif;margin: 0px;font-size: 12px; margin: 0px;}\
		#rptxt a {color: #00A0D2; font-family: "HPSimplified", Arial,sans-serif; margin: 0px;font-size: 12px;}\
		#cookie_privacy_popup {position: absolute; display: block; /*height: 120px;*/ width: 100%; top: 0; left: 0; background: #efefef; z-index: 100; text-align: center;}\
		#cookie_privacy_popup form {margin: 10px auto; width: 1000px; text-align: left;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit {background: none #0096d6; border: 0 none; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified", Arial,sans-serif; font-size: 10px;font-weight: bold; margin-bottom: 0; padding: 2px 10px; border-radius: 0 5px 0 5px;}\
		.hppFormSubmit {border-radius: 0 4px 0 4px;}\
		#privacyShowDetails {margin-left: 10px;}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		.small {line-height: 15px; font-size: 10px;}';
	
	//interface css for responsive
	var hpeuck_css_r = '.sml {display:none} \
                @media only screen and (max-width: 320px) { .lrg {display:none} .sml {display: block} } \
		@media only screen and (min-width: 321px) and (max-width: 375px) { .lrg {display:none;} .sml {display: block} } \
		@media only screen and (min-width: 376px) and (max-width: 496px) { .lrg {display:none;} .sml {display: block} } \
		@media only screen and (min-width: 497px) and (max-width: 720px) { .sml{display:none;} .first_el{max-width:50%}  .sec_el {max-width:100%}} \
		@media only screen and (min-width: 721px) and (max-width: 934em) { .sml{display:none;} .first_el{max-width:50%}  .sec_el {max-width:100%}} \
		@media only screen and (min-width: 935px) {.sml{display:none}} \
		#cookie_privacy_holder {direction: ltr;font-size: 75%;line-height: 15px;font-family: HPSimplified, arial;background-color: #f2f2f2; -webkit-text-size-adjust:100%;} \
		#cookie_privacy_popup p {margin: 10px 2px} \
		#cookie_privacy_popup a {color: #00A0D2; text-decoration: underline} \
                .rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;margin: 0px; margin-top: 5px;}\
		#cookie_privacy_popup { background: none repeat scroll 0 0 #f2f2f2;display: block;text-align: left; top: 0; width: 100%; z-index: 100; max-width: 1000px;margin: 0 auto;color:#000;}\
		#cookie_privacy_popup form { font-family: "HPSimplified",Arial,sans-serif; text-align: left;width: 100%; display:inline-block;}\
                #cookie_privacy_popup label { float: left; margin-right: 10px; clear:none; width:auto}\
                #privacyShowDetails {margin-left: 10px;overflow:hidden;float:left}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit { background: none #0096D6;  border: 0 none; border-radius: 0 5px 0 5px; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified",Arial,sans-serif;    font-size: 133.3%;font-weight: bold;margin-bottom: 0; padding: 2px 10px; -webkit-appearance: none;height:36px;}\
		.hppFormSubmit { border-radius: 0 4px 0 4px;}\
                .first_el {float:left; margin-right: 30px;}\
                .sec_el {overflow:hidden;margin-bottom:2px}\
                .lrg input {margin: 4px;*margin: 1px}\
                .small { font-size: 84%; line-height: 15px;}';	

        //interface css for responsive UK
	var hpeuck_css_r_uk = '#cookie_privacy_holder {direction: ltr;font-size: 75%;line-height: 15px;font-family: HPSimplified, arial;background-color: #f2f2f2;-webkit-text-size-adjust:100%;} \
		#cookie_privacy_popup p {margin: 10px 2px} \
		#cookie_privacy_popup a {color: #00A0D2} \
                .rtxt {color: #000; font-family: "HPSimplified", Arial,sans-serif;margin: 0px; margin-top: 5px;}\
		#cookie_privacy_popup { background: none repeat scroll 0 0 #f2f2f2;display: block;text-align: left; top: 0; width: 100%; z-index: 100; max-width: 980px;margin: 0 auto;color:#000;}\
		#cookie_privacy_popup form { font-family: "HPSimplified",Arial,sans-serif; text-align: left;width: 100%; display:inline-block;}\
                #privacyShowDetails {margin-left: 10px;overflow:hidden;float:left}\
		#privacyShowDetails p { margin: 0px; padding: 0; color: #5A5A5A;font-family: "HPSimplified", Arial,sans-serif;}\
		#cookieFormSubmit { background: none #0096D6;  border: 0 none; border-radius: 0 5px 0 5px; color: #FFFFFF; cursor: pointer; font-family: "HPSimplified",Arial,sans-serif;    font-size: 133.3%;font-weight: bold;margin-bottom: 0; padding: 2px 10px; -webkit-appearance: none;height:36px;}\
		.hppFormSubmit { border-radius: 0 4px 0 4px;}\
                .first_el {float:left; margin-right: 30px; width: 50%}\
                .sec_el {overflow:hidden;margin-bottom:2px}\
                .lrg input {margin: 4px;*margin: 1px}\
                .small { font-size: 84%; line-height: 15px;}\
				@media only screen and (max-width: 496px) { .sec_el {clear:both} .first_el {width: 100%} .rtxt.lrg {display: none;} #cookieFormSubmit {float:left} #benefits {display:none}} \
				@media only screen and (min-width: 497px) { #cookieFormSubmit {float:right} } ';
				
//interface html
	var hpeuck_html = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td valign="top" class="q3">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span><label for="q3y"><input id="q3y" type="radio" value="1" name="option_fpf"><span class="rtxt">###yes###</span></label> <label for="q3n"><input id="q3n" type="radio" value="0" name="option_fpf" ><span class="rtxt">###no###</span></label>\
											</td>\
											<td valign="top" class="q4">\
												<span class="rtxt" style="display: block">###question_4###</span>&nbsp;<label for="q4y"><input id="q4y" type="radio" value="1" name="option_tpc"><span class="rtxt">###yes###</span></label> <label for="q4n"><input id="q4n" type="radio"  value="0" name="option_tpc" ><span class="rtxt">###no###</span></label>\
											</td>\
											<td valign="top" class="notice">\
												<span class="rtxt" style="display: block">###nottice###</span>\
											</td>\
											<td width=70 valign="middle" class="formsubmit">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
											<td valign="middle" style="border: 0px; padding: 0 10px; vertical-align: middle;">\
												<div id="rptxt" style="display: block; width: 260px;">\
													###disclaimer###\
												</div>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" colspan=5 style="padding: 0 10px">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
										</tr>\
									</table>\
								</div>\
								<div id="privacyShowDetails">\
									###unfold_area###\
								</div>\
							</form>\
							<div class="banner_popup" id="banner_popup"><div id="privacy_banner_close" class="privacy_banner_close" onclick="hpeuck_hide_bannerpopup();"> </div><p id="privacy_banner_p" class="privacy_p">Bitte wählen Sie "Ja" oder "Nein" um Cookies von HP und den HP Partnern zuzulassen.</p></div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';

	//interface for UK/EN
	var hpeuck_html_uk = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td width=900 valign="top" style="border: 0px; padding: 0 10px 0 0">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<input id="q3" type="hidden" name="option_fpf" value="1">\
												<input id="q4" type="hidden" name="option_tpc" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span>\
												<span class="rtxt" style="display: block">###question_4###</span>\
												<span class="rtxt" style="display: block">###nottice###</span>\
											</td>\
											<td width=500 valign="top" style="border: 0px; padding: 0 15px">\
												<span class="rtxt" style="display: block">###disclaimer###</span>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" style="padding: 0 10px; vertical-align: middle;">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
											<td width=70 valign="middle" align="right" style="border: 0px; padding: 0 0 0 15px; vertical-align: middle;">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
										</tr>\
									</table>\
								</div>\
								<div id="privacyShowDetails">\
									###unfold_area###\
								</div>\
							</form>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
	
	//interface for MX/ES
	var hpeuck_html_mx = '<!--googleoff: index-->\
						<noindex>\
						<div id="cookie_privacy_popup" class="custom_cookie_privacy_popup">\
							<form method="POST" name="privacyCookieForm" onsubmit="return savePrivacyPreferences()">\
								<div style="float:left">\
									<span class="rtxt"><strong>###heading###</strong></span>\
									<table cellspacing=0 cellpadding=0 border=0 style="padding: 5px 0;">\
										<tr>\
											<td width=700 valign="top" style="border: 0px; padding: 0 10px 0 0">\
												<input id="q1" type="hidden" name="option_tec" value="1">\
												<input id="q2" type="hidden" name="option_fpt" value="1">\
												<input id="q3" type="hidden" name="option_fpf" value="1">\
												<input id="q4" type="hidden" name="option_tpc" value="1">\
												<span class="rtxt" style="display: block">###question_3###</span>\
											</td>\
											<td width=700 valign="top" style="border: 0px; padding: 0 15px">\
												<span class="rtxt" style="display: block">###disclaimer###</span>\
											</td>\
										</tr>\
										<tr>\
											<td valign="top" style="padding: 0 10px; vertical-align: middle;">\
												<p class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyShowDetails()"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
											</td>\
											<td width=70 valign="middle" align="right" style="border: 0px; padding: 0 0 0 15px; vertical-align: middle;">\
												<span class="rtxt"><input type="submit" id="cookieFormSubmit" value="###button###" name="p_submit"></span>\
											</td>\
										</tr>\
										<tr>\
											<td colspan="2">\
												<div id="privacyShowDetails">\
													###unfold_area###\
												</div>\
											</td>\
										</tr>\
									</table>\
								</div>\
							</form>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
						
	//interface for responsive
	var hpeuck_html_r = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin-left:10px">\
							<p class="sml">###heading_responsive_mobile###</p>\
							<p class="lrg"><strong>###heading_responsive###</strong></p>\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<span style="display: block" class="rtxt">###question_3###</span>\
									<label for="q3y"><input type="radio" name="option_fpf" value="1" id="q3y"><span class="rtxt">###yes###</span></label>\
                                    <label for="q3n"><input type="radio" name="option_fpf" value="0" id="q3n"><span class="rtxt">###no###</span></label>\
									<span style="display: block; clear:both" class="rtxt">###question_4###</span>&nbsp;\
                                    <label for="q4y"><input type="radio" name="option_tpc" value="1" id="q4y"><span class="rtxt">###yes###</span></label>\
									<label for="q4n"><input type="radio" name="option_tpc" value="0" id="q4n"><span class="rtxt">###no###</span></label>\
                                    <p class="lrg" class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyResponsiveShowDetails()" data-position="auto"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###nottice###</p>\
									<p class="lrg">###disclaimer_responsive###</p>\
									<p class="sml">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
                                <div class="lrg">\
                                    <div id="privacyShowDetails">###unfold_area###</div>\
                                </div>\
							</form>\
                                                    </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';

	//interface for responsive UK
	var hpeuck_html_r_uk = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin: 0 10px">\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<input type="hidden" value="1" name="option_fpf" id="q3">\
									<input type="hidden" value="1" name="option_tpc" id="q4">\
									<p class="sml">###heading_responsive_mobile###</p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
							</form>\
                                                    </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
	
	    //interface for responsive MX
	var hpeuck_html_r_mx = '<!--googleoff: index-->\
						<noindex>\
						<div class="custom_cookie_privacy_popup" id="cookie_privacy_popup" >\
                                              <div style="margin: 0 10px">\
							<form onsubmit="return savePrivacyPreferences()" name="privacyCookieForm" method="POST">\
								<div class="lrg first_el">\
									<input type="hidden" value="1" name="option_tec" id="q1">\
									<input type="hidden" value="1" name="option_fpt" id="q2">\
									<input type="hidden" value="1" name="option_fpf" id="q3">\
									<input type="hidden" value="1" name="option_tpc" id="q4">\
									<p class="sml">###heading_responsive_mobile###</p>\
									<p class="lrg" class="rtxt" style="padding: 10px 0 0; clear: both;"><a href="" id="benefits" onclick="return privacyResponsiveShowDetails()" data-position="auto"><span id="plus_minus">+ </span>###unfold_link###</a></p>\
								</div>\
								<div class="sec_el">\
									<p class="lrg">###disclaimer_responsive_mobile###</p>\
									<span class="rtxt"><input type="submit" name="p_submit" value="###button###" id="cookieFormSubmit"></span>	\
								</div>\
								<div class="lrg">\
                                    <div id="privacyShowDetails">###unfold_area###</div>\
                                </div>\
							</form>\
                                                    </div>\
						</div>\
						</noindex>\
						<!--googleon: index-->';
						
	function hpeuck_localizeInterface(hpeuck_html, privacyText, index) {
		var html = hpeuck_html;
		html = html.replace("###heading###", privacyText[index][12]);
		html = html.replace("###question_3###", privacyText[index][5]);
		html = html.replace("###question_4###", privacyText[index][6]);
		html = html.replace("###yes###", privacyText[index][7]);
		html = html.replace("###yes###", privacyText[index][7]);
		html = html.replace("###no###", privacyText[index][8]);
		html = html.replace("###no###", privacyText[index][8]);
		html = html.replace("###yes###", privacyText[index][7]);
		html = html.replace("###yes###", privacyText[index][7]);
		html = html.replace("###no###", privacyText[index][8]);
		html = html.replace("###no###", privacyText[index][8]);
		html = html.replace("###nottice###", privacyText[index][13]);
		html = html.replace("###button###", privacyText[index][9]);
		html = html.replace("###disclaimer###", privacyText[index][14]);
		html = html.replace("###unfold_link###", privacyText[index][10]);
		html = html.replace("###unfold_area###", privacyText[index][11]);
		html = html.replace("###heading_responsive###", privacyText[index][23]);
		html = html.replace("###disclaimer_responsive###", privacyText[index][24]);
		html = html.replace("###heading_responsive_mobile###", privacyText[index][25]);
		html = html.replace("###disclaimer_responsive_mobile###", privacyText[index][26]);
		
		return html;
	}
	
	function privacyLoadScript(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {  //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" ||
						script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} 
		else {  //Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	function privacyReadCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function privacyCreateCookie(domain, name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
	}
	
	function privacyCreateCookieSeconds(domain, name,value,seconds) {
		if (seconds) {
			var date = new Date();
			date.setTime(date.getTime()+(seconds));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
	}

	function privacyListCookies() {
		var cookies = new Array();
		var ca = document.cookie.split(';');

		for(var i=0;i < ca.length;i++) {
			var pair = ca[i].split('=');
			pair[0] = pair[0].replace(/ /,"");
			cookies.push(pair[0]);
		}
		return cookies;
	}

	function privacyEraseCookie(name) {
		privacyCreateCookie(hpeuck_pageDomain, name,"",0);
		if (!isIE) {console.log("("+hpeuck_pageDomain+") Cookie "+name+" has been deleted");}
	}
	
	//create the reverse function for strings
	String.prototype.reverse = function(){
		return this.split("").reverse().join("");
	}

	function isCookieToBeDeleted(cookie_name, allowed_cookies) {
		var result = true;
		var cookie_allowed = "";
		var reversed_cookie_name = "";
		for(var j=0; j < allowed_cookies.length; j++) {
			if(cookie_name == allowed_cookies[j]) { //simple cookie
				result = false;
			}
			else if(allowed_cookies[j].indexOf("[]") > 0) { //wildcard is at the end of the cookie name
				cookie_allowed = allowed_cookies[j];
				var pos = cookie_allowed.indexOf("[]");
				cookie_allowed = cookie_allowed.substring(0, pos);
				if(cookie_name.indexOf(cookie_allowed) == 0) {
					result = false;
				}
			}
			else if(allowed_cookies[j].indexOf("[]") == 0){ //wildcard is at the begining of the cookie name
				cookie_allowed = allowed_cookies[j];
				var pos = cookie_allowed.indexOf("[]");
				cookie_allowed = cookie_allowed.substring(2, cookie_allowed.length);
				cookie_allowed = cookie_allowed.reverse();
				reversed_cookie_name = cookie_name.reverse();
				if(reversed_cookie_name.indexOf(cookie_allowed) > -1) {
					result = false;
				}
			}
		}
		return result;
	}

	function doPrivacyFiletring() {
		var ca = privacyListCookies();
		var allowed_cookies = new Array();
		
		for (i=0;i<hpeuck_privacy.length;i++) {
			if (hpeuck_privacy.charAt(i) == "1") {
				switch(i) {
					case 0 :
						allowed_cookies = allowed_cookies.concat(technical_cookies);
						break;
					case 1 :
						allowed_cookies = allowed_cookies.concat(tracking_cookies);
						break;
					case 2 :
						allowed_cookies = allowed_cookies.concat(personalization_cookies);
						break;
					default:
						allowed_cookies = allowed_cookies.concat(technical_cookies);
				}
			}
		}

		for(var i=0;i < ca.length;i++) {
			//do not delete the privacy cookie
			if (ca[i] != "hpeuck_prefs") {
				var tbDeleted = false;
				tbDeleted = isCookieToBeDeleted(ca[i], allowed_cookies);
				if(tbDeleted) {
					privacyEraseCookie(ca[i]);
				}
			}
		}
		//if (!isIE && window.performance) {console.log(privacyGetCookieStatistics(locale));}
	}

	function privacyValButton(btn) {
		var cnt = -1;
		for (var i=btn.length-1; i > -1; i--) {
			if (btn[i].checked) {cnt = i; i = -1;}
		}
		if (cnt > -1) return btn[cnt].value;
		else return null;
	}
	
	function getLocaleArrayFromCookie() {
		var locale = privacyReadCookie('hpeuck_locale_ar');
		if(locale != null) {
			locale_ar = locale.split("|");
			locale = Array(3);
			locale['cc'] = locale_ar[0];
			locale['ll'] = locale_ar[1];
			locale['mod'] = locale_ar[2];
		}
		return locale;
	}
	
	function hpeuck_show_bannerpopup() {
		var page_popup = document.getElementById('banner_popup');
		page_popup.style.background='#f2f2f2';
		page_popup.style.position='fixed';
		page_popup.style.top='40%';
		page_popup.style.borderColor='#ccc';
		page_popup.style.zfrm_index='99';
		
		var privacy_banner_popup = document.getElementById('privacy_banner_p');
		privacy_banner_popup.color = "#000000";
		privacy_banner_popup.fontFamily = "HPSimplified,Arial";
		privacy_banner_popup.fontSize = "16px";
		privacy_banner_popup.marginTop = "40px";
		page_popup.style.visibility='visible';
		if (document.getElementsByClassName) {
			document.getElementsByClassName('q4')[0].style.border = "2px solid #d7410b";
		}
		//IE8 fix
		else if (document.querySelectorAll) {
			document.querySelectorAll('.q4')[0].style.border = "2px solid #d7410b";
		}
		
}

	function hpeuck_hide_bannerpopup() { 
		document.getElementById('banner_popup').style.visibility='hidden'; 
		if (document.getElementsByClassName) {
			document.getElementsByClassName("q4")[0].style.border = "none";
			document.getElementsByClassName("q4")[0].style.borderRight = "1px solid #5A5A5A";
		}
		//IE8 fix
		else if (document.querySelectorAll) {
			document.querySelectorAll('.q4')[0].style.border = "none";
			document.querySelectorAll('.q4')[0].style.borderRight = "1px solid #5A5A5A";
		}
}

	function savePrivacyPreferences() {
		var hpeuck_q4_selected = 0;
		if(document.getElementById('q4y') != null) {
			if( (document.getElementById('q4y').checked) || (document.getElementById('q4n').checked)) {
				hpeuck_q4_selected = 1;
			}
		}
		else {
			hpeuck_q4_selected = 1;
		}
	    if( hpeuck_q4_selected === 1) {
  

			var option_tec = privacyValButton(document.forms.privacyCookieForm.option_tec); //technical cookies
			if(option_tec == null) {
				option_tec = "1";
			}
			var option_fpt = privacyValButton(document.forms.privacyCookieForm.option_fpt); //tracking cookies
			if(option_fpt == null) {
				option_fpt = "1";
			}
			var option_fpf = privacyValButton(document.forms.privacyCookieForm.option_fpf); //personalization cookies
			if(option_fpf == null) {
				option_fpf = "1";
			}
			var option_tpc = privacyValButton(document.forms.privacyCookieForm.option_tpc); //3rd party cookies
			if(option_tpc == null) {
				option_tpc = "1";
			}
			
			//sync  personalization and criteo cookis
			if(option_fpf == "1") {
				privacyEraseCookie("com_hp_hope");
				privacyCreateCookie(hpeuck_pageDomain, "com_hp_hope","", 365);
			}
			else {
				privacyEraseCookie("com_hp_hope");
				privacyCreateCookie(hpeuck_pageDomain, "com_hp_hope","g**X", 365);
			}
			
			document.getElementById('cookie_privacy_popup').style.display = 'none';
			document.getElementById("cookie_privacy_holder").style.paddingTop = "0px";

				   //create an event when banner is closed
			if (document.createEvent) {
					var privacyBannerClosed = document.createEvent('Event');
					privacyBannerClosed.initEvent('HP.PrivacyBanner.Closed', true, true);
					document.dispatchEvent(privacyBannerClosed);
				}
			else { //IE<9, cannot create custom event;
				privacyBannerClosedFlag=true;
			}
			
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
			
			hpeuck_privacy = option_tec+option_fpt+option_fpf+option_tpc;
			privacyCreateCookie(hpeuck_pageDomain, 'hpeuck_prefs',hpeuck_privacy, 365); 
			
			//track the CONTINUE action and answer
			try {
				var locale = getLocaleArrayFromCookie();
				trackMetrics("newLink", {name: locale['cc']+'_'+locale['ll']+'_hpeuck_bansave_ans_'+hpeuck_privacy });
			}catch(e){}
			
			window.hpeuck_privacy = privacyReadCookie('hpeuck_prefs');
			doPrivacyFiletring();
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","1", 365); //the form was asnwered by visitor 
		}
		
		else {
		   hpeuck_show_bannerpopup();
		}
		return false;
	}

	function privacyShowDetails() {
		var display = document.getElementById("privacyShowDetails").style.display;
		if((display == "none") || (display =="")) {
			document.getElementById("cookie_privacy_holder").style.paddingTop = hpeuck_maxHeight+"px";
			document.getElementById("cookie_privacy_popup").style.height = hpeuck_maxHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "block";
			document.getElementById("plus_minus").innerHTML = "- ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		else {
			document.getElementById("cookie_privacy_holder").style.paddingTop = hpeuck_minHeight+"px";
			document.getElementById("cookie_privacy_popup").style.height = hpeuck_minHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "none";
			document.getElementById("plus_minus").innerHTML = "+ ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		return false;
	}
	
	function privacyResponsiveShowDetails() {
	
        var display = document.getElementById("privacyShowDetails").style.display;
		if((display == "none") || (display =="")) {
			document.getElementById("cookie_privacy_popup").style.minHeight = hpeuck_maxHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "block";
			document.getElementById("plus_minus").innerHTML = "- ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}
		else {
            document.getElementById("cookie_privacy_popup").style.minHeight = hpeuck_minHeight+"px";
			document.getElementById("privacyShowDetails").style.display = "none";
			document.getElementById("plus_minus").innerHTML = "+ ";
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
		}          
		return false;
	}
	
	function privacyEBPageResize() {
		if(typeof initResizing == 'function') {
			initResizing();
		}
		if(typeof resizing == 'function') {
			resizing();
		}
	}
	
	function hpeuck_getIndexForLocale(cc, ll, hpeuck_allowedCC, hpeuck_allowedLL) {
		var index = null;
		for(i=0; i<hpeuck_allowedCC.length; i++) {
			if(cc.toLowerCase() == hpeuck_allowedCC[i] && ll.toLowerCase() == hpeuck_allowedLL[i]) {
				index = i;
			}
		}
		return index;
	}

	function cookiePrivacyMessage() {
		var sheet = document.createElement("style");
		var style = hpeuck_css;
		document.getElementsByTagName("head")[0].appendChild(sheet);
		try {
			sheet.innerText=style;
			sheet.innerHTML=style;
		}
		catch(e) {
			sheet.styleSheet.cssText=style;
		}
				
		document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
		
		//get the opened height
		hpeuck_maxHeight = hpeuck_getBannerHeight();
		
		//get the closed height
		document.getElementById('privacyShowDetails').style.display = "none";
		hpeuck_minHeight = hpeuck_getBannerHeight();
		
		//set the dimensions
		document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
		document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
		
		hpeuck_preselectAnswers(hpeuck_privacy);
	}
	
	function hpeuck_preselectAnswers(defaultSettings) {
		document.getElementById('q1').value = defaultSettings.charAt(0);
		document.getElementById('q2').value = defaultSettings.charAt(1);
		if(defaultSettings.charAt(2) == "1") {
			document.getElementById('q3y').checked = true;
			document.getElementById('q3n').checked = false;
		}
		else {
			document.getElementById('q3y').checked = false;
			document.getElementById('q3n').checked = true;
		}
		
		//exception for Germany
		var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;//All IE
		var tmp_locale = hpeuck_detectUserLocale(hpeuck_allowedCC, hpeuck_allowedLL, isIE);
		if (!(tmp_locale['cc'] == "de" && tmp_locale['ll'] == "de") || ((tmp_locale['cc'] == "de" && tmp_locale['ll'] == "de") && ((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile ))){
			if(defaultSettings.charAt(3) == "1") {
				document.getElementById('q4y').checked = true;
				document.getElementById('q4n').checked = false;
			}
			else {
				document.getElementById('q4y').checked = false;
				document.getElementById('q4n').checked = true;
			}
		}
	}

	function privacyGetMetaContent(mn) {
		var m = document.getElementsByTagName('meta');
		for(var i in m) {
			if (m[i].name == mn) {
				return m[i].content;
				break;
			}
		}
		return false;
	}

	function privacyGetUrlLocale(arr, allowedCC, allowedLL) {
		var url = window.location.href;
		var tmp = "";
		var ret = "";
		var ccll = "";
		var locale = false;
		for(i=0; i<arr.length; i++) {
		    ccll = arr[i].split('-');
		    ccll = ccll[1]+'/'+ccll[0];
			tmp = "/" + ccll + "/";
			if (url.indexOf(tmp) != -1) {
				ret = tmp.split("/");
				if(hpeuck_isLocaleEnabled(allowedLL, ret[2]) && hpeuck_isLocaleEnabled(allowedCC, ret[1])) {
					locale = new Array();
					locale['cc'] = ret[1];
					locale['ll'] = ret[2];
					locale['mod'] = "page_url";
					if (!isIE) { console.log("Locale detected from URL"); }
					break;
				}
			}
		}
		return locale;
	}

	function hpeuck_isLocaleEnabled(arr, obj) {
		var ret = false;
		if (arr && obj) {
			obj = obj.toLowerCase();
			if(obj == "gb") {
				obj = "uk";
			}
			for(var i=0; i<arr.length; i++) {
				if (arr[i].toUpperCase() == obj.toUpperCase()) ret = true;
			}
		}
		return ret;
	}

	function privacyTakeAction() {
		//check if cookie_privacy_holder div exists and if not, create it
		if(!document.getElementById('cookie_privacy_holder')) {
			var holder = document.createElement("div");
			holder.id = "cookie_privacy_holder";

                        //add exception for store pages, where "cookie_privacy_holder" div is injected into the "storePrivacyBlock" div
			if(document.getElementById('storePrivacyBlock')){
                                   document.getElementById('storePrivacyBlock').appendChild(holder);
                        }
                        else {
                                   if (document.body.firstChild) {
                                          document.body.insertBefore(holder, document.body.firstChild);
                                   }
                                   else {
                                          document.body.appendChild(holder);
                                   }
                       }
		}

		if (!hpeuck_answer || hpeuck_answer == "0") { 
			if(typeof customCookiePrivacyMessage == 'function') { //if custom cookie privacy message is found, execute that function
				if(hpeuck_isInIFrame === false) {
					if (!isIE) {console.log("Using the custom popup");}
					customCookiePrivacyMessage();
				}
			}
			else if(hpeuck_isInIFrame === false) {
				if (!isIE) {console.log("Using the default popup");}
				cookiePrivacyMessage(); 
			}
			
			//track the banner display
			try {
				var locale = getLocaleArrayFromCookie();
				trackMetrics("newLink", {name: locale['cc']+'_'+locale['ll']+'_hpeuck_banview_'+locale['cc']+'_'+locale['ll']+'_'+locale['mod'] });
			}catch(e) {}

			
			// add exception for EB pages: launch the page resize logic after the cookie privacy message is displayed
			privacyEBPageResize();
			// end of exception code
			
                        //create an event when banner is loaded
			if (document.createEvent) {
				var privacyBannerLoaded = document.createEvent('Event');
				privacyBannerLoaded.initEvent('HP.PrivacyBanner.Loaded', true, true);
				document.dispatchEvent(privacyBannerLoaded);
			}
			else { //IE<9, cannot create custom event
				 privacyBannerLoadedFlag = true;
			}	

			doPrivacyFiletring();
		}
		else {
			if (!isIE) {console.log("Privacy cookie is already set to "+hpeuck_privacy);}
			doPrivacyFiletring();
		}
	}

	function privacyGetPageDomain() {
		var domain = "";
		if(!/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/.test(window.location.hostname)) {
			domain = window.location.hostname.split(".");
			domain = "." + domain[domain.length-2] + "." + domain[domain.length-1];
		}
		else {
			domain = window.location.hostname;
		}
		return domain;
	}

	function cookiePrivacy() {
		//check if the user is accepting cookies
		var accept_cookie = "0";
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_cktst","1");
		accept_cookie = privacyReadCookie("hpeuck_cktst");
		privacyEraseCookie("hpeuck_cktst");
		if (accept_cookie == "1") {
			privacyTakeAction();
		}
		else {
			if (!isIE) {console.log("Browser is not accepting cookies");}
		}
	}
	
	function privacyExclude(domains) {
		var ret = false;
		var location = window.location.href;
		for(var i=0; i<domains.length; i++) {
			if(location.indexOf(domains[i]) > -1) {
				ret = true;
			}
		}
		return ret;
	}
	
	function privacyCheckReadyState() {
		if(document.readyState == "complete") {
			return true;
		}
		else {
			return false;
		}
	}
	
	function hpeuck_addOnloadEventOnPageReady() {
		if(!hpeuck_exclude && privacyCheckReadyState()) {
			cookiePrivacy();
			if (!isIE) {console.log("Launching the opt-in banner.");}
		}
		else {
			setTimeout(hpeuck_addOnloadEventOnPageReady,100);
		}
	}
	
	function hpeuck_getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	function hpeuck_getBannerHeight() {
		return document.getElementById('cookie_privacy_popup').offsetHeight;
	}
	
	function hpeuck_createXHR() {
		var xhr;
		
		if(window.XDomainRequest) {
			try {
				xhr = new window.XDomainRequest();
			}
			catch(e) {
				xhr = null;
			}
		}
		else {
			try {
				xhr = new XMLHttpRequest();
			}
			catch(e) {
				xhr = null;
			}
		}
		return xhr;
	}
	
	function hpeuck_localeCheck(ll, cc, locale_list) {
		var i = locale_list.length;
		cc = cc.toLowerCase();
		ll = ll.toLowerCase();
		if(cc == "gb") { cc = "uk"; }
		while (i--) {
			if (locale_list[i] == ll + '-' + cc) {
				if (!isIE) { console.log("CC-LL confirmed"); }
				return true;
			}
		}
		return false;
	}
	
	function hpeuck_detectUserLocale(hpeuck_allowedCC, hpeuck_allowedLL, isIE) {
		var cc = "";
		var ll = "";
		var locale = false;
		
		//check the page url
		locale = privacyGetUrlLocale(hpeuck_locales, hpeuck_allowedCC, hpeuck_allowedLL);
		
		if(!locale) {//try to get ll from HTML tag and ll from meta
			var lang = document.documentElement.lang;
			if(lang != null) {
				var tmp = lang.split("-");
				if (tmp.length > 1) { //lang attribute contains ll-cc
					ll = tmp[0];
					cc = tmp[1];
				}
				else { //lang attribute contains only ll
					ll = lang;
					cc = privacyGetMetaContent("target_country");
				}
				if (hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {  
					locale = new Array();
					locale['cc'] = cc;
					locale['ll'] = ll;
					locale['mod'] = "page_source";
					if (!isIE) { console.log("Locale detected from page source"); }
				}
			}
			else { //get the country from the meta tag and try to match the language
				cc = privacyGetMetaContent("target_country");
				ll = hpeuck_matchLanguage(cc, hpeuck_locales);
				if(ll) {
					if (hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "meta";
						if (!isIE) { console.log("Locale detected from meta information"); }
					}
				}
			}
		}
		
		if(!locale) {//try to get the language from the lang cookie
			var cookie_locale = privacyReadCookie("lang");
			if(cookie_locale != null) {
				var tmp = cookie_locale.split("-");
				if(tmp.length > 1) {//lang contains ll-cc combination
					cc = tmp[1];
					ll = tmp[0];
					if (hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "lang_cookie";
						if (!isIE) { console.log("Locale detected from lang cookie"); }
					}
				}
			}
		}
		
		//detecting browser locale.
		if(isIE) { //for IE
			if(!locale) {
				//console.log("Trying to detect browser locale for IE browsers...");
				hpeuck_lc = privacyReadCookie("hpeuck_lc");
				if(!hpeuck_lc) { //if cookie is not present (also means that dynamic script call is not disabled)
					privacyCreateCookieSeconds(hpeuck_pageDomain, "hpeuck_lc","0", 3600000);
					//first disable the request to protect against request to dynamic script taking long time, time in which the user may navigate to other pages, initiating more requests
					
					//console.log("loading the dynamic jsp");
					if (document.location.protocol == "https:") { var heuck_jsp = "https://ssl.www8.hp.com/ww/en/system/include/privacy_cookie_dynamic.jsp";	}
					else { var heuck_jsp = "http://www8.hp.com/ww/en/system/include/privacy_cookie_dynamic.jsp"; }
					
					var trdnames = "stg.www8.hp.com|www8.hp.com|g4t0539a.houston.hp.com|g4t0577a.houston.hp.com|d9t0164g.houston.hp.com:30002|d9t0164g.houston.hp.com:30004"; 
					//pro stg|pro live|itg stage|itg live|dev2 stage|dev2 live
					var dm = trdnames.split('|');
					for(var k = dm.length-1; k >= 0; k = k - 1) {
						if(document.location.href.indexOf(dm[k]) != -1) {
							heuck_jsp = page_domain + "/ww/en/system/include/privacy_cookie_dynamic.jsp";
							break;
						}
					}
					
					privacyLoadScript(heuck_jsp, function () {
						//console.log("dynamic jsp loaded");
						hpeuck_lc = privacyReadCookie("hpeuck_lc");
						if(window.hpeuck_result == "unknown") { //if browser locale can't be detected by the dynamic script
							privacyCreateCookieSeconds(hpeuck_pageDomain, "hpeuck_lc","0", 3600000*24*30); //disable the call to dynamic script for 30 days
							//console.log("dynamic jsp can't determine the browser locale");
							//console.log("the call to dynamic jsp is disabled for 30 days");
						}
						else if(hpeuck_lc != "0" && hpeuck_lc != null) { //if we have result, extract cc/ll information
							//console.log("reading the results");
							var tmp = hpeuck_lc.split("-");
							cc = tmp[1];
							ll = tmp[0];
							if (hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
								locale = new Array();
								locale['cc'] = cc;
								locale['ll'] = ll;
								locale['mod'] = "browser";
								
								//convert values to lower case
								if(locale['cc']) {locale['cc'] = locale['cc'].toLowerCase();}
								if(locale['ll']) {locale['ll'] = locale['ll'].toLowerCase();}
								//include workaround for GB cc
								if(locale['cc'] == "gb") {locale['cc'] = "uk";}
								//console.log("browser locale settings "+locale['cc']+"/"+locale['ll']+" | mod: "+locale['mod']);
								hpeuck_launch(locale, hpeuck_allowedCC, hpeuck_allowedLL, window.hpeuck_privacy, window.hpeuck_html, window.privacyText); //launch the banner
							}
						}
						else {
							//console.log("we have a problem with the dynamic jsp script: " + heuck_jsp);
						}
					});
				}
				else if(hpeuck_lc != "0" && hpeuck_lc != null) { //if there is result in the cookie
					//console.log("reading browser locale from hpeuck_lc cookie");
					var tmp = hpeuck_lc.split("-");
					cc = tmp[1];
					ll = tmp[0];
					if (hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "browser";
						
					}
				}
			}
		}
		else { //for non IE browsers
			if(!locale) {//try to get the language from the browser settings
				var browserLang = (navigator.language) ? navigator.language : navigator.userLanguage;
				if(browserLang != null) {
					var tmp = browserLang.split("-");
					if(tmp.length > 1) {//browser lang contains ll-cc combination
						cc = tmp[1];
						ll = tmp[0];
						if (hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll) && hpeuck_isLocaleEnabled(hpeuck_allowedCC, cc) && hpeuck_localeCheck(ll, cc, hpeuck_locales)) {
							locale = new Array();
							locale['cc'] = cc;
							locale['ll'] = ll;
							locale['mod'] = "browser";
							if (!isIE) { console.log("Locale detected from browser"); }
						}
					}
				}
			}
		}
		
		//convert values to lower case
		if(locale['cc']) {locale['cc'] = locale['cc'].toLowerCase();}
		if(locale['ll']) {locale['ll'] = locale['ll'].toLowerCase();}
		//include workaround for GB cc
		if(locale['cc'] == "gb") {locale['cc'] = "uk";}
		
		if (!isIE) { console.log("Detected locale ("+locale['mod']+"): "+locale['cc']+"/"+locale['ll']); }
		
		return locale;
	}
	
	function hpeuck_matchLanguage(cc, llCCArray) {
		var result = false;
		var tmp = "";

		//for(var i in llCCArray) {
		for(var i=0; i<llCCArray.length; i++) {

			tmp = llCCArray[i].split("-");
			if(cc == tmp[1]) {
				result = tmp[0];
				break;
			}
		}
		return result;
	}
	
	function hpeuck_launch(locale, hpeuck_allowedCC, hpeuck_allowedLL, hpeuck_privacy, hpeuck_html, privacyText) {
		if(locale) {
			var hpeuck_index = hpeuck_getIndexForLocale(locale['cc'], locale['ll'], hpeuck_allowedCC, hpeuck_allowedLL);
			
			if(!hpeuck_privacy || hpeuck_answer == 0) {
				
				window.hpeuck_privacy = privacyText[hpeuck_index][0];
				privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
				if (!isIE) {console.log("Default settings for country: "+hpeuck_privacy);}
			}
			
			window.hpeuck_html = hpeuck_localizeInterface(hpeuck_html, privacyText, hpeuck_index);
			
			hpeuck_addOnloadEventOnPageReady();
		}
		else {
			if (!isIE) { console.log("Privacy banner is not enabled.");	}
		}
	}
	
	function hpeuck_mobileDetect() {
		var result = false;
		var nav = navigator.userAgent.toLowerCase();
		if (nav.match(/iphone|ipod|ipad|android|webos|iemobile|blackberry/i)) {result = true;}
		return result;
	}
	
	function privacyGetCookieStatistics(locale) {
		var ca = document.cookie.split(';');
		var cSize = 0;
		var statistics = ca.length;
		
		for(var i=0;i < ca.length;i++) {
			var pair = ca[i].split('=');
			pair[0] = pair[0].replace(/ /,"");
			pair[1] = pair[1].replace(/ /,"");
			cSize = cSize + pair[0].length + pair[1].length;
		}
		statistics = statistics+"_"+cSize+"B";
		
		var hpeuck_load_time = Date.now()-window.performance.timing.navigationStart;
		var cc_ll = "";
		if(locale['cc'] && locale['ll']) {
			cc_ll = locale['cc'] + "-" + locale['ll'] + "_";
		}
		var prefix = cc_ll;
		try {
			if(!hpmmd.page.name) {
				prefix = prefix + "cktrk_other_";
			}
			else if(hpmmd.page.name == "welcome-home") { //check if we are on the homepage
				prefix = prefix + "cktrk_homepage_";
			}
		}
		catch(e) {}
		statistics = prefix + statistics + "_" + hpeuck_load_time + "ms";
		
		return statistics;
	}

	var hpeuck_minHeight = 0;
	var hpeuck_maxHeight = 0;
	
	var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;//All IE
	
	exDomains.shift();
	var hpeuck_exclude = privacyExclude(exDomains);
	
	var hpeuck_lc = privacyReadCookie("hpeuck_lc");
	
	var hpeuck_isInIFrame = (self!=window) ? true : false;
	var hpeuck_pageDomain = privacyGetPageDomain();
	
	var hpeuck_answer = privacyReadCookie('hpeuck_answ');
	if(!hpeuck_answer) {
		hpeuck_answer = 0;
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","0", 365);
	}
	
	if(typeof window.locale === 'undefined') { //check if locale array is not defined in the page source (this is the case for snapfish)
		var locale = hpeuck_detectUserLocale(hpeuck_allowedCC, hpeuck_allowedLL, isIE);
	}
	
	if(locale) {
		locale['cc'] = locale['cc'].toLowerCase();
		locale['ll'] = locale['ll'].toLowerCase();
		var hpeuck_index = hpeuck_getIndexForLocale(locale['cc'], locale['ll'], hpeuck_allowedCC, hpeuck_allowedLL);
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_locale_ar",locale['cc']+'|'+locale['ll']+'|'+locale['mod'], 0);
	}
	else {
		if (!isIE) {console.log("no locale information");}
	}
	
	var hpeuck_privacy = privacyReadCookie('hpeuck_prefs');
	if(hpeuck_privacy == "11nullnull") {
		hpeuck_privacy = privacyText[hpeuck_index][0];
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
		privacyCreateCookie(hpeuck_pageDomain, "hpeuck_answ","0", 365);
		hpeuck_answer = privacyReadCookie('hpeuck_answ');
	}
	
	var hpeuck_mobile = hpeuck_mobileDetect();
	
	if (locale){
		
		if(!hpeuck_privacy || hpeuck_answer == 0) {
			
			hpeuck_privacy = privacyText[hpeuck_index][0];
			privacyCreateCookie(hpeuck_pageDomain, "hpeuck_prefs",hpeuck_privacy, 365);
			if (!isIE) {console.log("Default settings for country: "+hpeuck_privacy);}
		}
		
		if((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile){ //use responsive template for pages using responsive CaaS or mobile pages
                        if(locale['cc'] == "uk" && locale['ll'] == "en") { //use different template for uk/en
                                hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r_uk, privacyText, hpeuck_index);
				
			       //define the customCookiePrivacyMessage for responsive
			      var customCookiePrivacyMessage = function() {
				   var sheet = document.createElement("style");
				    var style = hpeuck_css_r_uk;
				    document.getElementsByTagName("head")[0].appendChild(sheet);
				try {
					sheet.innerText=style;
					sheet.innerHTML=style;
				}
				catch(e) {
					sheet.styleSheet.cssText=style;
				}
						
				document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
				
				//get the opened height
				hpeuck_maxHeight = hpeuck_getBannerHeight();
				
				//get the closed height
				//document.getElementById('privacyShowDetails').style.display = "none";
				hpeuck_minHeight = hpeuck_getBannerHeight();
				
				//set the dimensions
				document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
				}
                        }
			else if (locale['cc'] == "mx" && locale['ll'] == "es") {
				//use different template for mx/es
                    hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r_mx, privacyText, hpeuck_index);
				
			       //define the customCookiePrivacyMessage for responsive
			      var customCookiePrivacyMessage = function() {
				   var sheet = document.createElement("style");
				    var style = hpeuck_css_r_uk;
				    document.getElementsByTagName("head")[0].appendChild(sheet);
				try {
					sheet.innerText=style;
					sheet.innerHTML=style;
				}
				catch(e) {
					sheet.styleSheet.cssText=style;
				}
						
				document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
				
				//get the opened height
				hpeuck_maxHeight = hpeuck_getBannerHeight();
				
				//get the closed height
					document.getElementById('privacyShowDetails').style.display = "none";
					hpeuck_minHeight = hpeuck_getBannerHeight();
					
					//set the dimensions
					document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
                    window.onresize=function(){
						if ((document.getElementById('privacyShowDetails').style.display == "block") && (window.innerWidth<497)) {
									  document.getElementById('privacyShowDetails').style.display = "none";
									  document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
									  document.getElementById("plus_minus").innerHTML = "+ ";
						}                                                     
				    };
			 }}
			 else {
                            	hpeuck_html = hpeuck_localizeInterface(hpeuck_html_r, privacyText, hpeuck_index);
				
				//define the customCookiePrivacyMessage for responsive
				var customCookiePrivacyMessage = function() {
					var sheet = document.createElement("style");
					var style = hpeuck_css_r;
					document.getElementsByTagName("head")[0].appendChild(sheet);
					try {
						sheet.innerText=style;
						sheet.innerHTML=style;
					}
					catch(e) {
						sheet.styleSheet.cssText=style;
					}
							
					document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
					
					//get the opened height
					hpeuck_maxHeight = hpeuck_getBannerHeight();
					
					//get the closed height
					document.getElementById('privacyShowDetails').style.display = "none";
					hpeuck_minHeight = hpeuck_getBannerHeight();
					
					//set the dimensions
					document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
                    window.onresize=function(){
						if ((document.getElementById('privacyShowDetails').style.display == "block") && (window.innerWidth<497)) {
									  document.getElementById('privacyShowDetails').style.display = "none";
									  document.getElementById('cookie_privacy_popup').style.minHeight = hpeuck_minHeight+"px";
									  document.getElementById("plus_minus").innerHTML = "+ ";
						}                                                     
				    };
                    hpeuck_preselectAnswers(hpeuck_privacy);
				}
                           }
		}
		else if(locale['cc'] == "mx" && locale['ll'] == "es") { //use different template for mx/es
			hpeuck_html = hpeuck_localizeInterface(hpeuck_html_mx, privacyText, hpeuck_index);
			
			//define the customCookiePrivacyMessage for mx/es
			var customCookiePrivacyMessage = function() {
				var sheet = document.createElement("style");
				var style = hpeuck_css_mx;
				document.getElementsByTagName("head")[0].appendChild(sheet);
				try {
					sheet.innerText=style;
					sheet.innerHTML=style;
				}
				catch(e) {
					sheet.styleSheet.cssText=style;
				}
						
				document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
				
				//get the opened height
				hpeuck_maxHeight = hpeuck_getBannerHeight();
				
				//get the closed height
				document.getElementById('privacyShowDetails').style.display = "none";
				hpeuck_minHeight = hpeuck_getBannerHeight();
				
				//set the dimensions
				document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
				document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
			}
		}
		else if(locale['cc'] == "uk" && locale['ll'] == "en") { //use different template for uk/en
			hpeuck_html = hpeuck_localizeInterface(hpeuck_html_uk, privacyText, hpeuck_index);
			
			//define the customCookiePrivacyMessage for mx/es
			var customCookiePrivacyMessage = function() {
				var sheet = document.createElement("style");
				var style = hpeuck_css_uk;
				document.getElementsByTagName("head")[0].appendChild(sheet);
				try {
					sheet.innerText=style;
					sheet.innerHTML=style;
				}
				catch(e) {
					sheet.styleSheet.cssText=style;
				}
						
				document.getElementById('cookie_privacy_holder').innerHTML = hpeuck_html;
				
				//get the opened height
				hpeuck_maxHeight = hpeuck_getBannerHeight();
				
				//get the closed height
				document.getElementById('privacyShowDetails').style.display = "none";
				hpeuck_minHeight = hpeuck_getBannerHeight();
				
				//set the dimensions
				document.getElementById('cookie_privacy_holder').style.paddingTop = hpeuck_minHeight+"px";
				document.getElementById('cookie_privacy_popup').style.height = hpeuck_minHeight+"px";
			}
		}
		else {
			hpeuck_html = hpeuck_localizeInterface(hpeuck_html, privacyText, hpeuck_index);
		}
		
		//make sure the script doesn't overwrite already existing onreadystatechange events
		if(typeof document.onreadystatechange == 'function') {
			hpeuck_onreadystatechange_fn = document.onreadystatechange;
			if (!isIE) {console.log("Page onreadystatechange detected.");}
		}
		else {
			hpeuck_onreadystatechange_fn = function() {
				if (!isIE) {console.log("Page has no onreadystatechange event.");}
			}
		}
		if (document.readyState == "complete" && !hpeuck_exclude) {
			if (!isIE) {console.log("Document readyState is already completed - not adding onreadystatechange");}
			if (!isIE) {console.log("Launching the opt-in banner.");}
			cookiePrivacy();
		}
		else {

			document.onreadystatechange = function () {
				hpeuck_onreadystatechange_fn();
				if (document.readyState == "complete" && !hpeuck_exclude) {
					if (!isIE) {console.log("Launching the opt-in banner.");}
					cookiePrivacy();
				}
			}
		}
		
	}
	else if(hpeuck_answer == 1) { //if the banner is not enabled on the country, but the user has set preferences
		if (!isIE) { console.log("Privacy banner settings are set: "+hpeuck_privacy);	}
		if (!isIE) { console.log("Executing cleanup logic.");	}
		doPrivacyFiletring();
	}
	else {
		if (!isIE) { console.log("Privacy banner is not enabled.");	}
		//if (!isIE && window.performance) { console.log(privacyGetCookieStatistics(locale));}
	}
	
	function hpeuck_cookie_privacy_launch() {
		var locale = hpeuck_detectUserLocale(hpeuck_allowedCC, hpeuck_allowedLL, isIE);
		if (locale && !hpeuck_exclude) { //if we have proper locale and domain is not on excluded list
			cookiePrivacy();
		}
	}

///////////////////////////// aunotice
	///// config:
	var aunotice_locales = ['en-au'];
	var aunotice_allowedCC = ['au'];
	var aunotice_allowedLL = ['en'];
	var locale = false;

	if (!isIE) { console.log("aunotice logic start"); }

	function aunoticeTrimStr(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	// aunotice function to check if websection id of page is on exception list
	function aunoticeExcludeWebsection(websections) {
		var ret = false;
		var websectionid = privacyGetMetaContent("web_section_id");

		if (websectionid) {
			for(var i=0; i<websections.length; i++) {
				if(aunoticeTrimStr(websectionid).toLowerCase() == aunoticeTrimStr(websections[i].toLowerCase()) ) {
					ret = true;
					if (!isIE) { console.log("aunotice websection exception match: " + websections[i]); }
				}
			}
		}
		return ret;
	}


	// aunotice function to detect locale - based on url (searching for cc/ll string), html lang arg, or target_country metatag.
	function aunotice_detectUserLocale(aunotice_allowedCC, aunotice_allowedLL, isIE) {
		var cc = "";
		var ll = "";
		var locale = false;

		//check the page url
		locale = privacyGetUrlLocale(aunotice_locales, aunotice_allowedCC, aunotice_allowedLL);

		if(!locale) {//try to get ll from HTML tag and ll from meta
			var lang = document.documentElement.lang;
			if(lang != null) {
				var tmp = lang.split("-");
				if (tmp.length > 1) { //lang attribute contains ll-cc
					ll = tmp[0];
					cc = tmp[1];
				}
				else { //lang attribute contains only ll
					ll = lang;
					cc = privacyGetMetaContent("target_country");
				}
				if (hpeuck_isLocaleEnabled(aunotice_allowedCC, cc) && hpeuck_isLocaleEnabled(hpeuck_allowedLL, ll)) {  
					locale = new Array();
					locale['cc'] = cc;
					locale['ll'] = ll;
					locale['mod'] = "page_source";
					if (!isIE) { console.log("aunotice Locale detected from page source"); }
				}
			}
		}

		if(!locale) {//get the country from the meta tag and try to match the language
			cc = privacyGetMetaContent("target_country");
			if(cc) {
				ll = hpeuck_matchLanguage(cc, aunotice_locales);
//alert("ll " + ll);
				if(ll) {
					if (hpeuck_isLocaleEnabled(aunotice_allowedCC, cc) && hpeuck_isLocaleEnabled(aunotice_allowedLL, ll)) {
						locale = new Array();
						locale['cc'] = cc;
						locale['ll'] = ll;
						locale['mod'] = "meta";
						if (!isIE) { console.log("aunotice Locale detected from meta information"); }
					}
				}
			}
		}
//alert(locale['cc'] + "/" + locale['ll']);
		if (!isIE) { console.log("aunotice Detected locale ("+locale['mod']+"): "+locale['cc']+"/"+locale['ll']); }
		return locale;
	}

	function aunoticeLoadPopup() {
		var popurl="http://h20426.www2.hp.com/program/au/en/important-notice.html";
		winpops=window.open(popurl,"","width=540,height=500,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1");
	}
    
	function aunoticeShowPageNotice() {
		if(privacyCheckReadyState()) {
//alert("hejhoX");
			var notice_holder = document.createElement("div");
			notice_holder.id = "notice_holder";
            var hpnotice_html = "";
			var hpnotice_css = "";
			if((window.HP && HP.responsiveHeader) || (window.HP && HP.mobileResponsiveHeader) || hpeuck_mobile) {
				hpnotice_html = "<div id=\"inacr\" style=\"background-color: #000;color: #FFF;padding: 10px;font-family: 'Times New Roman',Times,serif; margin: 0 auto; max-width: 1000px;\"><a style=\"color: #FFFFFF;text-decoration: none;\" target=\"_blank\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\">IMPORTANT NOTICE ABOUT CONSUMER RIGHTS</a></div>";
				hpnotice_css = "@media only screen and (max-width: 20em) { #notice_holder { font-size: 0.75em; padding: 0px;}}\
								@media only screen and (min-width: 20.0001em) and (max-width: 31em) {#notice_holder { font-size: 0.75em; padding: 0;}}\
								@media only screen and (min-width: 31.0001em) and (max-width: 50em) { #notice_holder { font-size: 1em; padding: 0;}}\
								@media only screen and (min-width: 50.0001em) { #notice_holder { font-size: 1em; padding: 0;}}";
			}
			else {
				if (document.location.protocol == "https:") {
					 hpnotice_html = "<div style=\"height:34px; margin:0 auto; width: 1000px;\"><a target=\"_new\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\"><img src=\"https://ssl.www8.hp.com/ww/en/images/i/important-notice-large.jpg\" alt=\"IMPORTANT NOTICE ABOUT CONSUMER RIGHTS\" style=\"border: 0px solid ; width: 1000px; height: 34px; float: left;\"></a><div>";
	
				} else {
					 hpnotice_html = "<div style=\"height:34px; margin:0 auto; width: 1000px;\"><a target=\"_new\" href=\"http://www8.hp.com/au/en/ad/consumer_guarantees/warranty-policy.html?jumpid=in_r11566_au/en/hho/pps/pl_gi_ob_ds_pd/Important-notice_cc/dt\"><img src=\"http://www.www8-hp.com/ww/en/images/i/important-notice-large.jpg\" alt=\"IMPORTANT NOTICE ABOUT CONSUMER RIGHTS\" style=\"border: 0px solid ; width: 1000px; height: 34px; float: left;\"></a><div>";
	
				}
			}
			if (document.body.firstChild) {
					if (document.getElementById('cookie_privacy_holder'))
						document.getElementById('cookie_privacy_holder').parentNode.insertBefore(notice_holder, document.getElementById('cookie_privacy_holder').nextSibling);
					else 
						document.body.insertBefore(notice_holder, document.body.firstChild);
			}
			else
					document.body.appendChild(notice_holder);
			document.getElementById('notice_holder').innerHTML += hpnotice_html;
			if (!isIE) {console.log("Show aunotice notice.");}
		}
		else {
			setTimeout(aunoticeShowPageNotice,100);
		}
		
	}
	// Function to execute the aunotice logic
	function aunoticeTakeAction() {
		
		aunoticeShowPageNotice();
		
		// Execute popup logic:
//alert(document.cookie.indexOf('aunoticepoppedup'));
//		if (!privacyReadCookie('aunoticepoppedup')){
//			document.cookie="aunoticepoppedup=yes; path=/; domain=hp.com";
//			aunoticeLoadPopup();
//alert(document.cookie.indexOf('aunoticepoppedup'));
//		}

	}
	
	// Try to detect aunotice locale
	var locale = aunotice_detectUserLocale(aunotice_allowedCC, aunotice_allowedLL, isIE);

	aunotice_exDomains.shift();
	aunotice_exWebsections.shift();

	// If locale is detected, we can launch the aunotice logic; verifying we're not falling under any of the exceptions
	if (locale && (!privacyExclude(aunotice_exDomains)) && (!aunoticeExcludeWebsection(aunotice_exWebsections)) ) {
//	if (locale) {
		aunoticeTakeAction();
	}
}
