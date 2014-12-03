/**
 * @author Sofia Rizzi 
 * Classe javascript per customizzazione della Search Based Navigation 
 * NOTA: non si intende in sostituzione della SearchBasedNavigationJS. 
 */
dojo.require("wc.service.common");


wc.service.declare({
	id: "AjaxCategoryCustomResultsView",
	actionId: "AjaxCategoryCustomResultsView",
	url: getAbsoluteURL() + "AjaxCategoryCustomResultsView",
	formId: ""

	 /**
	 * display a success message
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,successHandler: function(serviceResponse) {
		
		console.log(serviceResponse);
		cursor_clear();
	}

	 /**
	 * display an error message
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation
	 */
	,failureHandler: function(serviceResponse) {

		console.log(serviceResponse);
		cursor_clear();
	}
});
/**
 * funzione jQuery per verificare se un elemento è visibile - onScreen
 */
$jq.fn.is_on_screen = function(){
    var win = $jq(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
 
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
 
    return (!(viewport.right < bounds.left 
    		|| viewport.left > bounds.right 
    		|| viewport.bottom < bounds.top 
    		|| viewport.top > bounds.bottom));
}
 /**
 * 
 */
if(typeof(SearchBasedNavigationDisplay) == "undefined" || SearchBasedNavigationDisplay == null || !SearchBasedNavigationDisplay){
	
	SearchBasedNavigationDisplay = {
		
		/**
		 *  Id del div contenente JSON con le informazioni di navigazione (pageNum, startIndex ecc.)
		 */
		CATALOG_SEARCH_INFO_ID: 'catalog_search_info',
		
		START_CATALOG_SEARCH_INFO_ID: 'start_catalog_search_info',
		
		newObjectSearchInfo : {},
		
		editorialScrollPageSize: 8,
		
		gridScrollPageSize: 20,
		
		/**
		 * Metodo richiamato alla selezione di una voce di filtraggio da menu di sx
		 * @param element
		 * @param id - id legato all'attributo che si è selezionato 
		 * @param section - Se FACET.SELECTION = 1 è possibile selezionare valori multipli => section = "", 
		 * 		  altrimenti section è valorizzata con il valore intero che serve a identificare 
		 * 		  la sezione della pagina i diversi filtri (section_0, section_1 ecc)
		 * @param imgUrlPath
		 * @param removeCaption
		 */ 
		toggleSearchFilter:function(element, id, section, imgUrlPath, removeCaption) {
			if(element.checked) {
				this.appendFilterFacet(id, section, imgUrlPath, removeCaption, true);
			}
			else {
				this.removeFilterFacet(id, section);
			}
			
			//riporto l'hash come al primo caricamento
			this.resetHash();
		},
		/**
		 * Richiamato da toggleSearchFilter alla selezione di un filtro
		 * @param vedi toggleSearchFilter
		 * 
		 */
		appendFilterFacet:function(id, section, imgUrlPath, removeCaption, doSearch) {
			// mi aspetto che section sia valorizzato essendo attivata la selezione singola 
			if (section!=""){
				var facetFilterList = $("section_"+ section);
				var filter = $("filter_" + id);
				// se il filtro esiste già non faccio nulla
				if(filter == null) {
					//valore del filtro selezionato sotto il nome del filtro (Colore, Taglia ecc)
					filter = document.createElement("a");
					filter.setAttribute("id", "filter_" + id);
					filter.setAttribute("class", "frg_selected_filter frg_selected_filter_capitalize");
					var label = $("facetLabel_" + id).innerHTML;
					filter.innerHTML = label;
					facetFilterList.appendChild(filter);
					
					//visualizzo la label "All"
					var resetFilterCont = $("li_reset_filter_" + section);
					if (resetFilterCont){
						resetFilterCont.setAttribute('class', 'frg_display');
					}
					
					//associo alla label "All" la funzione di rimozione del filtro appena selezionato
					var resetFilter = $("reset_filter_" + section);
					resetFilter.onclick = function(){
						SearchBasedNavigationDisplay.removeFilterFacet(id, section); 
						return false;
					}
					
					var labelAll = $("label_all_" + section);
					if (labelAll){
						labelAll.setAttribute("class", "frg_hidden");
					}
					/*
					 * All'interno della stessa section NON ci devono essere altre checkbox attive, a parte quella del filtro appena selezionato
					 * In caso ce ne siano, vengono deselezionate in modo che il metodo getEnabledFeatures che legge
					 * le checkbox selezionate ne legga sempre solo una per sezione.  
					 * In questo modo ricado nello standard wcs.
					 * 
					 * 
					 * Viene svuotata la sessionStorage e ripopolata con i facet corretti,
					 * in modo che NON vengono accodati due filtri per la stessa section. 
					 */
					$jq("#section_list_"+ section +" * input[id^=facet_checkbox]").each(function() {
					    if (this.checked){
					    	//confronto l'id della checkbox con quella appena selezionata
					        if (this.id != ("facet_checkbox" + id)){
					        	// esiste un altro valore con checked a true, lo rimuovo risalendo anche all'id del facet 
					        	var facetId = (this.id).replace('facet_checkbox', '');
								var oldfilter = $("filter_" + facetId);
								if(oldfilter != null) {
									facetFilterList.removeChild(oldfilter);
									$(this.id).checked = false;
								}
					        	
					        	//rimuovo da localStorage i filtri applicati
								SearchBasedNavigationDisplay.removeFacetsPersistence(facetId, section);
								
								//nascondo eventuali label di filtri non disponibili  
								var noFilterLabel = $jq('[id^=nofilter_section_list_]');
								for (var i=0; i < noFilterLabel.length; i++) {
									var label = noFilterLabel[i];
									label.setAttribute('class', 'frg_hidden');
								}
					        }
					    }
					});
					
					//rendo persistenti con sessionStorage i NUOVI filtri applicati
					this.setFacetsPersistence(id, section);
				}
				
				//procedo con la ricerca standard
				if (doSearch){
					var customProperties = [];
					customProperties['removeFacets'] = '0';
					this.doSearchFilter(customProperties, section);
				}
			}
		},
		/**
		 * Esegue la rimozione del filtro, ricaricando l'elenco completo dei risultati
		 * @param id - id legato all'attributo che si è selezionato 
		 * @param section - valore intero utilizzato per costruire gli id con cui sono identificati i diversi filtri (section_0, section_1 ecc)
		 */
		removeFilterFacet: function (id, section){
			var facetFilterList = $("section_"+ section);
			var filter = $("filter_" + id);
			if(filter != null) {
				facetFilterList.removeChild(filter);
				$("facet_checkbox" + id).checked = false;
			}
			
			// nascondo la label "All" interna alla sezione
			var resetFilterCont = $("li_reset_filter_" + section);
			if (resetFilterCont){
				resetFilterCont.setAttribute('class', 'frg_hidden');
			}
			
			// visualizzo la label sotto al nome del filtro
			var labelAll = $("label_all_" + section);
			if (labelAll){
				labelAll.setAttribute('class', 'frg_selected_filter');
			}
			
			//rimuovo da localStorage i filtri applicati
			this.removeFacetsPersistence(id, section);
			
			//nascondo eventuali label di filtri non disponibili  
			var noFilterLabel = $jq('[id^=nofilter_section_list_]');
			for (var i=0; i < noFilterLabel.length; i++) {
				var label = noFilterLabel[i];
				label.setAttribute('class', 'frg_hidden');
			}
			
			//valuto i facet applicati
			var facetsArray = this.getEnabledProductFacetsWithoutDisablingFilter();
			var customProperties = [];
			if (facetsArray && facetsArray.length == 0){
				//parametro per svuotare i facet lato server
				customProperties['removeFacets'] = '1';
			} else {
				customProperties['removeFacets'] = '0';
			}
			
			//standard
			this.doSearchFilter(customProperties, section);
		},
		/**
		 * Restituisce l'indice di navigazione corrente all'interno dello stream di prodotti di categoria
		 * @param objectSearchInfo - oggetto contenente le variabili necessarie al calcolo dell'indice
		 */
		getNewBeginIndex: function(objectSearchInfo){
			
			var newBeginIndex, lastBeginIndex, pageSize, firstPageSize;
			
			if (objectSearchInfo && objectSearchInfo.searchResult){
				var lastBeginIndex = objectSearchInfo.searchResult.lastBeginIndex;
				var pageSize = objectSearchInfo.searchResult.pageSize;
				var firstPageSize = objectSearchInfo.searchResult.firstPageSize;
				
				if (lastBeginIndex == 0){
					// la prima pagina ha una pageSize superiore per gestire i prodotti in evidenza nella prima riga mostrata
					newBeginIndex =  lastBeginIndex + firstPageSize; // firtPageSize = pageSize + 2
				} else {
					// sposto il beginIndex di un valore pari al pageSize dello show-more
					newBeginIndex =  lastBeginIndex + pageSize; 
				}
			}
			return newBeginIndex;
		},
		
		/**
		 * Restituisce il nuovo pageSize
		 * @param objectSearchInfo - oggetto contenente le variabili necessarie al calcolo del pageSize
		 */
		getNewPageSize: function(objectSearchInfo){
			
			var newPageSize;
			
			if (objectSearchInfo && objectSearchInfo.searchResult){
				
				var currentScrollNumber = objectSearchInfo.searchResult.currentScrollNumber;
				var env_maxEditorialScroll = objectSearchInfo.searchResult.env_maxEditorialScroll;
				
				if (currentScrollNumber < env_maxEditorialScroll){
					// Paginazione ad 8 prodotti per gli scroll editoriali
					newPageSize = this.editorialScrollPageSize;
				} else {
					// Paginazione a 12 prodotti per gli scroll a griglia
					newPageSize = this.gridScrollPageSize;
				}
			}
			return newPageSize;
		},
		
		/**
		 * Funzione richiamata in cascata alla postRefreshHandler della refresh-area in pagina di categoria
		 * tramite dojo.publish / subscribe in modo da non modificare il metodo standard (postRefreshHandler)
		 */
		registerSearchFilterCallback: function(){
			dojo.subscribe("CMPageRefreshEvent", function(){
				SearchBasedNavigationDisplay.doSearchFilterCallBack();
			});
			
			dojo.subscribe("pageCreatedFromBack", function(){
				SearchBasedNavigationDisplay.forceLocationHref();
			});
		},
		/**
 		 * Funzione di callback al caricamento della refresh area - pagina di categoria
 		 * Gestisce la visibilità della barra di show more a fondo pagina e ricarica un eventuale delta di prodotti
 		 * se e' presente l'informazione <beginIndex> nell'hash
		 */
		doSearchFilterCallBack: function(){
			console.log(':: doSearchFilterCallBack ::');

			//recupero oggetto con le informazioni di paginazione
			if (dojo.byId(this.CATALOG_SEARCH_INFO_ID)) {
				var objectSearchInfo = dojo.fromJson(dojo.byId(this.CATALOG_SEARCH_INFO_ID).innerHTML);
				var totalResultCount = objectSearchInfo.searchResult.totalResultCount;
				var newBeginIndex = this.getNewBeginIndex(objectSearchInfo);
				
			}
			
			
			
			//carico delta di prodotti in base a beginIndex su hash
			this.reloadPage();
		},
		/**
		 * Esegue la ricerca richiamando il metodo della classe STANDARD SearchBasedNavigationDisplayJS.doSearchFilter
		 * Attivata dai filtri presenti su menu sx
		 * @param customProperties: oggetto con parametri custom per refresh-area  
		 * @param section: intero (per selezione singola) che indica la sezione in cui si è attivato un filtro
		 */
		doSearchFilter: function(customProperties, section){
			//setto orderBy nella refresh-area 
			var objectSearchInfo = dojo.fromJson(dojo.byId(this.START_CATALOG_SEARCH_INFO_ID).innerHTML);
			if (objectSearchInfo){
				wc.render.getContextById('searchBasedNavigation_context').properties.orderBy = objectSearchInfo.searchResult.orderBy;
			}
			if (customProperties){
				for(key in customProperties){
					wc.render.getContextById('searchBasedNavigation_context').properties[key] = customProperties[key];
				}
			}
			
			//nascondo le voci di filtraggio 
			//a valle del filtraggio nella CategoryCustomResults.jsp viene riattivata la visibilità soltanto delle voci con count > 0
			for(var i = 0; i < SearchBasedNavigationDisplayJS.facetIdsArray.length; i++) {
				var facetValue = $("facet_" + SearchBasedNavigationDisplayJS.facetIdsArray[i]);
				if(facetValue && facetValue.id) {
					facetValue.setAttribute('class', 'frg_hidden');
				}	
			}
			//invocazione del metodo standard
			SearchBasedNavigationDisplayJS.doSearchFilter();
		},
		/**
		 * Funzione che mantiene l'informazione relativa ai filtri applicati tramite la classe custom SessionStoragePersistenceJS
		 * @param id - id del facet selezionato
		 * @param section - sezione all'interno della quale è stato attivato un filtro
		 */
		setFacetsPersistence: function(id, section){
			// recupero i filtri impostati
			var facetsArray = this.getEnabledProductFacetsWithoutDisablingFilter();
			
			//persistenza facets selezionati
			SessionStoragePersistenceJS.setObjectPersistence("facets", facetsArray);
			
			//persistenza selezione menu - es: menuSelection = { '1' : '40123494848325048481253250484841' , '2': 'ecc' }
			SessionStoragePersistenceJS.setJSONObjectPersistence("menuSelection", section, id);	
			
			//persistenza categoryId per cui sono stati applicati i filtri
			var objectSearchInfo = dojo.fromJson(dojo.byId(this.START_CATALOG_SEARCH_INFO_ID).innerHTML);
			if (objectSearchInfo) {
				var categoryId = objectSearchInfo.searchResult.categoryId;
				if (categoryId){
					SessionStoragePersistenceJS.setObjectPersistence("categoryId", categoryId);
				}
			}
		},
		/**
		 * Funzione che rimuove da sessionStorage l'informazione relativa ai filtri applicati
		 * @param id - id del facet selezionato
		 * @param section - sezione all'interno della quale è stato attivato un filtro
		 */
		removeFacetsPersistence: function(id, section){
			// recupero i filtri impostati
			var facetsArray = this.getEnabledProductFacetsWithoutDisablingFilter();
			
			//replace dei facets selezionati 
			SessionStoragePersistenceJS.setObjectPersistence("facets", facetsArray);
			
			//persistenza selezione menu - menuSelection = { '1' : '40123494848325048481253250484841' , '2': 'ecc' }
			SessionStoragePersistenceJS.removeJSONObjectPersistence("menuSelection", section, id);	

		},
		/**
		 * Eseguito per lo show more della pagina di categoria
		 * Effettua una chiamata ajax per recuperare l'HTML da iniettare a fondo pagina 
		 * @param categoryId - id della categoria corrente
		 * La paginazione non è standard e si basa sull'ultimo indice caricato (lastBeginIndex), a cui viene aggiunto un pageSize differente 
		 * a seconda che si tratti del primo caricamento o di quelli successivi (la prima pagina ha un numero di prodotti diverso avendo i primi due prodotti in evidenza)
		 * NOTA: altri parametri necessari per simulare la navigazione vengono recuperati da un oggetto JSON in pagina 
		 */
		showMore: function(categoryId){
			var newBeginIndex = 0;
			var params = [];
			var totalResultCount, lastBeginIndex, orderBy = null;
			var pageSize, firstPageSize = null;
			var doProcess = false;
			var currentScrollNumber = null;
			var frgPageName = null;
			var env_maxEditorialScroll = null;
			
			// recupero in pagina l'oggetto json <objectSearchInfo> con le informazioni di navigazione aggiornate (totalResultCount, pageSize, lastBeginIndex ecc) 
			var objectSearchInfo = null;
			if (dojo.byId(this.CATALOG_SEARCH_INFO_ID)){		
				//oggetto JSON
				objectSearchInfo = dojo.fromJson(dojo.byId(this.CATALOG_SEARCH_INFO_ID).innerHTML);
				
				//numero totale di prodotti da visualizzare in pagina
				totalResultCount = objectSearchInfo.searchResult.totalResultCount;
				
				//calcolo il prossimo indice da cui iniziare a caricare i dati
				newBeginIndex = this.getNewBeginIndex(objectSearchInfo);

				//memorizzo il valore del nuovo indice
				objectSearchInfo.searchResult.newBeginIndex = newBeginIndex;
				
				//memorizzo il numero dello scroll corrente
				currentScrollNumber = objectSearchInfo.searchResult.currentScrollNumber;
				
				//calcolo il valore del nuovo pageSize
				pageSize = this.getNewPageSize(objectSearchInfo);
				
				//memorizzo il valore del nuovo pageSize
				objectSearchInfo.searchResult.pageSize = pageSize;
				
				// Page name
				frgPageName = objectSearchInfo.searchResult.frgPageName;
				
				// env_maxEditorialScroll
				env_maxEditorialScroll = objectSearchInfo.searchResult.env_maxEditorialScroll;
				
				// in base al numero totale di prodotti da visualizzare e all'indice corrente (newBeginIndex) verifico se proseguire o meno
				doProcess = (newBeginIndex < totalResultCount);
				
				//ordinamento prodotti
				orderBy = objectSearchInfo.searchResult.orderBy;
			} else {
				doProcess = false;
			}
			
			if (doProcess){
				
				//parametri statici
				params.storeId = WCParamJS.storeId;  		
				params.catalogId = WCParamJS.catalogId;  	
				params.langId = WCParamJS.langId;   		
				params.categoryId = categoryId;	
				params.beginIndex = newBeginIndex;
				params.sType = '';
				params.orderBy = orderBy;
				params.currentScrollNumber = currentScrollNumber;
				params.frgPageName = frgPageName;
				params.env_maxEditorialScroll = env_maxEditorialScroll;
				
				//eseguo la chiamata 
				if(!submitRequest()){
					return;
				}
				
				cursor_wait();
				
				// Nel caso dello showmore, il cursore di caricamento oscura con un overlay tutta la pagina
				$jq('#loadingOverlay_black').css("top", "0px");
				
				//preparo le informazioni per la chiamata ajax
				var xhrargs = {
					url: "AjaxCategoryCustomResultsView",
			   		handleAs: "text", 
			   		sync: false,
			   		content: params,
			       	load: function(data) {
						
						
						
			       		//inserisco l'HTML 
			       		SearchBasedNavigationDisplay.doCreateShowMore(data, objectSearchInfo, this.content.facet, false);
			       		
			       		var nextScrollNumber = objectSearchInfo.searchResult.currentScrollNumber + 1;
			       		
			       		//utilizzo del pluging jquery waitforimages per attendere il caricamento delle immagini 
			       		//presenti all'interno della porzione di html appena aggiunto (data) prima di applicare gli stili dentro init_single_scroll
			       		$jq('#category_product_scroll_' + nextScrollNumber).waitForImages(function() {
			       			SearchBasedNavigationDisplay.init_single_scroll(nextScrollNumber);
			       			
			       			resizeGrid();
			       		});
			       		
			       		//rendo nuovamente selezionabili i filtri in pagina 
			       		SearchBasedNavigationDisplayJS.resetFacetCounts();
			    		updateFacetCounts();
			    		
			    		$jq("body").waitForImages(function() {
							
			    			$jq('#category_product_scroll_' + nextScrollNumber).focus();
			    			
							cursor_clear();
							
						});
			    		
			       	},
			       	error: function(error) {
			       		console.log(error);
			       		cursor_clear();
			       	}
				};
				
				//per evitare nomi doppi in pagina rimuovo l'oggetto json con le info relative alla paginazione
				//in modo che sia unico e successivamente aggiornato
				$jq('#'+ this.CATALOG_SEARCH_INFO_ID).remove();
				
				dojo.xhrPost(xhrargs);
				
			} else {
				//console.log(':: do not process show more :: ');
			}
		},
		
		/**
		 *  Metodo che appende il contenuto HTML a fondo pagina categoria - sottocategoria
		 *  e modifica l'hash dell'url
		 *  @param data - html da appendere in pagina
		 *  @param object - oggetto json presente in pagina e contenente le informazioni relative a beginIndex, pageSize ecc.
		 */
		doCreateShowMore: function(data, object, facetArray, publishEvent){
			if (data){
				//individuo il div a cui appendere l'HTML
				if ($jq('#category_product_container')){
					//individuo la posizione in cui appendere l'HTML
					
					$jq("div#category_product_container").append(data);
					
					var newBeginIndex = object.searchResult.newBeginIndex;
					var lastBeginIndex = object.searchResult.lastBeginIndex;
					var totalResultCount = object.searchResult.totalResultCount;
					var pageSize = object.searchResult.pageSize;
					var firstPageSize = object.searchResult.firstPageSize;
					
					//gestione visibilità barra 'show more' a fondo pagina:  
					//deve essere visibile solo se il nuovo indice + pageSize è inferiore al numero totale di prodotti da visualizzare (totalResultCount)
					this.showElementById('show_more_button_container', (newBeginIndex+pageSize<totalResultCount), 'frg_display', 'frg_hidden');
				}
			}
		},
		
		/**
		 * Funzione per inizializzare gli stili presenti all'interno del singolo scroll appena aggiunto
		 * @param nextScrollNumber - numero dello scroll aggiunto in pagina via ajax su cui si applicano gli stili
		 */
		init_single_scroll: function(nextScrollNumber) {
			$jq('#category_product_scroll_' + nextScrollNumber).on('centered', function () {
				$jq('.cleanrow').cleanrow({tolerance: 2});
			});
			$jq('[class*="ratio_"]').centering();
		},
		
		/**
		 * Funzione che verifica se un elemento è visibile dopo lo scroll della pagina
		 * @param elem - elemento di cui controllare la posizione nella vista
		 */
		isScrolledIntoView: function (elem) {
			// top e bottom dell'oggetto window 
			var docViewTop = $jq(window).scrollTop();
			var docViewBottom = docViewTop + $jq(window).height();
			
			//top e bottom dell'oggetto passato come parametro
			var elemTop = $jq(elem).offset().top;
			var elemBottom = elemTop + $jq(elem).height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		},
		/**
		 * Funzione di cui viene fatto il "bind" con l'evento scroll dell'oggetto window
		 * Il bind è eseguito nel metodo dojo.addOnLoad della pagina CategoryCustomResults.jsp
		 */
		showMoreOnScroll: function(e){
			
			//condizione per caricare una nuova porzione di pagina
			offset = 70;
			if (navigator.platform.indexOf("iPhone") != -1 ) {	
				offset = 150; //fix per scroll su iphone
			}
			
			if ($jq(window).scrollTop() > $jq(document).height() - $jq(window).height() - offset) {
				$jq('#show_more_button').click();
				
			} else if ($jq(window).scrollTop() > 100) {
				// preloading starts as soon as the user scrolls down the page
				if(dojo.byId(SearchBasedNavigationDisplay.CATALOG_SEARCH_INFO_ID)){
					//Preload.preload(dojo.fromJson(dojo.byId(SearchBasedNavigationDisplay.CATALOG_SEARCH_INFO_ID).innerHTML));
				}
			}
		},
		/**
		 * Setta via dojo l'hash all'url corrente
		 */
		setHash: function(obj) {
			dojo.hash(dojo.objectToQuery(obj));
		},
		/**
		 * Resetta l'hash corrente 
		 */
		resetHash: function(){
			window.location.hash = '#';
		},
		/**
		 * Metodo chiamato da CategoryCustomDisplay.jsp
		 * - carica da sessionStorage gli input da selezionare nel sidebar menu
		 * - se nell'hash è presente un #beginIndex=N forza il caricamento del delta di prodotti
		 * - la refresh area viene aggiornata subito al caricamento della pagina di categoria
		 * 	 usando gli attributi che si trovano in sessione
		 */
		reloadPageAndFacets: function () {
			//
			// verifico se ci sono dei filtri da attivare in pagina 
			//
			var facetsArray = SessionStoragePersistenceJS.getItemArray('facets'); 
			var menuSelection = SessionStoragePersistenceJS.getJSONItem("menuSelection");
			if (facetsArray && facetsArray.length>0 && menuSelection){
				//gestione visibilità filtri sidebar menu
				for (key in menuSelection){
					// section è la sezione del menu in cui devo attivare il filtro
					var section = key;
					// facetId è l'id dell'input checkbox che attiva il filtro
					var facetId = menuSelection[key];
					
					// check degli input checkbox (come se fossero stati effettivamente selezionati dall'utente)
					var checkboxFilter = dojo.byId('facet_checkbox'+facetId);
					if (checkboxFilter) {
						checkboxFilter.setAttribute('checked', true);
					}
					// appendo label relativa al filtro selezionato, senza innescare il doSearch
					this.appendFilterFacet(facetId, section, "", "", false);
				}
			}
			
			//ricarico delta prodotti by show more
			this.doSearchFilterCallBack();
		},
		/**
		 * Ricarica un delta di prodotti in base all'infomrazione beginIndex presente nell'hash
		 * Viene richiamata dallo script posizionato in fondo alla CategoryCustomResult.jsp
		 */
		reloadPage: function(){
			console.log(':: reloadPage ::');
			// recupero l'hash della pagina e se il risultato è paginato carico anche l'eventuale delta di prodotti
			var hash = window.location.hash;
			var obj = dojo.queryToObject(hash);
			var params = [];
			/*
			 * 	FRGMWCS-182 : RIMOSSA FUNZIONALITA
			 *  var facetsArray = SessionStoragePersistenceJS.getItemArray('facets'); 
			 */
			if (obj['#beginIndex']){
				
				//oggetto in pagina con le informazioni per la paginazione (firstPageSize, pageSize, categoryId ecc)
				var objectSearchInfo = dojo.fromJson(dojo.byId(this.CATALOG_SEARCH_INFO_ID).innerHTML);
				
				if (objectSearchInfo){
					//recupero le informazioni che mi servono per la paginazione dall'oggetto in pagina
					var firstPageSize = objectSearchInfo.searchResult.firstPageSize;
					var pageSize = objectSearchInfo.searchResult.pageSize;
					var categoryId = objectSearchInfo.searchResult.categoryId;
					var totalResultCount = objectSearchInfo.searchResult.totalResultCount;
					var orderBy = objectSearchInfo.searchResult.orderBy;
					
					//calcolo il prossimo indice da cui iniziare a caricare i dati
					var newBeginIndex = this.getNewBeginIndex(objectSearchInfo);

					//memorizzo il valore del nuovo indice
					objectSearchInfo.searchResult.newBeginIndex = newBeginIndex;
					
					//memorizzo il numero dello scroll corrente
					var currentScrollNumber = objectSearchInfo.searchResult.currentScrollNumber;
					
					// Page name
					var frgPageName = objectSearchInfo.searchResult.frgPageName;
					
					// env_maxEditorialScroll
					var env_maxEditorialScroll = objectSearchInfo.searchResult.env_maxEditorialScroll;
					
					//dall'hash recupero la pagina che stavo visualizzando e calcolo il delta di prodotti da ricaricare
					var deltaResult = dojo.number.parse(obj['#beginIndex']) - dojo.number.parse(firstPageSize);
					
					//chiamata ajax - riparto dalla prima pagina caricando il deltaResult
					params.storeId = WCParamJS.storeId;  		
					params.catalogId = WCParamJS.catalogId;  	
					params.langId = WCParamJS.langId;   		
					params.categoryId = categoryId; 	
					params.beginIndex = firstPageSize; 			
					params.deltaResult = deltaResult;			
					params.sType = '';
					
					params.orderBy = orderBy;
					params.currentScrollNumber = currentScrollNumber;
					params.frgPageName = frgPageName;
					params.env_maxEditorialScroll = env_maxEditorialScroll;
					
					/*
					 * FRGMWCS-182 : RIMOSSA FUNZIONALITA
					 * params.facet = facetsArray;
					 */
					
					params.orderBy = orderBy;
					
					//aggiorno i valori dell'oggetto usato dal metodo doBackShowMore
					this.newObjectSearchInfo = {'searchResult' : { 
							'lastBeginIndex'	: firstPageSize + deltaResult,
							'newBeginIndex' 	: firstPageSize + deltaResult,// + pageSize,
							'firstPageSize' 	: firstPageSize,
							'pageSize'			: pageSize,
							'categoryId'		: categoryId,
							'totalResultCount'	: totalResultCount,
							'orderBy': orderBy
					}};
					
					if (pageSize > 0){
						
						dojo.ready(function() {
							//preparo le informazioni per la chiamata ajax
							var xhrargs = {
								url: "AjaxCategoryCustomResultsBackView",

						   		handleAs: "text", 
						   		sync: false,
						   		content: params,
						       	load: function(data) {
						       		//cursor_clear();
						       		//inserisco l'HTML 
						       		SearchBasedNavigationDisplay.doBackShowMore(data, this.content.facet);

						       		var nextScrollNumber = objectSearchInfo.searchResult.currentScrollNumber + 1;
						       		
						       		//utilizzo del pluging jquery waitforimages per attendere il caricamento delle immagini 
						       		//presenti all'interno della porzione di html appena aggiunto (data) prima di applicare gli stili dentro init_single_scroll
						       		$jq('#category_product_scroll_' + nextScrollNumber).waitForImages(function() {
						       			SearchBasedNavigationDisplay.init_single_scroll(nextScrollNumber);
						       			
						       			resizeGrid();
										
										dojo.publish("pageCreatedFromBack");
										
										cursor_clear();
						       		});
						       		
						       		//rendo nuovamente selezionabili i filtri in pagina 
						       		SearchBasedNavigationDisplayJS.resetFacetCounts();
						    		updateFacetCounts();
						    		
						       	},
						       	error: function(error) {
						       		console.log(error);
						       		cursor_clear();
						       	}
							};
							
							//eseguo la chiamata
							if(!submitRequest()){ 
								return;					
							}
							cursor_wait();
							
							//per evitare nomi doppi in pagina rimuovo l'oggetto json con le info relative alla paginazione
							//in modo che sia unico e successivamente aggiornato
							$jq('#'+ this.CATALOG_SEARCH_INFO_ID).remove();
							
							dojo.xhrPost(xhrargs);
						});
					}	
				}
			}  else {
				//ho fatto back e il risultato non è paginato
				this.forceLocationHref();
			}
		},
		/**
		 * Funzione richiamata al successo della chiamata AJAX che carica prodotti in pagina all'onload
		 * @param data - html restituito dalla chiamata ajax
		 * @param facetArray - array dei facet correnti 
		 */
		doBackShowMore: function(data, facetArray){
			//forzo la creazione della porzione di pagina
			this.doCreateShowMore(data, this.newObjectSearchInfo, facetArray, true);
		},
		/**
		 * Funzione che verifica quali sono i filtri applicati
		 * A differenza della funzione standard SearchBasedNavigationDisplayJS.getEnabledProductFacets() 
		 * non disabilita le voci di filtraggio
		 */
		getEnabledProductFacetsWithoutDisablingFilter : function() {
			var facetForm = document.forms['productsFacets'];
			var elementArray = facetForm.elements;

			var facetArray = new Array();
			for (var i=0; i < elementArray.length; i++) {
				var element = elementArray[i];
				if(element.type != null && element.type.toUpperCase() == "CHECKBOX") {
					if(element.checked) {
						facetArray.push(element.value);
					}
				}
			}
			return facetArray;
		},
		/**
		 * Mostra / Nasconde un oggeto passando il suo id
		 * @param objectId - id dell'oggetto di cui gestire la visibilità
		 * @prama condition - booleano, visualizzo il prodotto se true
		 */
		showElementById: function(elementId, condition, showClass, hideClass){
			var elementObj = $(elementId);
			if(elementObj){
				if (condition){
					elementObj.setAttribute('class', showClass);
				} else {
					elementObj.setAttribute('class', hideClass);
				}
			}
		},
		/**
		 * Metodo invocato al click sull'immagine di prodotto in pagina di categoria.
		 * Aggiorna l'hash dell'url con le informazioni necessarie quando viene fatto back da scheda prodotto
		 * @param obj: link di prodotto cliccato nella pagina di categoria
		 * @param scrollTop : booleano che indica se devo fare lo scroll in testa alla pagina (obsoleto)
		 * @param catentryId : id del prodotto mantenuto nell'hash dell'url
		 */
		updateHref: function(obj, scrollTop, catentryId){
			
			var multipleParams = false;
			var hash = window.location.hash;
			var hashQuery = dojo.queryToObject(hash);
			
			// recupero l'id legato al container del prodotto  (row_<valore anchor>_<numero riga>)
			// per indicazione della posizione del prodotto
			var indexFromObjId = -1;
			var parent = $jq(obj).parents('[id^=row_]');
			if (parent && parent[0] && parent[0].id){
				var id = parent[0].id;
				var tokens = id.split('_');
				indexFromObjId = dojo.number.parse(tokens[1]);
			}
			
			var beginIndex = -1;
			if (indexFromObjId && indexFromObjId > 0){
				// pagina di categoria: indice presente e aggiornato in html
				beginIndex = indexFromObjId;
			} else {
				// pagina di prodotto: indice da considerare è quello dell'hash
				if (hashQuery['#beginIndex'] && hashQuery['#beginIndex']>0){
					beginIndex = hashQuery['#beginIndex'];
				}
			}
			//
			//aggiornamento del link sull'href del prodotto selezionato 
			//in modo da tenere memoria del beginIndex di ritorno
			//
			
			if (obj.href.indexOf('beginIndex')==-1){
				if (beginIndex && beginIndex>0){
					obj.href=obj.href.concat('#beginIndex='+beginIndex);
					multipleParams = true;
				}
			}
			
			if (catentryId){
				//aggiorno il link con l'id del prodotto
				if (obj.href.indexOf('pId=')==-1){
					obj.href=obj.href.concat(multipleParams ? "&" : "#").concat('pId='+catentryId);
				}
				
				//aggiorno il document location href
				var newHashObject = '';
				if (beginIndex && beginIndex>0){
					newHashObject = dojo.objectToQuery({'beginIndex': beginIndex, 'pId': catentryId});
				} else {
					newHashObject = dojo.objectToQuery({'pId': catentryId});
				}
				
				//faccio il replace e non append
				dojo.hash(newHashObject, true);
				
				//FIX Safari che non mantiene di suo lo stato relativo all'hash appena settato 
				//devo quindi forzarlo con un pushState
				$jq.browser.safari = ($jq.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));
				if ($jq.browser.safari){
					history.pushState(newHashObject, "", document.location.href);
				} 

			}
		},
		/**
		 * Metodo richiamato alla fine del ricaricamento della pagina di categoria 
		 * per forzare il posizionamento su un determinato item
		 */
		forceLocationHref: function(){
			console.log(':: forceLocationHref ::'); 
			dojo.ready(function(){
				var hash = window.location.hash;
				var obj = dojo.queryToObject(hash);
				
				var productAnchor_base = '#CatalogEntryProdImg_';

				// jump to product 
				var pId = obj['pId'] || obj['#pId'];
				
				var productAnchor = productAnchor_base + pId;
				
				if (pId && $jq(productAnchor)){
					if ($jq(productAnchor)[0]){
						//$jq(productAnchor)[0].scrollIntoView(false);
						$jq('html, body').animate({
							scrollTop: ($jq(productAnchor).offset().top - ($jq(window).height()/3))
						},500);
					}
				} else {
					
					var scrollAnchor_base = '#beginIndex_';
					
					// otherwise jump to scroll
					var bId = obj['beginIndex'] || obj['#beginIndex'];
					
					var scrollAnchor = scrollAnchor_base + bId;
					
					if ($jq(scrollAnchor)[0]){
						$jq(scrollAnchor)[0].scrollIntoView(true);
					}
				}
			});
		},
		/**
		 * Funzione che rimuove rimuove dal sessionStorage i filtri impostati se la categoryId passata come parametro risulta diversa da quella persistente
		 * In caso contrario il sessionStorage viene mantenuto
		 * @param categoryId
		 */
		clearAll: function (categoryId){
			//recupero il valore del categoryId a cui sono associati eventuali facet
			var facetCategoryId = SessionStoragePersistenceJS.getItem("categoryId");
			//confronto il valore della categoria corrente con quello della categoria di "destinazione" 
			if (facetCategoryId && categoryId){
				if (facetCategoryId != categoryId){
					//id categorie diverse = > elimino i filtri
					SessionStoragePersistenceJS.clearAll();
				}
			}
		},
		/**
		 * Metodo richiamato dalla CategoryCustomResults.jsp
		 * Per ogni sezione di filtraggio calcola se esiste almeno una voce con count > 0 (a parte quella relativa alle categoria)
		 * In caso contrario visualizza la voce 'Filtro non disponibile' contenuta nell'oggetto <li id="nofilter_${sectionId}"></li>
		 */
		checkVisibleFacets: function(){
			//array delle sezioni di filtraggio
			var section_list = $jq('[id^=section_list_]');
			for (var i=0; i < section_list.length; i++) {
				var section = section_list[i];
				if (section){
					//controllo tutte le sezioni a parte quella delle categorie
					if (section.id && section.id != 'section_list_facet_category'){
						var visibleSections = $jq('#'+section.id+ '> ul > li.singleFacet').length;
						//nessuna voce è visibile ovvero nessuna voce ha count > 0 in base allo script posizionato in fondo alla CategoryCustomResult.jsp
						if (visibleSections == 0){
							//visualizzo la label 
							var label = $('nofilter_' + section.id);
							if (label){
								label.setAttribute('class', 'singleFacet');
							}
						}
					}
				}
			}
		}		

	}
}

if(typeof(Preload) == "undefined" || Preload == null || !Preload){
	
	Preload = {
		
		backPreload: [],
		
		backPreloadPending: [],
		
		showmorePreload: [],
		
		showmorePreloadPending: [],
		
		DONE: 'done',
		
		RUNNING: 'running',
		
		PENDING: 'pending',
		
		ERROR: 'error',
		
		/**
		 * Start preloading content by invoking next "show more" page and "back from product" page.
		 * @param objectSearchInfo The in page element SearchBasedNavigationDisplay.CATALOG_SEARCH_INFO_ID
		 */
		preload: function(objectSearchInfo){
		
			var newBeginIndex = SearchBasedNavigationDisplay.getNewBeginIndex(objectSearchInfo);
			var lastBeginIndex = objectSearchInfo.searchResult.lastBeginIndex;
			var totalResultCount = objectSearchInfo.searchResult.totalResultCount;
			var pageSize = objectSearchInfo.searchResult.pageSize;
					
			var currentPageCount = lastBeginIndex + pageSize;
			
			// do not preload useless data
			if(currentPageCount < totalResultCount){
			
				// BACK (VIEW ALL) - if no preload on queue yet for current index
				if(Preload.backPreload[newBeginIndex] == null){
				
					// a preload request is already running, add current to pending queue
					if (Preload.isBackPreloadRunning()){
					
						console.log("BACK :: Preload is running, setting this one to PENDING: " + newBeginIndex);
					
						// preload is running, set current to pending
						Preload.setBackPreloadStatus(newBeginIndex, Preload.PENDING, objectSearchInfo);
						
					} else { // no preload pending on 'back' queue, execute preload
					
							Preload.preloadBack(objectSearchInfo, newBeginIndex);
					}
				}
			
			
				// SHOW MORE - if no preload on queue yet for current index		
				if(Preload.showmorePreload[newBeginIndex] == null){
					
					// a preload request is already running, add current to pending queue
					if(Preload.isShowMorePreloadRunning()){
					
						console.log("SHOW MORE :: preload is running, setting this one to PENDING: " + newBeginIndex);
					
						// preload is running, set current to pending
						Preload.setShowmorePreloadStatus(newBeginIndex, Preload.PENDING, objectSearchInfo);
						
					} else { // no preload pending on 'showmore' queue, execute preload
						
						Preload.preloadShowMore(objectSearchInfo, newBeginIndex);

					}
				}
			}
		
		},		
		
		/**
		 * Execute preload for BACK (VIEW ALL) function by invoking the AJAX view.
		 */
		preloadBack: function(searchInfoObject, newBeginIndex){
			if(searchInfoObject == null)
				return;

			// collect useful data to compose the request
			var firstPageSize = searchInfoObject.searchResult.firstPageSize;
			var deltaResult = newBeginIndex - firstPageSize;
			
			var params = {};
			params.storeId = WCParamJS.storeId;  		
			params.catalogId = WCParamJS.catalogId;  	
			params.langId = WCParamJS.langId;
			params.categoryId = searchInfoObject.searchResult.categoryId; 	
			params.beginIndex = firstPageSize;
			params.deltaResult = deltaResult;
			params.sType = '';
			params.orderBy = searchInfoObject.searchResult.orderBy;
			params.currentScrollNumber = 1;
			params.frgPageName = searchInfoObject.searchResult.frgPageName;
			params.env_maxEditorialScroll = searchInfoObject.searchResult.env_maxEditorialScroll;;
			
			// compose the request
			var xhrargs = {
					url: "AjaxCategoryCustomResultsBackView",
			   		handleAs: "text", 
			   		sync: false,
			   		content: params,
					load: function (data){
							Preload.setBackPreloadStatus(newBeginIndex, Preload.DONE);
							console.log("BACK :: Preloading DONE for " + newBeginIndex);
						},
						error: function(error){
							Preload.setShowmorePreloadStatus(newBeginIndex, Preload.ERROR);
							console.log("BACK :: Preloading ERROR for " + newBeginIndex);
						}
					};
					
			console.log("BACK :: Preloading back for " + newBeginIndex + " from " + firstPageSize + " to " + deltaResult);
			
			// set this request as RUNNING
			Preload.setBackPreloadStatus(newBeginIndex, Preload.RUNNING);
					
			dojo.xhrPost(xhrargs);
		},
		
		/**
		 * Execute preload for SHOW MORE function by invoking the AJAX view.
		 */
		preloadShowMore: function(searchInfoObject, newBeginIndex){
			if(searchInfoObject == null)
				return;
			
			// collect useful data to compose the request
			var totalResultCount = searchInfoObject.searchResult.totalResultCount;
			var newBeginIndex = SearchBasedNavigationDisplay.getNewBeginIndex(searchInfoObject);
			var pageSize = SearchBasedNavigationDisplay.getNewPageSize(searchInfoObject);
			var doProcess = (newBeginIndex < totalResultCount);
			
			if(doProcess){
				var params = {};
				params.storeId = WCParamJS.storeId;  		
				params.catalogId = WCParamJS.catalogId;  	
				params.langId = WCParamJS.langId;   		
				params.categoryId = searchInfoObject.searchResult.categoryId;	
				params.beginIndex = newBeginIndex;
				params.sType = '';
				params.orderBy = searchInfoObject.searchResult.orderBy;
				params.currentScrollNumber = searchInfoObject.searchResult.currentScrollNumber;
				params.frgPageName = searchInfoObject.searchResult.frgPageName;
				params.env_maxEditorialScroll = searchInfoObject.searchResult.env_maxEditorialScroll;
				params.reqId = Math.random();
				
				// compose the request
				var xhrargs = {
						url: "AjaxCategoryCustomResultsView",
						handleAs: "text", 
						sync: false,
						content: params,
						load: function (data){
								Preload.setShowmorePreloadStatus(newBeginIndex, Preload.DONE);
								console.log("SHOW MORE :: Preloading DONE for " + newBeginIndex);
							},
						error: function(error){
								Preload.setShowmorePreloadStatus(newBeginIndex, Preload.ERROR);
								console.log("SHOW MORE :: Preloading ERROR for " + newBeginIndex);
							}
						};
				
				// set this request as RUNNING
				Preload.setShowmorePreloadStatus(newBeginIndex, Preload.RUNNING);
				
				console.log("SHOW MORE :: Preloading show more for " + newBeginIndex);
				
				dojo.xhrPost(xhrargs);
			}
		},
		
		/**
		 * Check if a "back" preload is currently running on the queue.
		 */
		isBackPreloadRunning: function(){
			for (var i in Preload.backPreload){
				if(Preload.backPreload[i] == Preload.RUNNING){
					console.log("BACK :: preload running for " + i);
					return true;
				}
			}
			
			return false;
		},
		
		/**
		 * Check if a "show more" preload is currently running on the queue.
		 */
		isShowMorePreloadRunning: function(){
			for (var i in Preload.showmorePreload){
				if(Preload.showmorePreload[i] == Preload.RUNNING){
					console.log("SHOW MORE :: preload running for " + i);
					return true;
				}
			}
			
			return false;
		},
		
		/**
		 * Sets the input status for the input preload index on the "back" preload
		 * queue and manages it accordingly.
		 *
		 *	@param index preload request index, required
		 *	@param status preload request status to be set on the queue, required
		 *	@param object status object to be stored for further operations, not required
		 */
		setBackPreloadStatus: function(index, status, object){
			Preload.backPreload[index] = status;
			
			if(status == Preload.DONE || status == Preload.ERROR){
				for (var i in Preload.backPreload){
					if(Preload.backPreload[i] == Preload.PENDING){
					
						console.log("BACK :: Popping " + index);
						
						// pop the peding one and execute it
						var statusObject = Preload.backPreloadPending[i];
						delete Preload.backPreloadPending[i];
						Preload.preloadBack(statusObject, SearchBasedNavigationDisplay.getNewBeginIndex(statusObject));
						
						// once popped and executed, just exit iteration
						break;
					}
				}
			}
			
			// if pending, just set the flag and store data for further processing
			if(status == Preload.PENDING){
				Preload.backPreload[index] = Preload.PENDING;
				Preload.backPreloadPending[index] = object;
			}
		},
		
		/**
		 * Sets the input status for the input preload index on the "show more" preload
		 * queue and manages it accordingly.
		 *
		 *	@param index preload request index, required
		 *	@param status preload request status to be set on the queue, required
		 *	@param object status object to be stored for further operations, not required
		 */
		setShowmorePreloadStatus: function(index, status, object){
			Preload.showmorePreload[index] = status;
			
			if(status == Preload.DONE || status == Preload.ERROR){
				for (var i in Preload.showmorePreload){
					if(Preload.showmorePreload[i] == Preload.PENDING){
						// TODO pop and execute
					}
				}
			}
			
			if(status == Preload.PENDING){
				Preload.showmorePreload[index] = Preload.PENDING;
				Preload.showmorePreloadPending[index] = object;
			}
		}
	}
}