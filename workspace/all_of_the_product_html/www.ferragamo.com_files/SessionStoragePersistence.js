/**
 * @author Sofia Rizzi 
 * Classe javascript per gestire la persistenza dei facets in pagina di categoria
 * tramite l'oggetto sessionStorage (HTML5)
 * 
 * L'oggetto sessionStorage mantiene la persistenza per la sessione corrente del browser 
 * ovvero più finestre attive del browser mantengono sessionStorage differenti
 * 
 * Una volta chiusa la finestra del browser, l'oggetto sessionStorage viene svuotato
 * 
 * Riferimenti:
 * http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute
 * http://html5.litten.com/html5-web-storage-using-localstorage-and-sessionstorage-objects/
 * 
 * Compatibilita':
 * Internet Explorer 8+, Firefox, Opera, Chrome, e Safari.
 * 
 * NOTE:
 * Tutte le variabili storicizzate in questo oggetto sono trattate come stringhe, compresi array e JSON objects
 */
if(typeof(SessionStoragePersistence) == "undefined" || SessionStoragePersistence == null || !SessionStoragePersistence){
	
	SessionStoragePersistenceJS = {
		
		/**
		 * Aggiunge alla variabile sessionStorage l'item <name> a cui è associato l'oggetto generico <object> (ad es. un array di stringhe)
		 * es. facets = ['ads_f11001_ntk_cs%3A%22VAL1%22', 'price_EUR%3A%28%7B100+200%7D+200%29'] 
		 */	
		setObjectPersistence: function(name, object){
			if (this.isPersistenceSupported){
				//replace dell'oggetto
				sessionStorage.setItem(name, object);
			}
		},
		/**
		 * Aggiunge alla variabile sessionStorage l'item  <name> a cui è associato un oggetto JSON composto di coppie <key, value>
		 */
		setJSONObjectPersistence: function(name, key, value){
			if (this.isPersistenceSupported){
				//recupero un eventuale valore presente, altrimenti inizializzo
				var persistedJSONObject = (JSON.parse(sessionStorage.getItem(name))) || {};
				
				//setto il valore passato come parametro nell'oggetto JSON
				persistedJSONObject[key] = value;
				
				//aggiorno la variabile sessionStorage: JSON.stringify e' necessario per gestire il contenuto JSON come stringa
				sessionStorage.setItem(name, JSON.stringify(persistedJSONObject));
			}
		},
		/**
		 * Rimuove la variabile <name> dalla lista degli item 
		 */
		removeObjectPersistence: function(name){
			if (this.isPersistenceSupported){
				sessionStorage.removeItem(name);
			}
		},
		/**
		 * Rimuove la variabile <name> dalla lista degli item 
		 */
		removeJSONObjectPersistence: function(name, key, value){
			if (this.isPersistenceSupported){
				//recupero l'oggetto JSON dalla stringa memorizzata
				var persistedObject = (JSON.parse(sessionStorage.getItem(name)));
				if (persistedObject && persistedObject[key]) {
					delete persistedObject[key];
				}
				//aggiorno l'oggetto
				sessionStorage.setItem(name, JSON.stringify(persistedObject));
			}
		},
		/**
		 * elimina tutte le variabili persistenti 
		 */
		clearAll: function(){
			if (this.isPersistenceSupported){
				sessionStorage.clear();
			}
		},
		/**
		 * Ritorna l'item identificato da <name>
		 * @return - object generico identificato da <name> (ad es. un array)
		 */
		getItem: function(name){
			if (this.isPersistenceSupported){
				return sessionStorage.getItem(name);
			}
		},
		/**
		 * Ritorna l'item identificato da <name>
		 * @return - JSON object identificato da <name> 
		 */
		getJSONItem: function(name){
			if (this.isPersistenceSupported){
				return JSON.parse(sessionStorage.getItem(name));
			}
		},
		/**
		 * Ritorna l'item identificato da <name>
		 * @return array
		 */
		getItemArray: function(name){
			var itemArray = [];
			if (this.isPersistenceSupported){
				var item = sessionStorage.getItem(name);
				if (item){
					if (item.indexOf(","!=-1)){
						itemArray = item.split(",");
					} else {
						itemArray[0] = item;
					}
				}
			}
			return itemArray;
			
		},
		/**
		 * verifico se localStorage è supportato
		 */
		isPersistenceSupported: function(){
			return (typeof(Storage)!=="undefined");
		}
	}
}